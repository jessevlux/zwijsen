import type { ConceptBrief } from "../components/concepts/shared/types";
import type { CorrectPair, InventoryCategory, InventoryWord, RaadCoachWord, SwipeCardData } from "./content";

export interface ConceptKaartContent {
  type: "concept-kaart";
  brief: ConceptBrief;
  categories: InventoryCategory[];
  words: InventoryWord[];
  pairs: CorrectPair[];
}

export interface SwipeKaartenContent {
  type: "swipe-kaarten";
  brief: ConceptBrief;
  cards: SwipeCardData[];
}

export interface RaadCoachContent {
  type: "raad-coach";
  brief: ConceptBrief;
  words: RaadCoachWord[];
}

export interface MeerkeuzeContent {
  type: "meerkeuze";
  brief: ConceptBrief;
  question: string;
  options: { id: string; label: string }[];
  correctOptionIds: string[];
  allowMultiple: boolean;
  explanation?: string;
  sourceTextId?: string;
}

export interface InvullenZinContent {
  type: "invullen-zin";
  brief: ConceptBrief;
  template: string;
  blanks: {
    id: string;
    correctAnswers: string[];
    caseSensitive?: boolean;
    wordBank?: string[];
  }[];
  sourceTextId?: string;
}

export interface KoppelenLijnenContent {
  type: "koppelen-lijnen";
  brief: ConceptBrief;
  leftItems: { id: string; label: string }[];
  rightItems: { id: string; label: string }[];
  correctPairs: { leftId: string; rightId: string }[];
  sourceTextId?: string;
}

export interface MarkerenContent {
  type: "markeren";
  brief: ConceptBrief;
  instruction: string;
  text: string;
  correctSpans: { start: number; end: number }[];
  /** Woordsoort in feedback (bijv. oordeelwoord / oordeelwoorden), niet de concrete antwoorden. */
  markingLabel?: { singular: string; plural: string };
  sourceTextId?: string;
}

export interface TabelInvullenContent {
  type: "tabel-invullen";
  brief: ConceptBrief;
  columns: { id: string; header: string }[];
  rows: {
    id: string;
    cells: {
      columnId: string;
      editable: boolean;
      value?: string;
      correctAnswers?: string[];
      placeholder?: string;
    }[];
  }[];
  sourceTextId?: string;
  /** Geen vaste antwoorden: elk ingevuld veld telt als goed (bijv. vlogplan). */
  openAnswers?: boolean;
}

export type OpenSchrijvenContent = { type: "open-schrijven" };
export type VolgordeNummerenContent = { type: "volgorde-nummeren" };
export type RubricContent = { type: "rubric" };

export type ExerciseContent =
  | ConceptKaartContent
  | SwipeKaartenContent
  | RaadCoachContent
  | MeerkeuzeContent
  | InvullenZinContent
  | KoppelenLijnenContent
  | MarkerenContent
  | TabelInvullenContent
  | OpenSchrijvenContent
  | VolgordeNummerenContent
  | RubricContent;
