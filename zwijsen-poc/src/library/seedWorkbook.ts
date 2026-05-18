import type { Workbook } from "../types/workbook";
import type {
  InvullenZinContent,
  KoppelenLijnenContent,
  MarkerenContent,
  MeerkeuzeContent,
  TabelInvullenContent,
} from "../types/exerciseContent";
import { vloggenConceptKaartContent } from "../components/concepts/ConceptKaart/examples";
import { vloggenSwipeContent } from "../components/concepts/SwipeKaarten/examples";
import { vloggenRaadCoachContent } from "../components/concepts/RaadCoach/examples";

export const EXAMPLE_VLOGGEN_WORKBOOK_ID = "wb-example-vloggen" as const;

export const EXAMPLE_VLOGGEN_SOURCE_INTRO_ID = "src-vloggen-intro" as const;

/** Skeleton content — triggert TypePlaceholder tot de UI gebouwd is. */
export const vloggenMeerkeuzeSkeleton: MeerkeuzeContent = { type: "meerkeuze" };
export const vloggenKoppelenSkeleton: KoppelenLijnenContent = { type: "koppelen-lijnen" };
export const vloggenInvullenZinSkeleton: InvullenZinContent = { type: "invullen-zin" };
export const vloggenMarkerenSkeleton: MarkerenContent = { type: "markeren" };
export const vloggenTabelSkeleton: TabelInvullenContent = { type: "tabel-invullen" };

/** Voorbeeld-werkboek: drie werkende oefeningen + vijf team-placeholders. */
export function createVloggenExampleWorkbook(): Workbook {
  return {
    id: EXAMPLE_VLOGGEN_WORKBOOK_ID,
    title: "Taaljacht — Groep 8 — Vloggen",
    grade: "Groep 8",
    side: "taakboekje",
    pages: 24,
    origin: "example",
    rubricGoals: [
      { id: "rg-1", label: "Ik kan vertellen wat kenmerken zijn van vloggen." },
      { id: "rg-2", label: "Ik kan een vlogplan maken." },
      { id: "rg-3", label: "Ik kan mijn vlog presenteren." },
    ],
    exercises: [
      {
        id: "ex-example-concept-kaart",
        workbookId: EXAMPLE_VLOGGEN_WORKBOOK_ID,
        pageNumber: 1,
        type: "concept-kaart",
        difficulty: "a",
        isPlus: false,
        isOwnAnswer: false,
        content: vloggenConceptKaartContent,
      },
      {
        id: "ex-example-swipe",
        workbookId: EXAMPLE_VLOGGEN_WORKBOOK_ID,
        pageNumber: 2,
        type: "swipe-kaarten",
        difficulty: "b",
        isPlus: false,
        isOwnAnswer: false,
        content: vloggenSwipeContent,
      },
      {
        id: "ex-example-raad-coach",
        workbookId: EXAMPLE_VLOGGEN_WORKBOOK_ID,
        pageNumber: 3,
        type: "raad-coach",
        difficulty: "c",
        isPlus: true,
        isOwnAnswer: false,
        content: vloggenRaadCoachContent,
      },
      {
        id: "ex-example-meerkeuze",
        workbookId: EXAMPLE_VLOGGEN_WORKBOOK_ID,
        pageNumber: 4,
        type: "meerkeuze",
        difficulty: "b",
        isPlus: false,
        isOwnAnswer: false,
        content: vloggenMeerkeuzeSkeleton,
      },
      {
        id: "ex-example-koppelen",
        workbookId: EXAMPLE_VLOGGEN_WORKBOOK_ID,
        pageNumber: 6,
        type: "koppelen-lijnen",
        difficulty: "a",
        isPlus: false,
        isOwnAnswer: false,
        content: vloggenKoppelenSkeleton,
      },
      {
        id: "ex-example-invullen-zin",
        workbookId: EXAMPLE_VLOGGEN_WORKBOOK_ID,
        pageNumber: 8,
        type: "invullen-zin",
        difficulty: "b",
        isPlus: false,
        isOwnAnswer: false,
        sourceTextId: EXAMPLE_VLOGGEN_SOURCE_INTRO_ID,
        content: vloggenInvullenZinSkeleton,
      },
      {
        id: "ex-example-markeren",
        workbookId: EXAMPLE_VLOGGEN_WORKBOOK_ID,
        pageNumber: 10,
        type: "markeren",
        difficulty: "b",
        isPlus: false,
        isOwnAnswer: false,
        sourceTextId: EXAMPLE_VLOGGEN_SOURCE_INTRO_ID,
        content: vloggenMarkerenSkeleton,
      },
      {
        id: "ex-example-tabel",
        workbookId: EXAMPLE_VLOGGEN_WORKBOOK_ID,
        pageNumber: 12,
        type: "tabel-invullen",
        difficulty: "c",
        isPlus: false,
        isOwnAnswer: false,
        content: vloggenTabelSkeleton,
      },
    ],
    sources: [
      {
        id: EXAMPLE_VLOGGEN_SOURCE_INTRO_ID,
        kind: "text",
        label: "Intro vloggen",
        body: "Een vlog is een korte video waarin jij iets laat zien of vertelt — bijvoorbeeld over een game of film. In dit werkboek oefen je woorden die je in je recensie en je vlogplan kunt gebruiken, zoals recensie, spectaculair en compositie.",
      },
    ],
  };
}
