import type { ChangeEvent } from "react";
import type { ImportDraft } from "./types";
import type { BookSide } from "../../../types/workbook";

interface Props {
  draft: ImportDraft;
  setDraft: (d: ImportDraft | ((prev: ImportDraft) => ImportDraft)) => void;
  onNext: () => void;
}

export default function UploadStep({ draft, setDraft, onNext }: Props) {
  function onFileChange(e: ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) {
      setDraft((d) => ({ ...d, fileName: null, fileSize: null }));
      return;
    }
    setDraft((d) => ({ ...d, fileName: f.name, fileSize: f.size }));
  }

  return (
    <div className="mx-auto w-full max-w-lg space-y-4">
      <p className="text-sm leading-relaxed text-text-secondary">
        Vul de gegevens in en kies het PDF-bestand van het werkboek. In de volgende stap controleer je de
        opdrachten.
      </p>

      <label className="block text-xs font-bold uppercase text-text-muted">Titel werkboek</label>
      <input
        className="w-full rounded-xl border border-border-subtle px-3 py-2 text-sm"
        value={draft.title}
        onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
        placeholder="Bv. Taaljacht groep 5"
      />

      <label className="block text-xs font-bold uppercase text-text-muted">Groep / niveau</label>
      <input
        className="w-full rounded-xl border border-border-subtle px-3 py-2 text-sm"
        value={draft.grade}
        onChange={(e) => setDraft((d) => ({ ...d, grade: e.target.value }))}
        placeholder="Bv. Groep 5"
      />

      <label className="block text-xs font-bold uppercase text-text-muted">Boekkant</label>
      <select
        className="w-full rounded-xl border border-border-subtle px-3 py-2 text-sm"
        value={draft.side}
        onChange={(e) => setDraft((d) => ({ ...d, side: e.target.value as BookSide }))}
      >
        <option value="leskant">Leskant</option>
        <option value="taakboekje">Taakboekje</option>
      </select>

      <label className="block text-xs font-bold uppercase text-text-muted">Aantal pagina&apos;s</label>
      <input
        type="number"
        min={1}
        className="w-full rounded-xl border border-border-subtle px-3 py-2 text-sm"
        value={draft.pages}
        onChange={(e) => setDraft((d) => ({ ...d, pages: Math.max(1, Number(e.target.value) || 1) }))}
      />

      <div className="rounded-2xl border-2 border-dashed border-border-strong bg-surface-muted/50 px-4 py-8 text-center">
        <p className="text-sm font-bold text-text-primary">PDF werkboek</p>
        <p className="mt-1 text-xs text-text-muted">PDF-bestand (.pdf)</p>
        <label className="mt-4 inline-block cursor-pointer rounded-xl bg-brand-orange px-4 py-2 text-sm font-black text-white hover:opacity-95">
          Bestand kiezen
          <input type="file" accept="application/pdf" className="hidden" onChange={onFileChange} />
        </label>
        {draft.fileName && (
          <p className="mt-3 text-xs text-text-secondary">
            {draft.fileName} ({draft.fileSize != null ? `${Math.round(draft.fileSize / 1024)} KB` : "?"})
          </p>
        )}
      </div>

      <div className="flex gap-2 pt-2">
        <button
          type="button"
          onClick={onNext}
          className="flex-1 rounded-xl bg-brand-orange py-3 text-sm font-black text-white hover:opacity-95"
        >
          Volgende
        </button>
      </div>
    </div>
  );
}
