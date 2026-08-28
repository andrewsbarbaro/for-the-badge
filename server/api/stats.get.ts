import { defineEventHandler } from "h3";
import { eq } from "drizzle-orm";
import { useDrizzle, tables } from "../utils/drizzle";

const CF_GRAPHQL = "https://api.cloudflare.com/client/v4/graphql";
const CACHE_KEY = "stats:cf:v3";
const CACHE_TTL_SECONDS = 3600; // 1 hour

interface CfStats {
    totalRequests: number;
    uniqueVisitors: number;
    countries: number;
    cachedAt: number;
}

async function fetchCloudflareStats(apiToken: string, zoneId: string): Promise<CfStats>
{
    const until = new Date();
    const since = new Date(until);
    since.setDate(since.getDate() - 30);

    const fmt = (d: Date) => d.toISOString().slice(0, 10);

    const query = `
    {
      viewer {
        zones(filter: {zoneTag: "${zoneId}"}) {
          httpRequests1dGroups(
            limit: 30,
            filter: {date_geq: "${fmt(since)}", date_lt: "${fmt(until)}"}
          ) {
            sum {
              requests
              countryMap { clientCountryName requests }
            }
            uniq { uniques }
          }
        }
      }
    }`;

    const res = await fetch(CF_GRAPHQL, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
    });

    const rawText = await res.text();
    if (!res.ok) throw new Error(`Cloudflare API ${res.status}: ${rawText.slice(0, 300)}`);

    let json: any;
    try { json = JSON.parse(rawText); }
    catch { throw new Error(`CF API non-JSON response: ${rawText.slice(0, 300)}`); }

    if (json.errors?.length) throw new Error(`CF GraphQL error: ${JSON.stringify(json.errors[0])}`);

    const groups = json?.data?.viewer?.zones?.[0]?.httpRequests1dGroups ?? [];

    let totalRequests = 0;
    let uniqueVisitors = 0;
    const countrySet = new Set<string>();

    for (const g of groups)
    {
        totalRequests += g.sum?.requests ?? 0;
        uniqueVisitors += g.uniq?.uniques ?? 0;
        for (const c of g.sum?.countryMap ?? [])
        {
            if (c.clientCountryName) countrySet.add(c.clientCountryName);
        }
    }

    return {
        totalRequests,
        uniqueVisitors,
        countries: countrySet.size,
        cachedAt: Date.now(),
    };
}

export default defineEventHandler(async () =>
{
    const config = useRuntimeConfig();
    const kv = hubKV();
    const db = useDrizzle();


    // Pixel count from DB (always fresh)
    const activePlacements = await db
        .select({ pixelCount: tables.homepagePlacements.pixelCount })
        .from(tables.homepagePlacements)
        .where(eq(tables.homepagePlacements.status, "active"))
        .all();
    const pixelsSold = activePlacements.reduce((s, p) => s + p.pixelCount, 0);

    // CF stats — try cache first
    let cfStats: CfStats | null = null;

    try
    {
        const cached = await kv.get<CfStats>(CACHE_KEY);
        if (cached && (Date.now() - cached.cachedAt) < CACHE_TTL_SECONDS * 1000)
        {
            cfStats = cached;
        }
        else if (config.cloudflareApiToken && config.cloudflareZoneId)
        {
            cfStats = await fetchCloudflareStats(config.cloudflareApiToken, config.cloudflareZoneId);
            await kv.set(CACHE_KEY, cfStats, { ttl: CACHE_TTL_SECONDS });
        }
    }
    catch (err: any)
    {
        console.error("CF stats fetch error:", err?.message || err);
    }

    return {
        totalRequests: cfStats?.totalRequests ?? 0,
        uniqueVisitors: cfStats?.uniqueVisitors ?? 0,
        countries: cfStats?.countries ?? 0,
        pixelsSold,
        totalPixels: 125 * 80,
    };
});
