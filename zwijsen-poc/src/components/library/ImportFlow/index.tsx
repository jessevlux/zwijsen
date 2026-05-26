import { useState } from "react";
import { useLibrary } from "../../../state/LibraryContext";
import { newId } from "../../../library/id";
import type { Workbook } from "../../../types/workbook";
import type { ImportDraft } from "./types";
import UploadStep from "./UploadStep";
import PreviewStep from "./PreviewStep";
import ConfirmStep from "./ConfirmStep";

interface ImportFlowProps {
  onCancel: () => void;
  onComplete: (workbookId: string) => void;
}

const initialDraft = (): ImportDraft => ({
  title: "",
  grade: "Groep 8",
  side: "taakboekje",
  pages: 24,
  fileName: null,
  fileSize: null,
  exercises: [],
  sources: [],
});

export default function ImportFlow({ onCancel, onComplete }: ImportFlowProps) {
  const { addWorkbook } = useLibrary();
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<ImportDraft>(initialDraft);

  function handleSave() {
    const wbId = newId("wb");
    const wb: Workbook = {
      id: wbId,
      title: draft.title.trim() || "Zonder titel",
      grade: draft.grade,
      side: draft.side,
      pages: draft.pages,
      origin: "imported",
      importedAt: new Date().toISOString(),
      exercises: draft.exercises.map((e) => ({
        ...e,
        workbookId: wbId,
      })),
      sources: draft.sources,
    };
    addWorkbook(wb);
    onComplete(wbId);
  }

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-surface-base">
      <header className="shrink-0 border-b border-border-subtle bg-surface-card px-4 py-3">
        <div className="mx-auto flex max-w-5xl flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-base font-black text-text-primary">Werkboek importeren</h1>
            <p className="mt-1 max-w-2xl text-xs leading-relaxed text-text-muted">
              Begeleide import: werkboeken zijn visueel complex — we streven niet naar foutloze volledige automatisering;
              redactie en controle blijven nodig. Output wordt gestructureerd (o.a. vraag, antwoord, brontekst).
            </p>
          </div>
          <button type="button" onClick={onCancel} className="shrink-0 text-xs font-bold text-text-muted hover:text-text-primary">
            Annuleren
          </button>
        </div>
        <div className="mx-auto mt-3 flex max-w-5xl flex-wrap items-center gap-2 text-xs font-bold">
          {[1, 2, 3].map((n) => (
            <button
              key={n}
              type="button"
              disabled={n > step}
              onClick={() => n < step && setStep(n as 1 | 2 | 3)}
              className={`rounded-full px-3 py-1 transition-colors ${
                step === n
                  ? "bg-brand-orange text-white"
                  : n < step
                    ? "cursor-pointer bg-surface-muted text-text-primary hover:bg-border-subtle"
                    : "cursor-not-allowed bg-slate-100 text-text-muted opacity-60"
              }`}
            >
              {n}. {n === 1 ? "Upload" : n === 2 ? "Preview" : "Bevestigen"}
            </button>
          ))}
        </div>
      </header>
      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6">
        {step === 1 && <UploadStep draft={draft} setDraft={setDraft} onNext={() => setStep(2)} />}
        {step === 2 && (
          <PreviewStep draft={draft} setDraft={setDraft} onBack={() => setStep(1)} onNext={() => setStep(3)} />
        )}
        {step === 3 && <ConfirmStep draft={draft} onBack={() => setStep(2)} onSave={handleSave} />}
      </div>
    </div>
  );
}
