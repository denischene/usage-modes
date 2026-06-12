import { createFileRoute, Link } from "@tanstack/react-router";
import { modes, MODE_DESCRIPTIONS } from "@/lib/modes";
import { ModePicto } from "@/components/ModePicto";

export const Route = createFileRoute("/modes/")({
  head: () => ({
    meta: [
      { title: "Tous les modes d'usages — Catalogue" },
      { name: "description", content: "Catalogue complet des 15 modes d'usages d'accessibilité ergonomique." },
    ],
  }),
  component: ModesIndex,
});

function ModesIndex() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <nav aria-label="Fil d'Ariane" className="mb-6 text-sm">
        <Link to="/" className="text-muted-foreground">Accueil</Link>
        <span aria-hidden="true" className="mx-2 text-muted-foreground">/</span>
        <span aria-current="page" className="font-bold">Tous les modes</span>
      </nav>
      <h1 className="text-4xl font-bold md:text-5xl">Tous les modes d'usages</h1>
      <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
        Chaque mode regroupe les règles illustrées pour <strong>Perception</strong>, <strong>Compréhension</strong> et <strong>Commandes</strong>.
      </p>
      <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {modes.map((m) => {
          const total = m.sections.perception.length + m.sections.comprehension.length + m.sections.commandes.length;
          return (
            <li key={m.slug}>
              <Link
                to="/modes/$mode"
                params={{ mode: m.slug }}
                className="group flex h-full flex-col gap-4 border-2 border-border bg-background p-6 no-underline transition-colors hover:border-primary"
              >
                <div className="flex items-center gap-4">
                  <ModePicto mode={m} />

                  <span className="text-2xl font-bold group-hover:text-primary">{m.label}</span>
                </div>
                <p className="text-sm text-muted-foreground">{MODE_DESCRIPTIONS[m.label]}</p>
                <p className="mt-auto text-xs font-bold uppercase tracking-wider text-primary">
                  {total} règles illustrées →
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
