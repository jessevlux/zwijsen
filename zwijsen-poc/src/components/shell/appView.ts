export const DEMO_CONCEPT_IDS = ["concept-kaart", "swipe-kaarten", "raad-coach"] as const;
export type ConceptId = (typeof DEMO_CONCEPT_IDS)[number];

export type AppView =
  | { name: "welcome" }
  | { name: "library" }
  | { name: "import" }
  | { name: "workbook-intro"; workbookId: string }
  | { name: "workbook-rubric"; workbookId: string }
  | { name: "workbook-exercises"; workbookId: string }
  | { name: "exercise"; exerciseId: string; returnToWorkbookId?: string }
  | { name: "demo"; conceptId: ConceptId };

export function isDemoFullHeight(view: AppView): boolean {
  return view.name === "demo" && DEMO_CONCEPT_IDS.includes(view.conceptId);
}

export function isExercisePlayerFullHeight(view: AppView): boolean {
  return view.name === "exercise";
}

/** Volledige inhoud van werkboek-flow met eigen scroll (intro t/m opdrachten). */
export function isWorkbookContentFullHeight(view: AppView): boolean {
  return (
    view.name === "workbook-intro" ||
    view.name === "workbook-rubric" ||
    view.name === "workbook-exercises"
  );
}

/** Werkboek-flow — voor terug-knop in hoofdnav. */
export function isWorkbookFlowView(view: AppView): boolean {
  return (
    view.name === "workbook-intro" ||
    view.name === "workbook-rubric" ||
    view.name === "workbook-exercises" ||
    (view.name === "exercise" && !!view.returnToWorkbookId)
  );
}

export function workbookIdFromView(view: AppView): string | null {
  if (
    view.name === "workbook-intro" ||
    view.name === "workbook-rubric" ||
    view.name === "workbook-exercises"
  ) {
    return view.workbookId;
  }
  if (view.name === "exercise" && view.returnToWorkbookId) {
    return view.returnToWorkbookId;
  }
  return null;
}
