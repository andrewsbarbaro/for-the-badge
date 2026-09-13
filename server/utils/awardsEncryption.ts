import { createHash, randomBytes, createCipheriv, createDecipheriv } from "node:crypto";

/**
 * AES-256-CBC encryption utilities for developer awards data
 * Uses a separate encryption key for data isolation
 */

const ALGORITHM = "aes-256-cbc";
const IV_LENGTH = 16;
const KEY_LENGTH = 32;

/**
 * Get the encryption key for awards data from runtime config
 * This should be different from other application secrets
 */
function getAwardsEncryptionKey(): Buffer {
    const config = useRuntimeConfig();
    const key = getRuntimeSecret(config.badgeEncryptionKey, "BADGE_ENCRYPTION_KEY"); // Reuse the same encryption key infrastructure
    if (!key) {
        throw new Error("BADGE_ENCRYPTION_KEY environment variable is required");
    }

    // Convert base64 key to buffer and ensure it's 32 bytes for AES-256
    const keyBuffer = Buffer.from(key, "base64");

    // If key is not 32 bytes, derive a 32-byte key using SHA-256
    if (keyBuffer.length !== KEY_LENGTH) {
        return createHash("sha256").update(keyBuffer).digest();
    }

    return keyBuffer;
}

/**
 * Encrypts awards data using AES-256-CBC
 * @param plaintext The data to encrypt
 * @returns Encrypted string in format: iv:ciphertext (both base64 encoded)
 */
export function encryptAwardsData(plaintext: string): string {
    if (!plaintext || plaintext.trim().length === 0) {
        throw new Error("Cannot encrypt empty awards data");
    }

    const key = getAwardsEncryptionKey();

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
 * Decrypts awards data that was encrypted with encryptAwardsData
 * @param encrypted The encrypted string in format: iv:ciphertext
 * @returns The decrypted plaintext data
 */
export function decryptAwardsData(encrypted: string): string {
    if (!encrypted || encrypted.trim().length === 0) {
        throw new Error("Cannot decrypt empty encrypted data");
    }

    const key = getAwardsEncryptionKey();

    // Parse the encrypted format
    const parts = encrypted.split(":");
    if (parts.length !== 2) {
        throw new Error(`Invalid encrypted awards data format: expected 2 parts, got ${parts.length}. Length: ${encrypted.length}`);
    }

    const [ivB64, ciphertext] = parts;

    try {
        // Convert IV from base64
        const iv = Buffer.from(ivB64, "base64");

        // Validate IV length
        if (iv.length !== IV_LENGTH) {
            throw new Error(`Invalid IV length: expected ${IV_LENGTH}, got ${iv.length}`);
        }

        // Create decipher
        const decipher = createDecipheriv(ALGORITHM, key, iv);

        // Decrypt
        let plaintext = decipher.update(ciphertext, "base64", "utf8");
        plaintext += decipher.final("utf8");

        return plaintext;
    } catch (error) {
        const errorMsg = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to decrypt awards data: ${errorMsg}`);
    }
}
