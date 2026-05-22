import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { modes, MODE_DESCRIPTIONS } from "@/lib/modes";

export const Route = createFileRoute("/modes")({
  head: () => ({
    meta: [
      { title: "Tous les modes d'usages — Accessibilité ergonomique" },
      { name: "description", content: "Liste des modes d'usages : Facile+, Facile++, Vocal+, Vision+, Vision++, Lecture+, Lecture++, Pointage+, Moteur+, Audio+, LSF+, Serein+, Microgeste+, Graphique+." },
    ],
  }),
  component: ModesLayout,
});

function ModesLayout() {
  return <Outlet />;
}

export { modes, MODE_DESCRIPTIONS };
