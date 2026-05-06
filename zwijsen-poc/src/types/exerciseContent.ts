import type { ConceptBrief } from "../components/concepts/shared/types";
import type { CorrectPair, InventoryCategory, InventoryWord, RaadCoachWord, SwipeCardData } from "./content";

/** Content voor de semantische conceptkaart-oefening. */
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

/** Placeholder branches — nog geen schema; groep vult later in. */
export type MeerkeuzeContent = { type: "meerkeuze" };
export type KoppelenLijnenContent = { type: "koppelen-lijnen" };
export type InvullenZinContent = { type: "invullen-zin" };
export type OpenSchrijvenContent = { type: "open-schrijven" };
export type MarkerenContent = { type: "markeren" };
export type TabelInvullenContent = { type: "tabel-invullen" };
export type VolgordeNummerenContent = { type: "volgorde-nummeren" };
export type RubricContent = { type: "rubric" };

export type ExerciseContent =
  | ConceptKaartContent
  | SwipeKaartenContent
  | RaadCoachContent
  | MeerkeuzeContent
  | KoppelenLijnenContent
  | InvullenZinContent
  | OpenSchrijvenContent
  | MarkerenContent
  | TabelInvullenContent
  | VolgordeNummerenContent
  | RubricContent;
