# Passer le site en fichiers statiques pour un autre hébergeur

## Objectif
Produire un site 100 % statique (HTML/CSS/JS) à partir du projet TanStack Start actuel, puis l’héberger ailleurs que sur Lovable/Cloudflare Workers.

## Contexte
Le projet est actuellement en **SSR / Cloudflare Worker**. Après un `npm run build`, le dossier `.output` contient un worker exécutable, pas un simple site statique. Il n’utilise pas de base de données ni de fonctions serveur protégées, donc il peut être entièrement prérendu.

## Étapes

### 1. Mettre à jour le plugin TanStack de Lovable
La version actuelle du plugin (`@lovable.dev/vite-tanstack-config` 2.13.1) est inférieure à la version requise pour que le prerender soit fiable (2.20.0). Il faut donc la mettre à jour dans `package.json`, puis réinstaller.

### 2. Configurer le prerender dans `vite.config.ts`
Ajouter la liste complète des routes à prérendre et désactiver la découverte automatique :

```text
/
/a-propos
/modes
/modes/facile-p
/modes/facile-pp
/modes/vocal-p
/modes/vision-p
/modes/vision-pp
/modes/lecture-p
/modes/lecture-pp
/modes/pointage-p
/modes/moteur-p
/modes/moteur-pp
/modes/audio-p
/modes/lsf-p
/modes/serein-p
/modes/microgeste-p
/modes/graphique-p
```

### 3. Lancer le build
Exécuter `npm run build` et vérifier que chaque route produit un fichier `index.html` dans `.output/public/<route>/index.html`.

### 4. Récupérer les fichiers statiques
Le contenu à transférer se trouve dans `.output/public/`. Copier ce dossier sur l’hébergeur cible, en veillant à ce que les routes sans `index.html` à la racine redirigent correctement vers leur sous-dossier (la plupart des hébergeurs statiques gèrent cela automatiquement).

### 5. Vérifier le rendu
Ouvrir le site sur l’hébergeur cible et parcourir l’accueil, la page À propos, la liste des modes, et au moins deux fiches mode pour s’assurer que les images et les traductions sont présentes.

## Points techniques

- Le site n’utilise pas de base de données ni d’API serveur personnalisée, donc le prerender ne risque pas d’exposer des données dynamiques ou utilisateur.
- Les routes paramétrées (`/modes/$mode`) doivent être listées explicitement, car elles ne sont pas découvertes automatiquement.
- Le mode sombre reste géré côté client ; le prerender génère la version par défaut (clair), le navigateur applique ensuite la préférence utilisateur.

## Livrable attendu
Un dossier `.output/public/` contenant le site statique complet, prêt à être déposé sur n’importe quel hébergeur statique (Netlify, GitHub Pages, Cloudflare Pages en mode static, AlwaysData, hébergement mutualisé, etc.).
