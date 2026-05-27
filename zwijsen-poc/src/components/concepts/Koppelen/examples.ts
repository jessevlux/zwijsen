import type { ConceptBrief } from "../shared/types";
import type { KoppelenLijnenContent } from "../../../types/exerciseContent";

export const vloggenKoppelenBrief: ConceptBrief = {
  title: "Koppel woord en betekenis",
  themeLabel: "Vloggen",
  situation: "Voor je vlog moet je de woorden goed kunnen uitleggen.",
  question: "Trek lijnen tussen woord en definitie.",
  steps: ["Tik links, dan rechts.", "Of sleep een lijn.", "Controleer je koppels."],
};

export const vloggenKoppelenContent: KoppelenLijnenContent = {
  type: "koppelen-lijnen",
  brief: vloggenKoppelenBrief,
  leftItems: [
    { id: "l1", label: "spectaculair" },
    { id: "l2", label: "afstandelijk" },
  ],
  rightItems: [
    { id: "r1", label: "heel indrukwekkend" },
    { id: "r2", label: "koel, weinig emotie" },
  ],
  correctPairs: [
    { leftId: "l1", rightId: "r1" },
    { leftId: "l2", rightId: "r2" },
  ],
};

export const vloggenKoppelenContent2: KoppelenLijnenContent = {
  type: "koppelen-lijnen",
  brief: {
    title: "Vlogtermen",
    themeLabel: "Vloggen",
    situation: "Je leert de juiste termen voor je vlog.",
    question: "Koppel de termen aan hun betekenis.",
    steps: ["Tik links, dan rechts.", "Verbind alle termen.", "Controleer."],
  },
  leftItems: [
    { id: "l1", label: "montage" },
    { id: "l2", label: "compositie" },
    { id: "l3", label: "take" },
  ],
  rightItems: [
    { id: "r1", label: "opname, poging" },
    { id: "r2", label: "samenstelling, opbouw" },
    { id: "r3", label: "bewerking van videobeelden" },
  ],
  correctPairs: [
    { leftId: "l1", rightId: "r3" },
    { leftId: "l2", rightId: "r2" },
    { leftId: "l3", rightId: "r1" },
  ],
};

export const vloggenKoppelenContent3: KoppelenLijnenContent = {
  type: "koppelen-lijnen",
  brief: {
    title: "Vlogtonen",
    themeLabel: "Vloggen",
    situation: "Je kiest een passende toon voor je vlog.",
    question: "Koppel de toon aan het soort vlog.",
    steps: ["Tik links, dan rechts.", "Verbind alle tonen.", "Controleer."],
  },
  leftItems: [
    { id: "l1", label: "lyrisch" },
    { id: "l2", label: "enthousiast" },
    { id: "l3", label: "zakelijk" },
  ],
  rightItems: [
    { id: "r1", label: "professioneel, informatief" },
    { id: "r2", label: "dromerig, poëtisch" },
    { id: "r3", label: "vol energie, begeesterd" },
  ],
  correctPairs: [
    { leftId: "l1", rightId: "r2" },
    { leftId: "l2", rightId: "r3" },
    { leftId: "l3", rightId: "r1" },
  ],
};
