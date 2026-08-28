import { defineEventHandler } from "h3";
import { eq } from "drizzle-orm";
import { requireAuth } from "../../utils/auth";
import { useDrizzle, tables } from "../../utils/drizzle";
import { UUID } from "../../utils/uuid";

export default defineEventHandler(async (event) =>
{
    const auth = requireAuth(event);
    const db = useDrizzle();

    const rows = await db
        .select()
        .from(tables.homepagePlacements)
        .where(eq(tables.homepagePlacements.ownerQueryId, auth.queryId.getBytes() as any))
        .all();

    return {
        placements: rows.map((r) => ({
            id: UUID.fromBytes(r.placementId).toString(),
            gridX: r.gridX,
            gridY: r.gridY,
            gridWidth: r.gridWidth,
            gridHeight: r.gridHeight,
            ownerName: r.ownerName,
            linkUrl: r.linkUrl,
            badgeSvg: r.badgeSvg,
            pixelCount: r.pixelCount,
            amountPaidCents: r.amountPaidCents,
            status: r.status,
            purchasedAt: r.purchasedAt,
        })),
    };
});
