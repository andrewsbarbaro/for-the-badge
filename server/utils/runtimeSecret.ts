/**
 * Reads a server secret, preferring the baked runtimeConfig value and falling
 * back to the Cloudflare Worker binding (exposed via process.env) at request
 * time.
 *
 * runtimeConfig values are baked into the bundle at build time, while Worker
 * secrets (`wrangler secret put`) only exist in the runtime environment. If a
 * build runs on a machine without the variable exported, the baked value is an
 * empty string and the secret silently "disappears" in production. The env
 * fallback makes deployments work regardless of the build machine's env.
 */
export function getRuntimeSecret(configValue: unknown, envName: string) : string
{
    if (typeof configValue === "string" && configValue)
    {
        return configValue;
    }

    const fromEnv = process.env[envName];
    return typeof fromEnv === "string" ? fromEnv : "";
}
