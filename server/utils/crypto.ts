import crypto from "crypto";

import { argon2id } from '@noble/hashes/argon2';
import { createError } from "h3";

// OWASP recommended Argon2id configuration
const ARGON2_CONFIG = {
    m: 19456, // 19 MiB (memory in KB)
    t: 2, // 2 iterations (time)
    p: 1, // 1 degree of parallelism
    dkLen: 32, // 32 bytes output (derived key length)
    saltLen: 8, // 8 bytes salt
};

export function randomToken(bytes = 48) : string
{
    return crypto.randomBytes(bytes).toString("base64url");
}

type PepperInfo = {
    pepper: Buffer;
    configured: boolean;
};

function getLegacyPepper(): Buffer
{
    // Legacy behavior: the app historically ran with an empty pepper.
    return Buffer.alloc(0);
}

function decodePepperKey(pepperKey: string): Buffer
{
    // Prefer base64url, but tolerate base64 (e.g., openssl rand -base64 ...)
    const encoding = /[+/=]/.test(pepperKey) ? "base64" : "base64url";

    return Buffer.from(pepperKey, encoding);
}

function getPasswordPepperInfo(): PepperInfo
{
    const config = useRuntimeConfig();
    const pepperKey = getRuntimeSecret(config.passwordPepper, "PASSWORD_PEPPER");

    // If unset, Nuxt often materializes runtimeConfig keys as empty strings.
    if (!pepperKey)
    {
        return { pepper: getLegacyPepper(), configured: false };
    }

    return {
        pepper: decodePepperKey(pepperKey),
        configured: true,
    };
}

export function isPasswordPepperConfigured(): boolean
{
    return getPasswordPepperInfo().configured;
}

function getPepper(): Buffer
{
    return getPasswordPepperInfo().pepper;
}

function getAccountHmacSecret(version : number = 1) : Buffer
{
    const config = useRuntimeConfig();
    const baseSecret = getRuntimeSecret(config.accountHmacSecret, "ACCOUNT_HMAC_SECRET");
    if (!baseSecret)
    {
        throw new Error("ACCOUNT_HMAC_SECRET not configured");
    }
    // Version the secret by appending the version number
    const versionedSecret = `${baseSecret}_v${version}`;

    return Buffer.from(versionedSecret, "utf8");
}

export async function hashWithPepper(input: string, pepper: Buffer): Promise<string>
{
    try
    {
        const salt = crypto.randomBytes(ARGON2_CONFIG.saltLen);

        const hashBytes = argon2id(input, salt, {
            m: ARGON2_CONFIG.m,
            t: ARGON2_CONFIG.t,
            p: ARGON2_CONFIG.p,
            dkLen: ARGON2_CONFIG.dkLen,
            key: pepper,
        });

        // Create PHC string format for argon2id
        const saltBase64 = Buffer.from(salt).toString("base64").replace(/=+$/, "");
        const hashBase64 = Buffer.from(hashBytes).toString("base64").replace(/=+$/, "");

        return `$argon2id$v=19$m=${ARGON2_CONFIG.m},t=${ARGON2_CONFIG.t},p=${ARGON2_CONFIG.p}$${saltBase64}$${hashBase64}`;
    }
    catch
    {
        throw createError(
            {
                statusCode: 500,
                statusMessage: "Internal Server Error",
                data:
      {
          type: "https://tools.ietf.org/html/rfc7231#section-6.6.1",
          title: "Internal Server Error",
          status: 500,
          detail: "An internal error occurred while processing the request",
      },
            });
    }
}

export async function hash(input: string): Promise<string>
{
    return hashWithPepper(input, getPepper());
}

export async function verifyWithPepper(input: string, hash: string, pepper: Buffer): Promise<boolean>
{
    if (!hash)
    {
        return false;
    }

    try
    {
        // Parse PHC string format: $argon2id$v=19$m=19456,t=2,p=1$salt$hash
        const parts = hash.split("$");
        if (parts.length !== 6 || parts[1] !== "argon2id")
        {
            return false;
        }

        const params = parts[3].split(",");
        const m = parseInt(params.find(p => p.startsWith("m="))?.substring(2) || "0");
        const t = parseInt(params.find(p => p.startsWith("t="))?.substring(2) || "0");
        const p = parseInt(params.find(p => p.startsWith("p="))?.substring(2) || "0");

        const salt = Buffer.from(parts[4], "base64");
        const expectedHash = Buffer.from(parts[5], "base64");

        const computedHash = argon2id(input, salt, {
            m,
            t,
            p,
            dkLen: expectedHash.length,
            key: pepper,
        });

        return crypto.timingSafeEqual(expectedHash, Buffer.from(computedHash));
    }
    catch
    {
        return false;
    }
}

export async function verify(input: string, hash: string): Promise<boolean>
{
    return verifyWithPepper(input, hash, getPepper());
}

export async function verifyWithPepperFallback(
    input: string,
    hash: string,
): Promise<{ isValid: boolean; usedLegacyPepper: boolean }>
{
    const { pepper: activePepper, configured } = getPasswordPepperInfo();

    if (await verifyWithPepper(input, hash, activePepper))
    {
        return { isValid: true, usedLegacyPepper: false };
    }

    // Only attempt legacy fallback when a real (non-empty) pepper is configured.
    // If no pepper is configured, activePepper is already the legacy pepper.
    if (!configured)
    {
        return { isValid: false, usedLegacyPepper: false };
    }

    if (await verifyWithPepper(input, hash, getLegacyPepper()))
    {
        return { isValid: true, usedLegacyPepper: true };
    }

    return { isValid: false, usedLegacyPepper: false };
}

export function fingerprint(input : string) : string
{
    return crypto.createHash("sha256").update(input).digest("base64url");
}

/**
 * Generate HMAC-SHA-512 hash for account indexing
 * Returns the hash as a Uint8Array for storage as blob in SQLite
 */
export function generateAccountHash(userId : string, version : number = 1) : Uint8Array
{
    try
    {
        const secret = getAccountHmacSecret(version);
        const hmac = crypto.createHmac("sha512", secret);
        hmac.update(userId, "utf8");
        const buffer = hmac.digest();

        return new Uint8Array(buffer);
    }
    catch (error)
    {
        throw createError(
        {
            statusCode: 500,
            statusMessage: "Internal Server Error",
            data:
            {
                type: "https://tools.ietf.org/html/rfc7231#section-6.6.1",
                title: "Internal Server Error",
                status: 500,
                detail: "An internal error occurred while processing the request",
            },
        });
    }
}

/**
 * Verify HMAC-SHA-512 hash for account lookup
 * Compares stored hash against generated hash for given userId and version
 */
export function verifyAccountHash(userId : string, storedHash : Uint8Array | Buffer, version : number = 1) : boolean
{
    try
    {
        const expectedHash = generateAccountHash(userId, version);
        const storedUint8Array = storedHash instanceof Uint8Array ? storedHash : new Uint8Array(storedHash);

        return crypto.timingSafeEqual(storedUint8Array, expectedHash);
    }
    catch (error)
    {
        return false;
    }
}