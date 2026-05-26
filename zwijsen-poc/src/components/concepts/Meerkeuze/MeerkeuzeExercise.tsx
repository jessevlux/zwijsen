import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import type { MeerkeuzeContent } from "../../../types/exerciseContent";

interface MeerkeuzeExerciseProps {
  content: MeerkeuzeContent;
  accentColor: string;
  onComplete: (isCorrect: boolean) => void;
}

export default function MeerkeuzeExercise({
  content,
  accentColor,
  onComplete,
}: MeerkeuzeExerciseProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [hasChecked, setHasChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const toggleOption = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (content.allowMultiple) {
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
      } else {
        next.clear();
        next.add(id);
      }
      return next;
    });
  }, [content.allowMultiple]);

  const handleCheck = useCallback(() => {
    const correct =
      selectedIds.size === content.correctOptionIds.length &&
      Array.from(selectedIds).every((id) =>
        content.correctOptionIds.includes(id)
      );
    setIsCorrect(correct);
    setHasChecked(true);
  }, [selectedIds, content.correctOptionIds]);

  const handleDone = useCallback(() => {
    onComplete(isCorrect);
  }, [isCorrect, onComplete]);

  const allAnswered = selectedIds.size > 0;

  return (
    <div className="flex min-h-0 flex-1 flex-col items-center overflow-y-auto px-4 py-6 sm:py-8">
      <div className="w-full max-w-2xl space-y-6">
        {/* Question */}
        <div className="rounded-2xl border border-black/8 bg-white/90 p-6 shadow-sm">
          <p className="text-lg font-bold text-text-primary">
            {content.question}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {content.options.map((option) => {
            const isSelected = selectedIds.has(option.id);
            const isCorrectOption = content.correctOptionIds.includes(option.id);

            return (
              <motion.button
                key={option.id}
                type="button"
                onClick={() => {
                  if (!hasChecked) {
                    toggleOption(option.id);
                  }
                }}
                disabled={hasChecked}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`w-full rounded-2xl border-2 p-4 text-left font-bold transition-all ${
                  isSelected
                    ? hasChecked
                      ? isCorrectOption
                        ? "border-green-500 bg-green-100 text-green-900"
                        : "border-red-500 bg-red-100 text-red-900"
                      : "border-gray-400 bg-gray-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 h-5 w-5 shrink-0 rounded border-2 ${
                      isSelected
                        ? "border-current bg-current"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {isSelected && (
                      <svg
                        className="h-full w-full text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="flex-1">{option.label}</span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Status and actions */}
        <div className="space-y-3">
          {hasChecked && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-xl p-4 ${
                isCorrect
                  ? "bg-green-100 text-green-900"
                  : "bg-red-100 text-red-900"
              }`}
            >
              <div className="text-sm font-bold">
                {isCorrect ? "✓ Goed!" : "✗ Niet goed."}
              </div>
              {content.explanation && (
                <p className="mt-2 text-sm leading-relaxed">
                  {content.explanation}
                </p>
              )}
            </motion.div>
          )}

          <div className="flex gap-3">
            {!hasChecked ? (
              <button
                type="button"
                onClick={handleCheck}
                disabled={!allAnswered}
                className="flex-1 rounded-2xl bg-white px-4 py-3 font-black text-text-primary transition-all disabled:opacity-50"
                style={{ borderColor: accentColor, borderWidth: "2px" }}
              >
                Controleren
              </button>
            ) : (
              <motion.button
                type="button"
                onClick={handleDone}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex-1 rounded-2xl px-4 py-3 font-black text-white transition-all"
                style={{ backgroundColor: accentColor }}
              >
                Klaar
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
