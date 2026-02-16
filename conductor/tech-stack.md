# Tech Stack

## Core Technologies
- **Language:** TypeScript
- **Frontend Framework:** React
- **Extension API:** WebExtensions API (compatible with Chrome, Firefox, Edge)

## Data Storage
- **Local Storage:** `browser.storage.local` (or `chrome.storage.local`) will be used to cache the mapping of Steam AppIDs to GFN compatibility status and the corresponding ITAD game entries.

## Build & Development
- **Build Tool:** Vite
- **Styling:** CSS Modules or Tailwind CSS (to ensure styles don't conflict with ITAD's native CSS)
- **Manifest Version:** Manifest V3 (required for modern Chrome extensions)

## Integration Points
- **Steam Web API / Scraping:** To fetch data from Steam Curator lists.
- **IsThereAnyDeal API:** To retrieve pricing and game metadata.
- **DOM Injection:** Content scripts to modify the ITAD website UI.