import React from 'react';

interface DealBadgeProps {
  currentPrice: number;
  historicLow: number;
  averagePrice: number;
}

export const DealBadge: React.FC<DealBadgeProps> = ({ currentPrice, historicLow, averagePrice }) => {
  let label = '';
  let backgroundColor = '';

  if (currentPrice <= historicLow) {
    label = 'Historical Low';
    backgroundColor = '#2ecc71'; // Green
  } else if (currentPrice < averagePrice) {
    label = 'Good Deal';
    backgroundColor = '#f39c12'; // Orange
  } else {
    label = 'Average Deal';
    backgroundColor = '#e74c3c'; // Red
  }

  const badgeStyle: React.CSSProperties = {
    padding: '4px 8px',
    borderRadius: '4px',
    color: '#fff',
    backgroundColor,
    fontWeight: 'bold',
    fontSize: '0.8em',
    display: 'inline-block',
  };

  return <span style={badgeStyle}>{label}</span>;
};
