import { motion } from "framer-motion";
import { RotateCcw, Sparkles, AlertCircle } from "lucide-react";

export default function DonePanel({
  isCorrect,
  onRestart,
}: {
  isCorrect: boolean;
  onRestart: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 28 }}
      className="flex w-full max-w-md flex-col items-center gap-6 rounded-3xl border-2 border-black/10 bg-white p-8 text-center shadow-xl"
    >
      <div
        className={`flex h-16 w-16 items-center justify-center rounded-full ${
          isCorrect
            ? "bg-green-100 text-green-600"
            : "bg-yellow-100 text-yellow-600"
        }`}
      >
        {isCorrect ? (
          <Sparkles className="h-8 w-8" aria-hidden />
        ) : (
          <AlertCircle className="h-8 w-8" aria-hidden />
        )}
      </div>
      <div>
        <h2 className="text-2xl font-black text-text-primary">
          {isCorrect ? "Correct!" : "Bijna!"}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">
          {isCorrect
            ? "Je hebt alle woorden correct gemarkeerd!"
            : "Controleer je markeringen nog eens."}
        </p>
      </div>
      <button
        type="button"
        onClick={onRestart}
        className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-accent-amber px-4 py-3 text-sm font-black uppercase tracking-wide text-white shadow-md transition-opacity hover:opacity-90"
      >
        <RotateCcw className="h-5 w-5" aria-hidden />
        Opnieuw beginnen
      </button>
    </motion.div>
  );
}
