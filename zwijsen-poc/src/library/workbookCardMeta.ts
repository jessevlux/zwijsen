import type { BookSide, Workbook } from "../types/workbook";

export function getWorkbookThemeEyebrow(wb: Workbook): string | undefined {
  const parts = [wb.intro?.sectionLabel, wb.intro?.themeTitle].filter(Boolean);
  return parts.length > 0 ? parts.join(" · ") : undefined;
}

export function getWorkbookSideLabel(side: BookSide): string {
  return side === "taakboekje" ? "Taakboekje" : "Leskant";
}

export function countReadyExercises(wb: Workbook): number {
  return wb.exercises.filter((e) => e.content && "brief" in e.content && e.content.brief).length;
}
