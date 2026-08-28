import { drizzle } from "drizzle-orm/d1";

import * as schema from "../database/schemas";

export {
    sql, eq, and, or, gt, lt, gte, lte, ne, like, ilike, inArray, notInArray, exists, notExists, desc, asc,
} from "drizzle-orm";

export const tables = schema;

export function useDrizzle()
{
    return drizzle(hubDatabase(), { schema });
}

// Types are now exported from the schemas index
export type {
    Account, InsertAccount, QueryId, AccountHash,
    Badge, InsertBadge, BadgeId,
    SubmittedBadge, InsertSubmittedBadge, SubmissionId, SubmissionStatus,
    HomepagePlacement, InsertHomepagePlacement, PlacementId,
} from "../database/schemas";
