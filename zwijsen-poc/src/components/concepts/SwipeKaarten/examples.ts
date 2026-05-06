import type { ConceptBrief } from "../shared/types";
import type { SwipeKaartenContent } from "../../../types/exerciseContent";
import type { SwipeCardData } from "../../../types/content";

export const vloggenSwipeBrief: ConceptBrief = {
  title: "Swipe-kaarten — Vloggen",
  themeLabel: "Groep 8 · Taal · Thema: Vloggen",
  situation:
    "Sleep de kaart naar links of rechts om het woord te kiezen dat in de zin past. Omhoog = even lastig, dan komt de kaart later nog een keer terug.",
  question: "Welk woord past in de zin? Kies met een swipe of met de knoppen onderaan.",
  steps: [
    "Lees de zin met het gat. Links en rechts staan twee woorden.",
    "Sleep de kaart naar het woord dat past — of tik op de knop eronder.",
    "Omhoog = lastig: de kaart gaat straks nog een keer in de stapel.",
  ],
};

export const vloggenSwipeCards: SwipeCardData[] = [
  {
    id: "s1",
    prompt: "De finale van gisteren was echt ____!",
    left: { word: "afstandelijk", isCorrect: false },
    right: { word: "spectaculair", isCorrect: true },
    explanation: "Spectaculair = heel indrukwekkend; past bij een spannende finale.",
  },
  {
    id: "s2",
    prompt: "Zijn recensie klonk heel ____, bijna alsof hij het product niet mocht.",
    left: { word: "lyrisch", isCorrect: false },
    right: { word: "afstandelijk", isCorrect: true },
    explanation: "Afstandelijk = koel en zonder veel enthousiasme.",
  },
  {
    id: "s3",
    prompt: "Het nieuws over de film was meteen ____ op social media.",
    left: { word: "opzienbarend", isCorrect: true },
    right: { word: "bescheiden", isCorrect: false },
    explanation: "Opzienbarend = valt op en trekt veel aandacht.",
  },
  {
    id: "s4",
    prompt: "In mijn vlog geef ik een korte ____ over de nieuwe game.",
    left: { word: "beoordeling", isCorrect: false },
    right: { word: "recensie", isCorrect: true },
    explanation: "Een recensie is een uitgebreidere beoordeling met argumenten.",
  },
  {
    id: "s5",
    prompt: "Let op de ____ van je shot: waar staat je gezicht in het kader?",
    left: { word: "compositie", isCorrect: true },
    right: { word: "recensie", isCorrect: false },
    explanation: "Compositie = hoe je het beeld opbouwt en kadreert.",
  },
  {
    id: "s6",
    prompt: "Alles wat je in één shot ziet, noemen we het ____.",
    left: { word: "spectaculair", isCorrect: false },
    right: { word: "beeld", isCorrect: true },
    explanation: "Het beeld = wat de kijker in één shot te zien krijgt.",
  },
];

export const vloggenSwipeContent: SwipeKaartenContent = {
  type: "swipe-kaarten",
  brief: vloggenSwipeBrief,
  cards: vloggenSwipeCards,
};
