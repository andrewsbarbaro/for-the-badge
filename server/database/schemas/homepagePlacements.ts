import { sqliteTable, blob, text, integer, index, uniqueIndex } from "drizzle-orm/sqlite-core";
import { UUID } from "../../utils/uuid";

export const homepagePlacements = sqliteTable("homepage_placements", {
    placementId: blob("placement_id", { mode: "buffer" }).primaryKey().$default(() => UUID.createV7().getBytes()).$type<UUID>(),
    // Grid coordinates (0-indexed cells, grid is 100×50)
    gridX: integer("grid_x").notNull(),
    gridY: integer("grid_y").notNull(),
    gridWidth: integer("grid_width").notNull(),
    gridHeight: integer("grid_height").notNull(),
    // Account that purchased (nullable — anonymous buyers have no account linked)
    ownerQueryId: blob("owner_query_id", { mode: "buffer" }),
    // Owner display info
    ownerName: text("owner_name").notNull(),
    linkUrl: text("link_url"),
    // Badge SVG content (the final watermarked SVG)
    badgeSvg: text("badge_svg").notNull(),
    // Payment
    stripeSessionId: text("stripe_session_id"),
    stripePaymentIntentId: text("stripe_payment_intent_id"),
    amountPaidCents: integer("amount_paid_cents").notNull().default(0),
    pixelCount: integer("pixel_count").notNull(),
    // Status: pending = awaiting payment, active = live on homepage
    status: text("status").notNull().default("pending"),
    purchasedAt: integer("purchased_at", { mode: "timestamp" }),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull().$default(() => new Date()),
}, (table) => ({
    statusIdx: index("hp_status_idx").on(table.status),
    ownerQueryIdIdx: index("hp_owner_query_id_idx").on(table.ownerQueryId),
    stripeSessionIdx: uniqueIndex("hp_stripe_session_idx").on(table.stripeSessionId),
    gridPosIdx: index("hp_grid_pos_idx").on(table.gridX, table.gridY),
    createdAtIdx: index("hp_created_at_idx").on(table.createdAt),
}));

export type HomepagePlacement = typeof homepagePlacements.$inferSelect;
export type InsertHomepagePlacement = typeof homepagePlacements.$inferInsert;
export type PlacementId = UUID;
