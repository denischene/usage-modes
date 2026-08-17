import { createFileRoute, Link } from "@tanstack/react-router";
import { modes } from "@/lib/modes";
import { ModePicto } from "@/components/ModePicto";
import { useI18n, THtml } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Modes d'usages — Règles illustrées d'accessibilité ergonomique" },
      { name: "description", content: "15 modes d'usages pour concevoir des interfaces accessibles. Règles illustrées Perception, Compréhension, Commandes." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { t, modeDescription, modeLabel } = useI18n();
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-foreground text-background">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-[1fr_auto] md:py-24">
          <div className="max-w-2xl">
            <THtml as="p" k="home.hero.lead" className="mt-6 text-lg opacity-90 md:text-xl" />
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/modes"
                className="bg-primary px-6 py-3 font-bold text-primary-foreground no-underline hover:underline"
              >
                {t("home.hero.cta1")}
              </Link>
              <Link
                to="/a-propos"
                className="border-2 border-background px-6 py-3 font-bold no-underline hover:underline"
              >
                {t("home.hero.cta2")}
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <img
              src="/pictos/universal-design.svg"
              alt={t("home.hero.pictoAlt")}
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
            <h2 id="intro-titre" className="mt-3 text-xl font-bold">{t("home.perception.title")}</h2>
            <p className="mt-2 text-muted-foreground">{t("home.perception.desc")}</p>
          </div>
          <div>
            <p className="text-5xl font-bold text-primary">02</p>
            <h2 className="mt-3 text-xl font-bold">{t("home.comprehension.title")}</h2>
            <p className="mt-2 text-muted-foreground">{t("home.comprehension.desc")}</p>
          </div>
          <div>
            <p className="text-5xl font-bold text-primary">03</p>
            <h2 className="mt-3 text-xl font-bold">{t("home.commandes.title")}</h2>
            <p className="mt-2 text-muted-foreground">{t("home.commandes.desc")}</p>
          </div>
        </div>
      </section>

      {/* Modes grid */}
      <section className="border-t border-border bg-surface" aria-labelledby="modes-titre">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-10 flex items-end justify-between">
            <h2 id="modes-titre" className="text-3xl font-bold md:text-4xl">{t("home.modes.title")}</h2>
            <Link to="/modes" className="hidden text-sm font-bold text-primary md:inline">{t("home.modes.seeAll")}</Link>
          </div>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {modes.map((m) => (
              <li key={m.slug}>
                <Link
                  to="/modes/$mode"
                  params={{ mode: m.slug }}
                  className="group flex h-full items-center gap-4 border-2 border-border bg-background p-5 no-underline transition-colors hover:border-primary"
                >
                  <ModePicto mode={m} />
                  <span className="flex flex-col">
                    <span className="text-lg font-bold group-hover:text-primary">{modeLabel(m.label)}</span>
                    <span className="text-sm text-muted-foreground">{modeDescription(m.label)}</span>
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
