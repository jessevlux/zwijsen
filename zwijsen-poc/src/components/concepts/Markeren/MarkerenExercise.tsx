import { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import type { MarkerenContent } from "../../../types/exerciseContent";

interface MarkerenExerciseProps {
  content: MarkerenContent;
  accentColor: string;
  onComplete: (isCorrect: boolean) => void;
}

interface Word {
  text: string;
  start: number;
  end: number;
  index: number;
}

interface CheckResult {
  correctCount: number;
  wrongCount: number;
  missedCount: number;
  isFullyCorrect: boolean;
}

const DEFAULT_MARKING_LABEL = { singular: "juist woord", plural: "juiste woorden" };

function spanMatches(
  word: Pick<Word, "start" | "end">,
  span: { start: number; end: number },
): boolean {
  return word.start === span.start && word.end === span.end;
}

function computeCheckResult(
  words: Word[],
  selectedIndices: number[],
  correctSpans: { start: number; end: number }[],
): CheckResult {
  const selected = selectedIndices.map((idx) => words[idx]);
  const correctSelected = selected.filter((w) =>
    correctSpans.some((cs) => spanMatches(w, cs)),
  );
  const wrongSelected = selected.filter(
    (w) => !correctSpans.some((cs) => spanMatches(w, cs)),
  );
  const missedSpans = correctSpans.filter((cs) => !selected.some((w) => spanMatches(w, cs)));

  return {
    correctCount: correctSelected.length,
    wrongCount: wrongSelected.length,
    missedCount: missedSpans.length,
    isFullyCorrect:
      correctSelected.length === correctSpans.length && wrongSelected.length === 0,
  };
}

export default function MarkerenExercise({
  content,
  accentColor,
  onComplete,
}: MarkerenExerciseProps) {
  const [selectedWordIndices, setSelectedWordIndices] = useState<number[]>([]);
  const [hasChecked, setHasChecked] = useState(false);
  const [checkResult, setCheckResult] = useState<CheckResult | null>(null);

  const words = useMemo(() => {
    const wordList: Word[] = [];
    const regex = /\b\w+\b/g;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(content.text)) !== null) {
      wordList.push({
        text: match[0],
        start: match.index,
        end: match.index + match[0].length,
        index: wordList.length,
      });
    }

    return wordList;
  }, [content.text]);

  const toggleWord = useCallback(
    (index: number) => {
      if (hasChecked) return;
      setSelectedWordIndices((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
      );
    },
    [hasChecked],
  );

  const handleCheck = useCallback(() => {
    const result = computeCheckResult(words, selectedWordIndices, content.correctSpans);
    setCheckResult(result);
    setHasChecked(true);
  }, [selectedWordIndices, words, content.correctSpans]);

  const handleDone = useCallback(() => {
    onComplete(checkResult?.isFullyCorrect ?? false);
  }, [checkResult, onComplete]);

  const isWordMarked = (wordIndex: number) => selectedWordIndices.includes(wordIndex);

  const isWordCorrectTarget = (word: Word) =>
    content.correctSpans.some((cs) => spanMatches(word, cs));

  const getWordClassName = (word: Word, marked: boolean) => {
    if (!hasChecked) {
      return marked
        ? "border-amber-400 bg-amber-50 text-text-primary"
        : "border-gray-300 bg-white hover:border-gray-400";
    }
    if (marked && isWordCorrectTarget(word)) {
      return "border-green-500 bg-green-100 text-green-900";
    }
    if (marked && !isWordCorrectTarget(word)) {
      return "border-red-500 bg-red-100 text-red-900";
    }
    if (!marked && isWordCorrectTarget(word)) {
      return "border-green-500 border-dashed bg-green-50 text-green-800";
    }
    return "border-gray-200 bg-gray-50 text-text-muted opacity-70";
  };

  const feedbackMessage = useMemo(() => {
    if (!checkResult) return "";
    const { correctCount, wrongCount, missedCount, isFullyCorrect } = checkResult;
    const total = content.correctSpans.length;
    const label = content.markingLabel ?? DEFAULT_MARKING_LABEL;

    if (isFullyCorrect) {
      return `Goed! Je hebt alle ${label.plural} gemarkeerd.`;
    }

    const parts = [`Je hebt ${correctCount} van de ${total} ${label.plural} gemarkeerd.`];
    if (wrongCount > 0) {
      parts.push(
        `Sommige woorden die je markeerde zijn geen ${label.singular}. Markeer alleen ${label.plural}.`,
      );
    }
    if (missedCount > 0) {
      parts.push(
        missedCount === 1
          ? `Je mist nog een ${label.singular}.`
          : `Je mist nog ${label.plural}.`,
      );
    }
    return parts.join(" ");
  }, [checkResult, content.correctSpans.length, content.markingLabel]);

  return (
    <div className="flex min-h-0 flex-1 flex-col items-center overflow-y-auto px-4 py-6 sm:py-8">
      <div className="w-full max-w-2xl space-y-6">
        <div className="rounded-2xl border border-black/8 bg-white/90 p-6 shadow-sm">
          <p className="mb-4 text-sm leading-relaxed text-text-secondary">
            {content.instruction}
          </p>
          <div className="flex flex-wrap gap-2">
            {words.map((word) => {
              const marked = isWordMarked(word.index);

              return (
                <motion.button
                  key={word.index}
                  type="button"
                  onClick={() => toggleWord(word.index)}
                  disabled={hasChecked}
                  className={`rounded-lg border-2 px-3 py-2 font-bold transition-all ${getWordClassName(word, marked)}`}
                  style={
                    marked && !hasChecked
                      ? { borderColor: accentColor, backgroundColor: "rgba(255, 193, 7, 0.25)" }
                      : undefined
                  }
                  whileHover={!hasChecked ? { scale: 1.05 } : undefined}
                  whileTap={!hasChecked ? { scale: 0.95 } : undefined}
                >
                  {word.text}
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          {hasChecked && checkResult && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-xl p-4 ${
                checkResult.isFullyCorrect
                  ? "bg-green-100 text-green-900"
                  : "bg-amber-50 text-amber-950"
              }`}
            >
              <div className="text-sm font-bold">
                {checkResult.isFullyCorrect ? "Goed!" : "Nog niet helemaal goed"}
              </div>
              <p className="mt-2 text-sm leading-relaxed">{feedbackMessage}</p>
            </motion.div>
          )}

          <div className="flex gap-3">
            {!hasChecked ? (
              <button
                type="button"
                onClick={handleCheck}
                disabled={selectedWordIndices.length === 0}
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
