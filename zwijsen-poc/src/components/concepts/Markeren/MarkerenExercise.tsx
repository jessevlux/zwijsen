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

export default function MarkerenExercise({
  content,
  accentColor,
  onComplete,
}: MarkerenExerciseProps) {
  const [selectedWordIndices, setSelectedWordIndices] = useState<number[]>([]);
  const [hasChecked, setHasChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const words = useMemo(() => {
    const wordList: Word[] = [];
    const regex = /\b\w+\b/g;
    let match;

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

  const toggleWord = useCallback((index: number) => {
    if (hasChecked) return;
    setSelectedWordIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  }, [hasChecked]);

  const handleCheck = useCallback(() => {
    const selectedSpans = selectedWordIndices
      .map((idx) => words[idx])
      .sort((a, b) => a.start - b.start)
      .map((word) => ({ start: word.start, end: word.end }));

    const correct =
      selectedSpans.length === content.correctSpans.length &&
      selectedSpans.every((span) =>
        content.correctSpans.some(
          (cs) => cs.start === span.start && cs.end === span.end
        )
      );

    setIsCorrect(correct);
    setHasChecked(true);
  }, [selectedWordIndices, words, content.correctSpans]);

  const handleDone = useCallback(() => {
    onComplete(isCorrect);
  }, [isCorrect, onComplete]);

  const isWordMarked = (wordIndex: number) => {
    return selectedWordIndices.includes(wordIndex);
  };

  const isWordCorrect = (word: Word) => {
    return content.correctSpans.some(
      (cs) => cs.start === word.start && cs.end === word.end
    );
  };

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
              const correct = isWordCorrect(word);

              return (
                <motion.button
                  key={word.index}
                  type="button"
                  onClick={() => toggleWord(word.index)}
                  disabled={hasChecked}
                  className={`px-3 py-2 rounded-lg border-2 font-bold transition-all ${
                    marked
                      ? hasChecked
                        ? correct
                          ? "border-green-500 bg-green-100 text-green-900"
                          : "border-red-500 bg-red-100 text-red-900"
                        : `border-[${accentColor}] bg-yellow-100 text-text-primary`
                      : "border-gray-300 bg-white hover:border-gray-400"
                  }`}
                  style={
                    marked && !hasChecked
                      ? { borderColor: accentColor, backgroundColor: "rgba(255, 193, 7, 0.3)" }
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
          {hasChecked && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-xl p-4 ${
                isCorrect ? "bg-green-100 text-green-900" : "bg-red-100 text-red-900"
              }`}
            >
              <div className="text-sm font-bold">
                {isCorrect ? "✓ Goed!" : "✗ Niet goed."}
              </div>
              <p className="mt-2 text-sm">
                {isCorrect
                  ? "Je hebt alle woorden correct gemarkeerd!"
                  : `Je hebt ${selectedWordIndices.length} van ${content.correctSpans.length} woorden correct gemarkeerd.`}
              </p>
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
