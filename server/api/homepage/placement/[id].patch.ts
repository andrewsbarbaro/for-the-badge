import { defineEventHandler, createError, readBody } from "h3";
import { eq, and } from "drizzle-orm";
import { requireAuth } from "../../../utils/auth";
import { useDrizzle, tables } from "../../../utils/drizzle";
import { UUID } from "../../../utils/uuid";

export default defineEventHandler(async (event) =>
{
    const auth = requireAuth(event);
    const placementIdStr = event.context.params?.id;

    if (!placementIdStr)
        throw createError({ statusCode: 400, statusMessage: "Missing placement id" });

    const { linkUrl, badgeSvg } = await readBody<{ linkUrl?: string; badgeSvg?: string }>(event);

    const db = useDrizzle();
    let placementId: UUID;
    try { placementId = UUID.parse(placementIdStr); }
    catch { throw createError({ statusCode: 400, statusMessage: "Invalid placement id" }); }

    // Verify ownership
    const existing = await db
        .select({ ownerQueryId: tables.homepagePlacements.ownerQueryId, status: tables.homepagePlacements.status })
        .from(tables.homepagePlacements)
        .where(eq(tables.homepagePlacements.placementId, placementId.getBytes() as any))
        .get();

    if (!existing)
        throw createError({ statusCode: 404, statusMessage: "Placement not found" });

    const ownerBytes = Buffer.from(auth.queryId.getBytes());
    const placementOwner = existing.ownerQueryId ? Buffer.from(existing.ownerQueryId as any) : null;

    if (!placementOwner || !ownerBytes.equals(placementOwner))
        throw createError({ statusCode: 403, statusMessage: "You don't own this placement" });

    if (existing.status === "denied")
        throw createError({ statusCode: 400, statusMessage: "This placement was denied and cannot be updated" });

    const updates: Record<string, any> = {};
    if (linkUrl !== undefined) updates.linkUrl = linkUrl.trim() || null;
    if (badgeSvg !== undefined && badgeSvg.includes("<svg")) updates.badgeSvg = badgeSvg;

    if (Object.keys(updates).length === 0)
        throw createError({ statusCode: 400, statusMessage: "Nothing to update" });

    await db
        .update(tables.homepagePlacements)
        .set(updates)
        .where(eq(tables.homepagePlacements.placementId, placementId.getBytes() as any));

    return { ok: true };
});
