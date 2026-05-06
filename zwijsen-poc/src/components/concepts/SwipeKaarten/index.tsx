import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";
import { toneTokens } from "../../../data/concepts";
import type { SwipeKaartenContent } from "../../../types/exerciseContent";
import ConceptIntro from "../shared/ConceptIntro";
import ConceptHeader from "../shared/ConceptHeader";
import SwipeDeck from "./SwipeDeck";
import { vloggenSwipeContent } from "./examples";
import type { StepCfg } from "../shared/types";

const { accentColor: ACCENT, accentSoft: ACCENT_BG } = toneTokens.warm;

const stepConfig: [StepCfg, StepCfg, StepCfg] = [
  { Icon: ArrowLeft },
  { Icon: ArrowRight },
  { Icon: ArrowUp },
];

export interface SwipeKaartenProps {
  content?: SwipeKaartenContent;
}

export default function SwipeKaarten({ content }: SwipeKaartenProps) {
  const resolved = content ?? vloggenSwipeContent;
  const brief = {
    themeLabel: resolved.brief.themeLabel,
    title: resolved.brief.title,
    situation: resolved.brief.situation,
    question: resolved.brief.question,
    steps: resolved.brief.steps,
  } as const;

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
            <SwipeDeck cards={resolved.cards} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
