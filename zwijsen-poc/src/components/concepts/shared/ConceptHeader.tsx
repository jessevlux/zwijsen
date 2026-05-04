import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CircleHelp, X } from "lucide-react";
import type { ConceptBrief, StepCfg } from "./types";
import { stepCardBackground, stepCardBorder } from "./stepCardTint";

interface ConceptHeaderProps {
  brief: ConceptBrief;
  stepConfig: [StepCfg, StepCfg, StepCfg];
  accentColor: string;
  headerBg?: string;
  borderColor?: string;
}

export default function ConceptHeader({
  brief,
  stepConfig,
  accentColor,
  headerBg = "#fff",
  borderColor = "rgba(0,0,0,0.08)",
}: ConceptHeaderProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onKey(ev: KeyboardEvent) {
      if (ev.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="shrink-0 border-b px-4"
      style={{ backgroundColor: headerBg, borderColor }}
    >
      {/* Eén compacte regel */}
      <div className="flex min-h-[52px] items-center gap-3">
        <span
          className="inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-white"
          style={{ backgroundColor: accentColor }}
        >
          {brief.themeLabel}
        </span>
        <h2 className="min-w-0 flex-1 truncate text-base font-black leading-tight text-slate-900">
          {brief.title}
        </h2>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full transition-opacity hover:opacity-70 active:opacity-50"
          style={{ color: accentColor }}
          aria-expanded={open}
          aria-haspopup="dialog"
          aria-label="Hoe werkt dit?"
          title="Hoe werkt dit?"
        >
          <CircleHelp size={24} strokeWidth={2} aria-hidden />
        </button>
      </div>

      {/* Help-popup */}
      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] cursor-default bg-slate-900/45"
              aria-label="Sluiten"
              onClick={() => setOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="concept-header-dialog-title"
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 12 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              className="fixed left-1/2 top-1/2 z-[101] w-[min(22rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-5 shadow-2xl ring-2 ring-black/5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <h3
                    id="concept-header-dialog-title"
                    className="text-lg font-black leading-tight text-slate-900"
                  >
                    Hoe werkt dit?
                  </h3>
                  <p className="mt-1 text-sm leading-snug text-slate-500">{brief.situation}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-2xl bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 hover:text-slate-900"
                  aria-label="Sluiten"
                >
                  <X size={20} />
                </button>
              </div>

              <ol className="flex flex-col gap-2">
                {brief.steps.map((step, i) => {
                  const idx = i as 0 | 1 | 2;
                  const cfg = stepConfig[i];
                  return (
                    <li
                      key={i}
                      className="flex min-h-[52px] items-start gap-3 rounded-2xl border px-3 py-3"
                      style={{
                        backgroundColor: stepCardBackground(accentColor, idx),
                        borderColor: stepCardBorder(accentColor, idx),
                      }}
                    >
                      <span className="mt-0.5 shrink-0 text-xl leading-none">{cfg.emoji}</span>
                      <div>
                        <span
                          className="text-[10px] font-black uppercase tracking-wider"
                          style={{ color: accentColor }}
                        >
                          Stap {i + 1}
                        </span>
                        <p className="mt-0.5 text-sm leading-snug text-slate-700">{step}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-4 w-full cursor-pointer rounded-2xl py-3.5 text-sm font-black text-white transition-opacity hover:opacity-95"
                style={{ backgroundColor: accentColor }}
              >
                Begrepen!
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
