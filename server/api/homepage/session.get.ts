import { defineEventHandler, createError, getQuery } from "h3";
import { eq } from "drizzle-orm";
import { useDrizzle, tables } from "../../utils/drizzle";
import { useServerStripe } from "#stripe/server";

export default defineEventHandler(async (event) =>
{
    const { session_id } = getQuery(event);

    if (!session_id || typeof session_id !== "string")
    {
        throw createError({ statusCode: 400, statusMessage: "Missing session_id" });
    }

    const db = useDrizzle();

    const placement = await db
        .select({
            status: tables.homepagePlacements.status,
            gridX: tables.homepagePlacements.gridX,
            gridY: tables.homepagePlacements.gridY,
            gridWidth: tables.homepagePlacements.gridWidth,
            gridHeight: tables.homepagePlacements.gridHeight,
            ownerName: tables.homepagePlacements.ownerName,
            pixelCount: tables.homepagePlacements.pixelCount,
            amountPaidCents: tables.homepagePlacements.amountPaidCents,
            purchasedAt: tables.homepagePlacements.purchasedAt,
        })
        .from(tables.homepagePlacements)
        .where(eq(tables.homepagePlacements.stripeSessionId, session_id))
        .get();

    if (!placement)
    {
        throw createError({ statusCode: 404, statusMessage: "Placement not found for this session" });
    }

    // If still pending, check Stripe directly — webhook may not have arrived yet.
    // If Stripe confirms payment_status=paid, advance to pending_approval ourselves.
    if (placement.status === "pending")
    {
        try
        {
            const stripe = await useServerStripe(event);
            const session = await stripe.checkout.sessions.retrieve(session_id);

            if (session.payment_status === "paid")
            {
                await db
                    .update(tables.homepagePlacements)
                    .set({
                        status: "pending_approval",
                        stripePaymentIntentId: typeof session.payment_intent === "string"
                            ? session.payment_intent
                            : null,
                        purchasedAt: new Date(),
                    })
                    .where(eq(tables.homepagePlacements.stripeSessionId, session_id));

                placement.status = "pending_approval";
                placement.purchasedAt = new Date();
            }
        }
        catch (err)
        {
            // Non-fatal — just return current DB status
            console.error("Stripe session check failed:", err);
        }
    }

    return placement;
});
