import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { modes } from "@/lib/modes";

const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const paths = [
          { path: "/", priority: "1.0" },
          { path: "/modes", priority: "0.9" },
          { path: "/a-propos", priority: "0.6" },
          ...modes.map((m) => ({ path: `/modes/${m.slug}`, priority: "0.8" })),
        ];
        const urls = paths.map(
          (e) => `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <priority>${e.priority}</priority>\n  </url>`,
        );
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
