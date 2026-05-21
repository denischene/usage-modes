import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold">404</h1>
        <p className="mt-4 text-lg">Cette page n'existe pas.</p>
        <Link to="/" className="mt-6 inline-block bg-foreground px-4 py-2 font-bold text-background">
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
    links: [{ rel: "stylesheet", href: appCss }],
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
  return (
    <header className="border-b border-border bg-foreground text-background">
      <div className="orange-bar" aria-hidden="true" />
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5">
        <Link to="/" className="flex items-center gap-3 no-underline bg-primary px-3 py-2" aria-label="Accueil — Modes d'usages">
          <img src="/pictos/universal-design.svg" alt="" className="h-10 w-10" />
          <span className="flex flex-col leading-tight text-foreground">
            <span className="text-base font-bold">Modes d'usages</span>
            <span className="text-xs">Accessibilité ergonomique</span>
          </span>
        </Link>
        <nav aria-label="Navigation principale" className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold">
          <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "text-primary underline" }}>Accueil</Link>
          <Link to="/modes" activeProps={{ className: "text-primary underline" }}>Tous les modes</Link>
          <Link to="/a-propos" activeProps={{ className: "text-primary underline" }}>À propos</Link>
        </nav>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-foreground text-background">
      <div className="orange-bar" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-6 py-10 grid gap-8 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold">Modes d'usages</p>
          <p className="mt-2 text-sm opacity-80">
            Règles illustrées d'accessibilité ergonomique — édité selon la charte Orange et conforme aux critères WCAG 2.2.
          </p>
        </div>
        <nav aria-label="Pied de page">
          <p className="mb-2 font-bold">Navigation</p>
          <ul className="space-y-1 text-sm">
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/modes">Tous les modes</Link></li>
            <li><Link to="/a-propos">À propos</Link></li>
          </ul>
        </nav>
        <div>
          <p className="mb-2 font-bold">Conformité</p>
          <p className="text-sm opacity-80">WCAG 2.2 — AA. Contrastes, navigation clavier, alternatives textuelles.</p>
        </div>
      </div>
      <div className="border-t border-background/20">
        <p className="mx-auto max-w-7xl px-6 py-4 text-xs opacity-70">© {new Date().getFullYear()} Orange — Tous droits réservés.</p>
      </div>
    </footer>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <a href="#contenu" className="skip-link">Aller au contenu principal</a>
      <SiteHeader />
      <main id="contenu" className="min-h-[60dvh]">
        <Outlet />
      </main>
      <SiteFooter />
    </QueryClientProvider>
  );
}
