import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock chrome API is now handled by tests/setup.ts

// Import the function to test
global.fetch = vi.fn();

describe('Background Script - Data Acquisition', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch data from curator URLs and extract AppIDs', async () => {
    const mockHtml = '<html><body><div class="recommendation" data-ds-appid="12345"></div><div class="recommendation" data-ds-appid="67890"></div></body></html>';
    (global.fetch as any).mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(mockHtml),
    });

    const { fetchAndStoreGfnGames } = await import('../src/background/logic');
    
    await fetchAndStoreGfnGames(['https://mock-curator-url']);

    expect(global.fetch).toHaveBeenCalledWith('https://mock-curator-url');
    expect(chrome.storage.local.set).toHaveBeenCalledWith(
      expect.objectContaining({
        gfn_appids: [12345, 67890],
        last_updated: expect.any(String),
      }),
      expect.any(Function)
    );
  });

  it('should handle fetch errors gracefully', async () => {
    (global.fetch as any).mockRejectedValue(new Error('Fetch failed'));
    
    const { fetchAndStoreGfnGames } = await import('../src/background/logic');
    const result = await fetchAndStoreGfnGames(['https://bad-url']);
    
    expect(result).toEqual([]);
    expect(chrome.storage.local.set).toHaveBeenCalled();
  });
});

describe('Background Script - Entry Point', () => {
  it('should register listeners', async () => {
    await import('../src/background/index');
    
    expect(chrome.runtime.onInstalled.addListener).toHaveBeenCalled();
    expect(chrome.alarms.create).toHaveBeenCalledWith('refresh_gfn_data', { periodInMinutes: 1440 });
    expect(chrome.alarms.onAlarm.addListener).toHaveBeenCalled();
  });
});
