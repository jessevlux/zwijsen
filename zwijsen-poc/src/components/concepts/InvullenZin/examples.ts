import type { ConceptBrief } from "../shared/types";
import type { InvullenZinContent } from "../../../types/exerciseContent";

export const vloggenInvullenZinBrief: ConceptBrief = {
  title: "Vul het woord in",
  themeLabel: "Groep 8 · Taal · Thema: Vloggen",
  situation: "Je schrijft de voice-over voor je vlog.",
  question: "Welk woord past in het gat?",
  steps: ["Lees de zin.", "Kies of typ het woord.", "Controleer."],
};

export const vloggenInvullenZinContent: InvullenZinContent = {
  type: "invullen-zin",
  brief: vloggenInvullenZinBrief,
  template:
    "De finale van gisteren was echt {{blank-1}}! Ik vond de {{blank-2}} echt bijzonder.",
  blanks: [
    {
      id: "blank-1",
      correctAnswers: ["spectaculair", "indrukwekkend", "opzienbarend"],
      caseSensitive: false,
      wordBank: ["afstandelijk", "spectaculair", "lyrisch", "opzienbarend"],
    },
    {
      id: "blank-2",
      correctAnswers: ["compositie", "opzet", "samenstelling"],
      caseSensitive: false,
      wordBank: ["compositie", "afstandelijkheid", "lyriek"],
    },
  ],
  sourceTextId: "src-vloggen-intro",
};

export const vloggenInvullenZinContent2: InvullenZinContent = {
  type: "invullen-zin",
  brief: vloggenInvullenZinBrief,
  template:
    "Mijn {{blank-1}} was echt {{blank-2}} dit keer. Ik ben trots op het {{blank-3}}.",
  blanks: [
    {
      id: "blank-1",
      correctAnswers: ["vlog", "video", "opname"],
      caseSensitive: false,
      wordBank: ["vlog", "script", "opname", "montage"],
    },
    {
      id: "blank-2",
      correctAnswers: ["geslaagd", "goed", "voorspoedig"],
      caseSensitive: false,
      wordBank: ["geslaagd", "moeilijk", "goed", "ingewikkeld"],
    },
    {
      id: "blank-3",
      correctAnswers: ["resultaat", "eindproduct", "werk"],
      caseSensitive: false,
      wordBank: ["resultaat", "idee", "werk", "plan"],
    },
  ],
  sourceTextId: "src-vloggen-intro",
};

export const vloggenInvullenZinContent3: InvullenZinContent = {
  type: "invullen-zin",
  brief: vloggenInvullenZinBrief,
  template:
    "Voor een goede vlog heb je {{blank-1}}, {{blank-2}} en veel {{blank-3}} nodig.",
  blanks: [
    {
      id: "blank-1",
      correctAnswers: ["planning", "voorbereiding", "plan"],
      caseSensitive: false,
      wordBank: ["planning", "geluid", "plan", "licht"],
    },
    {
      id: "blank-2",
      correctAnswers: ["creativiteit", "ideeën", "verbeelding"],
      caseSensitive: false,
      wordBank: ["creativiteit", "geld", "verbeelding", "tijd"],
    },
    {
      id: "blank-3",
      correctAnswers: ["oefening", "praktijk", "repetitie"],
      caseSensitive: false,
      wordBank: ["oefening", "kritiek", "repetitie", "hulp"],
    },
  ],
  sourceTextId: "src-vloggen-intro",
};
