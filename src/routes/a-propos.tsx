import { createFileRoute, Link } from "@tanstack/react-router";

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
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <nav aria-label="Fil d'Ariane" className="mb-6 text-sm">
        <Link to="/" className="text-muted-foreground">Accueil</Link>
        <span aria-hidden="true" className="mx-2 text-muted-foreground">/</span>
        <span aria-current="page" className="font-bold">À propos</span>
      </nav>
      <h1 className="text-4xl font-bold md:text-5xl">À propos</h1>
      <p className="mt-6 text-lg text-muted-foreground">
        <strong>Modes d'usages</strong> est un catalogue de règles illustrées d'accessibilité ergonomique destiné
        aux conceptrices et concepteurs d'interfaces numériques.
      </p>

      <h2 className="mt-12 text-2xl font-bold">Pourquoi des modes d'usages ?</h2>
      <p className="mt-3">
        Chaque mode représente une manière spécifique d'utiliser une interface — par la voix, par la vue,
        en simplifiant, en réduisant l'effort moteur, etc. Les règles sont organisées en trois familles :
        <strong> Perception</strong>, <strong>Compréhension</strong> et <strong>Commandes</strong>.
      </p>

      <h2 className="mt-12 text-2xl font-bold">Conformité WCAG 2.2</h2>
      <p className="mt-3">
        Ce site applique les critères <abbr title="Web Content Accessibility Guidelines">WCAG</abbr> 2.2 niveau AA :
        contrastes suffisants, navigation clavier, alternatives textuelles, structure sémantique,
        cibles de pointage d'au moins 24×24 pixels et focus visible.
      </p>

      <h2 className="mt-12 text-2xl font-bold">Origine du projet</h2>
      <p className="mt-3">
        Les modes d'usages sont issus des travaux de recherche du Programme Accessibilité Salariés d'Orange Lab.
      </p>
      <p className="mt-4">
        <img
          src="/logo-orange.png"
          alt="logo de l'entreprise de Télécom Orange"
          className="inline-block h-16 w-auto"
        />
      </p>

      <h2 className="mt-12 text-2xl font-bold">Licence</h2>
      <p className="mt-3">
        Documentation sous licence CC BY SA 4.0
        <img
          src="/by-sa.svg"
          alt="logo d'une licence Creative Commons"
          className="ml-2 inline-block h-5 w-auto align-middle"
        />
        {" "}(pictogrammes, illustrations et textes).
      </p>
      <p className="mt-3">
        Le logo Orange est la propriété d'Orange : Copyright © 2026 Orange SA All rights reserved.
      </p>
      <p className="mt-3">
        Les pictogrammes des modes d'usages sont référencés dans la norme «&nbsp;ISO/IEC 11581-7:2024 Icônes
        d'interface utilisateur — Partie 7&nbsp;: Icônes utilisées pour régler les modes d'interaction&nbsp;».
      </p>

      <div className="mt-12">
        <Link to="/modes" className="inline-block bg-primary px-6 py-3 font-bold text-primary-foreground no-underline hover:underline">
          Explorer les modes
        </Link>
      </div>
    </article>
  );
}
