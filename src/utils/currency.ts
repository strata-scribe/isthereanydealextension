export const FALLBACK_EXCHANGE_RATES: Record<string, number> = {
  USD: 1.0,
  EUR: 0.9,
  GBP: 0.8,
  CAD: 1.35,
  JPY: 150.0,
};

export function formatCurrency(price: number, currencyCode: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(price);
}

export function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  rates: Record<string, number> = FALLBACK_EXCHANGE_RATES
): number {
  const fromRate = rates[fromCurrency];
  const toRate = rates[toCurrency];

  if (!fromRate || !toRate) {
    throw new Error(`Exchange rate not found for ${!fromRate ? fromCurrency : toCurrency}`);
  }

  // Convert to base (USD equivalent) then to target currency
  const amountInBase = amount / fromRate;
  return amountInBase * toRate;
}
