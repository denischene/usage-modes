# Architecture rules

- Define shared link-preview metadata in `src/lib/share-image.ts` and include it in content-route heads, not the root head, so each page owns its preview tags.
- Keep the link-preview rendition in `public/` and include it in static downloads so independent hosts can serve it without a CDN dependency.