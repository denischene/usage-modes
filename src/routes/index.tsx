import { createFileRoute, Link } from "@tanstack/react-router";
import { modes, MODE_DESCRIPTIONS } from "@/lib/modes";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Modes d'usages — Règles illustrées d'accessibilité ergonomique" },
      { name: "description", content: "13 modes d'usages pour concevoir des interfaces accessibles. Règles illustrées Perception, Compréhension, Commandes." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-foreground text-background">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-[1fr_auto] md:py-24">
          <div className="max-w-2xl">
            <p className="mb-4 inline-block bg-primary px-3 py-1 text-sm font-bold text-primary-foreground">
              Accessibilité ergonomique
            </p>
            <h1 className="text-4xl font-bold leading-tight md:text-6xl">
              Modes d'usages
            </h1>
            <p className="mt-6 text-lg opacity-90 md:text-xl">
              Un catalogue de <strong>règles illustrées</strong> pour concevoir des interfaces accessibles
              à toutes et tous. Chaque mode d'usage répond à un besoin spécifique d'interaction.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/modes"
                className="bg-primary px-6 py-3 font-bold text-primary-foreground no-underline hover:underline"
              >
                Découvrir les 13 modes
              </Link>
              <Link
                to="/a-propos"
                className="border-2 border-background px-6 py-3 font-bold no-underline hover:underline"
              >
                À propos du projet
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center justify-start gap-8">
            <nav aria-label="Navigation principale" className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm font-semibold">
              <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "text-primary underline" }}>Accueil</Link>
              <Link to="/modes" activeProps={{ className: "text-primary underline" }}>Tous les modes</Link>
              <Link to="/a-propos" activeProps={{ className: "text-primary underline" }}>À propos</Link>
            </nav>
            <img
              src="/pictos/universal-design.svg"
              alt="Pictogramme Universal Design"
              className="h-48 w-48 md:h-64 md:w-64"
            />
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-7xl px-6 py-16" aria-labelledby="intro-titre">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <p className="text-5xl font-bold text-primary">01</p>
            <h2 id="intro-titre" className="mt-3 text-xl font-bold">Perception</h2>
            <p className="mt-2 text-muted-foreground">Comment l'utilisateur perçoit l'information.</p>
          </div>
          <div>
            <p className="text-5xl font-bold text-primary">02</p>
            <h2 className="mt-3 text-xl font-bold">Compréhension</h2>
            <p className="mt-2 text-muted-foreground">Comment l'information est rendue compréhensible.</p>
          </div>
          <div>
            <p className="text-5xl font-bold text-primary">03</p>
            <h2 className="mt-3 text-xl font-bold">Commandes</h2>
            <p className="mt-2 text-muted-foreground">Comment l'utilisateur interagit et manipule.</p>
          </div>
        </div>
      </section>

      {/* Modes grid */}
      <section className="border-t border-border bg-surface" aria-labelledby="modes-titre">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-10 flex items-end justify-between">
            <h2 id="modes-titre" className="text-3xl font-bold md:text-4xl">Les 13 modes d'usages</h2>
            <Link to="/modes" className="hidden text-sm font-bold text-primary md:inline">Tout voir →</Link>
          </div>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {modes.map((m) => (
              <li key={m.slug}>
                <Link
                  to="/modes/$mode"
                  params={{ mode: m.slug }}
                  className="group flex h-full items-center gap-4 border-2 border-border bg-background p-5 no-underline transition-colors hover:border-primary"
                >
                  <span className="grid h-16 w-16 shrink-0 place-items-center bg-foreground p-2">
                    <img src={m.picto} alt="" className="h-full w-full object-contain" />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-lg font-bold group-hover:text-primary">{m.label}</span>
                    <span className="text-sm text-muted-foreground">{MODE_DESCRIPTIONS[m.label]}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
