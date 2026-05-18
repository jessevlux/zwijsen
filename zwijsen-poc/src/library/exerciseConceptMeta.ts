import { BookOpen } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { concepts, toneTokens } from "../data/concepts";
import type { Exercise } from "../types/workbook";

export interface ExerciseVisualMeta {
  Icon: LucideIcon;
  accentColor: string;
  title: string;
  subtitle: string;
  badgeNumber: number;
}

/** Icon, accent en titels voor opdrachtkaarten en nav (koppelt oefening-type aan concept). */
export function getExerciseVisualMeta(ex: Exercise, index: number): ExerciseVisualMeta {
  const concept = concepts.find((c) => c.id === ex.type);
  if (concept) {
    return {
      Icon: concept.Icon,
      accentColor: toneTokens[concept.tone].accentColor,
      title: concept.title,
      subtitle: concept.dashboardSubtitle,
      badgeNumber: concept.number,
    };
  }
  return {
    Icon: BookOpen,
    accentColor: "var(--color-text-muted)",
    title: ex.type.replace(/-/g, " "),
    subtitle: "Opdracht",
    badgeNumber: index + 1,
  };
}
