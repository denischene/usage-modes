import { createFileRoute, Link } from "@tanstack/react-router";
import { modes } from "@/lib/modes";
import { ModePicto } from "@/components/ModePicto";
import { useI18n, THtml } from "@/lib/i18n";

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
  const { t, modeDescription, modeLabel } = useI18n();
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <nav aria-label="Fil d'Ariane" className="mb-6 text-sm">
        <Link to="/" className="text-muted-foreground">{t("nav.home")}</Link>
        <span aria-hidden="true" className="mx-2 text-muted-foreground">/</span>
        <span aria-current="page" className="font-bold">{t("modes.crumb")}</span>
      </nav>
      <h1 className="text-4xl font-bold md:text-5xl">{t("modes.title")}</h1>
      <THtml as="p" k="modes.lead" className="mt-4 max-w-3xl text-lg text-muted-foreground" />
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
                  <span className="text-2xl font-bold group-hover:text-primary">{modeLabel(m.label)}</span>
                </div>
                <p className="text-sm text-muted-foreground">{modeDescription(m.label)}</p>
                <p className="mt-auto text-xs font-bold uppercase tracking-wider text-primary">
                  {total} {t("modes.rulesSuffix")}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
