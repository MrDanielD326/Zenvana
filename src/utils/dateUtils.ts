/**
 * Format a date to a readable string
 */
export function formatDate(date: Date | undefined): string {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
}

/**
 * Get today's date
 */
export function getToday(): Date {
    return new Date();
}

/**
 * Check if a date is valid
 */
export function isValidDate(date: unknown): date is Date {
    return date instanceof Date && !isNaN(date.getTime());
}