import type { ChangeEvent } from "react";
import type { ImportDraft } from "./types";
import type { BookSide } from "../../../types/workbook";

type Status = "idle" | "uploading" | "processing" | "fetching" | "done" | "error";

interface Props {
  draft: ImportDraft;
  setDraft: (d: ImportDraft | ((prev: ImportDraft) => ImportDraft)) => void;
  onNext: () => void;
  onStart: (file: File) => void;
  status: Status;
  error: string | null;
}

const STATUS_LABEL: Record<Status, string> = {
  idle: "",
  uploading: "Uploaden naar server…",
  processing: "Server analyseert het werkboek (kan minuten duren)…",
  fetching: "Resultaten ophalen…",
  done: "Klaar — concept-kaart toegevoegd aan de preview.",
  error: "Er ging iets mis.",
};

export default function UploadStep({ draft, setDraft, onNext, onStart, status, error }: Props) {
  const isProcessing = status === "uploading" || status === "processing" || status === "fetching";

  function onFileChange(e: ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) {
      setDraft((d) => ({ ...d, fileName: null, fileSize: null }));
      return;
    }
    setDraft((d) => ({ ...d, fileName: f.name, fileSize: f.size }));
    onStart(f);
  }

  return (
    <div className="mx-auto w-full max-w-lg space-y-4">
      <p className="text-sm text-text-secondary leading-relaxed">
        Kies een PDF; de server extraheert woordenlijst, lessen en — als er voldoende woorden zijn —
        een concept-kaart-opdracht die in stap 2 verschijnt.
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
        <option value="leskant">Leskant (context-opdrachten)</option>
        <option value="taakboekje">Taakboekje (woordenschat)</option>
      </select>

      <label className="block text-xs font-bold uppercase text-text-muted">Aantal pagina&apos;s (schatting)</label>
      <input
        type="number"
        min={1}
        className="w-full rounded-xl border border-border-subtle px-3 py-2 text-sm"
        value={draft.pages}
        onChange={(e) => setDraft((d) => ({ ...d, pages: Math.max(1, Number(e.target.value) || 1) }))}
      />

      <div className="rounded-2xl border-2 border-dashed border-border-strong bg-surface-muted/50 px-4 py-8 text-center">
        <p className="text-sm font-bold text-text-primary">PDF werkboek</p>
        <p className="mt-1 text-xs text-text-muted">
          Wordt naar de lokale extractie-server gestuurd zodra je kiest.
        </p>
        <label
          className={`mt-4 inline-block rounded-xl bg-brand-orange px-4 py-2 text-sm font-black text-white hover:opacity-95 ${
            isProcessing ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          }`}
        >
          Kies bestand
          <input
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={onFileChange}
            disabled={isProcessing}
          />
        </label>
        {draft.fileName && (
          <p className="mt-3 text-xs text-text-secondary">
            {draft.fileName} ({draft.fileSize != null ? `${Math.round(draft.fileSize / 1024)} KB` : "?"})
          </p>
        )}
      </div>

      {status !== "idle" && (
        <div
          className={`rounded-xl border px-3 py-2 text-xs ${
            status === "error"
              ? "border-red-200 bg-red-50 text-red-800"
              : status === "done"
                ? "border-green-200 bg-green-50 text-green-800"
                : "border-amber-200 bg-amber-50 text-amber-900"
          }`}
        >
          <p className="font-bold">{STATUS_LABEL[status]}</p>
          {status === "error" && error && <p className="mt-1 font-mono text-[10px]">{error}</p>}
        </div>
      )}

      <div className="flex gap-2 pt-2">
        <button
          type="button"
          onClick={onNext}
          disabled={isProcessing}
          className="flex-1 rounded-xl bg-brand-orange py-3 text-sm font-black text-white hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isProcessing ? "Even geduld…" : "Volgende"}
        </button>
      </div>
    </div>
  );
}
