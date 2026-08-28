import { createHash, randomBytes, createCipheriv, createDecipheriv } from "node:crypto";

/**
 * AES-256-CBC encryption utilities for badge data
 * Uses a separate encryption key from other application secrets for data isolation
 */

const ALGORITHM = "aes-256-cbc";
const IV_LENGTH = 16;
const KEY_LENGTH = 32;

/**
 * Get the encryption key for badge data from runtime config
 * This should be different from other application secrets
 */
function getBadgeEncryptionKey() : Buffer
{
    const config = useRuntimeConfig();
    const key = config.badgeEncryptionKey || process.env.BADGE_ENCRYPTION_KEY;
    if (!key)
    {
        throw new Error("BADGE_ENCRYPTION_KEY environment variable is required");
    }

    // Convert base64 key to buffer and ensure it's 32 bytes for AES-256
    const keyBuffer = Buffer.from(key, "base64");

    // If key is not 32 bytes, derive a 32-byte key using SHA-256
    if (keyBuffer.length !== KEY_LENGTH)
    {
        return createHash("sha256").update(keyBuffer).digest();
    }

    return keyBuffer;
}

/**
 * Encrypts badge data using AES-256-CBC
 * @param plaintext The data to encrypt
 * @returns Encrypted string in format: iv:ciphertext (both base64 encoded)
 */
export function encryptBadgeData(plaintext : string) : string
{
    if (!plaintext || plaintext.trim().length === 0)
    {
        throw new Error("Cannot encrypt empty badge data");
    }

    const key = getBadgeEncryptionKey();

    // Generate random IV for this encryption
    const iv = randomBytes(IV_LENGTH);

    // Create cipher with algorithm, key, and IV
    const cipher = createCipheriv(ALGORITHM, key, iv);

    // Encrypt the plaintext - use Buffer to avoid base64 concatenation issues
    const ciphertextBuffer = Buffer.concat([
        cipher.update(plaintext, "utf8"),
        cipher.final(),
    ]);

    // Return combined format: iv:ciphertext (both base64 encoded)
    return [
        iv.toString("base64"),
        ciphertextBuffer.toString("base64"),
    ].join(":");
}

/**
 * Decrypts badge data that was encrypted with encryptBadgeData
 * @param encrypted The encrypted string in format: iv:ciphertext
 * @returns The decrypted plaintext data
 */
export function decryptBadgeData(encrypted : string) : string
{
    if (!encrypted || encrypted.trim().length === 0)
    {
        throw new Error("Cannot decrypt empty encrypted data");
    }

    const key = getBadgeEncryptionKey();

    // Parse the encrypted format
    const parts = encrypted.split(":");
    if (parts.length !== 2)
    {
        throw new Error(`Invalid encrypted badge data format: expected 2 parts, got ${parts.length}. Length: ${encrypted.length}`);
    }

    const [ivB64, ciphertext] = parts;

    try
    {
        // Convert IV from base64
        const iv = Buffer.from(ivB64, "base64");

        // Validate IV length
        if (iv.length !== IV_LENGTH)
        {
            throw new Error(`Invalid IV length: expected ${IV_LENGTH}, got ${iv.length}`);
        }

        // Create decipher
        const decipher = createDecipheriv(ALGORITHM, key, iv);

        // Decrypt
        let plaintext = decipher.update(ciphertext, "base64", "utf8");
        plaintext += decipher.final("utf8");

        return plaintext;
    }
    catch (error)
    {
        const errorMsg = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to decrypt badge data: ${errorMsg}`);
    }
}

/**
 * Validates badge name and description
 */
export function validateBadgeMetadata(name : string, description ?: string) : { isValid : boolean; errors : string[] }
{
    const errors : string[] = [];

    if (!name || name.trim().length === 0)
    {
        errors.push("Badge name is required");
    }
    else if (name.trim().length > 100)
    {
        errors.push("Badge name must be 100 characters or less");
    }

    if (description && description.trim().length > 500)
    {
        errors.push("Badge description must be 500 characters or less");
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
}