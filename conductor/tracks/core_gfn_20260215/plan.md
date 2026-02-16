# Implementation Plan: Core GFN Integration & UI Indicators

## Phase 1: Environment Setup & Scaffolding
- [~] Task: Project Initialization
    - [ ] Initialize Vite project with React and TypeScript
    - [ ] Configure manifest.json (Manifest V3)
    - [ ] Set up basic folder structure (background, content, options, popup)
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Environment Setup & Scaffolding' (Protocol in workflow.md)

## Phase 2: Data Acquisition (Steam Curator)
- [ ] Task: Background Script Development
    - [ ] Implement fetch logic for Steam Curator URLs
    - [ ] Parse Steam AppIDs from the curator page content
    - [ ] Store AppID list in `browser.storage.local`
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Data Acquisition (Steam Curator)' (Protocol in workflow.md)

## Phase 3: ITAD Integration & UI
- [ ] Task: Content Script Implementation
    - [ ] Implement DOM observer to detect game elements on ITAD
    - [ ] Extract unique identifiers (slugs/AppIDs) from ITAD links
    - [ ] Cross-reference detected games with stored GFN list
- [ ] Task: UI Injection
    - [ ] Create React component for the GFN indicator icon
    - [ ] Inject the indicator into the ITAD DOM next to game titles
- [ ] Task: Conductor - User Manual Verification 'Phase 3: ITAD Integration & UI' (Protocol in workflow.md)
