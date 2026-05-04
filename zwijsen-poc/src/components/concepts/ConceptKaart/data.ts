export type Relation = "synoniem" | "tegenstelling" | "onderdeel van" | "voorbeeld van";

export interface InventoryWord {
  id: string;
  word: string;
  hint: string;
}

export interface CorrectPair {
  word1: string;
  word2: string;
  relation: Relation;
  /** Accept both directions */
  bidirectional?: boolean;
}

export const relations: { value: Relation; label: string; emoji: string; color: string }[] = [
  { value: "synoniem",      label: "Synoniem",       emoji: "🔵", color: "#3B82F6" },
  { value: "tegenstelling", label: "Tegenstelling",  emoji: "🔴", color: "#EF4444" },
  { value: "onderdeel van", label: "Onderdeel van",  emoji: "🟡", color: "#F59E0B" },
  { value: "voorbeeld van", label: "Voorbeeld van",  emoji: "🟢", color: "#22C55E" },
];

/** Woordenschat Groep 8 — Taal Jacht — Thema: Vloggen */
export const inventoryWords: InventoryWord[] = [
  { id: "spectaculair",  word: "spectaculair",  hint: "Heel indrukwekkend" },
  { id: "opzienbarend",  word: "opzienbarend",  hint: "Trekt veel aandacht" },
  { id: "afstandelijk",  word: "afstandelijk",  hint: "Niet warm of dichtbij" },
  { id: "lyrisch",       word: "lyrisch",       hint: "Vol lof en enthousiasme" },
  { id: "recensie",      word: "recensie",      hint: "Beoordeling van iets" },
  { id: "beoordeling",   word: "beoordeling",   hint: "Oordeel geven over iets" },
  { id: "fotogeniek",    word: "fotogeniek",    hint: "Staat goed op foto's" },
  { id: "compositie",    word: "compositie",    hint: "Hoe iets is samengesteld" },
];

/**
 * Correcte verbindingen. De validatielogica accepteert beide richtingen
 * wanneer bidirectional = true.
 */
export const correctPairs: CorrectPair[] = [
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
    word1: "recensie",
    word2: "beoordeling",
    relation: "synoniem",
    bidirectional: true,
  },
  {
    word1: "compositie",
    word2: "fotogeniek",
    relation: "onderdeel van",
    bidirectional: false,
    // "compositie is een onderdeel van wat fotogeniek maakt"
  },
];

export function validateConnection(
  word1: string,
  word2: string,
  relation: Relation
): boolean {
  return correctPairs.some((pair) => {
    const directMatch =
      pair.word1 === word1 && pair.word2 === word2 && pair.relation === relation;
    const reverseMatch =
      pair.bidirectional &&
      pair.word1 === word2 &&
      pair.word2 === word1 &&
      pair.relation === relation;
    return directMatch || reverseMatch;
  });
}
