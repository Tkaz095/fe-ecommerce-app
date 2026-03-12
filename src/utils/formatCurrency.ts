/**
 * Format a numeric amount into a locale-aware currency string.
 *
 * @example formatCurrency(29.9)       → "$29.90"
 * @example formatCurrency(99, 'EUR')  → "€99.00"
 */
export function formatCurrency(
  amount: number,
  currency = 'USD',
  locale = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

/**
 * Calculate and format the percentage discount between two prices.
 *
 * @example formatDiscount(100, 75) → "-25%"
 */
export function formatDiscount(originalPrice: number, discountedPrice: number): string {
  const pct = Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
  return `-${pct}%`;
}
