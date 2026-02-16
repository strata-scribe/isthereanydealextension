# Specification: Core GFN Integration & UI Indicators

## Overview
This track focuses on the foundational work required to integrate GeForce Now (GFN) compatibility data into IsThereAnyDeal (ITAD). It covers the extension scaffolding, data sourcing from Steam curators, and initial UI implementation.

## Functional Requirements
- **Extension Scaffolding:** Set up a Vite + React + TypeScript environment for a Manifest V3 browser extension.
- **Steam Curator Scraping:** Implement a mechanism (likely background script) to fetch and parse game lists from the specified Steam Curator URLs.
- **GFN Data Storage:** Store the list of GFN-compatible Steam AppIDs in `browser.storage.local`.
- **ITAD Game Detection:** Implement content scripts to identify game entries on ITAD pages (Search, Deals, Game pages).
- **GFN UI Indicators:** Inject a minimalist GFN/Cloud icon next to identified compatible games on ITAD.

## Technical Requirements
- Use `browser.storage.local` for caching GFN data.
- Ensure content scripts are lightweight and don't slow down ITAD.
- Implement basic error handling for failed Steam data fetches.

## UI/UX Design
- Match ITAD's native styling (font, color, spacing).
- Icon should be small and placed consistently (e.g., after the game title).
