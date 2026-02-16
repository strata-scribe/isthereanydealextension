export async function fetchAndStoreGfnGames(urls: string[]) {
  const allAppIds = new Set<number>();

  for (const url of urls) {
    try {
      const response = await fetch(url);
      if (!response.ok) continue;
      const html = await response.text();
      
      const regex = /data-ds-appid="(\d+)"/g;
      let match;
      while ((match = regex.exec(html)) !== null) {
        allAppIds.add(parseInt(match[1], 10));
      }
    } catch (error) {
      console.error("Failed to fetch GFN games from " + url + ":", error);
    }
  }

  const appIdList = Array.from(allAppIds);
  await new Promise<void>((resolve) => {
    chrome.storage.local.set({
      gfn_appids: appIdList,
      last_updated: new Date().toISOString()
    }, () => resolve());
  });

  return appIdList;
}
