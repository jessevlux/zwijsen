import { motion } from "framer-motion";
import { RotateCcw, Sparkles } from "lucide-react";

export default function DonePanel({
  correct,
  attempts,
  onRestart,
}: {
  correct: number;
  attempts: number;
  onRestart: () => void;
}) {
  const pct = attempts > 0 ? Math.round((correct / attempts) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 28 }}
      className="flex w-full max-w-md flex-col items-center gap-6 rounded-3xl border-2 border-black/10 bg-white p-8 text-center shadow-xl"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF4EC] text-[#FF7A35]">
        <Sparkles className="h-8 w-8" aria-hidden />
      </div>
      <div>
        <h2 className="text-2xl font-black text-zinc-900">Klaar voor vandaag</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600">
          Je hebt de stapel uitgespeeld. Goed bezig — zo blijven deze woorden plakken.
        </p>
      </div>
      <div className="w-full rounded-2xl bg-zinc-50 px-4 py-4 text-left">
        <dl className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="text-xs font-bold uppercase tracking-wide text-zinc-500">Goed</dt>
            <dd className="text-2xl font-black text-zinc-900">{correct}</dd>
          </div>
          <div>
            <dt className="text-xs font-bold uppercase tracking-wide text-zinc-500">Pogingen</dt>
            <dd className="text-2xl font-black text-zinc-900">{attempts}</dd>
          </div>
          <div className="col-span-2 border-t border-zinc-200 pt-3">
            <dt className="text-xs font-bold uppercase tracking-wide text-zinc-500">Score</dt>
            <dd className="text-lg font-black text-[#FF7A35]">{pct}% goed</dd>
          </div>
        </dl>
      </div>
      <button
        type="button"
        onClick={onRestart}
        className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-brand-orange px-4 py-3 text-sm font-black uppercase tracking-wide text-white shadow-md transition-opacity hover:opacity-95"
      >
        <RotateCcw className="h-5 w-5" aria-hidden />
        Opnieuw beginnen
      </button>
    </motion.div>
  );
}
