export const DEMO_CONCEPT_IDS = ["concept-kaart", "swipe-kaarten", "raad-coach"] as const;
export type ConceptId = (typeof DEMO_CONCEPT_IDS)[number];

export type AppView =
  | { name: "welcome" }
  | { name: "library" }
  | { name: "import" }
  | { name: "workbook"; workbookId: string }
  | { name: "exercise"; exerciseId: string; returnToWorkbookId?: string }
  | { name: "demo"; conceptId: ConceptId };

export function isDemoFullHeight(view: AppView): boolean {
  return view.name === "demo" && DEMO_CONCEPT_IDS.includes(view.conceptId);
}

export function isExercisePlayerFullHeight(view: AppView): boolean {
  return view.name === "exercise";
}
