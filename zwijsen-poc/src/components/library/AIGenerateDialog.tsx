import { useEffect, useState } from "react";
import type { Exercise } from "../../types/workbook";
import type { ExerciseType } from "../../types/workbook";

const EXERCISE_TYPES: ExerciseType[] = [
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

interface AIGenerateDialogProps {
  open: boolean;
  exercise: Exercise | null;
  onClose: () => void;
}

export default function AIGenerateDialog({ open, exercise, onClose }: AIGenerateDialogProps) {
  const [targetType, setTargetType] = useState<ExerciseType>("meerkeuze");
  const [keepSource, setKeepSource] = useState(true);

  useEffect(() => {
    if (exercise) setTargetType(exercise.type);
  }, [exercise]);

  if (!open || !exercise) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-900/45 px-4">
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl ring-2 ring-black/5"
      >
        <h2 className="text-lg font-black text-text-primary">Variant genereren</h2>
        <p className="mt-1 text-sm leading-relaxed text-text-secondary">
          Maak een alternatieve opdracht op basis van de huidige inhoud.
        </p>

        <label className="mt-4 block text-xs font-bold uppercase text-text-muted">Opdrachttype</label>
        <select
          className="mt-1 w-full rounded-lg border border-border-subtle px-3 py-2 text-sm"
          value={targetType}
          onChange={(e) => setTargetType(e.target.value as ExerciseType)}
        >
          {EXERCISE_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <label className="mt-3 flex items-center gap-2 text-sm">
          <input type="checkbox" checked={keepSource} onChange={(e) => setKeepSource(e.target.checked)} />
          Brontekst behouden (indien gekoppeld)
        </label>

        <p className="mt-3 rounded-lg bg-surface-muted px-3 py-2 text-xs text-text-muted">
          Deze functie is nog niet beschikbaar.
        </p>

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            disabled
            className="flex-1 cursor-not-allowed rounded-xl bg-brand-orange py-2.5 text-sm font-black text-white opacity-40"
          >
            Genereren
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-border-subtle px-4 py-2.5 text-sm font-bold"
          >
            Sluiten
          </button>
        </div>
      </div>
    </div>
  );
}
