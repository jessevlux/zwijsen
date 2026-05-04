import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ConceptIntro from "../shared/ConceptIntro";
import ConceptHeader from "../shared/ConceptHeader";
import InventoryPanel from "./InventoryPanel";
import SemanticCanvas from "./SemanticCanvas";
import { assignmentContext, inventoryCategories, inventoryWords } from "./data";
import type { StepCfg } from "../shared/types";

const ACCENT = "#3B82F6";
const ACCENT_BG = "#EFF6FF";

const stepConfig: [StepCfg, StepCfg, StepCfg] = [{ emoji: "🖱️" }, { emoji: "🔗" }, { emoji: "💡" }];

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
                  borderColor="#E2E8F0"
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
