import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n, THtml } from "@/lib/i18n";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "À propos — Modes d'usages d'accessibilité" },
      { name: "description", content: "À propos du projet Modes d'usages : objectif, méthode et conformité WCAG 2.2." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useI18n();
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <nav aria-label="Fil d'Ariane" className="mb-6 text-sm">
        <Link to="/" className="text-muted-foreground">{t("nav.home")}</Link>
        <span aria-hidden="true" className="mx-2 text-muted-foreground">/</span>
        <span aria-current="page" className="font-bold">{t("about.crumb")}</span>
      </nav>
      <h1 className="text-4xl font-bold md:text-5xl">{t("about.title")}</h1>
      <THtml as="p" k="about.lead" className="mt-6 text-lg text-muted-foreground" />

      <h2 className="mt-12 text-2xl font-bold">{t("about.h2.why")}</h2>
      <THtml as="p" k="about.why" className="mt-3" />

      <h2 className="mt-12 text-2xl font-bold">{t("about.h2.wcag")}</h2>
      <p className="mt-3">{t("about.wcag")}</p>

      <h2 className="mt-12 text-2xl font-bold">{t("about.h2.origin")}</h2>
      <p className="mt-3">{t("about.origin")}</p>
      <p className="mt-4">
        <img
          src="/logo-orange.png"
          alt="Orange"
          className="inline-block h-16 w-auto"
        />
      </p>

      <h2 className="mt-12 text-2xl font-bold">{t("about.h2.license")}</h2>
      <p className="mt-3">
        {t("about.license")}
        <img
          src="/by-sa.svg"
          alt="CC BY SA"
          className="ml-2 inline-block h-5 w-auto align-middle"
        />
      </p>
      <p className="mt-3">{t("about.orange")}</p>
      <p className="mt-3">{t("about.iso")}</p>

      <div className="mt-12">
        <Link to="/modes" className="inline-block bg-primary px-6 py-3 font-bold text-primary-foreground no-underline hover:underline">
          {t("about.explore")}
        </Link>
      </div>
    </article>
  );
}
