import { createHash, randomBytes, createCipheriv, createDecipheriv } from "node:crypto";

/**
 * AES-256-CBC encryption utilities for refund reasons.
 *
 * We derive a domain-separated key from BADGE_ENCRYPTION_KEY to avoid introducing
 * additional environment variables.
 */

const ALGORITHM = "aes-256-cbc";
const IV_LENGTH = 16;

/**
 * Derive an encryption key for refund reasons.
 * We intentionally do NOT introduce a separate REFUND_* env var; instead we
 * derive a dedicated key from BADGE_ENCRYPTION_KEY.
 */
function getRefundEncryptionKey() : Buffer
{
    const config = useRuntimeConfig();
    const baseKey = getRuntimeSecret(config.badgeEncryptionKey, "BADGE_ENCRYPTION_KEY");
    if (!baseKey)
    {
        throw new Error("BADGE_ENCRYPTION_KEY environment variable is required");
    }

    const baseKeyBuffer = Buffer.from(baseKey, "base64");

    // Domain-separated derivation to avoid key reuse across data types.
    return createHash("sha256")
        .update("ftb:refund-reason:")
        .update(baseKeyBuffer)
        .digest();
}

/**
 * Encrypts a refund reason using AES-256-CBC
 * @param plaintext The reason text to encrypt
 * @returns Encrypted string in format: iv:ciphertext (both base64 encoded)
 */
export function encryptRefundReason(plaintext : string) : string
{
    if (!plaintext || plaintext.trim().length === 0)
    {
        throw new Error("Cannot encrypt empty refund reason");
    }

    const key = getRefundEncryptionKey();

    // Generate random IV for this encryption
    const iv = randomBytes(IV_LENGTH);

    // Create cipher with algorithm, key, and IV
    const cipher = createCipheriv(ALGORITHM, key, iv);

    // Encrypt the plaintext
    let ciphertext = cipher.update(plaintext, "utf8", "base64");
    ciphertext += cipher.final("base64");

    // Return combined format: iv:ciphertext
    return [
        iv.toString("base64"),
        ciphertext,
    ].join(":");
}

/**
 * Decrypts a refund reason that was encrypted with encryptRefundReason
 * @param encrypted The encrypted string in format: iv:ciphertext
 * @returns The decrypted plaintext reason
 */
export function decryptRefundReason(encrypted : string) : string
{
    if (!encrypted || encrypted.trim().length === 0)
    {
        throw new Error("Cannot decrypt empty encrypted data");
    }

    const key = getRefundEncryptionKey();

    // Parse the encrypted format
    const parts = encrypted.split(":");
    if (parts.length !== 2)
    {
        throw new Error("Invalid encrypted refund reason format");
    }

    const [ivB64, ciphertext] = parts;

    try
    {
        // Convert IV from base64
        const iv = Buffer.from(ivB64, "base64");

        // Validate IV length
        if (iv.length !== IV_LENGTH)
        {
            throw new Error("Invalid IV length");
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
        throw new Error("Failed to decrypt refund reason");
    }
}

/**
 * Validates that a refund reason is safe to store
 * Checks for potentially sensitive information patterns
 */
export function validateRefundReason(reason : string) : { isValid: boolean; errors: string[] }
{
    const errors : string[] = [];

    if (!reason)
    {
        return { isValid: true, errors: [] }; // Empty is allowed
    }

    // Trim and check length
    const trimmed = reason.trim();
    if (trimmed.length > 1000)
    {
        errors.push("Refund reason must be 1000 characters or less");
    }

    // Check for potentially sensitive patterns (basic detection)
    const sensitivePatterns = [
        /\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/, // Credit card patterns
        /\b\d{3}[-\s]?\d{2}[-\s]?\d{4}\b/, // SSN patterns
        /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/, // Email patterns
        /\b\+?1?[-.\s]?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}\b/, // Phone patterns
        /\b(?:\d{1,3}\.){3}\d{1,3}\b/, // IP address patterns
    ];

    for (const pattern of sensitivePatterns)
    {
        if (pattern.test(trimmed))
        {
            errors.push("Refund reason appears to contain sensitive information. Please remove any personal identifiers, contact information, or account details.");
            break; // Only show this error once
        }
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
}