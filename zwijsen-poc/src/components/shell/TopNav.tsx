import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Home, Upload } from "lucide-react";
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
}

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
      className="flex items-center gap-2 border-b border-border-subtle bg-surface-card px-4 py-3 sm:px-6"
      aria-label={editor ? "Redacteur: start, bibliotheek en import" : "Leerling: navigatie"}
    >
      <div className="mr-2 flex shrink-0 items-center gap-2 sm:mr-4">
        <button
          type="button"
          onClick={onGoWelcome}
          className="flex shrink-0 items-center gap-2 rounded-xl outline-none ring-brand-orange transition-shadow hover:opacity-90 focus-visible:ring-2"
          title={editor ? "Terug naar start" : "Terug naar werkboeken"}
        >
          <motion.div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-orange shadow-[var(--shadow-card)]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-sm font-black leading-none text-white">Z</span>
          </motion.div>
          <span className="hidden text-base font-black text-text-primary sm:block">Zwijsen</span>
        </button>

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
      </div>

      <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto">
        {editor && (
          <>
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onGoWelcome}
              className={navBtn(view.name === "welcome")}
              title="Start — overzicht voor redacteur"
            >
              <Home size={18} className="shrink-0" strokeWidth={2} aria-hidden />
              <span className="hidden md:inline">Start</span>
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onGoLibrary}
              className={navBtn(
                view.name === "library" || inWorkbookFlow,
              )}
              title="Werkboeken beheren (redacteur)"
            >
              <BookOpen size={18} className="shrink-0 text-text-secondary" strokeWidth={2} aria-hidden />
              <span className="hidden md:inline">Bibliotheek</span>
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onGoImport}
              className={navBtn(view.name === "import")}
              title="Begeleide import: PDF wordt niet volledig automatisch omgezet; controle blijft onderdeel van de flow"
            >
              <Upload size={18} className="shrink-0 text-text-secondary" strokeWidth={2} aria-hidden />
              <span className="hidden md:inline">Importeren</span>
            </motion.button>
          </>
        )}
      </div>

      <ViewModeSwitch mode={viewMode} onChange={onViewModeChange} />
    </nav>
  );
}
