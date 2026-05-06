import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Lightbulb, Link2, MousePointerClick } from "lucide-react";
import { toneTokens } from "../../../data/concepts";
import type { ConceptKaartContent } from "../../../types/exerciseContent";
import ConceptIntro from "../shared/ConceptIntro";
import ConceptHeader from "../shared/ConceptHeader";
import InventoryPanel from "./InventoryPanel";
import SemanticCanvas from "./SemanticCanvas";
import { vloggenConceptKaartContent } from "./examples";
import type { StepCfg } from "../shared/types";

const { accentColor: ACCENT, accentSoft: ACCENT_BG } = toneTokens.info;

const stepConfig: [StepCfg, StepCfg, StepCfg] = [
  { Icon: MousePointerClick },
  { Icon: Link2 },
  { Icon: Lightbulb },
];

export interface ConceptKaartProps {
  /** Standaard: Vloggen-voorbeeld. */
  content?: ConceptKaartContent;
}

export default function ConceptKaart({ content }: ConceptKaartProps) {
  const c = content ?? vloggenConceptKaartContent;
  const brief = {
    themeLabel: c.brief.themeLabel,
    title: c.brief.title,
    situation: c.brief.situation,
    question: c.brief.question,
    steps: c.brief.steps,
  } as const;

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
            <div className="flex min-h-0 flex-1 overflow-hidden">
              <InventoryPanel
                categories={c.categories}
                words={c.words}
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
                <SemanticCanvas onUsedWordsChange={setUsedWordIds} correctPairs={c.pairs} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
