import type { ConceptBrief } from "../shared/types";
import type { MarkerenContent } from "../../../types/exerciseContent";

export const vloggenMarkerenBrief: ConceptBrief = {
  title: "Markeer de oordeelswoorden",
  themeLabel: "Groep 8 · Taal · Thema: Vloggen",
  situation: "In je recensie gebruik je woorden die je mening laten zien.",
  question: "Markeer alle woorden die een oordeel uitdrukken.",
  steps: ["Lees de tekst.", "Tik op een woord om te markeren.", "Druk op Controleren."],
};

const text = "In mijn recensie geef ik een duidelijke beoordeling van de nieuwe game.";

export const vloggenMarkerenContent: MarkerenContent = {
  type: "markeren",
  brief: vloggenMarkerenBrief,
  instruction: "Markeer de oordeelswoorden in de zin.",
  text,
  correctSpans: [
    { start: text.indexOf("duidelijke"), end: text.indexOf("duidelijke") + "duidelijke".length },
    { start: text.indexOf("beoordeling"), end: text.indexOf("beoordeling") + "beoordeling".length },
  ],
};

const text2 = "Deze film was spectaculair, indrukwekkend en absoluut de moeite waard.";

export const vloggenMarkerenContent2: MarkerenContent = {
  type: "markeren",
  brief: {
    title: "Markeer positieve woorden",
    themeLabel: "Groep 8 · Taal · Thema: Vloggen",
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
    themeLabel: "Groep 8 · Taal · Thema: Vloggen",
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
