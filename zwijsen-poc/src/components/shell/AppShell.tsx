import { useCallback, useState } from "react";
import { useLibrary } from "../../state/LibraryContext";
import { getNextExerciseId } from "../../library/workbookNavigation";
import { AnimatePresence, motion } from "framer-motion";
import TopNav from "./TopNav";
import WelcomeScreen from "./WelcomeScreen";
import ConceptPlaceholder from "../concepts/ConceptPlaceholder";
import ConceptKaart from "../concepts/ConceptKaart";
import SwipeKaarten from "../concepts/SwipeKaarten";
import RaadCoach from "../concepts/RaadCoach";
import LibraryScreen from "../library/LibraryScreen";
import WorkbookIntro from "../library/WorkbookIntro";
import WorkbookRubric from "../library/WorkbookRubric";
import WorkbookExercises from "../library/WorkbookExercises";
import ImportFlow from "../library/ImportFlow";
import ExercisePlayer from "../library/ExercisePlayer";
import { concepts } from "../../data/concepts";
import type { AppView } from "./appView";
import {
  isDemoFullHeight,
  isExercisePlayerFullHeight,
  isWorkbookContentFullHeight,
} from "./appView";
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
  const { getWorkbook } = useLibrary();
  const studentMode = viewMode === "student";

  const isFullHeight =
    (view.name === "demo" && isDemoFullHeight(view)) ||
    (view.name === "exercise" && isExercisePlayerFullHeight(view)) ||
    view.name === "import" ||
    view.name === "library" ||
    isWorkbookContentFullHeight(view);

  const handleViewModeChange = useCallback((mode: ViewMode) => {
    setViewMode(mode);
    if (mode !== "student") return;
    setView((v) => {
      if (
        v.name === "library" ||
        v.name === "import" ||
        v.name === "workbook-intro" ||
        v.name === "workbook-rubric" ||
        v.name === "workbook-exercises"
      ) {
        return { name: "welcome" };
      }
      if (v.name === "exercise") {
        return { name: "welcome" };
      }
      return v;
    });
  }, []);

  const handleNavBack = useCallback(() => {
    setView((v) => {
      if (v.name === "workbook-exercises") {
        return { name: "workbook-rubric", workbookId: v.workbookId };
      }
      if (v.name === "workbook-rubric") {
        return { name: "workbook-intro", workbookId: v.workbookId };
      }
      if (v.name === "workbook-intro") {
        return viewMode === "student"
          ? { name: "welcome" }
          : { name: "library" };
      }
      if (v.name === "exercise" && v.returnToWorkbookId) {
        return { name: "workbook-exercises", workbookId: v.returnToWorkbookId };
      }
      return v;
    });
  }, [viewMode]);

  function openWorkbookIntro(workbookId: string) {
    setView({ name: "workbook-intro", workbookId });
  }

  function renderMain() {
    switch (view.name) {
      case "welcome":
        return (
          <WelcomeScreen
            studentMode={viewMode === "student"}
            onOpenWorkbook={openWorkbookIntro}
            onOpenLibrary={() => setView({ name: "library" })}
            onOpenImport={() => setView({ name: "import" })}
          />
        );
      case "library":
        return (
          <LibraryScreen
            onOpenWorkbook={openWorkbookIntro}
            onImport={() => setView({ name: "import" })}
          />
        );
      case "import":
        return (
          <ImportFlow
            onCancel={() => setView({ name: "library" })}
            onComplete={(workbookId) => openWorkbookIntro(workbookId)}
          />
        );
      case "workbook-intro":
        return (
          <WorkbookIntro
            workbookId={view.workbookId}
            studentMode={viewMode === "student"}
            onContinue={() =>
              setView({
                name: "workbook-rubric",
                workbookId: view.workbookId,
              })
            }
          />
        );
      case "workbook-rubric":
        return (
          <WorkbookRubric
            workbookId={view.workbookId}
            onContinue={() =>
              setView({
                name: "workbook-exercises",
                workbookId: view.workbookId,
              })
            }
          />
        );
      case "workbook-exercises":
        return (
          <WorkbookExercises
            workbookId={view.workbookId}
            studentMode={viewMode === "student"}
            onOpenExercise={(exerciseId) =>
              setView({
                name: "exercise",
                exerciseId,
                returnToWorkbookId: view.workbookId,
              })
            }
          />
        );
      case "exercise":
        return (
          <ExercisePlayer
            exerciseId={view.exerciseId}
            onBack={() => {
              if (view.returnToWorkbookId) {
                setView({
                  name: "workbook-exercises",
                  workbookId: view.returnToWorkbookId,
                });
                return;
              }
              if (viewMode === "student") setView({ name: "welcome" });
              else setView({ name: "library" });
            }}
          />
        );
      case "demo":
        return renderDemoConcept(view.conceptId);
      default:
        return null;
    }
  }

  let onNextExercise: (() => void) | undefined;
  if (view.name === "exercise" && view.returnToWorkbookId) {
    const wb = getWorkbook(view.returnToWorkbookId);
    const nextId = wb && getNextExerciseId(wb, view.exerciseId, studentMode);
    if (nextId) {
      const workbookId = view.returnToWorkbookId;
      onNextExercise = () =>
        setView({ name: "exercise", exerciseId: nextId, returnToWorkbookId: workbookId });
    }
  }

  const mainKey =
    view.name === "welcome"
      ? "welcome"
      : view.name === "library"
        ? "library"
        : view.name === "import"
          ? "import"
          : view.name === "workbook-intro"
            ? `wb-intro-${view.workbookId}`
            : view.name === "workbook-rubric"
              ? `wb-rubric-${view.workbookId}`
              : view.name === "workbook-exercises"
              ? `wb-ex-${view.workbookId}`
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
        onBack={handleNavBack}
        onNextExercise={onNextExercise}
      />

      <main
        className={`relative flex flex-1 min-h-0 ${isFullHeight ? "overflow-hidden" : "overflow-y-auto"}`}
      >
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
        <footer className="border-t border-slate-100 bg-white px-6 py-2 text-center">
          <span className="text-xs text-slate-400">Zwijsen Taaljacht</span>
        </footer>
      )}
    </div>
  );
}
