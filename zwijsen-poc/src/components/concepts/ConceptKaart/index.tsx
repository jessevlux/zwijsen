import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Lightbulb, Link2, MousePointerClick } from "lucide-react";
import { toneTokens } from "../../../data/concepts";
import ConceptIntro from "../shared/ConceptIntro";
import ConceptHeader from "../shared/ConceptHeader";
import InventoryPanel from "./InventoryPanel";
import SemanticCanvas from "./SemanticCanvas";
import { assignmentContext, inventoryCategories, inventoryWords } from "./data";
import type { StepCfg } from "../shared/types";

const { accentColor: ACCENT, accentSoft: ACCENT_BG } = toneTokens.info;

const stepConfig: [StepCfg, StepCfg, StepCfg] = [
  { Icon: MousePointerClick },
  { Icon: Link2 },
  { Icon: Lightbulb },
];

const brief = {
  themeLabel: assignmentContext.themeLabel,
  title: assignmentContext.title,
  situation: assignmentContext.situation,
  question: assignmentContext.question,
  steps: assignmentContext.steps,
} as const;

export default function ConceptKaart() {
  const [started, setStarted] = useState(false);
  const [usedWordIds, setUsedWordIds] = useState<Set<string>>(new Set());

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
          >
            {/* Compacte header + opdrachten canvas */}
            <div className="flex min-h-0 flex-1 overflow-hidden">
              <InventoryPanel
                categories={inventoryCategories}
                words={inventoryWords}
                usedWordIds={usedWordIds}
              />
              <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
                <ConceptHeader
                  brief={brief}
                  stepConfig={stepConfig}
                  accentColor={ACCENT}
                  headerBg="#fff"
                  borderColor="var(--color-border-subtle)"
                />
                <SemanticCanvas onUsedWordsChange={setUsedWordIds} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
