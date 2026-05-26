import type { ConceptBrief } from "../shared/types";
import type { MeerkeuzeContent } from "../../../types/exerciseContent";

export const vloggenMeerkeuzeBrief: ConceptBrief = {
  title: "Wat is een recensie?",
  themeLabel: "Groep 8 · Taal · Thema: Vloggen",
  situation: "Je bereidt je vlog voor en wilt het juiste woord gebruiken.",
  question: "Welke zin beschrijft een recensie het best?",
  steps: ["Lees de vraag.", "Kies één antwoord.", "Bekijk de uitleg."],
};

export const vloggenMeerkeuzeContent: MeerkeuzeContent = {
  type: "meerkeuze",
  brief: vloggenMeerkeuzeBrief,
  question: "Wat is een recensie?",
  options: [
    { id: "a", label: "Een korte reactie zonder argumenten" },
    { id: "b", label: "Tekst of video waarin je iets beoordeelt met argumenten" },
    { id: "c", label: "Alleen een cijfer op een schaal" },
  ],
  correctOptionIds: ["b"],
  allowMultiple: false,
  explanation:
    "Een recensie bevat je mening én onderbouwing — niet alleen een cijfer. Je geeft argumenten waarom je wat vindt.",
};

export const vloggenMeerkeuzeContent2: MeerkeuzeContent = {
  type: "meerkeuze",
  brief: {
    title: "Soorten vlogs",
    themeLabel: "Groep 8 · Taal · Thema: Vloggen",
    situation: "Je wilt kiezen welk soort vlog je maakt.",
    question: "Welke vlogs bestaan er?",
    steps: ["Lees de opties.", "Kies alle juiste antwoorden.", "Controleer."],
  },
  question: "Welke soorten vlogs zijn er? (Selecteer alles wat waar is)",
  options: [
    { id: "a", label: "Speelfilm vlogs met script en acteurs" },
    { id: "b", label: "Dagvlog waarin je je dag deelt" },
    { id: "c", label: "Educatieve vlog die iets uitlegt" },
    { id: "d", label: "Unboxing vlog waarbij je iets uitpakt" },
  ],
  correctOptionIds: ["b", "c", "d"],
  allowMultiple: true,
  explanation: "Speelfilms zijn geen vlogs. Vlogs zijn meestal echte, humoristische of informatieve video's.",
};

export const vloggenMeerkeuzeContent3: MeerkeuzeContent = {
  type: "meerkeuze",
  brief: {
    title: "Vlogplan maken",
    themeLabel: "Groep 8 · Taal · Thema: Vloggen",
    situation: "Je begint met plannen voor je vlog.",
    question: "Wat hoort in je vlogplan?",
    steps: ["Lees de vraag.", "Kies het beste antwoord.", "Lees de uitleg."],
  },
  question: "Wat is het meest belangrijk voor je vlogplan?",
  options: [
    { id: "a", label: "De beste camera kopen" },
    { id: "b", label: "Duidelijk bepalen wat het onderwerp is en wie je publiek" },
    { id: "c", label: "Zoveel mogelijk special effects gebruiken" },
  ],
  correctOptionIds: ["b"],
  allowMultiple: false,
  explanation: "Een goed plan begint met helder weten wat je wilt zeggen en voor wie. Dan pas volgen de technische keuzes.",
};
