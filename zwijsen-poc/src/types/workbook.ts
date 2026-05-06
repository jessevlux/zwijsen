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
}
