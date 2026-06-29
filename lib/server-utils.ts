import { type NextRequest, NextResponse } from 'next/server';

/**
 * Validate Turnstile CAPTCHA token server-side
 */
export async function validateTurnstile(token: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  
  if (!secretKey) {
    console.error('TURNSTILE_SECRET_KEY not configured');
    return false;
  }

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret: secretKey,
        response: token,
      }),
    });

    const data = await response.json() as { success: boolean };
    return data.success;
  } catch (error) {
    console.error('Turnstile validation error:', error);
    return false;
  }
}

/**
 * Generate timestamp for backups
 */
export function getBackupTimestamp(): string {
  return new Date().toISOString().replace(/[:.]/g, '-');
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Sanitize and validate text input
 */
export function sanitizeInput(input: string, maxLength: number = 500): string {
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/[<>]/g, '');
}

/**
 * Validate file type and size
 */
export function validateFile(
  file: File,
  allowedTypes: string[],
  maxSizeMB: number = 10
): { valid: boolean; error?: string } {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  if (file.size > maxSizeBytes) {
    return {
      valid: false,
      error: `File size exceeds ${maxSizeMB}MB limit`,
    };
  }

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `File type not allowed. Allowed types: ${allowedTypes.join(', ')}`,
    };
  }

  return { valid: true };
}

/**
 * Create proper Content Security Policy header
 */
export function getCSPHeader(): string {
  return `
    default-src 'self';
    script-src 'self' https://challenges.cloudflare.com https://cdn.jsdelivr.net;
    style-src 'self' 'unsafe-inline';
    img-src 'self' https: data:;
    media-src 'self' https:;
    font-src 'self' https:;
    connect-src 'self' https://challenges.cloudflare.com https://cdn.vidhyalakshmi.cus.firrham.com;
  `.replace(/\n/g, ' ').trim();
}

export type ValidationResult<T> = {
  valid: boolean;
  data?: T;
  errors?: Record<string, string>;
};
