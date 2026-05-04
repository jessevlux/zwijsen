import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ConceptIntro from "../shared/ConceptIntro";
import ConceptHeader from "../shared/ConceptHeader";
import SwipeDeck from "./SwipeDeck";
import { swipeAssignmentContext } from "./data";
import type { StepCfg } from "../shared/types";

const ACCENT = "#FF7A35";
const ACCENT_BG = "#FFF8F3";

const stepConfig: [StepCfg, StepCfg, StepCfg] = [{ emoji: "👈" }, { emoji: "👉" }, { emoji: "⬆️" }];

const brief = {
  themeLabel: swipeAssignmentContext.themeLabel,
  title: swipeAssignmentContext.title,
  situation: swipeAssignmentContext.situation,
  question: swipeAssignmentContext.question,
  steps: swipeAssignmentContext.steps,
} as const;

export default function SwipeKaarten() {
  const [started, setStarted] = useState(false);

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <AnimatePresence mode="wait">
        {!started ? (
          <motion.div key="intro" className="flex h-full min-h-0 flex-col">
            <ConceptIntro
              brief={brief}
              stepConfig={stepConfig}
              accentColor={ACCENT}
              accentBg={ACCENT_BG}
              onStart={() => setStarted(true)}
            />
          </motion.div>
        ) : (
          <motion.div
            key="exercise"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.22 }}
            className="flex h-full min-h-0 flex-col overflow-hidden"
            style={{ backgroundColor: ACCENT_BG }}
          >
            <ConceptHeader
              brief={brief}
              stepConfig={stepConfig}
              accentColor={ACCENT}
              headerBg={ACCENT_BG}
              borderColor="#FFD4B866"
            />
            <SwipeDeck />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
