import { motion } from "framer-motion";
import { RotateCcw, Sparkles } from "lucide-react";

interface DonePanelProps {
  totalScore: number;
  roundsPlayed: number;
  onRestart: () => void;
  accentColor: string;
}

export default function DonePanel({ totalScore, roundsPlayed, onRestart, accentColor }: DonePanelProps) {
  const avg = roundsPlayed > 0 ? Math.round(totalScore / roundsPlayed) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 28 }}
      className="flex w-full max-w-md flex-col items-center gap-6 rounded-3xl border-2 border-border-subtle bg-white p-8 text-center shadow-xl"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full" style={{ backgroundColor: `${accentColor}22` }}>
        <Sparkles className="h-8 w-8" style={{ color: accentColor }} aria-hidden />
      </div>
      <div>
        <h2 className="text-2xl font-black text-text-primary">Klaar!</h2>
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">
          Je hebt alle woorden gehad. Zo oefen je woordenschat op een speelse manier.
        </p>
      </div>
      <div className="w-full rounded-2xl bg-surface-muted px-4 py-4 text-left">
        <dl className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="text-xs font-bold uppercase tracking-wide text-text-muted">Totaalscore</dt>
            <dd className="text-2xl font-black text-text-primary">{totalScore}</dd>
          </div>
          <div>
            <dt className="text-xs font-bold uppercase tracking-wide text-text-muted">Rondes</dt>
            <dd className="text-2xl font-black text-text-primary">{roundsPlayed}</dd>
          </div>
          <div className="col-span-2 border-t border-border-subtle pt-3">
            <dt className="text-xs font-bold uppercase tracking-wide text-text-muted">Gemiddeld</dt>
            <dd className="text-lg font-black" style={{ color: accentColor }}>
              {avg} pt per ronde
            </dd>
          </div>
        </dl>
      </div>
      <button
        type="button"
        onClick={onRestart}
        className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-black text-white shadow-md transition-opacity hover:opacity-95"
        style={{ backgroundColor: accentColor }}
      >
        <RotateCcw className="h-5 w-5" aria-hidden />
        Opnieuw spelen
      </button>
    </motion.div>
  );
}
