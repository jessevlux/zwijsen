import { GraduationCap, PenLine } from "lucide-react";
import type { ViewMode } from "./viewMode";

interface Props {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
}

export default function ViewModeSwitch({ mode, onChange }: Props) {
  const isStudent = mode === "student";

  return (
    <div
      className="flex shrink-0 items-center gap-1 rounded-2xl border border-border-subtle bg-surface-muted/60 p-1"
      role="group"
      aria-label="Weergave"
    >
      <button
        type="button"
        onClick={() => onChange("student")}
        className={`flex min-h-[40px] items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-black transition-colors sm:px-3 ${
          isStudent ? "bg-white text-text-primary shadow-sm" : "text-text-muted hover:text-text-primary"
        }`}
        aria-pressed={isStudent}
      >
        <GraduationCap className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
        <span className="hidden sm:inline">Leerling</span>
      </button>
      <button
        type="button"
        onClick={() => onChange("editor")}
        className={`flex min-h-[40px] items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-black transition-colors sm:px-3 ${
          !isStudent ? "bg-white text-text-primary shadow-sm" : "text-text-muted hover:text-text-primary"
        }`}
        aria-pressed={!isStudent}
      >
        <PenLine className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
        <span className="hidden sm:inline">Redacteur</span>
      </button>
    </div>
  );
}
