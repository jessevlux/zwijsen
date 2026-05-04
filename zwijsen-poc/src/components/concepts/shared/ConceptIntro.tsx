import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";
import type { ConceptBrief, StepCfg } from "./types";
import { stepCardBackground, stepCardBorder } from "./stepCardTint";

interface ConceptIntroProps {
  brief: ConceptBrief;
  stepConfig: [StepCfg, StepCfg, StepCfg];
  /** Hoofd-accentkleur van het concept (bijv. "#FF7A35" of "#3B82F6") */
  accentColor: string;
  /** Zachte achtergrondkleur passend bij het concept */
  accentBg: string;
  onStart: () => void;
}

export default function ConceptIntro({
  brief,
  stepConfig,
  accentColor,
  accentBg,
  onStart,
}: ConceptIntroProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="flex h-full min-h-0 flex-col overflow-y-auto overflow-x-hidden px-4 py-3 sm:px-8 sm:py-4"
      style={{ backgroundColor: accentBg }}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.04, type: "spring", stiffness: 320, damping: 30 }}
        className="mx-auto flex min-h-full w-full max-w-5xl flex-col justify-center gap-3 py-1"
      >
        <div className="grid grid-cols-1 gap-3">
          <div className="min-w-0">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wide text-white"
              style={{ backgroundColor: accentColor }}
            >
              {brief.themeLabel}
            </span>
            <h1 className="mt-2 text-2xl font-black leading-tight text-slate-900 sm:text-[1.65rem]">
              {brief.title}
            </h1>
            <p className="mt-1.5 text-sm leading-snug text-slate-600 sm:text-[0.9375rem]">
              {brief.situation}
            </p>
            <div
              className="mt-2.5 rounded-xl border px-3 py-2 sm:mt-3"
              style={{
                backgroundColor: `color-mix(in srgb, ${accentColor} 5%, white)`,
                borderColor: `color-mix(in srgb, ${accentColor} 28%, white)`,
              }}
            >
              <p className="text-sm font-bold leading-snug" style={{ color: accentColor }}>
                {brief.question}
              </p>
            </div>
          </div>

          {/* Stappen: vanaf sm één rij — minder verticale ruimte */}
          <ol className="grid grid-cols-1 items-stretch gap-2 sm:grid-cols-3 sm:gap-2.5">
            {brief.steps.map((step, i) => {
              const idx = i as 0 | 1 | 2;
              const cfg = stepConfig[i];
              return (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + i * 0.05, type: "spring", stiffness: 340, damping: 30 }}
                  className="flex h-full min-h-0 gap-2.5 rounded-xl border px-2.5 py-2 sm:gap-3 sm:px-3 sm:py-2.5"
                  style={{
                    backgroundColor: stepCardBackground(accentColor, idx),
                    borderColor: stepCardBorder(accentColor, idx),
                  }}
                >
                  <span className="shrink-0 text-lg leading-none sm:text-xl" aria-hidden>
                    {cfg.emoji}
                  </span>
                  <div className="min-w-0">
                    <span
                      className="text-[9px] font-black uppercase tracking-wider sm:text-[10px]"
                      style={{ color: accentColor }}
                    >
                      Stap {i + 1}
                    </span>
                    <p className="mt-0.5 break-words text-[11px] leading-snug text-slate-800 sm:text-xs">
                      {step}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>

        <motion.button
          type="button"
          onClick={onStart}
          whileTap={{ scale: 0.98 }}
          className="flex min-h-[48px] w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl text-sm font-black text-white shadow-md transition-opacity hover:opacity-95 sm:min-h-[52px] sm:rounded-2xl sm:text-base"
          style={{ backgroundColor: accentColor }}
        >
          <PlayCircle className="h-5 w-5 shrink-0" aria-hidden />
          Ik begrijp het, start!
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
