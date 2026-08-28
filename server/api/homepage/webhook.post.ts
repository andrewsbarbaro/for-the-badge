import { defineEventHandler, createError, readRawBody, getHeader } from "h3";
import { eq } from "drizzle-orm";
import { useDrizzle, tables } from "../../utils/drizzle";
import { useServerStripe } from "#stripe/server";

export default defineEventHandler(async (event) =>
{
    const rawBody = await readRawBody(event);
    const signature = getHeader(event, "stripe-signature");

    if (!rawBody || !signature)
    {
        throw createError({ statusCode: 400, statusMessage: "Missing body or signature" });
    }

    const config = useRuntimeConfig();
    const stripe = await useServerStripe(event);

    let stripeEvent;
    try
    {
        stripeEvent = stripe.webhooks.constructEvent(rawBody, signature, config.stripeWebhookSecret);
    }
    catch (err)
    {
        console.error("Stripe webhook signature verification failed:", err);
        throw createError({ statusCode: 400, statusMessage: "Invalid webhook signature" });
    }

    if (stripeEvent.type === "checkout.session.completed")
    {
        const session = stripeEvent.data.object as any;
        const placementId = session.metadata?.placement_id;

        if (!placementId)
        {
            console.error("Webhook: missing placement_id in session metadata");
            return { received: true };
        }

        const db = useDrizzle();

        // Payment confirmed — move to pending_approval for admin review (≤12hr SLA)
        await db
            .update(tables.homepagePlacements)
            .set({
                status: "pending_approval",
                stripeSessionId: session.id,
                stripePaymentIntentId: session.payment_intent ?? null,
                purchasedAt: new Date(),
            })
            .where(eq(tables.homepagePlacements.stripeSessionId, session.id));
    }

    return { received: true };
});
