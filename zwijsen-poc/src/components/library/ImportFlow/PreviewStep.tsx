import { useState } from "react";
import type { ImportDraft } from "./types";
import type { Difficulty, ExerciseType } from "../../../types/workbook";
import { newId } from "../../../library/id";

type Status = "idle" | "uploading" | "processing" | "fetching" | "done" | "error";

interface Props {
  draft: ImportDraft;
  setDraft: (d: ImportDraft | ((prev: ImportDraft) => ImportDraft)) => void;
  onNext: () => void;
  onBack: () => void;
  status: Status;
  error: string | null;
}

const STATUS_LABEL: Record<Status, string> = {
  idle: "",
  uploading: "Uploaden naar server…",
  processing: "Server analyseert het werkboek (kan minuten duren)…",
  fetching: "Resultaten ophalen…",
  done: "Klaar — opdrachten uit de PDF zijn toegevoegd.",
  error: "Er ging iets mis bij het verwerken.",
};

const TYPES: ExerciseType[] = [
  "concept-kaart",
  "swipe-kaarten",
  "raad-coach",
  "meerkeuze",
  "koppelen-lijnen",
  "invullen-zin",
  "open-schrijven",
  "markeren",
  "tabel-invullen",
  "volgorde-nummeren",
  "rubric",
];

export default function PreviewStep({ draft, setDraft, onNext, onBack, status, error }: Props) {
  const isProcessing = status === "uploading" || status === "processing" || status === "fetching";
  const [pageForNew, setPageForNew] = useState(1);
  const [newType, setNewType] = useState<ExerciseType>("meerkeuze");

  function addExercise() {
    const ex = {
      id: newId("ex"),
      workbookId: "draft",
      pageNumber: pageForNew,
      type: newType,
      difficulty: "a" as Difficulty,
      isPlus: false,
      isOwnAnswer: false,
    };
    setDraft((d) => ({ ...d, exercises: [...d.exercises, ex] }));
  }

  function addSource() {
    const s = {
      id: newId("src"),
      kind: "text" as const,
      label: `Brontekst ${draft.sources.length + 1}`,
    };
    setDraft((d) => ({ ...d, sources: [...d.sources, s] }));
  }

  function updateExercise(id: string, patch: Partial<(typeof draft.exercises)[0]>) {
    setDraft((d) => ({
      ...d,
      exercises: d.exercises.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    }));
  }

  function removeExercise(id: string) {
    setDraft((d) => ({ ...d, exercises: d.exercises.filter((e) => e.id !== id) }));
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-4">
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
      <div className="flex flex-col gap-4 lg:flex-row">
      <div className="lg:w-1/3 shrink-0 space-y-2">
        <p className="text-xs font-bold uppercase text-text-muted">Pagina-preview</p>
        <div className="flex aspect-[3/4] items-center justify-center rounded-2xl border-2 border-dashed border-border-strong bg-surface-muted text-sm text-text-muted">
          Geen pagina-render (bewust leeg)
        </div>
      </div>
      <div className="min-w-0 flex-1 space-y-3">
        <p className="text-sm font-bold text-text-primary">Opdrachten (zonder inhoud)</p>
        <p className="text-xs text-text-muted">
          Voeg lege opdrachten toe: type en metadata alleen. Geen <code>content</code> — voorkomt verwarring met werkende data.
        </p>

        <div className="flex flex-wrap items-end gap-2 rounded-xl border border-border-subtle bg-surface-card p-3">
          <div>
            <label className="text-[10px] font-bold uppercase text-text-muted">Pagina</label>
            <input
              type="number"
              min={1}
              max={draft.pages}
              className="mt-0.5 w-20 rounded-lg border border-border-subtle px-2 py-1 text-sm"
              value={pageForNew}
              onChange={(e) => setPageForNew(Math.min(draft.pages, Math.max(1, Number(e.target.value) || 1)))}
            />
          </div>
          <div className="min-w-[10rem] flex-1">
            <label className="text-[10px] font-bold uppercase text-text-muted">Type</label>
            <select
              className="mt-0.5 w-full rounded-lg border border-border-subtle px-2 py-1 text-sm"
              value={newType}
              onChange={(e) => setNewType(e.target.value as ExerciseType)}
            >
              {TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={addExercise}
            className="rounded-lg bg-slate-800 px-3 py-2 text-xs font-black text-white"
          >
            Opdracht toevoegen
          </button>
          <button type="button" onClick={addSource} className="rounded-lg border border-border-subtle px-3 py-2 text-xs font-bold">
            Brontekst toevoegen
          </button>
        </div>

        <ul className="space-y-2">
          {draft.exercises.map((ex) => (
            <li key={ex.id} className="rounded-xl border border-border-subtle bg-white p-3 text-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-xs text-text-muted">{ex.id}</span>
                <button type="button" className="text-xs font-bold text-red-600" onClick={() => removeExercise(ex.id)}>
                  Verwijderen
                </button>
              </div>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                <label className="text-[10px] font-bold uppercase text-text-muted">
                  Pagina
                  <input
                    type="number"
                    min={1}
                    max={draft.pages}
                    className="mt-0.5 w-full rounded-lg border border-border-subtle px-2 py-1 text-sm"
                    value={ex.pageNumber}
                    onChange={(e) =>
                      updateExercise(ex.id, { pageNumber: Math.min(draft.pages, Math.max(1, Number(e.target.value) || 1)) })
                    }
                  />
                </label>
                <label className="text-[10px] font-bold uppercase text-text-muted">
                  Type
                  <select
                    className="mt-0.5 w-full rounded-lg border border-border-subtle px-2 py-1 text-sm"
                    value={ex.type}
                    onChange={(e) => updateExercise(ex.id, { type: e.target.value as ExerciseType })}
                  >
                    {TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="text-[10px] font-bold uppercase text-text-muted">
                  Niveau (a/b/c)
                  <select
                    className="mt-0.5 w-full rounded-lg border border-border-subtle px-2 py-1 text-sm"
                    value={ex.difficulty}
                    onChange={(e) => updateExercise(ex.id, { difficulty: e.target.value as Difficulty })}
                  >
                    <option value="a">a — basis</option>
                    <option value="b">b — gemiddeld</option>
                    <option value="c">c — hoog</option>
                  </select>
                </label>
                <label className="flex items-center gap-2 text-xs pt-4">
                  <input
                    type="checkbox"
                    checked={ex.isPlus}
                    onChange={(e) => updateExercise(ex.id, { isPlus: e.target.checked })}
                  />
                  Plusopdracht
                </label>
                <label className="flex items-center gap-2 text-xs sm:col-span-2">
                  <input
                    type="checkbox"
                    checked={ex.isOwnAnswer}
                    onChange={(e) => updateExercise(ex.id, { isOwnAnswer: e.target.checked })}
                  />
                  Eigen antwoord (creatief)
                </label>
                <label className="text-[10px] font-bold uppercase text-text-muted sm:col-span-2">
                  Brontekst (optioneel)
                  <select
                    className="mt-0.5 w-full rounded-lg border border-border-subtle px-2 py-1 text-sm"
                    value={ex.sourceTextId ?? ""}
                    onChange={(e) =>
                      updateExercise(ex.id, { sourceTextId: e.target.value || undefined })
                    }
                  >
                    <option value="">— geen —</option>
                    {draft.sources.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </li>
          ))}
        </ul>

        {draft.sources.length > 0 && (
          <div className="rounded-xl border border-border-subtle bg-surface-muted/40 p-3">
            <p className="text-xs font-bold uppercase text-text-muted">Bronteksten (lege records)</p>
            <ul className="mt-2 space-y-1 text-xs text-text-secondary">
              {draft.sources.map((s) => (
                <li key={s.id}>
                  {s.label} ({s.kind}) — nog geen body
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-4 flex gap-2 border-t border-border-subtle pt-4">
          <button type="button" onClick={onBack} className="rounded-xl border border-border-subtle px-4 py-2 text-sm font-bold">
            Terug
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={isProcessing}
            className="flex-1 rounded-xl bg-brand-orange py-2 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isProcessing ? "Even geduld…" : "Volgende"}
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}
