import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface RoundResultProps {
  open: boolean;
  word: string;
  points: number;
  streakBonus: boolean;
  onNext: () => void;
  accentColor: string;
  autoAdvanceMs?: number;
}

export default function RoundResult({
  open,
  word,
  points,
  streakBonus,
  onNext,
  accentColor,
  autoAdvanceMs = 1500,
}: RoundResultProps) {
  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => onNext(), autoAdvanceMs);
    return () => window.clearTimeout(t);
  }, [open, onNext, autoAdvanceMs]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="round-result"
          role="dialog"
          aria-modal="true"
          aria-labelledby="round-result-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/35 px-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 10 }}
            transition={{ type: "spring", stiffness: 360, damping: 28 }}
            className="w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-2xl ring-2 ring-black/5"
          >
            <h2 id="round-result-title" className="text-xl font-black text-text-primary">
              {points > 0 ? "Goed!" : "Het woord was…"}
            </h2>
            <p className="mt-2 font-mono text-2xl font-black text-text-primary">{word}</p>
            <p className="mt-3 text-lg font-black" style={{ color: accentColor }}>
              {points > 0 ? `+${points} pt` : "0 pt voor deze ronde"}
            </p>
            {streakBonus && points > 0 && (
              <p className="mt-1 text-sm font-bold text-orange-600">Inclusief bonus voor een goede reeks!</p>
            )}
            <button
              type="button"
              onClick={onNext}
              className="mt-5 w-full rounded-2xl py-3.5 text-sm font-black text-white transition-opacity hover:opacity-95"
              style={{ backgroundColor: accentColor }}
            >
              Volgende
            </button>
            <p className="mt-2 text-[11px] text-text-muted">Gaat vanzelf door over een moment…</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
