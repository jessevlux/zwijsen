import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CircleHelp, X } from "lucide-react";
import InventoryPanel from "./InventoryPanel";
import SemanticCanvas from "./SemanticCanvas";
import {
  assignmentContext,
  inventoryCategories,
  inventoryWords,
} from "./data";

const stepConfig = [
  { emoji: "🖱️", color: "#3B82F6", bg: "#DBEAFE" },
  { emoji: "🔗", color: "#A855F7", bg: "#F3E8FF" },
  { emoji: "💡", color: "#F59E0B", bg: "#FEF3C7" },
] as const;

function AssignmentBrief() {
  const a = assignmentContext;
  const [stepsOpen, setStepsOpen] = useState(false);

  useEffect(() => {
    if (!stepsOpen) return;
    function onKey(ev: KeyboardEvent) {
      if (ev.key === "Escape") setStepsOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [stepsOpen]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="shrink-0 bg-white border-b border-slate-100 px-5 py-4 shadow-sm"
    >
      <div className="max-w-3xl">
        {/* Theme pill */}
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange text-white text-[11px] font-black uppercase tracking-wide px-3 py-1 mb-3">
          🎬 {a.themeLabel}
        </span>

        {/* Title */}
        <h2 className="font-black text-slate-900 text-2xl leading-tight">
          {a.title}
        </h2>

        {/* Situation */}
        <p className="mt-2 text-base text-slate-600 leading-relaxed">
          {a.situation}
        </p>

        {/* Question — callout met klikbaar vraagteken (geen vraagteken-emoji) */}
        <div className="mt-3 flex max-w-xl items-start gap-3 rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] px-4 py-3">
          <p className="min-w-0 flex-1 text-sm font-bold leading-snug text-[#1D4ED8]">
            {a.question}
          </p>
          <button
            type="button"
            onClick={() => setStepsOpen(true)}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-transparent p-0 text-[#1D4ED8] transition-opacity hover:opacity-75 active:opacity-60 cursor-pointer"
            aria-expanded={stepsOpen}
            aria-haspopup="dialog"
            aria-label="Bekijk de stappen"
            title="Bekijk de stappen"
          >
            <CircleHelp size={28} strokeWidth={2} aria-hidden />
          </button>
        </div>
      </div>

      {/* Popup: 3 stappen */}
      <AnimatePresence>
        {stepsOpen && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-slate-900/45 cursor-default"
              aria-label="Sluiten"
              onClick={() => setStepsOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="steps-dialog-title"
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 12 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              className="fixed left-1/2 top-1/2 z-[101] w-[min(22rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-5 shadow-2xl ring-2 ring-slate-100"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <h3
                  id="steps-dialog-title"
                  className="font-black text-lg text-slate-900 leading-tight"
                >
                  Zo doe je het
                </h3>
                <button
                  type="button"
                  onClick={() => setStepsOpen(false)}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 hover:text-slate-900 cursor-pointer"
                  aria-label="Sluiten"
                >
                  <X size={22} />
                </button>
              </div>

              <ol className="flex flex-col gap-2">
                {a.steps.map((step, i) => {
                  const cfg = stepConfig[i];
                  return (
                    <li
                      key={i}
                      className="flex items-start gap-3 rounded-2xl px-3 py-3 border"
                      style={{
                        backgroundColor: cfg.bg,
                        borderColor: cfg.color + "33",
                        minHeight: 52,
                      }}
                    >
                      <span className="text-xl leading-none shrink-0 mt-0.5">
                        {cfg.emoji}
                      </span>
                      <div>
                        <span
                          className="text-[10px] font-black uppercase tracking-wider"
                          style={{ color: cfg.color }}
                        >
                          Stap {i + 1}
                        </span>
                        <p className="text-sm text-slate-700 leading-snug mt-0.5">
                          {step}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>

              <button
                type="button"
                onClick={() => setStepsOpen(false)}
                className="mt-4 w-full rounded-2xl bg-brand-orange py-3.5 text-sm font-black text-white transition-opacity hover:opacity-95 cursor-pointer"
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

export default function ConceptKaart() {
  const [usedWordIds, setUsedWordIds] = useState<Set<string>>(new Set());

  return (
    <div className="flex h-full min-h-0 overflow-hidden">
      <InventoryPanel
        categories={inventoryCategories}
        words={inventoryWords}
        usedWordIds={usedWordIds}
      />
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <AssignmentBrief />
        <SemanticCanvas onUsedWordsChange={setUsedWordIds} />
      </div>
    </div>
  );
}
