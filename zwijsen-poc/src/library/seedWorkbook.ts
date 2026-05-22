import type { Workbook } from "../types/workbook";
import type {
  ConceptKaartContent,
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
export const EXAMPLE_TEST_WORKBOOK_ID = "wb-test-extracted" as const;

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

/**
 * Test-werkboek met de échte conceptkaart-extractie uit het Poppenspel-werkboek.
 * Inhoud komt 1:1 van de Python-pipeline (server output: conceptkaart.json).
 */
const testConceptKaartContent: ConceptKaartContent = {
  type: "concept-kaart",
  brief: {
    themeLabel: "Groep 8 · Taal · Thema: Poppenspel",
    title: "Woordweb voor THEMA",
    situation:
      "Het is bijna zover! Jullie hebben een prachtig poppenspel bedacht en geoefend. Maar er zijn nog wat dingen die je moet onthouden om het spel soepel te laten verlopen. Denk aan de personages, hoe ze zich voelen en wat er allemaal gebeurt tijdens de voorstelling.",
    question:
      "Maak een woordweb waarin je laat zien welke woorden met elkaar verbonden zijn in relatie tot het poppenspel.",
    steps: [
      "stap 1: Kies de belangrijkste woorden uit die je geleerd hebt.",
      "stap 2: Verbind de woorden met lijnen en schrijf op welke relatie er is (bijvoorbeeld 'synoniem', 'tegenstelling').",
      "stap 3: Controleer of alle woorden in het web passen en logisch zijn verbonden.",
    ],
  },
  categories: [
    { id: "rol", title: "Wie speelt mee?", subtitle: "Personen in het verhaal" },
    { id: "gevoel", title: "Hoe voelen de poppen zich?", subtitle: "Emoties en stemmingen" },
    { id: "actie", title: "Wat gebeurt er allemaal?", subtitle: "Handelingen tijdens het spel" },
  ],
  words: [
    {
      id: "de-handpop",
      word: "handpop",
      hint: "een speelpop die je over je hand schuift",
      contextSentence: "We maken handpoppen voor ons poppenspel.",
      categoryId: "rol",
    },
    {
      id: "de-hoofdrolspeler",
      word: "hoofdrolspeler",
      hint: "de belangrijkste persoon in een toneelstuk",
      contextSentence: "De hoofdrolspeler in dit stuk is de koning.",
      categoryId: "rol",
    },
    {
      id: "nerveus",
      word: "nerveus",
      hint: "zenuwachtig",
      contextSentence: "Pieter is nerveus voor zijn spreekbeurt.",
      categoryId: "gevoel",
    },
    {
      id: "paniekerig",
      word: "paniekerig",
      hint: "als je heel bang bent en niet weet wat je moet doen",
      contextSentence: "‘We kunnen er niet meer uit!’, roept Iza paniekerig.",
      categoryId: "gevoel",
    },
    {
      id: "opkomen",
      word: "opkomen",
      hint: "het toneel oplopen",
      contextSentence: "Bas komt op en begint zijn verhaal te vertellen.",
      categoryId: "actie",
    },
    {
      id: "afgaan",
      word: "afgaan",
      hint: "van het toneel aflopen",
      contextSentence: "‘Dan ga ik maar,’ zegt de toneelspeler en hij gaat af.",
      categoryId: "actie",
    },
    {
      id: "het-poppenspel",
      word: "poppenspel",
      hint: "toneel dat met poppen wordt gespeeld",
      contextSentence: "Het poppenspel wordt met vijf poppen gespeeld.",
      categoryId: "actie",
    },
    {
      id: "het-karakter",
      word: "karakter",
      hint: "hoe je vanbinnen bent",
      contextSentence: "Mijn buurmeisje is heel aardig, ze heeft een lief karakter.",
      categoryId: "rol",
    },
  ],
  pairs: [
    { word1: "nerveus", word2: "paniekerig", relation: "synoniem", bidirectional: true },
    { word1: "de-hoofdrolspeler", word2: "de-handpop", relation: "voorbeeld van", bidirectional: false },
    { word1: "opkomen", word2: "afgaan", relation: "tegenstelling", bidirectional: true },
    { word1: "het-poppenspel", word2: "de-handpop", relation: "onderdeel van", bidirectional: false },
  ],
};

export function createTestExtractedWorkbook(): Workbook {
  return {
    id: EXAMPLE_TEST_WORKBOOK_ID,
    title: "Test",
    grade: "Groep 8",
    side: "taakboekje",
    pages: 1,
    origin: "example",
    exercises: [
      {
        id: "ex-test-conceptkaart",
        workbookId: EXAMPLE_TEST_WORKBOOK_ID,
        pageNumber: 1,
        type: "concept-kaart",
        difficulty: "b",
        isPlus: false,
        isOwnAnswer: false,
        content: testConceptKaartContent,
      },
    ],
    sources: [],
  };
}
