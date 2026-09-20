// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// @cloudflare/vite-plugin builds from this — wrangler.jsonc main alone is insufficient.
export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
    pages: [
      { path: "/" },
      { path: "/a-propos" },
      { path: "/modes" },
      { path: "/modes/facile-p" },
      { path: "/modes/facile-pp" },
      { path: "/modes/vocal-p" },
      { path: "/modes/vision-p" },
      { path: "/modes/vision-pp" },
      { path: "/modes/lecture-p" },
      { path: "/modes/lecture-pp" },
      { path: "/modes/pointage-p" },
      { path: "/modes/moteur-p" },
      { path: "/modes/moteur-pp" },
      { path: "/modes/audio-p" },
      { path: "/modes/lsf-p" },
      { path: "/modes/serein-p" },
      { path: "/modes/microgeste-p" },
      { path: "/modes/graphique-p" },
    ],
    prerender: { enabled: true, autoStaticPathsDiscovery: false },
  },
});
