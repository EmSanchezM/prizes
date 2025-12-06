import { scrypt, randomBytes, timingSafeEqual } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

/**
 * Hash a password using scrypt algorithm
 * @param password - Plain text password to hash
 * @returns Hashed password in format "salt:hash"
 */
export async function hashPassword(password: string): Promise<string> {
    const salt = randomBytes(16).toString('hex');
    const hash = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${salt}:${hash.toString('hex')}`;
}

/**
 * Compare a plain text password with a hashed password
 * @param candidatePassword - Plain text password to verify
 * @param hashedPassword - Hashed password in format "salt:hash"
 * @returns True if passwords match, false otherwise
 */
export async function comparePassword(
    candidatePassword: string,
    hashedPassword: string
): Promise<boolean> {
    try {
        const [salt, storedHash] = hashedPassword.split(':');
        const hash = (await scryptAsync(candidatePassword, salt, 64)) as Buffer;
        return timingSafeEqual(Buffer.from(storedHash, 'hex'), hash);
    } catch (e) {
        return false;
    }
}
