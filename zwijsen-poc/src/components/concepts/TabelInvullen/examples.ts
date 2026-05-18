import type { ConceptBrief } from "../shared/types";
import type { TabelInvullenContent } from "../../../types/exerciseContent";

export const vloggenTabelBrief: ConceptBrief = {
  title: "Maak je vlogplan",
  themeLabel: "Groep 8 · Taal · Thema: Vloggen",
  situation: "Een goed plan helpt je vlog strak te presenteren.",
  question: "Vul de tabel in.",
  steps: ["Lees de koppen.", "Vul de lege vakjes in.", "Controleer."],
};

export const vloggenTabelContent: TabelInvullenContent = {
  type: "tabel-invullen",
  brief: vloggenTabelBrief,
  columns: [
    { id: "onderdeel", header: "Onderdeel" },
    { id: "invulling", header: "Jouw plan" },
  ],
  rows: [
    {
      id: "row-1",
      cells: [
        { columnId: "onderdeel", editable: false, value: "Onderwerp" },
        { columnId: "invulling", editable: true, correctAnswers: ["recensie", "game", "film"] },
      ],
    },
    {
      id: "row-2",
      cells: [
        { columnId: "onderdeel", editable: false, value: "Toon" },
        { columnId: "invulling", editable: true, correctAnswers: ["lyrisch", "afstandelijk", "enthousiast"] },
      ],
    },
  ],
};

export const vloggenTabelContent2: TabelInvullenContent = {
  type: "tabel-invullen",
  brief: {
    title: "Mijn vlogteam",
    themeLabel: "Groep 8 · Taal · Thema: Vloggen",
    situation: "Je werkt met anderen aan je vlog.",
    question: "Vul je team in.",
    steps: ["Lees de koppen.", "Vul de rollen in.", "Controleer."],
  },
  columns: [
    { id: "rol", header: "Rol" },
    { id: "naam", header: "Persoon" },
  ],
  rows: [
    {
      id: "row-1",
      cells: [
        { columnId: "rol", editable: false, value: "Presentator" },
        { columnId: "naam", editable: true, correctAnswers: ["presentator", "ik", "hoofdpersoon"] },
      ],
    },
    {
      id: "row-2",
      cells: [
        { columnId: "rol", editable: false, value: "Cameraman" },
        { columnId: "naam", editable: true, correctAnswers: ["cameraman", "filmer", "filmend"] },
      ],
    },
    {
      id: "row-3",
      cells: [
        { columnId: "rol", editable: false, value: "Geluidsmedewerker" },
        { columnId: "naam", editable: true, correctAnswers: ["geluid", "geluidstechnicus", "geluidsman"] },
      ],
    },
  ],
};

export const vloggenTabelContent3: TabelInvullenContent = {
  type: "tabel-invullen",
  brief: {
    title: "Vloguitrusting",
    themeLabel: "Groep 8 · Taal · Thema: Vloggen",
    situation: "Je maakt een checklist voor je uitrusting.",
    question: "Vul aan wat je nodig hebt.",
    steps: ["Lees wat je nodig hebt.", "Vul aan of je het hebt.", "Controleer."],
  },
  columns: [
    { id: "apparaat", header: "Apparaat" },
    { id: "nodig", header: "Nodig?" },
  ],
  rows: [
    {
      id: "row-1",
      cells: [
        { columnId: "apparaat", editable: false, value: "Camera" },
        { columnId: "nodig", editable: true, correctAnswers: ["ja", "JA", "essentieel", "zeker"] },
      ],
    },
    {
      id: "row-2",
      cells: [
        { columnId: "apparaat", editable: false, value: "Microfoon" },
        { columnId: "nodig", editable: true, correctAnswers: ["ja", "JA", "belangrijk", "zeker"] },
      ],
    },
    {
      id: "row-3",
      cells: [
        { columnId: "apparaat", editable: false, value: "Statief" },
        { columnId: "nodig", editable: true, correctAnswers: ["ja", "JA", "handig", "zeker"] },
      ],
    },
  ],
};
