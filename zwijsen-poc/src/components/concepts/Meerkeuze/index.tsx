import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { toneTokens } from "../../../data/concepts";
import type { MeerkeuzeContent } from "../../../types/exerciseContent";
import ConceptIntro from "../shared/ConceptIntro";
import ConceptHeader from "../shared/ConceptHeader";
import MeerkeuzeExercise from "./MeerkeuzeExercise";
import DonePanel from "./DonePanel";
import { vloggenMeerkeuzeContent } from "./examples";
import type { StepCfg } from "../shared/types";

const { accentColor: ACCENT, accentSoft: ACCENT_BG } = toneTokens.info;

const stepConfig: [StepCfg, StepCfg, StepCfg] = [
  { Icon: CheckCircle2 },
  { Icon: CheckCircle2 },
  { Icon: CheckCircle2 },
];

export interface MeerkeuzeProps {
  content?: MeerkeuzeContent;
}

export default function Meerkeuze({ content }: MeerkeuzeProps) {
  const resolved = content ?? vloggenMeerkeuzeContent;
  const brief = {
    themeLabel: resolved.brief.themeLabel,
    title: resolved.brief.title,
    situation: resolved.brief.situation,
    question: resolved.brief.question,
    steps: resolved.brief.steps,
  } as const;

  const [started, setStarted] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleComplete = (correct: boolean) => {
    setIsCorrect(correct);
    setIsDone(true);
  };

  const handleRestart = () => {
    setStarted(false);
    setIsDone(false);
    setIsCorrect(false);
  };

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
            <AnimatePresence mode="wait">
              {isDone ? (
                <motion.div key="done" className="flex h-full min-h-0 flex-1 items-center justify-center px-4">
                  <DonePanel
                    isCorrect={isCorrect}
                    explanation={resolved.explanation}
                    onRestart={handleRestart}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="game"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.22 }}
                  className="flex h-full min-h-0 flex-1 overflow-hidden"
                >
                  <MeerkeuzeExercise
                    content={resolved}
                    accentColor={ACCENT}
                    onComplete={handleComplete}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
