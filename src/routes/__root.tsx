import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useLocation,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { I18nProvider, useI18n } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

function NotFoundComponent() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold">404</h1>
        <p className="mt-4 text-lg">Cette page n'existe pas.</p>
        <Link to="/" className="mt-6 inline-block bg-secondary px-4 py-2 font-bold text-secondary-foreground">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  return (
    <div className="flex min-h-dvh items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold">Une erreur est survenue</h1>
        <p className="mt-2 text-muted-foreground">{error.message}</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 bg-primary px-4 py-2 font-bold text-primary-foreground"
        >
          Réessayer
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Modes d'usages — Règles illustrées d'accessibilité ergonomique" },
      { name: "description", content: "Catalogue illustré des règles d'accessibilité ergonomique organisées par modes d'usages : Facile+, Vision+, Audio+, LSF+, Moteur+ et plus." },
      { name: "author", content: "Orange" },
      { property: "og:title", content: "Modes d'usages — Règles illustrées d'accessibilité ergonomique" },
      { property: "og:description", content: "Catalogue illustré des règles d'accessibilité ergonomique organisées par modes d'usages : Facile+, Vision+, Audio+, LSF+, Moteur+ et plus." },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Modes d'usages — Règles illustrées d'accessibilité ergonomique" },
      { name: "twitter:description", content: "Catalogue illustré des règles d'accessibilité ergonomique organisées par modes d'usages : Facile+, Vision+, Audio+, LSF+, Moteur+ et plus." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/4af37686-bcf3-4790-9aa3-7735a7a6e694/id-preview-333e4993--00271e2f-c13e-4017-9cd2-19ef010a6a57.lovable.app-1779347139411.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/4af37686-bcf3-4790-9aa3-7735a7a6e694/id-preview-333e4993--00271e2f-c13e-4017-9cd2-19ef010a6a57.lovable.app-1779347139411.png" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: "/pictos/universal-design.svg" },
      { rel: "apple-touch-icon", href: "/pictos/universal-design.svg" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function SiteHeader() {
  const { t } = useI18n();
  const pathname = useLocation({ select: (location) => location.pathname });
  const hasDarkSeparator = pathname === "/" || pathname === "/modes" || pathname.startsWith("/modes/");
  return (
    <header className={`border-b border-border bg-secondary text-secondary-foreground ${hasDarkSeparator ? "dark:border-b-4 dark:border-white" : ""}`}>
      <div className="orange-bar" aria-hidden="true" />
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5">
        <Link to="/" className="flex items-center gap-3 no-underline bg-primary px-3 py-2" aria-label={`${t("nav.home")} — ${t("site.title")}`}>
          <img src="/pictos/universal-design.svg" alt="" className="h-10 w-10" />
          <span className="flex flex-col leading-tight text-primary-foreground">
            <span className="text-base font-bold">{t("site.title")}</span>
            <span className="text-xs">{t("site.subtitle")}</span>
          </span>
        </Link>
        <div className="flex flex-wrap items-center gap-4">
          <nav aria-label={t("nav.aria")} className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold">
            <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "text-primary underline" }}>{t("nav.home")}</Link>
            <Link to="/modes" activeProps={{ className: "text-primary underline" }}>{t("nav.all")}</Link>
            <Link to="/a-propos" activeProps={{ className: "text-primary underline" }}>{t("nav.about")}</Link>
          </nav>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}

function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="mt-24 border-t border-border bg-secondary text-secondary-foreground">
      <div className="orange-bar" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-6 py-10 grid gap-8 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold">{t("site.title")}</p>
          <p className="mt-2 text-sm opacity-80">{t("footer.tagline")}</p>
        </div>
        <nav aria-label={t("footer.navTitle")}>
          <p className="mb-2 font-bold">{t("footer.navTitle")}</p>
          <ul className="space-y-1 text-sm">
            <li><Link to="/">{t("nav.home")}</Link></li>
            <li><Link to="/modes">{t("nav.all")}</Link></li>
            <li><Link to="/a-propos">{t("nav.about")}</Link></li>
          </ul>
        </nav>
        <div>
          <p className="mb-2 font-bold">{t("footer.complianceTitle")}</p>
          <p className="text-sm opacity-80">{t("footer.compliance")}</p>
        </div>
      </div>
      <div className="border-t border-secondary-foreground/20">
        <p className="mx-auto max-w-7xl px-6 py-4 text-xs opacity-70">© {new Date().getFullYear()} Orange — {t("footer.rights")}</p>
      </div>
    </footer>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <SkipLink />
        <SiteHeader />
        <main id="contenu" className="min-h-[60dvh]">
          <Outlet />
        </main>
        <SiteFooter />
      </I18nProvider>
    </QueryClientProvider>
  );
}

function SkipLink() {
  const { t } = useI18n();
  return <a href="#contenu" className="skip-link">{t("skip")}</a>;
}
