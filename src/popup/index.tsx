import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

export const Popup = ({ initialData }: { initialData?: any }) => {
  // Using some mock data for demonstration
  const [data, setData] = useState(initialData || {
    historicalLow: 14.99,
    bestPrice: 19.99,
    discountPercent: 50,
    vouchers: ['SAVE20', 'WINTERSALE'],
    loading: false
  });

  const [copiedVoucher, setCopiedVoucher] = useState<string | null>(null);

  const handleCopy = (voucher: string) => {
    navigator.clipboard.writeText(voucher).then(() => {
      setCopiedVoucher(voucher);
      setTimeout(() => setCopiedVoucher(null), 2000);
    });
  };

  const styles = {
    container: {
      width: '300px',
      padding: '16px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: '#333',
      backgroundColor: '#f9f9f9',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    },
    header: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '16px',
      borderBottom: '1px solid #ccc',
      paddingBottom: '8px',
      textAlign: 'center' as const
    },
    item: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '12px',
      fontSize: '14px'
    },
    label: {
      fontWeight: '600',
      color: '#555'
    },
    value: {
      fontWeight: 'bold',
      color: '#1a1a1a'
    },
    highlight: {
      color: '#e53935',
      fontWeight: 'bold'
    },
    discount: {
      backgroundColor: '#4caf50',
      color: 'white',
      padding: '2px 6px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: 'bold'
    },
    voucherContainer: {
      marginTop: '16px',
      padding: '12px',
      backgroundColor: '#fff',
      borderRadius: '6px',
      border: '1px dashed #aaa'
    },
    voucherTitle: {
      fontSize: '13px',
      fontWeight: '600',
      marginBottom: '8px',
      color: '#666'
    },
    voucherTag: {
      display: 'inline-block',
      backgroundColor: '#e3f2fd',
      color: '#1976d2',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '12px',
      marginRight: '8px',
      marginBottom: '4px',
      fontWeight: 'bold'
    }
  };

  if (data.loading) {
    return <div style={{ ...styles.container, textAlign: 'center' }}>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>Game Deals</div>

      <div style={styles.item}>
        <span style={styles.label}>Best Current Price:</span>
        <span style={styles.value}>${data.bestPrice.toFixed(2)}</span>
      </div>

      <div style={styles.item}>
        <span style={styles.label}>Historical Low:</span>
        <span style={styles.highlight}>${data.historicalLow.toFixed(2)}</span>
      </div>

      <div style={styles.item}>
        <span style={styles.label}>Discount:</span>
        <span style={styles.discount}>-{data.discountPercent}%</span>
      </div>

      {data.vouchers && data.vouchers.length > 0 && (
        <div style={styles.voucherContainer}>
          <div style={styles.voucherTitle}>Available Vouchers:</div>
          <div>
            {data.vouchers.map((voucher: string, index: number) => (
              <div key={index} style={{ display: 'inline-block', marginRight: '8px', marginBottom: '4px' }}>
                <span style={{ ...styles.voucherTag, marginRight: '4px', marginBottom: '0' }}>{voucher}</span>
                <button
                  onClick={() => handleCopy(voucher)}
                  style={{
                    backgroundColor: '#e0e0e0',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '2px 6px',
                    fontSize: '11px',
                    cursor: 'pointer'
                  }}
                >
                  {copiedVoucher === voucher ? 'Copied!' : 'Copy'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(<Popup />);
}