import {
  BookOpen,
  CheckCircle2,
  Highlighter,
  Layers,
  Link2,
  Network,
  Table2,
  Type,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { concepts, toneTokens, type ConceptTone } from "../data/concepts";
import type { Exercise, ExerciseType } from "../types/workbook";
import type { ExerciseContent } from "../types/exerciseContent";
import { getStudentExerciseSubtitle } from "./exerciseStudentMeta";

export interface ExerciseVisualMeta {
  Icon: LucideIcon;
  accentColor: string;
  title: string;
  subtitle: string;
  badgeNumber: number;
}

const TYPE_META: Partial<
  Record<ExerciseType, { Icon: LucideIcon; tone: ConceptTone }>
> = {
  "concept-kaart": { Icon: Network, tone: "info" },
  "swipe-kaarten": { Icon: Layers, tone: "warm" },
  "raad-coach": { Icon: Users, tone: "success" },
  meerkeuze: { Icon: CheckCircle2, tone: "info" },
  "koppelen-lijnen": { Icon: Link2, tone: "violet" },
  "invullen-zin": { Icon: Type, tone: "success" },
  markeren: { Icon: Highlighter, tone: "amber" },
  "tabel-invullen": { Icon: Table2, tone: "warm" },
};

function briefFromContent(content: ExerciseContent | undefined) {
  if (content && "brief" in content && content.brief) {
    return content.brief;
  }
  return undefined;
}

export interface ExerciseVisualMetaOptions {
  studentMode?: boolean;
}

/** Icon, accent en titels voor opdrachtkaarten (titel uit content.brief indien aanwezig). */
export function getExerciseVisualMeta(
  ex: Exercise,
  index: number,
  options?: ExerciseVisualMetaOptions,
): ExerciseVisualMeta {
  const studentMode = options?.studentMode ?? false;
  const brief = briefFromContent(ex.content);
  const typeMeta = TYPE_META[ex.type];
  const concept = concepts.find((c) => c.id === ex.type);

  const Icon = typeMeta?.Icon ?? concept?.Icon ?? BookOpen;
  const tone = typeMeta?.tone ?? concept?.tone ?? "info";
  const accentColor = toneTokens[tone].accentColor;

  const title =
    brief?.title ??
    concept?.title ??
    ex.type.replace(/-/g, " ");

  const subtitle = studentMode
    ? [
        ex.isPlus ? "Plus" : null,
        getStudentExerciseSubtitle(ex.id, ex.pageNumber),
      ]
        .filter(Boolean)
        .join(" · ")
    : brief
      ? `Pagina ${ex.pageNumber} · ${brief.themeLabel}`
      : concept?.dashboardSubtitle ?? `Pagina ${ex.pageNumber}`;

  return {
    Icon,
    accentColor,
    title,
    subtitle,
    badgeNumber: index + 1,
  };
}
