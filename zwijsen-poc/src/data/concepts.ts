import type { LucideIcon } from "lucide-react";
import { Globe, Layers, Mic, Network, Users } from "lucide-react";
import { zwijsenTokens as Z } from "../theme/zwijsenTokens";

/** Visuele toon per concept: koppelt aan accentkleuren in het design system. */
export type ConceptTone = "info" | "warm" | "success" | "violet" | "amber";

export const toneTokens: Record<
  ConceptTone,
  { accentColor: string; accentSoft: string }
> = {
  info: { accentColor: Z.accentInfo, accentSoft: Z.accentInfoSoft },
  warm: { accentColor: Z.brandOrange, accentSoft: Z.brandOrangeSoft },
  success: { accentColor: Z.accentSuccess, accentSoft: Z.accentSuccessSoft },
  violet: { accentColor: Z.accentViolet, accentSoft: Z.accentVioletSoft },
  amber: { accentColor: Z.accentAmber, accentSoft: Z.accentAmberSoft },
};

export interface Concept {
  id: string;
  number: number;
  title: string;
  /** Langere beschrijving op placeholder-scherm */
  subtitle: string;
  /** Korte regel op dashboard: groep + thema */
  dashboardSubtitle: string;
  Icon: LucideIcon;
  tone: ConceptTone;
  grade: string;
  theme: string;
  description: string;
  didacticGoal: string;
}

/** Actieve concepten op welkomstscherm en topnav. */
export const concepts: Concept[] = [
  {
    id: "concept-kaart",
    number: 1,
    title: "Conceptkaart",
    subtitle: "Semantische Conceptkaart",
    dashboardSubtitle: "Groep 4–8 · Woordrelaties",
    Icon: Network,
    tone: "info",
    grade: "Groep 4–8",
    theme: "Woordrelaties",
    description:
      "Sleep woorden naar het canvas en trek lijnen om relaties aan te geven: synoniemen, tegenstellingen of voorbeelden.",
    didacticGoal:
      "Leerlingen bouwen een visueel semantisch netwerk waardoor ze woorden dieper begrijpen en onthouden.",
  },
  {
    id: "swipe-kaarten",
    number: 2,
    title: "Swipe-kaarten",
    subtitle: "Contextuele Swipe-Kaarten",
    dashboardSubtitle: "Groep 4–8 · Woordbetekenis",
    Icon: Layers,
    tone: "warm",
    grade: "Groep 4–8",
    theme: "Woordbetekenis",
    description:
      "Eén woord per scherm. Swipe naar links, rechts of omhoog om vragen te beantwoorden. Foute kaarten komen terug.",
    didacticGoal:
      "Spaced repetition in een Tinder-achtige interface: lage cognitieve drempel, hoge herhaling.",
  },
  {
    id: "raad-coach",
    number: 3,
    title: "Raad & Coach",
    subtitle: "Coöperatief Raad-en-Coach Spel",
    dashboardSubtitle: "Groep 5–8 · Samenwerken",
    Icon: Users,
    tone: "success",
    grade: "Groep 5–8",
    theme: "Samenwerken",
    description:
      "Twee rollen: de Coach ziet het woord en geeft hints, de Speler raadt. Samen scoren jullie punten.",
    didacticGoal:
      "Kagan coöperatief leren: positieve wederzijdse afhankelijkheid en actieve woordproductie.",
  },
];

/**
 * Tijdelijk gearchiveerd — niet op het dashboard.
 * Heractiveren: items hieronder terug in `concepts` zetten.
 */
export const archivedConcepts: Concept[] = [
  {
    id: "woordenwereld",
    number: 4,
    title: "Woordenwereld",
    subtitle: "Immersieve Woordenwereld",
    dashboardSubtitle: "Groep 4–6 · Poppenspel",
    Icon: Globe,
    tone: "violet",
    grade: "Groep 4–6",
    theme: "Poppenspel",
    description:
      "Verken een interactieve scène van een poppenkaststraatje. Sleep woorden naar de juiste hotspot in de wereld.",
    didacticGoal:
      "Embodied cognition: woorden koppelen aan ruimtelijke, visuele context vergroot de retentie.",
  },
  {
    id: "spraakstudio",
    number: 5,
    title: "Spraakstudio",
    subtitle: "Interactieve Storytelling & Spraakstudio",
    dashboardSubtitle: "Groep 7–8 · Vloggen",
    Icon: Mic,
    tone: "amber",
    grade: "Groep 7–8",
    theme: "Vloggen",
    description:
      "Neem een vlog op met een teleprompter. Spreek de ontbrekende woorden hardop in en zie je publiek reageren.",
    didacticGoal:
      "Oracy: mondeling taalgebruik oefenen in een veilige, gesimuleerde vlog-omgeving.",
  },
];

export const editorWords = [
  { id: "w1", word: "spectaculair", definition: "Indrukwekkend en opvallend" },
  { id: "w2", word: "opzienbarend", definition: "Iets dat veel aandacht trekt" },
  { id: "w3", word: "fotogeniek", definition: "Goed op foto's staan" },
  { id: "w4", word: "recensie", definition: "Een beoordeling van iets, bijv. een film" },
  { id: "w5", word: "compositie", definition: "De manier waarop iets is samengesteld" },
  { id: "w6", word: "afstandelijk", definition: "Op grote afstand; niet dichtbij" },
];
