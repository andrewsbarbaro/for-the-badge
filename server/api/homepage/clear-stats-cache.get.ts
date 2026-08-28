import { defineEventHandler } from "h3";
import { requireAuth } from "../../utils/auth";

export default defineEventHandler(async (event) =>
{
    await requireAuth(event);
    const kv = hubKV();
    await kv.del("stats:cf:v1");
    return { cleared: true };
});
