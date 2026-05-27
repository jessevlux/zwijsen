import type { ConceptBrief } from "../shared/types";
import type { MarkerenContent } from "../../../types/exerciseContent";

export const vloggenMarkerenBrief: ConceptBrief = {
  title: "Markeer woorden in de zin",
  themeLabel: "Vloggen",
  situation:
    "Je leest een zin over een vlog. Oordeelwoorden geven je mening of zeggen wat je van iets vindt.",
  question: "Markeer de oordeelwoorden in de zin.",
  steps: [
    "Lees de zin rustig.",
    "Tik op de oordeelwoorden.",
    "Druk op Controleren.",
  ],
};

/** Zin bevat bewust géén woord dat gemarkeerd moet worden behalve recensie en beoordeling. */
const text = "Voor mijn vlog maak ik een recensie en schrijf ik mijn beoordeling.";

export const vloggenMarkerenContent: MarkerenContent = {
  type: "markeren",
  brief: vloggenMarkerenBrief,
  instruction: "Markeer de oordeelwoorden in de zin.",
  markingLabel: { singular: "oordeelwoord", plural: "oordeelwoorden" },
  text,
  correctSpans: [
    { start: text.indexOf("recensie"), end: text.indexOf("recensie") + "recensie".length },
    { start: text.indexOf("beoordeling"), end: text.indexOf("beoordeling") + "beoordeling".length },
  ],
};

const text2 = "Deze film was spectaculair, indrukwekkend en absoluut de moeite waard.";

export const vloggenMarkerenContent2: MarkerenContent = {
  type: "markeren",
  brief: {
    title: "Markeer positieve woorden",
    themeLabel: "Vloggen",
    situation: "Je schrijft een positieve recensie.",
    question: "Markeer de positieve beoordelingswoorden.",
    steps: ["Lees de zin.", "Tik op positieve woorden.", "Controleer."],
  },
  instruction: "Markeer alle woorden die positief zijn.",
  text: text2,
  correctSpans: [
    { start: text2.indexOf("spectaculair"), end: text2.indexOf("spectaculair") + "spectaculair".length },
    { start: text2.indexOf("indrukwekkend"), end: text2.indexOf("indrukwekkend") + "indrukwekkend".length },
    { start: text2.indexOf("moeite"), end: text2.indexOf("moeite") + "moeite".length },
  ],
};

const text3 = "De vlog was saai, slecht gefilmd en erg lang. Niet aangeraden!";

export const vloggenMarkerenContent3: MarkerenContent = {
  type: "markeren",
  brief: {
    title: "Markeer kritische woorden",
    themeLabel: "Vloggen",
    situation: "Je schrijft een kritische recensie.",
    question: "Markeer de kritische beoordelingswoorden.",
    steps: ["Lees de zin.", "Tik op kritische woorden.", "Controleer."],
  },
  instruction: "Markeer alle woorden die kritiek uitdrukken.",
  text: text3,
  correctSpans: [
    { start: text3.indexOf("saai"), end: text3.indexOf("saai") + "saai".length },
    { start: text3.indexOf("slecht"), end: text3.indexOf("slecht") + "slecht".length },
    { start: text3.indexOf("erg"), end: text3.indexOf("erg") + "erg".length },
  ],
};
