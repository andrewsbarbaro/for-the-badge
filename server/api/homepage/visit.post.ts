import { defineEventHandler, getHeader } from "h3";

export default defineEventHandler(async (event) =>
{
    try
    {
        const kv = hubKV();
        const country = getHeader(event, "cf-ipcountry") || "XX";

        // Increment total visit counter atomically
        const current = await kv.get<number>("stats:visits:total") ?? 0;
        await kv.set("stats:visits:total", current + 1);

        // Track unique countries (stored as a comma-separated string for simplicity)
        const existing = await kv.get<string>("stats:countries") ?? "";
        const countries = new Set(existing ? existing.split(",") : []);
        if (country && country !== "XX")
        {
            countries.add(country);
            await kv.set("stats:countries", [...countries].join(","));
        }
    }
    catch
    {
        // Fire-and-forget — never fail the client
    }

    return { ok: true };
});
