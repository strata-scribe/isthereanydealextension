import { describe, it, expect } from 'vitest';
import { formatCurrency, convertCurrency, FALLBACK_EXCHANGE_RATES } from '../src/utils/currency';

describe('currency utils', () => {
  describe('formatCurrency', () => {
    it('formats USD correctly', () => {
      expect(formatCurrency(10.5, 'USD')).toBe('$10.50');
    });

    it('formats EUR correctly', () => {
      // Intl.NumberFormat behavior for en-US formatting EUR places the symbol at the front
      expect(formatCurrency(10.5, 'EUR')).toBe('€10.50');
    });

    it('formats GBP correctly', () => {
      expect(formatCurrency(10.5, 'GBP')).toBe('£10.50');
    });

    it('formats CAD correctly', () => {
      // Intl.NumberFormat might output CA$ or $ depending on node version but usually CA$ or $ for en-US
      // A more robust check might just check for numeric values or exact matches. Let's use generic match or exact if known.
      const formatted = formatCurrency(10.5, 'CAD');
      expect(formatted).toMatch(/10\.50/);
      // Usually it's "CA$10.50"
    });

    it('formats JPY correctly', () => {
      // JPY doesn't typically have decimal places in formatting
      expect(formatCurrency(1000, 'JPY')).toBe('¥1,000');
    });

    it('defaults to USD if no currency provided', () => {
      expect(formatCurrency(10.5)).toBe('$10.50');
    });
  });

  describe('convertCurrency', () => {
    it('converts USD to EUR using fallback rates', () => {
      const amount = 100;
      // 100 / 1.0 * 0.9 = 90
      expect(convertCurrency(amount, 'USD', 'EUR')).toBeCloseTo(90);
    });

    it('converts EUR to USD using fallback rates', () => {
      const amount = 90;
      // 90 / 0.9 * 1.0 = 100
      expect(convertCurrency(amount, 'EUR', 'USD')).toBeCloseTo(100);
    });

    it('converts GBP to JPY using fallback rates', () => {
      const amount = 10;
      // 10 / 0.8 * 150 = 1875
      expect(convertCurrency(amount, 'GBP', 'JPY')).toBeCloseTo(1875);
    });

    it('converts using custom rates', () => {
      const customRates = {
        USD: 1.0,
        EUR: 0.8,
      };
      const amount = 100;
      // 100 / 1.0 * 0.8 = 80
      expect(convertCurrency(amount, 'USD', 'EUR', customRates)).toBeCloseTo(80);
    });

    it('throws error if fromCurrency rate is missing', () => {
      expect(() => convertCurrency(100, 'XXX', 'USD')).toThrow('Exchange rate not found for XXX');
    });

    it('throws error if toCurrency rate is missing', () => {
      expect(() => convertCurrency(100, 'USD', 'XXX')).toThrow('Exchange rate not found for XXX');
    });
  });
});
