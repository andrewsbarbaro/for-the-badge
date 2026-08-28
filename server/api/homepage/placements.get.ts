import { defineEventHandler, createError } from "h3";
import { eq } from "drizzle-orm";
import { useDrizzle, tables } from "../../utils/drizzle";
import { UUID } from "../../utils/uuid";

export interface PlacementData {
    id: string;
    gridX: number;
    gridY: number;
    gridWidth: number;
    gridHeight: number;
    ownerName: string;
    linkUrl: string | null;
    badgeSvg: string;
    purchasedAt: Date | null;
}

export interface GetPlacementsResponse {
    placements: PlacementData[];
    totalPixelsSold: number;
    gridCols: number;
    gridRows: number;
}

export const GRID_COLS = 125;
export const GRID_ROWS = 80;

export default defineEventHandler(async () =>
{
    try
    {
        const db = useDrizzle();

        const rows = await db
            .select()
            .from(tables.homepagePlacements)
            .where(eq(tables.homepagePlacements.status, "active"))
            .all();

        const placements: PlacementData[] = rows.map((row) => ({
            id: UUID.fromBytes(row.placementId).toString(),
            gridX: row.gridX,
            gridY: row.gridY,
            gridWidth: row.gridWidth,
            gridHeight: row.gridHeight,
            ownerName: row.ownerName,
            linkUrl: row.linkUrl,
            badgeSvg: row.badgeSvg,
            purchasedAt: row.purchasedAt,
        }));

        const totalPixelsSold = placements.reduce(
            (sum, p) => sum + p.gridWidth * p.gridHeight,
            0
        );

        return {
            placements,
            totalPixelsSold,
            gridCols: GRID_COLS,
            gridRows: GRID_ROWS,
        } as GetPlacementsResponse;
    }
    catch (error)
    {
        console.error("Error fetching homepage placements:", error);
        throw createError({
            statusCode: 500,
            statusMessage: "Internal Server Error",
            data: {
                type: "https://tools.ietf.org/html/rfc7231#section-6.6.1",
                title: "Internal Server Error",
                status: 500,
                detail: "Failed to fetch homepage placements",
            },
        });
    }
});
