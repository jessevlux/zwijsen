/** Alleen icoon per stap; kleuren komen uit accent + stepCardTint. */
export interface StepCfg {
  emoji: string;
}

export interface ConceptBrief {
  themeLabel: string;
  title: string;
  situation: string;
  question: string;
  steps: [string, string, string];
}
