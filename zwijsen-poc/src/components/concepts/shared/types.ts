import type { LucideIcon } from "lucide-react";

/** Icoon per stap; kleuren komen uit accent + stepCardTint. */
export interface StepCfg {
  Icon: LucideIcon;
}

export interface ConceptBrief {
  themeLabel: string;
  title: string;
  situation: string;
  question: string;
  steps: [string, string, string];
}
