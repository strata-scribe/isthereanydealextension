import { fetchAndStoreGfnGames } from './logic';

const CURATOR_URLS = [
  'https://store.steampowered.com/curator/38115929-Geforce-Now-Friendly/',
  'https://store.steampowered.com/curator/45481916/'
];

chrome.runtime.onInstalled.addListener(() => {
  console.log('ITAD GFN Extension installed');
  fetchAndStoreGfnGames(CURATOR_URLS);
});

// Refresh every 24 hours
chrome.alarms.create('refresh_gfn_data', { periodInMinutes: 1440 });

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'refresh_gfn_data') {
    fetchAndStoreGfnGames(CURATOR_URLS);
  }
});
