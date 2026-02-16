# Initial Concept
I want to make something that extends the website isthereanydeal.com, I use geforce now, and there's a curator that maintains a list of all geforce now friendly games on steam. I want to integrate this data, and show geforce now games with some form of identifier on ITAD:

**Objective:** Enhance isthereanydeal.com (ITAD) with GeForce Now (GFN) compatibility data.

**Data Integration:**
1.  **Steam Curator Data:** Ingest GFN-friendly game lists from provided Steam curator URLs.
2.  **ITAD API:** Utilize ITAD's public API to retrieve game data and pricing.

**Implementation Details:**
1.  **Data Mapping:** Map Steam AppIDs from curator lists to corresponding game entries in ITAD.
2.  **Identifier:** Add a GFN-compatible flag/icon to games displayed on ITAD.
3.  **Filtering:** Enable user filtering on ITAD to show only GFN-compatible games.
4.  **Update Frequency:** Define a schedule for refreshing GFN game lists and ITAD data.

**Technical Considerations:**
1.  **API Access:** Obtain ITAD API key if required.
2.  **Data Storage:** Determine strategy for storing GFN game IDs.
3.  **Frontend Integration:** Implement UI changes for GFN identifier and filter.
4.  **Backend Logic:** Develop script/service for data fetching, mapping, and updating.

**Measurable Outcomes:**
1.  GFN compatibility accurately reflected on ITAD.
2.  Users can filter games by GFN compatibility.
3.  Data updated regularly.
# Product Definition

## Problem Statement
GeForce Now (GFN) users who use IsThereAnyDeal (ITAD) currently lack a direct way to see which deals are compatible with their cloud gaming service. They have to manually cross-reference Steam curator lists or official GFN lists with ITAD's pricing data.

## Target Audience
- **GeForce Now subscribers** who use ITAD to find the best prices for games they can actually play on their service.
- **ITAD users** interested in cloud gaming compatibility who want to see this information integrated into their existing deal-hunting workflow.

## Goals
- Provide a seamless way for GFN users to identify compatible deals directly on the ITAD website.
- Reduce friction by automating the cross-referencing of Steam curator GFN lists and ITAD game entries.
- Enable advanced filtering on ITAD so users can focus exclusively on games they can play via GeForce Now.

## Core Features
- **Steam Curator Integration:** Automatically ingest and map GFN-friendly game lists from trusted Steam curators.
- **GFN Indicators:** Add minimalist cloud/GFN icons next to game titles on the ITAD interface to signal compatibility.
- **GFN Filtering:** Integrate a toggle or filter option within the ITAD UI to show only GFN-compatible games.
- **Automated Data Refresh:** Maintain an up-to-date mapping of GFN titles and ITAD IDs.

## Delivery Method
The project will be delivered as a **Browser Extension (Chrome/Firefox)** that injects GFN compatibility data and UI elements directly into the isthereanydeal.com website.
