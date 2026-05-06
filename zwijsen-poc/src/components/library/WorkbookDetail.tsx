import { useState } from "react";
import { useLibrary } from "../../state/LibraryContext";
import AIGenerateDialog from "./AIGenerateDialog";
import type { Exercise } from "../../types/workbook";

interface WorkbookDetailProps {
  workbookId: string;
  onBack: () => void;
  onOpenExercise: (exerciseId: string) => void;
}

export default function WorkbookDetail({ workbookId, onBack, onOpenExercise }: WorkbookDetailProps) {
  const { getWorkbook } = useLibrary();
  const wb = getWorkbook(workbookId);
  const [aiExercise, setAiExercise] = useState<Exercise | null>(null);

  if (!wb) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6">
        <p className="text-sm font-bold text-text-secondary">Werkboek niet gevonden.</p>
        <button type="button" onClick={onBack} className="rounded-xl border px-4 py-2 text-sm font-bold">
          Terug
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col overflow-y-auto bg-surface-base">
      <header className="shrink-0 border-b border-border-subtle bg-surface-card px-4 py-4">
        <button type="button" onClick={onBack} className="text-xs font-bold text-text-muted hover:text-text-primary">
          ← Bibliotheek
        </button>
        <h1 className="mt-2 text-xl font-black text-text-primary">{wb.title}</h1>
        <p className="mt-1 text-sm text-text-secondary">
          {wb.grade} · {wb.side} · {wb.pages} pagina&apos;s · {wb.exercises.length} opdrachten
          {wb.importedAt && ` · geïmporteerd ${new Date(wb.importedAt).toLocaleDateString("nl-NL")}`}
        </p>
      </header>

      <div className="mx-auto w-full max-w-3xl flex-1 space-y-3 px-4 py-6">
        <h2 className="text-sm font-black uppercase tracking-wide text-text-muted">Opdrachten</h2>
        <ul className="space-y-3">
          {wb.exercises.map((ex) => (
            <li
              key={ex.id}
              className="flex flex-col gap-3 rounded-xl border border-border-subtle bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-black uppercase text-slate-700">
                    p.{ex.pageNumber}
                  </span>
                  <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-black uppercase text-slate-700">
                    {ex.difficulty}
                  </span>
                  {ex.isPlus && (
                    <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-black text-amber-900">+</span>
                  )}
                  {ex.isOwnAnswer && (
                    <span className="rounded bg-violet-100 px-1.5 py-0.5 text-[10px] font-black text-violet-900">
                      eigen antwoord
                    </span>
                  )}
                  {ex.sourceTextId && (
                    <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-black text-emerald-900">
                      brontekst
                    </span>
                  )}
                </div>
                <p className="mt-1 font-mono text-sm font-bold text-text-primary">{ex.type}</p>
                <p className="text-xs text-text-muted">
                  {ex.content ? "Heeft digitale content" : "Nog geen content"}
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={() => onOpenExercise(ex.id)}
                  className="rounded-xl bg-brand-orange px-4 py-2 text-xs font-black text-white"
                >
                  Open als oefening
                </button>
                <button
                  type="button"
                  onClick={() => setAiExercise(ex)}
                  className="rounded-xl border border-border-subtle px-4 py-2 text-xs font-bold text-text-primary"
                >
                  Genereer AI-variant
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <AIGenerateDialog open={!!aiExercise} exercise={aiExercise} onClose={() => setAiExercise(null)} />
    </div>
  );
}
