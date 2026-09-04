export function formatCurrency(price: number, currencyCode: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(price);
}

export function calculateDiscountPercentage(originalPrice: number, currentPrice: number): number {
  if (originalPrice <= 0) return 0;
  if (currentPrice >= originalPrice) return 0;
  const discount = ((originalPrice - currentPrice) / originalPrice) * 100;
  return Math.round(discount);
}

export function isHistoricalLow(currentPrice: number, historicalLowPrice: number): boolean {
  return currentPrice <= historicalLowPrice;
}
