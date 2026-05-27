import type { Workbook } from "../types/workbook";

/** Volgende opdracht in werkboekvolgorde; in leerlingmodus alleen met inhoud. */
export function getNextExerciseId(
  workbook: Workbook,
  currentExerciseId: string,
  studentMode: boolean,
): string | undefined {
  const idx = workbook.exercises.findIndex((e) => e.id === currentExerciseId);
  if (idx < 0) return undefined;

  for (let i = idx + 1; i < workbook.exercises.length; i++) {
    const ex = workbook.exercises[i];
    if (!studentMode || ex.content) return ex.id;
  }
  return undefined;
}
