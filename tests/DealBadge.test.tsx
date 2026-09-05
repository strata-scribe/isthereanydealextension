import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DealBadge } from '../src/components/DealBadge';
import '@testing-library/jest-dom';

describe('DealBadge Component', () => {
  it('renders Historical Low badge when current price is less than or equal to historic low', () => {
    render(<DealBadge currentPrice={10} historicLow={10} averagePrice={20} />);
    const badge = screen.getByText('Historical Low');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveStyle({ backgroundColor: '#2ecc71' });
  });

  it('renders Good Deal badge when current price is less than average price but greater than historic low', () => {
    render(<DealBadge currentPrice={15} historicLow={10} averagePrice={20} />);
    const badge = screen.getByText('Good Deal');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveStyle({ backgroundColor: '#f39c12' });
  });

  it('renders Average Deal badge when current price is greater than or equal to average price', () => {
    render(<DealBadge currentPrice={25} historicLow={10} averagePrice={20} />);
    const badge = screen.getByText('Average Deal');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveStyle({ backgroundColor: '#e74c3c' });
  });
});
