import type { ExerciseContent } from "./exerciseContent";

export type ExerciseType =
  | "concept-kaart"
  | "swipe-kaarten"
  | "raad-coach"
  | "meerkeuze"
  | "koppelen-lijnen"
  | "invullen-zin"
  | "open-schrijven"
  | "markeren"
  | "tabel-invullen"
  | "volgorde-nummeren"
  | "rubric";

export type Difficulty = "a" | "b" | "c";
export type BookSide = "leskant" | "taakboekje";

export interface SourceText {
  id: string;
  kind: "text" | "image" | "poem" | "letter" | "strip";
  label: string;
  body?: string;
}

/** Leerdoel voor de interactieve zelfevaluatierubric aan het begin van een werkboek. */
export interface RubricGoal {
  id: string;
  label: string;
}

/** Thema- en eindtaak-context voor het beginscherm (uit het taakboek). */
export interface WorkbookIntroContext {
  /** Bv. "Blok 6 · Taal" */
  sectionLabel?: string;
  /** Bv. "Doekje open" */
  themeTitle?: string;
  /** Bron-id uit `sources` voor de intro-paragraaf */
  themeSourceId?: string;
  /** Eindtaak in één zin */
  endTask?: string;
}

export interface Exercise {
  id: string;
  workbookId: string;
  pageNumber: number;
  type: ExerciseType;
  difficulty: Difficulty;
  isPlus: boolean;
  isOwnAnswer: boolean;
  sourceTextId?: string;
  content?: ExerciseContent;
  variants?: ExerciseContent[];
}

export interface Workbook {
  id: string;
  title: string;
  grade: string;
  side: BookSide;
  pages: number;
  origin: "example" | "imported";
  importedAt?: string;
  exercises: Exercise[];
  sources: SourceText[];
  /** Optioneel: zelfevaluatie vóór opdrachten; ontbrekend of leeg = rubricscherm overslaan. */
  rubricGoals?: RubricGoal[];
  /** Optioneel: thema en eindtaak op het beginscherm */
  intro?: WorkbookIntroContext;
}
