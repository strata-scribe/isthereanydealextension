import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

const Options = () => {
  const [currency, setCurrency] = useState('USD');
  const [excludedStores, setExcludedStores] = useState('');
  const [minDiscount, setMinDiscount] = useState(0);
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    chrome.storage.sync.get(
      {
        preferredCurrency: 'USD',
        excludedStores: [],
        minDiscount: 0,
      },
      (items) => {
        setCurrency(items.preferredCurrency);
        setExcludedStores(items.excludedStores.join(', '));
        setMinDiscount(items.minDiscount);
      }
    );
  }, []);

  const handleSave = () => {
    const storesArray = excludedStores
      .split(',')
      .map((store) => store.trim())
      .filter((store) => store.length > 0);

    chrome.storage.sync.set(
      {
        preferredCurrency: currency,
        excludedStores: storesArray,
        minDiscount: Number(minDiscount),
      },
      () => {
        setSaveStatus('Settings saved.');
        setTimeout(() => setSaveStatus(''), 2000);
      }
    );
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '400px' }}>
      <h2>Extension Settings</h2>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Preferred Currency:</label>
        <select value={currency} onChange={(e) => setCurrency(e.target.value)} style={{ width: '100%', padding: '5px' }}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="CAD">CAD</option>
          <option value="AUD">AUD</option>
        </select>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Excluded Stores (comma-separated):</label>
        <input
          type="text"
          value={excludedStores}
          onChange={(e) => setExcludedStores(e.target.value)}
          style={{ width: '100%', padding: '5px' }}
          placeholder="e.g. Steam, Epic Games Store"
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Minimum Discount Threshold (%):</label>
        <input
          type="number"
          value={minDiscount}
          onChange={(e) => setMinDiscount(Number(e.target.value))}
          style={{ width: '100%', padding: '5px' }}
          min="0"
          max="100"
        />
      </div>

      <button onClick={handleSave} style={{ padding: '8px 15px', cursor: 'pointer' }}>Save Options</button>

      {saveStatus && <p style={{ color: 'green', marginTop: '10px' }}>{saveStatus}</p>}
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<Options />);
