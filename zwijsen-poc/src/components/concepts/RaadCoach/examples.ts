import type { ConceptBrief } from "../shared/types";
import type { RaadCoachContent } from "../../../types/exerciseContent";
import type { RaadCoachWord } from "../../../types/content";

export const vloggenRaadCoachBrief: ConceptBrief = {
  title: "Raad & Coach — solo",
  themeLabel: "Groep 8 · Taal · Thema: Vloggen",
  situation:
    "De coach op het scherm geeft je hints over één woord. Jij raadt het door te typen. Extra letters of een voorbeeldzin kosten punten — hoe minder hulp, hoe hoger je score.",
  question: "Raad het woord van de coach. Typ je antwoord en gebruik hints alleen als je echt vastloopt.",
  steps: [
    "Lees de categorie en de korte definitie. Het geheime woord zie je als streepjes.",
    "Typ je antwoord en druk op controleren — of vraag een letter of voorbeeldzin (dat kost punten).",
    "Verzamel zoveel mogelijk punten. Een goede reeks goede antwoorden geeft een kleine bonus!",
  ],
};

export const vloggenRaadCoachWords: RaadCoachWord[] = [
  {
    id: "recensie",
    word: "recensie",
    display: "recensie",
    definition: "tekst of video waarin je iets beoordeelt",
    contextSentence:
      "In een recensie vertel je wat je vindt van bijvoorbeeld een game of film — met argumenten en voorbeelden.",
    category: "Wat vind je?",
  },
  {
    id: "beoordeling",
    word: "beoordeling",
    display: "beoordeling",
    definition: "je oordeel geven met cijfers of punten",
    contextSentence:
      "Een beoordeling is breder: ook een korte reactie of een rapportcijfer is een manier om iets te beoordelen.",
    category: "Wat vind je?",
  },
  {
    id: "spectaculair",
    word: "spectaculair",
    display: "spectaculair",
    definition: "heel indrukwekkend, groot en meeslepend",
    contextSentence:
      "Gebruik dit woord als een scene echt wow is: veel actie, grootse beelden of een knallend einde.",
    category: "Hoe voelt het?",
  },
  {
    id: "opzienbarend",
    word: "opzienbarend",
    display: "opzienbarend",
    definition: "valt meteen op, trekt aandacht",
    contextSentence:
      "Zoiets zorgt voor verrassing bij je kijkers: opvallend, bijzonder of gesprek van de dag.",
    category: "Hoe voelt het?",
  },
  {
    id: "lyrisch",
    word: "lyrisch",
    display: "lyrisch",
    definition: "warm, enthousiast, vol lof",
    contextSentence:
      "Je praat lyrisch als je vol lof bent en bijna gaat zingen van genot — heel positief en meelevend.",
    category: "Hoe voelt het?",
  },
  {
    id: "compositie",
    word: "compositie",
    display: "compositie",
    definition: "opbouw van delen in één shot (kader, lijnen, vlakken)",
    contextSentence:
      "Bij een schilderij of op video: compositie is hoe je vormen, lijnen en lege ruimte verdeelt zodat het één geheel wordt — niet hetzelfde als ‘goed op een foto staan’.",
    category: "Wat maak je?",
  },
];

export const vloggenRaadCoachContent: RaadCoachContent = {
  type: "raad-coach",
  brief: vloggenRaadCoachBrief,
  words: vloggenRaadCoachWords,
};
