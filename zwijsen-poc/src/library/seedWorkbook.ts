import type { Workbook } from "../types/workbook";
import { vloggenConceptKaartContent } from "../components/concepts/ConceptKaart/examples";
import { vloggenSwipeContent } from "../components/concepts/SwipeKaarten/examples";
import { vloggenRaadCoachContent } from "../components/concepts/RaadCoach/examples";

export const EXAMPLE_VLOGGEN_WORKBOOK_ID = "wb-example-vloggen" as const;

/** Voorbeeld-werkboek met de drie bestaande oefeningen + Vloggen-content. */
export function createVloggenExampleWorkbook(): Workbook {
  return {
    id: EXAMPLE_VLOGGEN_WORKBOOK_ID,    title: "Taaljacht — Groep 8 — Vloggen",
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
    ],
    sources: [],
  };
}
