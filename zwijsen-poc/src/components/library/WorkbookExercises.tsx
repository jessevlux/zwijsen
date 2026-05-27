import { useState } from "react";
import { motion } from "framer-motion";
import { useLibrary } from "../../state/LibraryContext";
import AIGenerateDialog from "./AIGenerateDialog";
import VariantSelector from "./VariantSelector";
import type { Exercise } from "../../types/workbook";
import type { ExerciseContent } from "../../types/exerciseContent";
import { getExerciseVisualMeta } from "../../library/exerciseConceptMeta";

interface WorkbookExercisesProps {
  workbookId: string;
  onOpenExercise: (exerciseId: string) => void;
  studentMode?: boolean;
}

export default function WorkbookExercises({
  workbookId,
  onOpenExercise,
  studentMode = false,
}: WorkbookExercisesProps) {
  const { getWorkbook, updateExercise } = useLibrary();
  const wb = getWorkbook(workbookId);
  const [aiExercise, setAiExercise] = useState<Exercise | null>(null);
  const [variantExercise, setVariantExercise] = useState<Exercise | null>(null);

  if (!wb) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6">
        <p className="text-sm font-bold text-text-secondary">
          Werkboek niet gevonden.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="flex h-full min-h-0 flex-col overflow-y-auto bg-surface-base"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center px-4 pb-10 pt-6 sm:px-6 sm:pb-12 sm:pt-10"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.05 }}
      >
        <header className="mb-8 text-center sm:mb-10">
          <p className="text-xs font-black uppercase tracking-wide text-text-muted">
            Opdrachten
          </p>
          <h1 className="mt-2 text-2xl font-black leading-tight text-text-primary sm:text-3xl">
            {wb.title}
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-text-secondary">
            Kies een opdracht om te oefenen.{" "}
            <span className="text-text-muted">
              {wb.grade} · {wb.side} · {wb.pages} pagina&apos;s ·{" "}
              {wb.exercises.length}{" "}
              {wb.exercises.length === 1 ? "opdracht" : "opdrachten"}
            </span>
          </p>
        </header>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {wb.exercises.map((ex, i) => {
            const { Icon, accentColor, title, subtitle, badgeNumber } =
              getExerciseVisualMeta(ex, i);
            const canOpen = !studentMode || !!ex.content;
            const disabledStudent = studentMode && !ex.content;

            return (
              <motion.div
                key={ex.id}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.06 * i,
                  type: "spring",
                  stiffness: 260,
                  damping: 22,
                }}
                className="flex flex-col"
              >
                <motion.button
                  type="button"
                  disabled={disabledStudent}
                  whileHover={canOpen ? { scale: 1.02, y: -2 } : undefined}
                  whileTap={canOpen ? { scale: 0.98 } : undefined}
                  onClick={() => {
                    if (!canOpen) return;
                    if (ex.variants && ex.variants.length > 0) {
                      setVariantExercise(ex);
                    } else {
                      onOpenExercise(ex.id);
                    }
                  }}
                  className={`min-h-[160px] w-full rounded-3xl border border-border-subtle bg-surface-card p-6 text-left shadow-[var(--shadow-card)] transition-shadow ${
                    canOpen
                      ? "cursor-pointer hover:shadow-[var(--shadow-card-hover)]"
                      : "cursor-not-allowed opacity-55"
                  }`}
                  style={{ borderTop: `3px solid ${accentColor}` }}
                >
                  <motion.div
                    className="mb-4 flex items-start justify-between"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 * i + 0.1, duration: 0.25 }}
                  >
                    <Icon
                      className="h-9 w-9 shrink-0"
                      style={{ color: accentColor }}
                      strokeWidth={2}
                      aria-hidden
                    />
                    <span
                      className="rounded-full px-2.5 py-1 text-xs font-black text-text-inverted"
                      style={{ backgroundColor: accentColor }}
                    >
                      {badgeNumber}
                    </span>
                  </motion.div>
                  <h3 className="mb-1 text-base font-black leading-tight text-text-primary">
                    {title}
                  </h3>
                  <p className="text-xs leading-relaxed text-text-secondary">
                    {subtitle}
                  </p>
                  {!studentMode && (
                    <motion.div
                      className="mt-3 flex flex-wrap gap-1.5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.08 * i + 0.15, duration: 0.2 }}
                    >
                      <span className="rounded bg-surface-muted px-1.5 py-0.5 text-[10px] font-black uppercase text-text-primary">
                        p.{ex.pageNumber}
                      </span>
                      <span className="rounded bg-surface-muted px-1.5 py-0.5 text-[10px] font-black uppercase text-text-primary">
                        {ex.difficulty}
                      </span>
                      {ex.isPlus && (
                        <span className="rounded bg-accent-amber-soft px-1.5 py-0.5 text-[10px] font-black text-text-primary">
                          +
                        </span>
                      )}
                      {ex.isOwnAnswer && (
                        <span className="rounded bg-accent-violet-soft px-1.5 py-0.5 text-[10px] font-black text-text-primary">
                          eigen antwoord
                        </span>
                      )}
                      {ex.sourceTextId && (
                        <span className="rounded bg-accent-success-soft px-1.5 py-0.5 text-[10px] font-black text-text-primary">
                          brontekst
                        </span>
                      )}
                    </motion.div>
                  )}
                  <p className="mt-2 text-[11px] font-bold text-text-muted">
                    {ex.content
                      ? "Klaar om te oefenen"
                      : "Nog geen digitale inhoud"}
                  </p>
                </motion.button>

                {!studentMode && (
                  <button
                    type="button"
                    onClick={() => setAiExercise(ex)}
                    className="mt-2 w-full rounded-2xl border border-border-subtle py-2 text-xs font-bold text-text-primary hover:bg-surface-muted"
                  >
                    Genereer AI-variant
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {!studentMode && (
        <AIGenerateDialog
          open={!!aiExercise}
          exercise={aiExercise}
          onClose={() => setAiExercise(null)}
        />
      )}

      <VariantSelector
        open={!!variantExercise}
        variants={
          variantExercise
            ? [
                ...(variantExercise.content ? [variantExercise.content] : []),
                ...(variantExercise.variants ?? []),
              ]
            : []
        }
        onSelect={(variant: ExerciseContent) => {
          if (!variantExercise) return;
          const updated = { ...variantExercise, content: variant };
          updateExercise(workbookId, updated);
          setVariantExercise(null);
          onOpenExercise(variantExercise.id);
        }}
        onClose={() => setVariantExercise(null)}
      />
    </motion.div>
  );
}
