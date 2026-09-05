import React, { useState } from 'react';

interface VoucherCardProps {
  voucher: string;
}

const VoucherCard: React.FC<VoucherCardProps> = ({ voucher }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(voucher);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Hide toast after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const styles = {
    container: {
      position: 'relative' as const,
      display: 'inline-block',
      marginRight: '8px',
      marginBottom: '4px',
    },
    button: {
      backgroundColor: '#e3f2fd',
      color: '#1976d2',
      border: '1px solid #90caf9',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      outline: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    toast: {
      position: 'absolute' as const,
      bottom: '100%',
      left: '50%',
      transform: 'translateX(-50%) translateY(-4px)',
      backgroundColor: '#333',
      color: '#fff',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '11px',
      whiteSpace: 'nowrap' as const,
      opacity: copied ? 1 : 0,
      visibility: copied ? 'visible' as const : 'hidden' as const,
      transition: 'opacity 0.2s ease, transform 0.2s ease',
      pointerEvents: 'none' as const,
      zIndex: 10,
    }
  };

  return (
    <div style={styles.container}>
      <button
        style={styles.button}
        onClick={handleCopy}
        title="Click to copy voucher code"
      >
        <span>{voucher}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      </button>
      <div style={styles.toast}>
        Copied!
      </div>
    </div>
  );
};

export default VoucherCard;
