import { motion } from "framer-motion";
import type { RubricGoal } from "../../types/workbook";

/** Vaste niveaus (waarde 1–4 op de slider na een eerste keuze). */
export const RUBRIC_LEVEL_LABELS = [
  "",
  "Dit is nieuw voor mij.",
  "Ik kan dit met hulp.",
  "Ik kan dit alleen.",
  "Ik kan iemand hierbij helpen.",
] as const;

const EMOJI_BY_LEVEL = ["", "🤔", "😐", "😊", "😎"] as const;

export interface EmojiRubricProps {
  goals: RubricGoal[];
  /** Per goal-id: 0 = nog niet gekozen, 1–4 = niveau. */
  values: Record<string, number>;
  onGoalChange: (goalId: string, value: number) => void;
}

export default function EmojiRubric({ goals, values, onGoalChange }: EmojiRubricProps) {
  return (
    <div className="flex w-full flex-col gap-8">
      {goals.map((goal) => {
        const raw = values[goal.id] ?? 0;
        const level = raw >= 1 && raw <= 4 ? raw : 0;
        const emoji = EMOJI_BY_LEVEL[level] || "·";
        const levelText =
          level >= 1 ? RUBRIC_LEVEL_LABELS[level] : "Sleep de schuifregelaar om je niveau te kiezen.";

        return (
          <div
            key={goal.id}
            className="rounded-3xl border border-border-subtle bg-surface-card p-5 shadow-[var(--shadow-card)] sm:p-6"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
              <p
                id={`rubric-goal-${goal.id}`}
                className="min-w-0 flex-1 text-left text-sm font-bold leading-snug text-text-primary sm:text-base"
              >
                {goal.label}
              </p>

              <div className="flex shrink-0 flex-col items-center gap-2 sm:w-28">
                <motion.span
                  key={`${goal.id}-${level}`}
                  className="text-4xl leading-none"
                  role="img"
                  aria-hidden={level === 0}
                  aria-label={level === 0 ? undefined : `Niveau ${level}`}
                  initial={{ scale: 0.85, opacity: 0.7 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                >
                  {emoji}
                </motion.span>
              </div>
            </div>

            <div className="mt-5">
              <label className="sr-only" htmlFor={`rubric-range-${goal.id}`}>
                Zelfevaluatie voor dit leerdoel
              </label>
              <input
                id={`rubric-range-${goal.id}`}
                type="range"
                min={0}
                max={4}
                step={1}
                value={raw}
                aria-labelledby={`rubric-goal-${goal.id}`}
                aria-valuetext={level === 0 ? "Nog niet gekozen" : `${level}: ${RUBRIC_LEVEL_LABELS[level]}`}
                onChange={(e) => onGoalChange(goal.id, Number(e.target.value))}
                className="h-3 w-full cursor-pointer appearance-none rounded-full bg-surface-muted accent-brand-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-brand-orange [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-brand-orange"
              />
              {/* Thumb is 20px (h-5 w-5): align label centers with thumb centers along the track */}
              <div className="relative mt-2 h-5 w-full text-[10px] font-bold uppercase tracking-wide text-text-muted sm:text-[11px]">
                {(["Start", "1", "2", "3", "4"] as const).map((label, i) => (
                  <span
                    key={`${goal.id}-tick-${label}`}
                    className="absolute left-0 top-0 whitespace-nowrap leading-tight"
                    style={{
                      left: `calc(0.625rem + (100% - 1.25rem) * ${i} / 4)`,
                      transform: "translateX(-50%)",
                    }}
                  >
                    {label}
                  </span>
                ))}
              </div>
              <p
                className={`mt-3 min-h-[2.75rem] text-center text-sm leading-snug sm:text-left ${level === 0 ? "text-text-muted" : "font-bold text-text-primary"}`}
              >
                {levelText}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
