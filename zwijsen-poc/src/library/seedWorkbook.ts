import type { Workbook } from "../types/workbook";
import { vloggenConceptKaartContent } from "../components/concepts/ConceptKaart/examples";
import { vloggenSwipeContent } from "../components/concepts/SwipeKaarten/examples";
import { vloggenRaadCoachContent } from "../components/concepts/RaadCoach/examples";
import { vloggenInvullenZinContent, vloggenInvullenZinContent2, vloggenInvullenZinContent3 } from "../components/concepts/InvullenZin/examples";
import { vloggenMeerkeuzeContent, vloggenMeerkeuzeContent2, vloggenMeerkeuzeContent3 } from "../components/concepts/Meerkeuze/examples";
import { vloggenKoppelenContent, vloggenKoppelenContent2, vloggenKoppelenContent3 } from "../components/concepts/Koppelen/examples";
import { vloggenMarkerenContent, vloggenMarkerenContent2, vloggenMarkerenContent3 } from "../components/concepts/Markeren/examples";
import { vloggenTabelContent, vloggenTabelContent2, vloggenTabelContent3 } from "../components/concepts/TabelInvullen/examples";

export const EXAMPLE_VLOGGEN_WORKBOOK_ID = "wb-example-vloggen" as const;

export const EXAMPLE_VLOGGEN_SOURCE_INTRO_ID = "src-vloggen-intro" as const;

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
        content: vloggenMeerkeuzeContent,
        variants: [vloggenMeerkeuzeContent2, vloggenMeerkeuzeContent3],
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
        content: vloggenInvullenZinContent,
        variants: [vloggenInvullenZinContent2, vloggenInvullenZinContent3],
      },
      {
        id: "ex-example-koppelen",
        workbookId: EXAMPLE_VLOGGEN_WORKBOOK_ID,
        pageNumber: 6,
        type: "koppelen-lijnen",
        difficulty: "a",
        isPlus: false,
        isOwnAnswer: false,
        content: vloggenKoppelenContent,
        variants: [vloggenKoppelenContent2, vloggenKoppelenContent3],
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
        content: vloggenMarkerenContent,
        variants: [vloggenMarkerenContent2, vloggenMarkerenContent3],
      },
      {
        id: "ex-example-tabel",
        workbookId: EXAMPLE_VLOGGEN_WORKBOOK_ID,
        pageNumber: 12,
        type: "tabel-invullen",
        difficulty: "c",
        isPlus: false,
        isOwnAnswer: false,
        content: vloggenTabelContent,
        variants: [vloggenTabelContent2, vloggenTabelContent3],
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
