import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TopNav from "./TopNav";
import EditorPanel from "./EditorPanel";
import WelcomeScreen from "./WelcomeScreen";
import ConceptPlaceholder from "../concepts/ConceptPlaceholder";
import ConceptKaart from "../concepts/ConceptKaart";
import SwipeKaarten from "../concepts/SwipeKaarten";
import RaadCoach from "../concepts/RaadCoach";
import { concepts } from "../../data/concepts";

function renderConcept(id: string) {
  switch (id) {
    case "concept-kaart":
      return <ConceptKaart />;
    case "swipe-kaarten":
      return <SwipeKaarten />;
    case "raad-coach":
      return <RaadCoach />;
    default: {
      const concept = concepts.find((c) => c.id === id);
      return concept ? <ConceptPlaceholder concept={concept} /> : null;
    }
  }
}

export default function AppShell() {
  const [activeId, setActiveId] = useState<string | null>(null);

  // ConceptKaart needs h-full without scroll, others need scroll
  const isFullHeight =
    activeId === "concept-kaart" || activeId === "swipe-kaarten" || activeId === "raad-coach";

  return (
    <div className="flex flex-col h-screen bg-surface-base overflow-hidden">
      {/* Top navigation */}
      <TopNav
        activeId={activeId ?? ""}
        onChange={(id) => setActiveId(id)}
      />

      {/* Main area: content + editor panel */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Main content */}
        <main
          className={`flex-1 relative ${isFullHeight ? "overflow-hidden" : "overflow-y-auto"}`}
        >
          <AnimatePresence mode="wait">
            {activeId === null ? (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="h-full"
              >
                <WelcomeScreen onSelect={(id) => setActiveId(id)} />
              </motion.div>
            ) : (
              <motion.div
                key={activeId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="h-full"
              >
                {renderConcept(activeId)}
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Editor panel (human-in-the-loop) — fixed to right side */}
        <div className="relative shrink-0">
          <EditorPanel />
        </div>
      </div>

      {/* Footer bar */}
      <footer className="px-6 py-2 bg-white border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs text-slate-400">
          Zwijsen PoC · Iteratie 0 · Groep 4–8
        </span>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-accent-success animate-pulse" />
          <span className="text-xs text-slate-400">Human-in-the-loop actief</span>
        </div>
      </footer>
    </div>
  );
}
