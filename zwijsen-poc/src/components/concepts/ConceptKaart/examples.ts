import type { ConceptBrief } from "../shared/types";
import type { ConceptKaartContent } from "../../../types/exerciseContent";
import type { CorrectPair, InventoryCategory, InventoryWord } from "../../../types/content";

export const vloggenConceptKaartBrief: ConceptBrief = {
  title: "Woordweb voor je vlog-recensie",
  themeLabel: "Groep 8 · Taal · Thema: Vloggen",
  situation:
    "Je gaat een vlog opnemen over een nieuwe game of film! Maak hieronder je woordweb, zodat je precies weet welke woorden je in je video kunt gebruiken.",
  question:
    "Verbind de woorden met elkaar. Welke woorden zijn een synoniem of juist een tegenstelling van elkaar?",
  steps: [
    "Sleep twee woorden uit de lijst naar het lege veld.",
    "Wijs een woord aan op het veld tot je kleine puntjes ziet. Trek een lijn van het ene naar het andere woord.",
    "Kies hoe de woorden bij elkaar horen. Tip: Weet je de betekenis even niet? Wijs het woord aan voor een hint!",
  ],
};

export const vloggenInventoryCategories: InventoryCategory[] = [
  { id: "oordeel", title: "Wat vind je?", subtitle: "Je mening over iets" },
  { id: "toon", title: "Hoe voelt het?", subtitle: "Sfeer van je verhaal" },
  { id: "beeld", title: "Wat maak je?", subtitle: "Techniek op het scherm" },
];

export const vloggenInventoryWords: InventoryWord[] = [
  {
    id: "recensie",
    word: "recensie",
    hint: "tekst of video waarin je iets beoordeelt",
    contextSentence:
      "In een recensie vertel je wat je vindt van bijvoorbeeld een game of film — met argumenten en voorbeelden.",
    categoryId: "oordeel",
  },
  {
    id: "beoordeling",
    word: "beoordeling",
    hint: "je oordeel geven met cijfers of punten",
    contextSentence:
      "Een beoordeling is breder: ook een korte reactie of een rapportcijfer is een manier om iets te beoordelen.",
    categoryId: "oordeel",
  },
  {
    id: "spectaculair",
    word: "spectaculair",
    hint: "heel indrukwekkend, groot en meeslepend",
    contextSentence:
      "Gebruik dit woord als een scene echt wow is: veel actie, grootse beelden of een knallend einde.",
    categoryId: "toon",
  },
  {
    id: "opzienbarend",
    word: "opzienbarend",
    hint: "valt meteen op, trekt aandacht",
    contextSentence:
      "Zoiets zorgt voor verrassing bij je kijkers: opvallend, bijzonder of gesprek van de dag.",
    categoryId: "toon",
  },
  {
    id: "lyrisch",
    word: "lyrisch",
    hint: "warm, enthousiast, vol lof",
    contextSentence:
      "Je praat lyrisch als je vol lof bent en bijna gaat zingen van genot — heel positief en meelevend.",
    categoryId: "toon",
  },
  {
    id: "afstandelijk",
    word: "afstandelijk",
    hint: "koel, zakelijk, weinig emotie",
    contextSentence:
      "Afstandelijk klink je als je neutraal blijft en weinig emotie laat zien — bijna het tegenovergestelde van lyrisch.",
    categoryId: "toon",
  },
  {
    id: "compositie",
    word: "compositie",
    hint: "opbouw van delen in één shot (kader, lijnen, vlakken)",
    contextSentence:
      "Bij een schilderij of op video: compositie is hoe je vormen, lijnen en lege ruimte verdeelt zodat het één geheel wordt — niet hetzelfde als ‘goed op een foto staan’.",
    categoryId: "beeld",
  },
  {
    id: "het-beeld",
    word: "beeld",
    hint: "wat je in één shot op het scherm ziet (als geheel)",
    contextSentence:
      "In je vlog is ‘het beeld’ alles wat de kijker in één shot te zien krijgt: personen, decor, tekst op scherm, enzovoort. Hoe je dat ordent, noemen we compositie.",
    categoryId: "beeld",
  },
];

export const vloggenCorrectPairs: CorrectPair[] = [
  {
    word1: "spectaculair",
    word2: "opzienbarend",
    relation: "synoniem",
    bidirectional: true,
  },
  {
    word1: "lyrisch",
    word2: "afstandelijk",
    relation: "tegenstelling",
    bidirectional: true,
  },
  {
    word1: "compositie",
    word2: "het-beeld",
    relation: "onderdeel van",
    bidirectional: false,
  },
  {
    word1: "recensie",
    word2: "beoordeling",
    relation: "voorbeeld van",
    bidirectional: false,
  },
];

export const vloggenConceptKaartContent: ConceptKaartContent = {
  type: "concept-kaart",
  brief: vloggenConceptKaartBrief,
  categories: vloggenInventoryCategories,
  words: vloggenInventoryWords,
  pairs: vloggenCorrectPairs,
};
