import type { Workbook } from "../types/workbook";
import { vloggenConceptKaartContent } from "../components/concepts/ConceptKaart/examples";
import { vloggenSwipeContent } from "../components/concepts/SwipeKaarten/examples";
import { vloggenRaadCoachContent } from "../components/concepts/RaadCoach/examples";
import { vloggenInvullenZinContent } from "../components/concepts/InvullenZin/examples";
import { vloggenMeerkeuzeContent } from "../components/concepts/Meerkeuze/examples";
import { vloggenKoppelenContent } from "../components/concepts/Koppelen/examples";
import { vloggenMarkerenContent } from "../components/concepts/Markeren/examples";
import { vloggenTabelContent } from "../components/concepts/TabelInvullen/examples";

export const EXAMPLE_VLOGGEN_WORKBOOK_ID = "wb-example-vloggen" as const;

export const EXAMPLE_VLOGGEN_SOURCE_INTRO_ID = "src-vloggen-intro" as const;
export const EXAMPLE_VLOGGEN_SOURCE_IN_BEELD_ID = "src-vlog-in-beeld" as const;
export const EXAMPLE_VLOGGEN_SOURCE_VLOGSOORTEN_ID = "src-vlog-vlogsoorten" as const;

/**
 * Acht opdrachten — elk interactietype één keer, in leslijn blok 6 Vloggen (PDF):
 * woordenschat → begrip → vlogplan → taal → kritisch lezen → plus (samen oefenen).
 */
export function createVloggenExampleWorkbook(): Workbook {
  const wbId = EXAMPLE_VLOGGEN_WORKBOOK_ID;

  return {
    id: wbId,
    title: "Taaljacht — Groep 8 — Vloggen",
    grade: "Groep 8",
    side: "taakboekje",
    pages: 27,
    origin: "example",
    intro: {
      sectionLabel: "Blok 6 · Taal",
      themeTitle: "Doekje open",
      themeSourceId: EXAMPLE_VLOGGEN_SOURCE_INTRO_ID,
      endTask: "Ik kan een vlog maken en presenteren.",
    },
    rubricGoals: [
      { id: "rg-1", label: "Ik kan vertellen wat kenmerken zijn van vloggen." },
      { id: "rg-2", label: "Ik kan een vlogplan maken." },
      { id: "rg-3", label: "Ik kan mijn vlog presenteren." },
    ],
    exercises: [
      // Les 1–2: woordenschat & begrip (leerdoel: kenmerken vloggen)
      {
        id: "ex-vlog-concept-kaart",
        workbookId: wbId,
        pageNumber: 4,
        type: "concept-kaart",
        difficulty: "a",
        isPlus: false,
        isOwnAnswer: false,
        content: vloggenConceptKaartContent,
      },
      {
        id: "ex-vlog-swipe",
        workbookId: wbId,
        pageNumber: 5,
        type: "swipe-kaarten",
        difficulty: "a",
        isPlus: false,
        isOwnAnswer: false,
        content: vloggenSwipeContent,
      },
      {
        id: "ex-vlog-koppel-betekenis",
        workbookId: wbId,
        pageNumber: 4,
        type: "koppelen-lijnen",
        difficulty: "a",
        isPlus: false,
        isOwnAnswer: false,
        content: vloggenKoppelenContent,
      },
      {
        id: "ex-vlog-mk-recensie",
        workbookId: wbId,
        pageNumber: 4,
        type: "meerkeuze",
        difficulty: "b",
        isPlus: false,
        isOwnAnswer: false,
        content: vloggenMeerkeuzeContent,
      },
      // Les 3: vlogplan (leerdoel: vlogplan maken)
      {
        id: "ex-vlog-tabel-brainstorm",
        workbookId: wbId,
        pageNumber: 9,
        type: "tabel-invullen",
        difficulty: "b",
        isPlus: false,
        isOwnAnswer: true,
        sourceTextId: EXAMPLE_VLOGGEN_SOURCE_VLOGSOORTEN_ID,
        content: vloggenTabelContent,
      },
      // Les 4: taal bij vloggen
      {
        id: "ex-vlog-invullen-taal",
        workbookId: wbId,
        pageNumber: 7,
        type: "invullen-zin",
        difficulty: "b",
        isPlus: false,
        isOwnAnswer: false,
        sourceTextId: EXAMPLE_VLOGGEN_SOURCE_IN_BEELD_ID,
        content: vloggenInvullenZinContent,
      },
      // Les 5–6: kritisch lezen / beoordelen
      {
        id: "ex-vlog-markeren-oordeel",
        workbookId: wbId,
        pageNumber: 12,
        type: "markeren",
        difficulty: "b",
        isPlus: false,
        isOwnAnswer: false,
        sourceTextId: EXAMPLE_VLOGGEN_SOURCE_IN_BEELD_ID,
        content: vloggenMarkerenContent,
      },
      // Plus: samen oefenen (eindtaak voorbereiden)
      {
        id: "ex-vlog-raad-coach",
        workbookId: wbId,
        pageNumber: 22,
        type: "raad-coach",
        difficulty: "c",
        isPlus: true,
        isOwnAnswer: false,
        content: vloggenRaadCoachContent,
      },
    ],
    sources: [
      {
        id: EXAMPLE_VLOGGEN_SOURCE_INTRO_ID,
        kind: "text",
        label: "Thema — Vloggen",
        body: "Wie kent ze niet, de filmpjes waarin iemand vertelt over wat er gebeurd is op een dag, of uitlegt en laat zien hoe iets het beste gedaan kan worden? Die filmpjes noemen we een vlog. In dit blok leer je waar je op moet letten als je een vlog maakt.",
      },
      {
        id: EXAMPLE_VLOGGEN_SOURCE_IN_BEELD_ID,
        kind: "text",
        label: "In beeld of niet?",
        body: "Je kunt een vlog maken met jezelf in beeld — dat wordt persoonlijker en je volgers leren je kennen. Je kunt ook een vlog maken met een voice-over: dan lees je tekst op en is de kans op fouten kleiner, maar het kan afstandelijker overkomen. Kies wat bij jouw onderwerp en publiek past.",
      },
      {
        id: EXAMPLE_VLOGGEN_SOURCE_VLOGSOORTEN_ID,
        kind: "text",
        label: "Ideeën voor een soort vlog",
        body: "Er zijn verschillende vlogsoorten: een challenge, een info-vlog over een hobby, een ervaringsvlog (dagboek), een promotievlog met een recensie, een how-to-do-vlog of een gamevlog. Bedenk welk soort, onderwerp, doel en publiek bij jouw vlog passen.",
      },
    ],
  };
}
