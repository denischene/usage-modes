import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { modes, SECTION_META, type Mode } from "@/lib/modes";
import { RuleImage } from "@/components/RuleImage";
import { useI18n } from "@/lib/i18n";
import ruleTranslations from "@/lib/rule-translations.json";
import descriptionTranslations from "@/lib/description-translations.json";

function translateRule(text: string | undefined, lang: string): string | undefined {
  if (!text) return text;
  if (lang === "fr") return text;
  const key = lang === "pt-BR" ? "pt" : lang === "zh-CN" ? "zh" : lang;
  const entry = (ruleTranslations as Record<string, Record<string, string>>)[text];
  return entry?.[key] ?? text;
}

export const Route = createFileRoute("/modes/$mode")({
  loader: ({ params }) => {
    const mode = modes.find((m) => m.slug === params.mode);
    if (!mode) throw notFound();
    return { mode };
  },
  head: ({ loaderData }) => {
    const m = loaderData?.mode;
    const label = m?.label ?? "Mode d'usage";
    return {
      meta: [
        { title: `${label} — Modes d'usages` },
        { name: "description", content: `Règles illustrées d'accessibilité pour le mode ${label}. Perception, Compréhension, Commandes.` },
        { property: "og:title", content: `${label} — Modes d'usages` },
        ...(m ? [{ property: "og:image", content: m.picto }] : []),
      ],
    };
  },
  component: ModePage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-20 text-center">
      <h1 className="text-4xl font-bold">Mode introuvable</h1>
      <p className="mt-4 text-muted-foreground">Ce mode d'usage n'existe pas.</p>
      <Link to="/modes" className="mt-6 inline-block bg-primary px-4 py-2 font-bold text-primary-foreground">
        Voir tous les modes
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-3xl px-6 py-20 text-center">
      <h1 className="text-2xl font-bold">Erreur de chargement</h1>
      <p className="mt-2 text-muted-foreground">{error.message}</p>
    </div>
  ),
});

function ModePage() {
  const { mode } = Route.useLoaderData() as { mode: Mode };
  const { t, modeDescription, modeLabel, descUi, lang } = useI18n();
  const label = modeLabel(mode.label);
  const tDesc = (text: string) => {
    if (lang === "fr") return text;
    const key = lang === "pt-BR" ? "pt" : lang;
    return (descriptionTranslations as Record<string, Record<string, string>>)[text]?.[key] ?? text;
  };
  const sectionTitle = (key: string) =>
    key === "perception" ? t("home.perception.title")
    : key === "comprehension" ? t("home.comprehension.title")
    : t("home.commandes.title");
  const sectionDesc = (key: string) => t(`section.${key}.desc`);

  return (
    <>
      {/* Header */}
      <section className="border-b border-border bg-secondary text-secondary-foreground">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <nav aria-label="Fil d'Ariane" className="mb-6 text-sm">
            <Link to="/" className="opacity-75 hover:opacity-100">{t("nav.home")}</Link>
            <span aria-hidden="true" className="mx-2 opacity-50">/</span>
            <Link to="/modes" className="opacity-75 hover:opacity-100">{t("nav.all")}</Link>
            <span aria-hidden="true" className="mx-2 opacity-50">/</span>
            <span aria-current="page" className="font-bold">{label}</span>
          </nav>
          <div className="flex flex-wrap items-center gap-6">
            <span className="grid h-24 w-24 shrink-0 place-items-center bg-background p-3">
              <img src={mode.picto} alt="" className="h-full w-full object-contain" />
            </span>
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-primary">{t("mode.label")}</p>
              <h1 className="mt-1 text-4xl font-bold md:text-5xl">{label}</h1>
              <p className="mt-2 max-w-2xl opacity-90">{modeDescription(mode.label)}</p>
            </div>
          </div>

          {/* In-page nav */}
          <ul className="mt-8 flex flex-wrap gap-2">
            {mode.description && (
              <li>
                <a
                  href="#description"
                  className="inline-block border-2 border-secondary-foreground px-4 py-2 text-sm font-bold no-underline hover:underline"
                >
                  {descUi("desc.title")}
                </a>
              </li>
            )}
            {SECTION_META.map((s) => {
              const count = mode.sections[s.key].length;
              const title = sectionTitle(s.key);
              return (
                <li key={s.key}>
                  <a
                    href={`#${s.key}`}
                    className={`inline-block border-2 px-4 py-2 text-sm font-bold no-underline hover:underline ${
                      count === 0 ? "border-secondary-foreground/30 opacity-50" : "border-secondary-foreground"
                    }`}
                    aria-label={`${t("mode.gotoSection")} ${title} (${count} ${t("mode.rules")})`}
                  >
                    {title} <span className="ml-1 opacity-75">({count})</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Description */}
      {mode.description && (
        <section id="description" aria-labelledby="description-titre" className="bg-background">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <div className="mb-10 flex items-baseline gap-4">
              <span className="text-5xl font-bold text-primary">00</span>
              <div>
                <h2 id="description-titre" className="text-3xl font-bold md:text-4xl">{descUi("desc.title")}</h2>
                <p className="mt-1 text-muted-foreground">{descUi("desc.sub")}</p>
              </div>
            </div>

            <p className="max-w-4xl text-lg leading-relaxed text-foreground">{tDesc(mode.description.intro)}</p>

            <div className="mt-10 grid gap-8 lg:grid-cols-2">
              <div className="border-2 border-border bg-background p-6">
                <h3 className="mb-4 text-xl font-bold">{descUi("desc.users")}</h3>
                <ul className="space-y-3">
                  {mode.description.users.map((u, i) => (
                    <li key={i} className="flex gap-3 text-foreground">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-primary" />
                      <span>{tDesc(u)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-2 border-border bg-background p-6">
                <h3 className="mb-4 text-xl font-bold">{descUi("desc.pictos")} {label}</h3>
                <ul className="flex flex-wrap gap-4">
                  {mode.description.pictos.map((p, i) => (
                    <li key={p} className={`grid h-32 w-32 place-items-center border border-border p-3 ${i === 0 ? "bg-white" : "bg-black"}`}>
                      <img src={p} alt={`${descUi("desc.pictos")} ${label} — ${i === 0 ? descUi("desc.altLight") : descUi("desc.altDark")}`} className="h-full w-full object-contain" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}


      {/* Sections */}
      {SECTION_META.map((s, idx) => {
        const items = mode.sections[s.key];
        const title = sectionTitle(s.key);
        return (
          <section
            key={s.key}
            id={s.key}
            aria-labelledby={`${s.key}-titre`}
            className={idx % 2 === 0 ? "bg-background" : "bg-surface"}
          >
            <div className="mx-auto max-w-7xl px-6 py-16">
              <div className="mb-10 flex items-baseline gap-4">
                <span className="text-5xl font-bold text-primary">0{idx + 1}</span>
                <div>
                  <h2 id={`${s.key}-titre`} className="text-3xl font-bold md:text-4xl">{title}</h2>
                  <p className="mt-1 text-muted-foreground">{sectionDesc(s.key)}</p>
                </div>
              </div>

              {items.length === 0 ? (
                <p className="border-2 border-dashed border-border bg-background p-8 text-center text-muted-foreground">
                  {t("mode.empty")}
                </p>
              ) : (
                <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((item, i) => {
                    const src = typeof item === "string" ? item : item.src;
                    const customText = typeof item === "string" ? undefined : item.text;
                    const wide = typeof item === "string" ? false : !!item.wide;
                    const noImage = typeof item !== "string" && !src;
                    const caption = `${label} · ${title} · ${t("mode.ruleCard")} ${i + 1}`;
                    const alt = `${title} · ${t("mode.ruleCard")} ${i + 1} — ${label}`;
                    return (
                      <li key={`${src || "no-img"}-${i}`} className={`border-2 border-border bg-background ${wide ? "sm:col-span-2" : ""}`}>
                        <article className="flex flex-col">
                          <header className="border-b border-border px-4 py-3">
                            {!noImage && (
                              <h3 className="flex items-center gap-3 text-lg font-bold uppercase leading-6 text-foreground">
                                <span aria-hidden="true" className="h-5 w-5 shrink-0 bg-primary" />
                                <span>{title} · {t("mode.ruleCard")} {i + 1}</span>
                                <span aria-hidden="true" className="h-5 w-5 shrink-0 bg-primary" />
                              </h3>
                            )}
                            <p className={`${noImage ? "" : "mt-2"} text-sm text-foreground`}>
                              {translateRule(customText, lang) ?? t("mode.defaultText")}
                            </p>
                          </header>
                          {!noImage && <RuleImage src={src} alt={alt} caption={caption} />}
                        </article>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </section>
        );
      })}


      {/* Other modes */}
      <section aria-labelledby="autres-titre" className="border-t border-border bg-secondary text-secondary-foreground">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <h2 id="autres-titre" className="mb-6 text-2xl font-bold">{t("mode.others")}</h2>
          <ul className="flex flex-wrap gap-2">
            {modes
              .filter((m) => m.slug !== mode.slug)
              .map((m) => (
                <li key={m.slug}>
                  <Link
                    to="/modes/$mode"
                    params={{ mode: m.slug }}
                    className="inline-flex items-center gap-2 border-2 border-secondary-foreground px-3 py-2 text-sm font-bold no-underline hover:border-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <img src={m.picto} alt="" className="h-5 w-5 bg-background p-0.5" />
                    {m.label}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </section>
    </>
  );
}
