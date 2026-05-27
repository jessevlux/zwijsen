import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, ChevronRight, Home, Upload } from "lucide-react";
import type { AppView } from "./appView";
import { isWorkbookFlowView } from "./appView";
import type { ViewMode } from "./viewMode";
import ViewModeSwitch from "./ViewModeSwitch";

interface TopNavProps {
  view: AppView;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onGoWelcome: () => void;
  onGoLibrary: () => void;
  onGoImport: () => void;
  onBack?: () => void;
  onNextExercise?: () => void;
}

const NAV_GAP = "gap-3";

function navBtn(active: boolean, extra = "") {
  return `flex min-h-[48px] shrink-0 items-center gap-2 rounded-2xl border px-3 py-2 text-sm font-bold whitespace-nowrap transition-colors cursor-pointer sm:px-4 ${
    active
      ? "border-brand-orange bg-brand-orange text-text-inverted"
      : "border-border-subtle bg-surface-card text-text-secondary hover:border-border-strong/25"
  } ${extra}`;
}

export default function TopNav({
  view,
  viewMode,
  onViewModeChange,
  onGoWelcome,
  onGoLibrary,
  onGoImport,
  onBack,
  onNextExercise,
}: TopNavProps) {
  const editor = viewMode === "editor";
  const showBack = isWorkbookFlowView(view) && !!onBack;

  const inWorkbookFlow =
    view.name === "workbook-intro" ||
    view.name === "workbook-rubric" ||
    view.name === "workbook-exercises" ||
    (view.name === "exercise" && !!view.returnToWorkbookId);

  return (
    <nav
      className={`flex items-center ${NAV_GAP} border-b border-border-subtle bg-surface-card px-4 py-3 sm:px-6`}
      aria-label="Hoofdnavigatie"
    >
      <motion.button
        type="button"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onGoWelcome}
        className="flex min-h-[48px] shrink-0 cursor-pointer items-center gap-2.5 rounded-2xl px-1 py-2 outline-none ring-brand-orange transition-opacity hover:opacity-90 focus-visible:ring-2 sm:px-2"
        title="Terug naar start"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-orange text-sm font-black text-white shadow-[var(--shadow-card)]">
          Z
        </span>
        <span className="hidden text-base font-black text-text-primary sm:inline">Zwijsen</span>
      </motion.button>

      {showBack ? (
        <motion.button
          type="button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onBack}
          className={navBtn(false)}
          title="Terug"
        >
          <ArrowLeft size={18} className="shrink-0" strokeWidth={2} aria-hidden />
          <span className="hidden sm:inline">Terug</span>
        </motion.button>
      ) : null}

      <motion.button
        type="button"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onGoWelcome}
        className={navBtn(view.name === "welcome")}
        title="Start"
      >
        <Home size={18} className="shrink-0" strokeWidth={2} aria-hidden />
        <span className="hidden md:inline">Start</span>
      </motion.button>

      {editor && (
        <>
          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onGoLibrary}
            className={navBtn(view.name === "library" || inWorkbookFlow)}
            title="Bibliotheek"
          >
            <BookOpen size={18} className="shrink-0" strokeWidth={2} aria-hidden />
            <span className="hidden md:inline">Bibliotheek</span>
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onGoImport}
            className={navBtn(view.name === "import")}
            title="Werkboek importeren"
          >
            <Upload size={18} className="shrink-0" strokeWidth={2} aria-hidden />
            <span className="hidden md:inline">Importeren</span>
          </motion.button>
        </>
      )}

      <div className="min-w-0 flex-1" aria-hidden />

      <div className={`flex shrink-0 items-center ${NAV_GAP}`}>
        {onNextExercise ? (
          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onNextExercise}
            className={navBtn(false)}
            title="Volgende opdracht"
          >
            Volgende
            <ChevronRight size={18} className="shrink-0" strokeWidth={2} aria-hidden />
          </motion.button>
        ) : null}
        <ViewModeSwitch mode={viewMode} onChange={onViewModeChange} />
      </div>
    </nav>
  );
}
