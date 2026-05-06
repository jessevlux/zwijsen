/**
 * Gedeelde content-types voor oefeningen en werkboek-import.
 * TODO(handover): breid uit zodra nieuwe vraagtypes een eigen content-schema krijgen.
 */

export type Relation = "synoniem" | "tegenstelling" | "onderdeel van" | "voorbeeld van";

export interface InventoryCategory {
  id: string;
  title: string;
  subtitle: string;
}

export interface InventoryWord {
  id: string;
  word: string;
  hint: string;
  contextSentence: string;
  categoryId: string;
}

export interface CorrectPair {
  word1: string;
  word2: string;
  relation: Relation;
  bidirectional?: boolean;
}

export type Choice = { word: string; isCorrect: boolean };

export interface SwipeCardData {
  id: string;
  prompt: string;
  left: Choice;
  right: Choice;
  explanation: string;
}

export interface RaadCoachWord {
  id: string;
  word: string;
  display: string;
  definition: string;
  contextSentence: string;
  category: string;
}
