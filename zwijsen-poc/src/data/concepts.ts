export interface Concept {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  emoji: string;
  color: string;
  colorLight: string;
  colorText: string;
  grade: string;
  theme: string;
  description: string;
  didacticGoal: string;
}

export const concepts: Concept[] = [
  {
    id: "concept-kaart",
    number: 1,
    title: "Conceptkaart",
    subtitle: "Semantische Conceptkaart",
    emoji: "🕸️",
    color: "#3B82F6",
    colorLight: "#DBEAFE",
    colorText: "#1D4ED8",
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
    emoji: "🃏",
    color: "#FF7A35",
    colorLight: "#FFD4B8",
    colorText: "#C2410C",
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
    emoji: "🤝",
    color: "#22C55E",
    colorLight: "#DCFCE7",
    colorText: "#15803D",
    grade: "Groep 5–8",
    theme: "Samenwerken",
    description:
      "Twee rollen: de Coach ziet het woord en geeft hints, de Speler raadt. Samen scoren jullie punten.",
    didacticGoal:
      "Kagan coöperatief leren: positieve wederzijdse afhankelijkheid en actieve woordproductie.",
  },
  {
    id: "woordenwereld",
    number: 4,
    title: "Woordenwereld",
    subtitle: "Immersieve Woordenwereld",
    emoji: "🎭",
    color: "#A855F7",
    colorLight: "#F3E8FF",
    colorText: "#7E22CE",
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
    emoji: "🎬",
    color: "#FACC15",
    colorLight: "#FEF9C3",
    colorText: "#854D0E",
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
