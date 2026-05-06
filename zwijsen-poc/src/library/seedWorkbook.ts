import type { Workbook } from "../types/workbook";
import { vloggenConceptKaartContent } from "../components/concepts/ConceptKaart/examples";
import { vloggenSwipeContent } from "../components/concepts/SwipeKaarten/examples";
import { vloggenRaadCoachContent } from "../components/concepts/RaadCoach/examples";

const WB_ID = "wb-example-vloggen";

/** Voorbeeld-werkboek met de drie bestaande oefeningen + Vloggen-content. */
export function createVloggenExampleWorkbook(): Workbook {
  return {
    id: WB_ID,
    title: "Taaljacht — Groep 8 — Vloggen",
    grade: "Groep 8",
    side: "taakboekje",
    pages: 24,
    origin: "example",
    exercises: [
      {
        id: "ex-example-concept-kaart",
        workbookId: WB_ID,
        pageNumber: 1,
        type: "concept-kaart",
        difficulty: "a",
        isPlus: false,
        isOwnAnswer: false,
        content: vloggenConceptKaartContent,
      },
      {
        id: "ex-example-swipe",
        workbookId: WB_ID,
        pageNumber: 2,
        type: "swipe-kaarten",
        difficulty: "b",
        isPlus: false,
        isOwnAnswer: false,
        content: vloggenSwipeContent,
      },
      {
        id: "ex-example-raad-coach",
        workbookId: WB_ID,
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
