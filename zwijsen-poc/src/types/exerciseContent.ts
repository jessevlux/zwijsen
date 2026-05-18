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

/**
 * Placeholder branches — schema staat in HANDOVER.md.
 * Vervang door volledige interface + UI; zie recept in HANDOVER.
 */

/** Zie HANDOVER.md → Opdrachttype: meerkeuze */
export type MeerkeuzeContent = { type: "meerkeuze" };

/** Zie HANDOVER.md → Opdrachttype: koppelen-lijnen */
export type KoppelenLijnenContent = { type: "koppelen-lijnen" };

/** Zie HANDOVER.md → Opdrachttype: invullen-zin */
export type InvullenZinContent = { type: "invullen-zin" };

/** Zie HANDOVER.md — nog geen team-sectie; zie TypePlaceholder */
export type OpenSchrijvenContent = { type: "open-schrijven" };

/** Zie HANDOVER.md → Opdrachttype: markeren */
export type MarkerenContent = { type: "markeren" };

/** Zie HANDOVER.md → Opdrachttype: tabel-invullen */
export type TabelInvullenContent = { type: "tabel-invullen" };

/** Zie HANDOVER.md — nog geen team-sectie; zie TypePlaceholder */
export type VolgordeNummerenContent = { type: "volgorde-nummeren" };

/** Zie HANDOVER.md — content-type rubric (los van werkboek EmojiRubric) */
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
