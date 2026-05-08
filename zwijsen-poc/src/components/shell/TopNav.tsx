import { motion } from "framer-motion";
import { BookOpen, Home, Upload } from "lucide-react";
import { concepts, toneTokens } from "../../data/concepts";
import type { AppView } from "./appView";
import type { ViewMode } from "./viewMode";
import ViewModeSwitch from "./ViewModeSwitch";

interface TopNavProps {
  view: AppView;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onGoWelcome: () => void;
  onGoLibrary: () => void;
  onGoImport: () => void;
  onDemoConcept: (id: string) => void;
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
  onDemoConcept,
}: TopNavProps) {
  const editor = viewMode === "editor";

  return (
    <nav
      className="flex items-center gap-2 border-b border-border-subtle bg-surface-card px-4 py-3 sm:px-6"
      aria-label={editor ? "Redacteur: start, bibliotheek en import" : "Leerling: kies een oefening"}
    >
      <button
        type="button"
        onClick={onGoWelcome}
        className="mr-2 flex shrink-0 items-center gap-2 rounded-xl outline-none ring-brand-orange transition-shadow hover:opacity-90 focus-visible:ring-2 sm:mr-4"
        title="Terug naar start"
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-orange shadow-[var(--shadow-card)]">
          <span className="text-sm font-black leading-none text-white">Z</span>
        </div>
        <span className="hidden text-base font-black text-text-primary sm:block">Zwijsen</span>
      </button>

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
              className={navBtn(view.name === "library" || view.name === "workbook")}
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

        {!editor &&
          concepts.map((concept) => {
            const isActive = view.name === "demo" && view.conceptId === concept.id;
            const Icon = concept.Icon;
            const accent = toneTokens[concept.tone].accentColor;
            return (
              <motion.button
                key={concept.id}
                type="button"
                onClick={() => onDemoConcept(concept.id)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={navBtn(isActive)}
                title={`Open oefening: ${concept.title}`}
              >
                <Icon
                  size={18}
                  className="shrink-0"
                  style={{ color: isActive ? "var(--color-text-inverted)" : accent }}
                  strokeWidth={2}
                  aria-hidden
                />
                <span className="hidden lg:inline">{concept.title}</span>
                <span className="lg:hidden font-black">{concept.number}</span>
              </motion.button>
            );
          })}
      </div>

      <ViewModeSwitch mode={viewMode} onChange={onViewModeChange} />
    </nav>
  );
}
