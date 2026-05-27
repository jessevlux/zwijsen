import { motion } from "framer-motion";
import { BookOpen, Upload } from "lucide-react";
import WorkbookGrid from "../library/WorkbookGrid";

interface Props {
  studentMode?: boolean;
  onOpenWorkbook: (id: string) => void;
  onOpenLibrary: () => void;
  onOpenImport: () => void;
}

export default function WelcomeScreen({
  studentMode = false,
  onOpenWorkbook,
  onOpenLibrary,
  onOpenImport,
}: Props) {
  return (
    <div className="flex h-full flex-col items-center overflow-y-auto px-6 py-10">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-6 w-full max-w-2xl text-center"
      >
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-brand-orange shadow-[var(--shadow-card-hover)]">
          <span className="text-4xl font-black leading-none text-white">Z</span>
        </div>
        <h1 className="text-4xl font-black leading-tight text-text-primary">
          {studentMode ? "Taaljacht" : "Zwijsen"}
        </h1>
        <p className="mx-auto mt-3 max-w-md text-lg leading-relaxed text-text-secondary">
          {studentMode
            ? "Kies je werkboek en ga aan de slag."
            : "Beheer werkboeken en importeer nieuwe materialen."}
        </p>

        {!studentMode && (
          <div className="mx-auto mt-6 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={onOpenLibrary}
              className="flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 text-sm font-black text-white shadow-md hover:opacity-95"
            >
              <BookOpen className="h-5 w-5 shrink-0" strokeWidth={2} aria-hidden />
              Bibliotheek
            </button>
            <button
              type="button"
              onClick={onOpenImport}
              className="flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-2xl border-2 border-brand-orange bg-white px-4 text-sm font-black text-brand-orange shadow-sm hover:bg-brand-orange-soft"
            >
              <Upload className="h-5 w-5 shrink-0" strokeWidth={2} aria-hidden />
              Werkboek importeren
            </button>
          </div>
        )}
      </motion.div>

      <div className="w-full max-w-2xl">
        <p className="mb-3 text-center text-xs font-black uppercase tracking-wide text-text-muted">
          Werkboeken
        </p>
        <WorkbookGrid
          onOpenWorkbook={onOpenWorkbook}
          listClassName="mt-0"
          studentMode={studentMode}
        />
      </div>
    </div>
  );
}
