import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link2 } from "lucide-react";
import { toneTokens } from "../../../data/concepts";
import type { KoppelenLijnenContent } from "../../../types/exerciseContent";
import ConceptIntro from "../shared/ConceptIntro";
import ConceptHeader from "../shared/ConceptHeader";
import KoppelenExercise from "./KoppelenExercise";
import DonePanel from "./DonePanel";
import { vloggenKoppelenContent } from "./examples";
import type { StepCfg } from "../shared/types";

const { accentColor: ACCENT, accentSoft: ACCENT_BG } = toneTokens.violet;

const stepConfig: [StepCfg, StepCfg, StepCfg] = [
  { Icon: Link2 },
  { Icon: Link2 },
  { Icon: Link2 },
];

export interface KoppelenProps {
  content?: KoppelenLijnenContent;
}

export default function Koppelen({ content }: KoppelenProps) {
  const resolved = content ?? vloggenKoppelenContent;
  const brief = {
    themeLabel: resolved.brief.themeLabel,
    title: resolved.brief.title,
    situation: resolved.brief.situation,
    question: resolved.brief.question,
    steps: resolved.brief.steps,
  } as const;

  const [started, setStarted] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const handleComplete = (correct: number, total: number) => {
    setScore({ correct, total });
    setIsDone(true);
  };

  const handleRestart = () => {
    setStarted(false);
    setIsDone(false);
    setScore({ correct: 0, total: 0 });
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
                    correct={score.correct}
                    total={score.total}
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
                  <KoppelenExercise
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
