import type { ConceptBrief } from "../shared/types";
import type { TabelInvullenContent } from "../../../types/exerciseContent";
const VLOGGEN_SOURCE_VLOGSOORTEN_ID = "src-vlog-vlogsoorten";

export const vloggenTabelBrief: ConceptBrief = {
  title: "Schrijf je vlogplan",
  themeLabel: "Vloggen",
  situation:
    "In het taakboek bedenk je een plan voordat je gaat filmen. Welke soort vlog past bij jouw onderwerp, doel en publiek?",
  question:
    "Vul je vlogplan in. Gebruik de ideeën uit de brontekst over vlogsoorten. Elk vakje mag over jouw eigen vlog gaan.",
  steps: [
    "Lees de brontekst over soorten vlogs (challenge, dagvlog, recensie, …).",
    "Vul alle onderdelen van je plan in.",
    "Controleer of je plan compleet is — dan weet je wat je gaat filmen.",
  ],
};

/** Les 3 — brainstorm / vlogplan (blok 6, taakboek p. 9). */
export const vloggenTabelContent: TabelInvullenContent = {
  type: "tabel-invullen",
  brief: vloggenTabelBrief,
  sourceTextId: VLOGGEN_SOURCE_VLOGSOORTEN_ID,
  openAnswers: true,
  columns: [
    { id: "onderdeel", header: "Onderdeel van je plan" },
    { id: "invulling", header: "Jouw antwoord" },
  ],
  rows: [
    {
      id: "row-soort",
      cells: [
        { columnId: "onderdeel", editable: false, value: "Soort vlog" },
        {
          columnId: "invulling",
          editable: true,
          placeholder: "Bijv. dagvlog, recensie, how-to …",
        },
      ],
    },
    {
      id: "row-onderwerp",
      cells: [
        { columnId: "onderdeel", editable: false, value: "Onderwerp" },
        {
          columnId: "invulling",
          editable: true,
          placeholder: "Waar gaat je vlog over?",
        },
      ],
    },
    {
      id: "row-doel",
      cells: [
        { columnId: "onderdeel", editable: false, value: "Doel" },
        {
          columnId: "invulling",
          editable: true,
          placeholder: "Wat wil je bereiken met deze vlog?",
        },
      ],
    },
    {
      id: "row-publiek",
      cells: [
        { columnId: "onderdeel", editable: false, value: "Publiek" },
        {
          columnId: "invulling",
          editable: true,
          placeholder: "Voor wie maak je de vlog?",
        },
      ],
    },
    {
      id: "row-beeld",
      cells: [
        { columnId: "onderdeel", editable: false, value: "In beeld of voice-over?" },
        {
          columnId: "invulling",
          editable: true,
          placeholder: "Jezelf in beeld, of alleen je stem?",
        },
      ],
    },
    {
      id: "row-toon",
      cells: [
        { columnId: "onderdeel", editable: false, value: "Toon" },
        {
          columnId: "invulling",
          editable: true,
          placeholder: "Bijv. enthousiast, lyrisch, afstandelijk …",
        },
      ],
    },
    {
      id: "row-boodschap",
      cells: [
        { columnId: "onderdeel", editable: false, value: "Belangrijkste boodschap" },
        {
          columnId: "invulling",
          editable: true,
          placeholder: "Wat moet de kijker onthouden?",
        },
      ],
    },
    {
      id: "row-begin",
      cells: [
        { columnId: "onderdeel", editable: false, value: "Hoe begin je?" },
        {
          columnId: "invulling",
          editable: true,
          placeholder: "Je eerste zin of scene (hook)",
        },
      ],
    },
    {
      id: "row-volgorde",
      cells: [
        { columnId: "onderdeel", editable: false, value: "Wat film je en in welke volgorde?" },
        {
          columnId: "invulling",
          editable: true,
          placeholder: "Stap 1, stap 2, stap 3 …",
        },
      ],
    },
    {
      id: "row-materiaal",
      cells: [
        { columnId: "onderdeel", editable: false, value: "Materiaal / apparatuur" },
        {
          columnId: "invulling",
          editable: true,
          placeholder: "Camera, microfoon, statief …",
        },
      ],
    },
  ],
};

export const vloggenTabelContent2: TabelInvullenContent = {
  type: "tabel-invullen",
  brief: {
    title: "Mijn vlogteam",
    themeLabel: "Vloggen",
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
    themeLabel: "Vloggen",
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
