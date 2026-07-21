import data from "./modes-data.json";

export type RuleItem = string | { src: string; text?: string; wide?: boolean };

export type ModeDescription = {
  intro: string;
  users: string[];
  pictos: string[];
};

export type Mode = {
  label: string;
  slug: string;
  picto: string;
  description?: ModeDescription;
  sections: {
    perception: RuleItem[];
    comprehension: RuleItem[];
    commandes: RuleItem[];
  };
};

export const modes = data as Mode[];

export const SECTION_META: Array<{
  key: keyof Mode["sections"];
  title: string;
  description: string;
}> = [
  { key: "perception", title: "Perception", description: "Comment l'utilisateur perçoit l'information : vue, ouïe, contraste, lisibilité." },
  { key: "comprehension", title: "Compréhension", description: "Comment l'information est structurée et rendue compréhensible." },
  { key: "commandes", title: "Commandes", description: "Comment l'utilisateur interagit, manipule et commande l'interface." },
];

export const MODE_DESCRIPTIONS: Record<string, string> = {
  "Facile+": "Simplifier l'interface pour réduire la charge cognitive.",
  "Facile++": "Simplification renforcée pour les profils nécessitant un fort accompagnement.",
  "Vocal+": "Interaction par la voix : commandes et retours vocaux.",
  "Vision+": "Adaptations pour vision basse : contraste, taille, espacement.",
  "Vision++": "Adaptations renforcées pour cécité : lecteurs d'écran, braille.",
  "Lecture+": "Aides à la lecture : police, espacement, balisage du texte.",
  "Lecture++": "Aides à la lecture renforcées pour la dyslexie : couleurs, marges, masques de lecture.",
  "Pointage+": "Adaptation du pointage : cibles larges, tolérance, précision.",
  "Moteur+": "Réduction de l'effort moteur : raccourcis, alternatives, séquences courtes.",
  "Moteur++": "Adaptations renforcées pour défilement automatique du focus et commande unique.",
  "Audio+": "Adaptations pour l'audition : sous-titres, transcriptions, volumes.",
  "LSF+": "Langue des signes française : interprétation, vidéos signées.",
  "Serein+": "Apaisement de l'expérience : focus, absence de pression temporelle.",
  "Microgeste+": "Interaction par micro-gestes : contrôle subtil et précis.",
  "Graphique+": "Graphisme inclusif : codes visuels, cohérence, signalétique.",
};
