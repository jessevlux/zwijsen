import { useState, useCallback, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";
import type { InvullenZinContent } from "../../../types/exerciseContent";

interface InvullenZinExerciseProps {
  content: InvullenZinContent;
  onComplete: (correct: number, total: number) => void;
}

interface BlankState {
  id: string;
  value: string;
  isChecked: boolean;
  isCorrect: boolean | null;
}

function parseTemplate(template: string): (string | { type: "blank"; id: string })[] {
  const parts: (string | { type: "blank"; id: string })[] = [];
  const regex = /\{\{blank-(\d+)\}\}/g;
  let lastIndex = 0;

  let match;
  while ((match = regex.exec(template)) !== null) {
    if (match.index > lastIndex) {
      parts.push(template.slice(lastIndex, match.index));
    }
    parts.push({ type: "blank", id: `blank-${match[1]}` });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < template.length) {
    parts.push(template.slice(lastIndex));
  }

  return parts;
}

export default function InvullenZinExercise({
  content,
  onComplete,
}: InvullenZinExerciseProps) {
  const [blanks, setBlanks] = useState<BlankState[]>(
    content.blanks.map((blank) => ({
      id: blank.id,
      value: "",
      isChecked: false,
      isCorrect: null,
    }))
  );

  const templateParts = useMemo(() => parseTemplate(content.template), [content.template]);
  const allAnswered = blanks.every((b) => b.value.trim().length > 0);

  const handleValueChange = useCallback((blankId: string, value: string) => {
    setBlanks((prev) =>
      prev.map((b) =>
        b.id === blankId
          ? { ...b, value, isChecked: false, isCorrect: null }
          : b
      )
    );
  }, []);

  const handleCheck = useCallback(() => {
    setBlanks((prev) =>
      prev.map((blank) => {
        const blankDef = content.blanks.find((b) => b.id === blank.id);
        if (!blankDef) return blank;

        const userAnswer = blankDef.caseSensitive === false
          ? blank.value.toLowerCase().trim()
          : blank.value.trim();

        const correctAnswers = blankDef.caseSensitive === false
          ? blankDef.correctAnswers.map((a) => a.toLowerCase())
          : blankDef.correctAnswers;

        const isCorrect = correctAnswers.includes(userAnswer);

        return { ...blank, isChecked: true, isCorrect };
      })
    );
  }, [content.blanks]);

  const handleDone = useCallback(() => {
    const correctCount = blanks.filter((b) => b.isCorrect === true).length;
    onComplete(correctCount, blanks.length);
  }, [blanks, onComplete]);

  const allChecked = blanks.every((b) => b.isChecked);
  const correctCount = blanks.filter((b) => b.isCorrect === true).length;

  return (
    <div className="flex min-h-0 flex-1 flex-col items-center overflow-y-auto px-4 py-6 sm:py-8">
      <div className="w-full max-w-2xl space-y-6">
        {/* Template sentence with blanks */}
        <div className="rounded-2xl border border-black/8 bg-white/90 p-6 shadow-sm">
          <p className="text-lg leading-relaxed text-text-primary">
            {templateParts.map((part, idx) => {
              if (typeof part === "string") {
                return (
                  <span key={idx}>{part}</span>
                );
              }

              const blank = blanks.find((b) => b.id === part.id);
              if (!blank) return null;

              return (
                <span key={idx} className="inline">
                  <BlankInput
                    blank={blank}
                    onValueChange={handleValueChange}
                    wordBank={content.blanks.find((b) => b.id === part.id)?.wordBank}
                  />
                </span>
              );
            })}
          </p>
        </div>

        {/* Status and actions */}
        <div className="space-y-3">
          {allChecked && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl bg-white p-4"
            >
              <div className="text-sm font-bold text-text-primary">
                {correctCount} van {blanks.length} goed
              </div>
            </motion.div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleCheck}
              disabled={!allAnswered || allChecked}
              className="flex-1 rounded-2xl bg-white px-4 py-3 font-black text-text-primary transition-all disabled:opacity-50"
              style={{ borderColor: "var(--color-accent-success)", borderWidth: "2px" }}
            >
              Controleren
            </button>
            {allChecked && (
              <motion.button
                type="button"
                onClick={handleDone}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex-1 rounded-2xl px-4 py-3 font-black text-white transition-all"
                style={{ backgroundColor: "var(--color-accent-success)" }}
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

interface BlankInputProps {
  blank: {
    id: string;
    value: string;
    isChecked: boolean;
    isCorrect: boolean | null;
  };
  onValueChange: (blankId: string, value: string) => void;
  wordBank?: string[];
}

function BlankInput({
  blank,
  onValueChange,
  wordBank,
}: BlankInputProps) {
  const [showOptions, setShowOptions] = useState(false);

  const baseClass = "inline-block min-w-[100px] max-w-[200px] px-2 py-1 mx-1 rounded-lg border-2 font-bold text-center transition-all";

  if (blank.isChecked) {
    const bgClass =
      blank.isCorrect === true
        ? "bg-green-100 border-green-500 text-green-900"
        : "bg-red-100 border-red-500 text-red-900";

    return (
      <span className={`${baseClass} ${bgClass}`}>
        {blank.value}
        {blank.isCorrect === true ? (
          <Check className="ml-1 inline h-4 w-4" aria-hidden />
        ) : (
          <X className="ml-1 inline h-4 w-4" aria-hidden />
        )}
      </span>
    );
  }

  if (wordBank && wordBank.length > 0) {
    return (
      <div className="relative inline-block">
        <button
          type="button"
          onClick={() => setShowOptions(!showOptions)}
          className={`${baseClass} border-gray-300 bg-white hover:border-gray-400`}
        >
          {blank.value || "Kies..."}
        </button>
        <AnimatePresence>
          {showOptions && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="absolute top-full mt-2 z-10 rounded-lg border border-gray-200 bg-white shadow-lg"
            >
              {wordBank.map((word) => (
                <button
                  key={word}
                  type="button"
                  onClick={() => {
                    onValueChange(blank.id, word);
                    setShowOptions(false);
                  }}
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
                >
                  {word}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <input
      type="text"
      value={blank.value}
      onChange={(e) => onValueChange(blank.id, e.target.value)}
      placeholder="___"
      className={`${baseClass} border-gray-300 bg-white placeholder-gray-400 focus:border-gray-500 focus:outline-none`}
    />
  );
}
