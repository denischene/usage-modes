import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { modes, MODE_DESCRIPTIONS } from "@/lib/modes";

export const Route = createFileRoute("/modes")({
  head: () => ({
    meta: [
      { title: "Tous les modes d'usages — Accessibilité ergonomique" },
      { name: "description", content: "Liste des modes d'usages : Facile+, Facile++, Vocal+, Vision+, Vision++, Lecture+, Lecture++, Pointage+, Pointage++, Moteur+, Moteur++, Audio+, LSF+, Serein+, Graphique+." },
      { property: "og:title", content: "Tous les modes d'usages — Accessibilité ergonomique" },
      { property: "og:description", content: "Découvrez les 15 modes d'usages et leurs règles illustrées d'accessibilité ergonomique." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ModesLayout,
});

function ModesLayout() {
  return <Outlet />;
}

export { modes, MODE_DESCRIPTIONS };
