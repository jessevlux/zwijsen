import { useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useLibrary } from "../../state/LibraryContext";
import type { Workbook } from "../../types/workbook";

interface WorkbookIntroProps {
  workbookId: string;
  studentMode?: boolean;
  onContinue: () => void;
}

function resolveThemeBody(wb: Workbook): string | undefined {
  const sourceId = wb.intro?.themeSourceId;
  if (!sourceId) return undefined;
  return wb.sources.find((s) => s.id === sourceId)?.body;
}

export default function WorkbookIntro({
  workbookId,
  studentMode = false,
  onContinue,
}: WorkbookIntroProps) {
  const { getWorkbook } = useLibrary();
  const wb = getWorkbook(workbookId);

  const themeBody = useMemo(() => (wb ? resolveThemeBody(wb) : undefined), [wb]);
  const intro = wb?.intro;
  const goals = wb?.rubricGoals ?? [];

  if (!wb) {
    return (
      <motion.div
        className="flex flex-1 flex-col items-center justify-center gap-4 p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <p className="text-sm font-bold text-text-secondary">
          Werkboek niet gevonden.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="flex h-full min-h-0 flex-col overflow-y-auto bg-surface-base px-4 py-10 sm:px-6"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="mx-auto w-full max-w-xl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.35 }}
      >
        <div className="text-center">
          {!studentMode && (
            <span
              className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase ${
                wb.origin === "example"
                  ? "bg-accent-info-soft text-accent-info"
                  : "bg-surface-muted text-text-secondary"
              }`}
            >
              {wb.origin === "example" ? "Demonstratie" : "Geïmporteerd"}
            </span>
          )}

          {(intro?.sectionLabel || intro?.themeTitle) && (
            <p
              className={`text-xs font-black uppercase tracking-wide text-brand-orange ${
                studentMode ? "" : "mt-4"
              }`}
            >
              {[intro.sectionLabel, intro.themeTitle].filter(Boolean).join(" · ")}
            </p>
          )}

          <h1 className="mt-2 text-3xl font-black leading-tight text-text-primary sm:text-4xl">
            {wb.title}
          </h1>

          <p className="mt-3 text-base leading-relaxed text-text-secondary">
            {studentMode
              ? wb.grade
              : `${wb.grade} · ${wb.side} · ${wb.pages} pagina's · ${wb.exercises.length} opdrachten${
                  wb.importedAt
                    ? ` · geïmporteerd ${new Date(wb.importedAt).toLocaleDateString("nl-NL")}`
                    : ""
                }`}
          </p>
        </div>

        {(themeBody || intro?.endTask || goals.length > 0) && (
          <div className="mt-8 space-y-6 text-left text-sm leading-relaxed text-text-secondary">
            {themeBody && (
              <div>
                {intro?.themeTitle && (
                  <p className="font-black text-text-primary">{intro.themeTitle}</p>
                )}
                <p className={intro?.themeTitle ? "mt-2" : ""}>{themeBody}</p>
              </div>
            )}

            {intro?.endTask && (
              <p>
                <span className="font-black text-brand-orange">Eindtaak: </span>
                <span className="font-bold text-text-primary">{intro.endTask}</span>
              </p>
            )}

            {goals.length > 0 && (
              <div>
                <p className="font-black text-text-primary">Je leerdoelen</p>
                <ul className="mt-2 list-disc space-y-1.5 pl-5">
                  {goals.map((g) => (
                    <li key={g.id}>{g.label}</li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        )}

        <div className="mt-10 flex justify-center">
          <motion.button
            type="button"
            onClick={onContinue}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl bg-brand-orange px-8 text-sm font-black text-white shadow-md hover:opacity-95"
          >
            {studentMode ? "Verder" : "Volgende"}
            <ChevronRight
              className="h-5 w-5 shrink-0"
              strokeWidth={2.5}
              aria-hidden
            />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
