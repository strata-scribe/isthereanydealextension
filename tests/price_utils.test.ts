import { describe, it, expect } from 'vitest';
import { formatCurrency, calculateDiscountPercentage, isHistoricalLow } from '../src/utils/price_utils';

describe('Price Utils', () => {
  describe('formatCurrency', () => {
    it('formats USD correctly', () => {
      expect(formatCurrency(10.5)).toBe('$10.50');
      expect(formatCurrency(0)).toBe('$0.00');
      expect(formatCurrency(1000)).toBe('$1,000.00');
    });

    it('formats other currencies correctly', () => {
      expect(formatCurrency(10.5, 'EUR')).toBe('€10.50');
      expect(formatCurrency(1000, 'JPY')).toBe('¥1,000');
      expect(formatCurrency(10.5, 'GBP')).toBe('£10.50');
    });
  });

  describe('calculateDiscountPercentage', () => {
    it('calculates discount correctly', () => {
      expect(calculateDiscountPercentage(100, 80)).toBe(20);
      expect(calculateDiscountPercentage(50, 25)).toBe(50);
      expect(calculateDiscountPercentage(19.99, 9.99)).toBe(50);
      expect(calculateDiscountPercentage(10.5, 9.45)).toBe(10);
    });

    it('returns 0 if current price is >= original price', () => {
      expect(calculateDiscountPercentage(100, 100)).toBe(0);
      expect(calculateDiscountPercentage(100, 110)).toBe(0);
    });

    it('returns 0 if original price is <= 0', () => {
      expect(calculateDiscountPercentage(0, 0)).toBe(0);
      expect(calculateDiscountPercentage(-10, 5)).toBe(0);
    });

    it('handles 100% discount', () => {
      expect(calculateDiscountPercentage(100, 0)).toBe(100);
    });
  });

  describe('isHistoricalLow', () => {
    it('returns true if current price is < historical low', () => {
      expect(isHistoricalLow(10, 15)).toBe(true);
    });

    it('returns true if current price is == historical low', () => {
      expect(isHistoricalLow(10, 10)).toBe(true);
    });

    it('returns false if current price is > historical low', () => {
      expect(isHistoricalLow(15, 10)).toBe(false);
    });
  });
});
