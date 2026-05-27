import { ChevronRight } from "lucide-react";
import { useLibrary } from "../../state/LibraryContext";
import {
  countReadyExercises,
  getWorkbookSideLabel,
  getWorkbookThemeEyebrow,
} from "../../library/workbookCardMeta";

interface WorkbookGridProps {
  onOpenWorkbook: (id: string) => void;
  listClassName?: string;
  studentMode?: boolean;
}

function metaLine(parts: string[]): string {
  return parts.filter(Boolean).join(" · ");
}

export default function WorkbookGrid({
  onOpenWorkbook,
  listClassName = "mt-8",
  studentMode = false,
}: WorkbookGridProps) {
  const { workbooks } = useLibrary();

  return (
    <ul className={`mx-auto grid w-full max-w-2xl grid-cols-1 gap-4 ${listClassName}`}>
      {workbooks.map((wb) => {
        const eyebrow = getWorkbookThemeEyebrow(wb);
        const goalCount = wb.rubricGoals?.length ?? 0;
        const readyCount = countReadyExercises(wb);
        const plusCount = wb.exercises.filter((e) => e.isPlus).length;

        const metaParts: string[] = [
          wb.grade,
          `${wb.exercises.length} ${wb.exercises.length === 1 ? "opdracht" : "opdrachten"}`,
        ];
        if (goalCount > 0) {
          metaParts.push(`${goalCount} ${goalCount === 1 ? "leerdoel" : "leerdoelen"}`);
        }
        if (!studentMode) {
          metaParts.push(getWorkbookSideLabel(wb.side));
          metaParts.push(`${wb.pages} pagina's`);
          if (wb.sources.length > 0) {
            metaParts.push(
              `${wb.sources.length} ${wb.sources.length === 1 ? "brontekst" : "bronteksten"}`,
            );
          }
          metaParts.push(`${readyCount}/${wb.exercises.length} interactief`);
        }
        if (plusCount > 0) {
          metaParts.push(plusCount === 1 ? "Plusopdracht" : `${plusCount} plusopdrachten`);
        }

        return (
          <li key={wb.id}>
            <button
              type="button"
              onClick={() => onOpenWorkbook(wb.id)}
              className="group flex w-full gap-4 rounded-2xl border border-border-subtle bg-surface-card p-5 text-left shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-card-hover)]"
            >
              <div className="min-w-0 flex-1">
                {!studentMode && (
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-black uppercase ${
                      wb.origin === "example"
                        ? "bg-accent-info-soft text-accent-info"
                        : "bg-surface-muted text-text-secondary"
                    }`}
                  >
                    {wb.origin === "example" ? "Demonstratie" : "Geïmporteerd"}
                  </span>
                )}

                {eyebrow && (
                  <p
                    className={`text-xs font-black uppercase tracking-wide text-brand-orange ${
                      studentMode ? "mt-0" : "mt-2"
                    }`}
                  >
                    {eyebrow}
                  </p>
                )}

                <h2 className="mt-1 text-lg font-black leading-tight text-text-primary sm:text-xl">
                  {wb.title}
                </h2>

                {wb.intro?.endTask && (
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    <span className="font-bold text-brand-orange">Eindtaak: </span>
                    {wb.intro.endTask}
                  </p>
                )}

                <p className="mt-3 text-xs text-text-muted">{metaLine(metaParts)}</p>
              </div>

              <ChevronRight
                className="mt-1 h-6 w-6 shrink-0 text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-brand-orange"
                strokeWidth={2.5}
                aria-hidden
              />
            </button>
          </li>
        );
      })}
    </ul>
  );
}
