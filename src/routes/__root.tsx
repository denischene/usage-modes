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
      { property: "og:title", content: "Modes d'usages — Accessibilité ergonomique" },
      { property: "og:description", content: "Règles illustrées d'accessibilité par modes d'usages." },
      { property: "og:type", content: "website" },
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
    <header className="border-b border-border bg-background">
      <div className="orange-bar" aria-hidden="true" />
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5">
        <Link to="/" className="flex items-center gap-3 no-underline" aria-label="Accueil — Modes d'usages">
          <span className="grid h-10 w-10 place-items-center bg-foreground font-bold text-background">o</span>
          <span className="flex flex-col leading-tight">
            <span className="text-base font-bold">Modes d'usages</span>
            <span className="text-xs text-muted-foreground">Accessibilité ergonomique</span>
          </span>
        </Link>
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
