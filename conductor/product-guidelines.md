# Product Guidelines

## Visual Identity
- **Native Integration:** All UI elements added by the extension (icons, badges, filters) must match the existing styling of isthereanydeal.com. This includes using the same font families, font sizes, colors, and spacing.
- **Unobtrusive Icons:** GFN compatibility indicators should be minimalist and positioned such that they do not disrupt the readability of game titles or prices.
- **Icon Style:** Use SVG icons that align with the weight and style of ITAD's existing iconography.

## User Experience (UX)
- **Zero Configuration:** The extension should work immediately upon installation with sensible defaults for fetching GFN data.
- **Seamless Filtering:** The GFN filter should be integrated into ITAD's existing filter sidebar or menu, behaving exactly like native filters.
- **Performance:** UI injections and data lookups must be highly optimized to avoid causing any noticeable lag or layout shift (CLS) on ITAD pages.

## Communication & Messaging
- **Background Sync:** Data fetching from Steam curators should happen silently in the background.
- **Error Handling:** If the ITAD API or Steam data is unavailable, the extension should fail gracefully, either by hiding GFN indicators or showing a subtle "Data Outdated" warning.
- **Tone:** Use the same professional and utility-focused tone as isthereanydeal.com.