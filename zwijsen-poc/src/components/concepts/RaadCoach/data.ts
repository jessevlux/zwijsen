import type { ConceptBrief } from "../shared/types";

export interface RaadCoachWord {
  id: string;
  /** Klein geschreven voor vergelijking en slots */
  word: string;
  /** Weergave na reveal (zelfde als word voor deze set) */
  display: string;
  definition: string;
  contextSentence: string;
  /** Categorie-titel uit ConceptKaart (bijv. "Wat vind je?") */
  category: string;
}

export const raadCoachAssignmentContext: ConceptBrief = {
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

/** Zes woorden uit dezelfde woordenschat als ConceptKaart */
export const raadCoachWords: RaadCoachWord[] = [
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

export const ROUND_START_SCORE = 100;
export const LETTER_HINT_COST = 15;
export const CONTEXT_HINT_COST = 25;
export const WRONG_GUESS_PENALTY = 5;
export const STREAK_BONUS = 5;
export const STREAK_BONUS_AT = 2;

export function stripAccents(s: string): string {
  return s.normalize("NFD").replace(/\p{M}/gu, "");
}

export function normalizeAnswer(s: string): string {
  return stripAccents(s.trim().toLowerCase());
}

export function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const row = new Array<number>(n + 1);
  for (let j = 0; j <= n; j++) row[j] = j;
  for (let i = 1; i <= m; i++) {
    let prev = row[0];
    row[0] = i;
    for (let j = 1; j <= n; j++) {
      const tmp = row[j];
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + cost);
      prev = tmp;
    }
  }
  return row[n];
}

/** Exact match of genormaliseerde strings, of Levenshtein-afstand ≤ 1 (kleine tikfout). */
export function isGuessCorrect(guess: string, targetWord: string): boolean {
  const g = normalizeAnswer(guess);
  const t = normalizeAnswer(targetWord);
  if (g.length === 0) return false;
  if (g === t) return true;
  return levenshtein(g, t) <= 1;
}

/** Vervangt het woord in de zin door een gat (case-insensitive). */
export function maskWordInContext(sentence: string, word: string): string {
  const w = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return sentence.replace(new RegExp(w, "gi"), "____");
}
