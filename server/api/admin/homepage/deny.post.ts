import { defineEventHandler, readBody, createError } from "h3";
import { eq } from "drizzle-orm";
import { requireAdmin } from "../../../utils/auth";
import { useDrizzle, tables } from "../../../utils/drizzle";
import { UUID } from "../../../utils/uuid";

export default defineEventHandler(async (event) =>
{
    requireAdmin(event);
    const { placementId } = await readBody<{ placementId: string }>(event);

    if (!placementId)
        throw createError({ statusCode: 400, statusMessage: "placementId required" });

    const db = useDrizzle();
    const id = UUID.parse(placementId);

    await db
        .update(tables.homepagePlacements)
        .set({ status: "denied" })
        .where(eq(tables.homepagePlacements.placementId, id.getBytes() as any));

    // NOTE: Issue refund via Stripe dashboard — stripePaymentIntentId is in the DB

    return { ok: true, status: "denied" };
});
