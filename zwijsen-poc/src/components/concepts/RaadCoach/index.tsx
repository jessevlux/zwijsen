import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Keyboard, Lightbulb, Trophy } from "lucide-react";
import { toneTokens } from "../../../data/concepts";
import ConceptIntro from "../shared/ConceptIntro";
import ConceptHeader from "../shared/ConceptHeader";
import type { StepCfg } from "../shared/types";
import RaadCoachGame from "./RaadCoachGame";
import { raadCoachAssignmentContext } from "./data";

const { accentColor: ACCENT, accentSoft: ACCENT_BG } = toneTokens.success;

const stepConfig: [StepCfg, StepCfg, StepCfg] = [
  { Icon: Keyboard },
  { Icon: Lightbulb },
  { Icon: Trophy },
];

const brief = {
  themeLabel: raadCoachAssignmentContext.themeLabel,
  title: raadCoachAssignmentContext.title,
  situation: raadCoachAssignmentContext.situation,
  question: raadCoachAssignmentContext.question,
  steps: raadCoachAssignmentContext.steps,
} as const;

export default function RaadCoach() {
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
              borderColor="var(--color-border-subtle)"
            />
            <RaadCoachGame accentColor={ACCENT} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
