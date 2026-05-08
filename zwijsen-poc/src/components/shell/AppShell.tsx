import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TopNav from "./TopNav";
import WelcomeScreen from "./WelcomeScreen";
import ConceptPlaceholder from "../concepts/ConceptPlaceholder";
import ConceptKaart from "../concepts/ConceptKaart";
import SwipeKaarten from "../concepts/SwipeKaarten";
import RaadCoach from "../concepts/RaadCoach";
import LibraryScreen from "../library/LibraryScreen";
import WorkbookDetail from "../library/WorkbookDetail";
import ImportFlow from "../library/ImportFlow";
import ExercisePlayer from "../library/ExercisePlayer";
import { concepts } from "../../data/concepts";
import type { AppView, ConceptId } from "./appView";
import { isDemoFullHeight, isExercisePlayerFullHeight } from "./appView";
import type { ViewMode } from "./viewMode";

function renderDemoConcept(id: string) {
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
  const [view, setView] = useState<AppView>({ name: "welcome" });
  const [viewMode, setViewMode] = useState<ViewMode>("student");

  const isFullHeight =
    (view.name === "demo" && isDemoFullHeight(view)) ||
    (view.name === "exercise" && isExercisePlayerFullHeight(view)) ||
    view.name === "import" ||
    view.name === "library" ||
    view.name === "workbook";

  const handleViewModeChange = useCallback((mode: ViewMode) => {
    setViewMode(mode);
    if (mode !== "student") return;
    setView((v) => {
      if (v.name === "library" || v.name === "import" || v.name === "workbook") {
        return { name: "welcome" };
      }
      if (v.name === "exercise" && v.returnToWorkbookId) {
        return { name: "welcome" };
      }
      return v;
    });
  }, []);

  function renderMain() {
    switch (view.name) {
      case "welcome":
        return (
          <WelcomeScreen
            studentMode={viewMode === "student"}
            onSelectDemo={(id) => setView({ name: "demo", conceptId: id as ConceptId })}
            onOpenLibrary={() => setView({ name: "library" })}
            onOpenImport={() => setView({ name: "import" })}
          />
        );
      case "library":
        return (
          <LibraryScreen
            onOpenWorkbook={(id) => setView({ name: "workbook", workbookId: id })}
            onImport={() => setView({ name: "import" })}
          />
        );
      case "import":
        return (
          <ImportFlow
            onCancel={() => setView({ name: "library" })}
            onComplete={(workbookId) => setView({ name: "workbook", workbookId })}
          />
        );
      case "workbook":
        return (
          <WorkbookDetail
            workbookId={view.workbookId}
            onBack={() => setView({ name: "library" })}
            onOpenExercise={(exerciseId) =>
              setView({ name: "exercise", exerciseId, returnToWorkbookId: view.workbookId })
            }
          />
        );
      case "exercise":
        return (
          <ExercisePlayer
            exerciseId={view.exerciseId}
            onBack={() =>
              view.returnToWorkbookId
                ? setView({ name: "workbook", workbookId: view.returnToWorkbookId })
                : setView({ name: "library" })
            }
          />
        );
      case "demo":
        return renderDemoConcept(view.conceptId);
      default:
        return null;
    }
  }

  const mainKey =
    view.name === "welcome"
      ? "welcome"
      : view.name === "library"
        ? "library"
        : view.name === "import"
          ? "import"
          : view.name === "workbook"
            ? `wb-${view.workbookId}`
            : view.name === "exercise"
              ? `ex-${view.exerciseId}`
              : `demo-${view.conceptId}`;

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-surface-base">
      <TopNav
        view={view}
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
        onGoWelcome={() => setView({ name: "welcome" })}
        onGoLibrary={() => setView({ name: "library" })}
        onGoImport={() => setView({ name: "import" })}
        onDemoConcept={(id) => setView({ name: "demo", conceptId: id as ConceptId })}
      />

      <main className={`relative flex flex-1 min-h-0 ${isFullHeight ? "overflow-hidden" : "overflow-y-auto"}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={mainKey}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className={`h-full min-h-0 w-full ${isFullHeight ? "flex flex-col overflow-hidden" : ""}`}
          >
            {renderMain()}
          </motion.div>
        </AnimatePresence>
      </main>

      {viewMode === "editor" && (
        <footer className="flex items-center justify-between border-t border-slate-100 bg-white px-6 py-2">
          <span className="text-xs text-slate-400">Zwijsen PoC · Iteratie 0 · Groep 4–8</span>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 animate-pulse rounded-full bg-accent-success" />
            <span className="text-xs text-slate-400">Human-in-the-loop actief</span>
          </div>
        </footer>
      )}
    </div>
  );
}
