import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

const SteamBanner = ({ appId }: { appId: string }) => {
  const [bestPriceInfo, setBestPriceInfo] = useState<{ price: string; store: string } | null>(null);

  useEffect(() => {
    chrome.runtime.sendMessage({ action: 'getBestPrice', appId }, (response) => {
      if (response) {
        setBestPriceInfo(response);
      }
    });
  }, [appId]);

  if (!bestPriceInfo) {
    return (
      <div style={{
        padding: '10px',
        marginBottom: '10px',
        backgroundColor: '#1a1a1a',
        border: '1px solid #333',
        color: '#fff',
        borderRadius: '3px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        Loading best price...
      </div>
    );
  }

  return (
    <div style={{
      padding: '10px',
      marginBottom: '10px',
      backgroundColor: '#1a1a1a',
      border: '1px solid #333',
      color: '#fff',
      borderRadius: '3px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <span>
        Best Price: <strong style={{ color: '#66c0f4' }}>{bestPriceInfo.price}</strong> at {bestPriceInfo.store}
      </span>
      <a
        href={`https://isthereanydeal.com/steam/app/${appId}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: '#c6d4df',
          textDecoration: 'none',
          backgroundColor: 'rgba( 103, 193, 245, 0.2 )',
          padding: '2px 8px',
          borderRadius: '2px'
        }}
      >
        View on ITAD
      </a>
    </div>
  );
};

function injectBanner() {
  const isSteamStore = window.location.href.includes('store.steampowered.com/app/');
  if (!isSteamStore) return;

  const match = window.location.pathname.match(/\/app\/(\d+)/);
  if (!match) return;

  const appId = match[1];

  // Try to find the purchase container, otherwise inject at top of the page
  const purchaseContainer = document.querySelector('.game_area_purchase_game, #game_area_purchase');

  if (purchaseContainer && purchaseContainer.parentNode) {
    const container = document.createElement('div');
    container.id = 'itad-gfn-banner';
    purchaseContainer.parentNode.insertBefore(container, purchaseContainer);

    const root = createRoot(container);
    root.render(<SteamBanner appId={appId} />);
  } else {
    console.log('Could not find purchase container, injecting at body start');
    const container = document.createElement('div');
    container.id = 'itad-gfn-banner';
    document.body.prepend(container);

    const root = createRoot(container);
    root.render(<SteamBanner appId={appId} />);
  }
}

injectBanner();
