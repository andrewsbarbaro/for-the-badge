import { defineEventHandler, createError, readBody } from "h3";
import { useServerStripe } from "#stripe/server";
import { eq } from "drizzle-orm";
import { useDrizzle, tables } from "../../utils/drizzle";
import { UUID } from "../../utils/uuid";
import { GRID_COLS, GRID_ROWS } from "./placements.get";

// $1 per pixel (grid cell)
const PRICE_PER_PIXEL_CENTS = 100;

function pixelsToCents(pixelCount: number): number {
    return pixelCount * PRICE_PER_PIXEL_CENTS;
}

interface CheckoutBody {
    gridX: number;
    gridY: number;
    gridWidth: number;
    gridHeight: number;
    ownerName: string;
    linkUrl?: string;
    badgeSvg: string;
    successUrl: string;
    cancelUrl: string;
}

function rectanglesOverlap(
    ax: number, ay: number, aw: number, ah: number,
    bx: number, by: number, bw: number, bh: number
): boolean
{
    return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
}

export default defineEventHandler(async (event) =>
{
    const body = await readBody<CheckoutBody>(event);

    const { gridX, gridY, gridWidth, gridHeight, ownerName, linkUrl, badgeSvg, successUrl, cancelUrl } = body;

    // Validate coordinates and dimensions
    if (
        typeof gridX !== "number" || typeof gridY !== "number" ||
        typeof gridWidth !== "number" || typeof gridHeight !== "number"
    )
    {
        throw createError({ statusCode: 400, statusMessage: "Invalid grid coordinates" });
    }

    if (gridX < 0 || gridY < 0 || gridX + gridWidth > GRID_COLS || gridY + gridHeight > GRID_ROWS)
    {
        throw createError({ statusCode: 400, statusMessage: "Grid coordinates out of bounds" });
    }

    const pixelCount = gridWidth * gridHeight;

    if (!ownerName?.trim())
    {
        throw createError({ statusCode: 400, statusMessage: "Owner name is required" });
    }

    if (!badgeSvg?.trim())
    {
        throw createError({ statusCode: 400, statusMessage: "Badge SVG is required" });
    }

    // Check for overlap with existing active placements
    const db = useDrizzle();
    const existing = await db
        .select({
            gridX: tables.homepagePlacements.gridX,
            gridY: tables.homepagePlacements.gridY,
            gridWidth: tables.homepagePlacements.gridWidth,
            gridHeight: tables.homepagePlacements.gridHeight,
        })
        .from(tables.homepagePlacements)
        .where(eq(tables.homepagePlacements.status, "active"))
        .all();

    for (const p of existing)
    {
        if (rectanglesOverlap(gridX, gridY, gridWidth, gridHeight, p.gridX, p.gridY, p.gridWidth, p.gridHeight))
        {
            throw createError({ statusCode: 409, statusMessage: "Selected area overlaps with an existing placement" });
        }
    }

    const amountCents = pixelsToCents(pixelCount);

    // Add ownership watermark to SVG
    const placementId = UUID.createV7();
    const watermarkedSvg = badgeSvg.replace(
        "<svg",
        `<svg data-ftb-placement="${placementId.toString()}" data-ftb-owner="${ownerName.trim().replace(/"/g, "&quot;")}"`,
    );

    // If the buyer is logged in, link the placement to their account so they can manage it later.
    const auth = event.context.auth;
    const ownerQueryId = auth?.isAuthenticated && auth.account?.queryId
        ? auth.account.queryId.getBytes()
        : null;

    // Create pending placement record
    await db.insert(tables.homepagePlacements).values({
        placementId: placementId.getBytes() as any,
        gridX,
        gridY,
        gridWidth,
        gridHeight,
        ownerName: ownerName.trim(),
        linkUrl: linkUrl?.trim() || null,
        badgeSvg: watermarkedSvg,
        amountPaidCents: amountCents,
        pixelCount,
        status: "pending",
        ownerQueryId: ownerQueryId as any,
    });

    const placementIdStr = placementId.toString();

    // Create Stripe checkout session — useServerStripe reads runtimeConfig.stripe.key
    // which the @unlok-co/nuxt-stripe module wires from nuxt.config.ts stripe.server.key
    const config = useRuntimeConfig();
    const stripe = await useServerStripe(event);

    const session = await stripe.checkout.sessions.create({
        // Managed Payments requires a product tax code we haven't set —
        // disable it per-session to use standard Checkout instead.
        managed_payments: { enabled: false },
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product: config.stripeProductId,
                    unit_amount: amountCents,
                },
                quantity: 1,
            },
        ],
        mode: "payment",
        allow_promotion_codes: true,
        success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}&placement_id=${placementIdStr}`,
        cancel_url: cancelUrl,
        metadata: {
            placement_id: placementIdStr,
            grid_x: String(gridX),
            grid_y: String(gridY),
            grid_width: String(gridWidth),
            grid_height: String(gridHeight),
            owner_name: ownerName.trim(),
        },
    });

    // Store session ID on the pending placement
    await db
        .update(tables.homepagePlacements)
        .set({ stripeSessionId: session.id })
        .where(eq(tables.homepagePlacements.placementId, placementId.getBytes() as any));

    return { checkoutUrl: session.url, sessionId: session.id, placementId: placementIdStr };
});
