import type { ImportDraft } from "./types";

interface Props {
  draft: ImportDraft;
  onBack: () => void;
  onSave: () => void;
}

export default function ConfirmStep({ draft, onBack, onSave }: Props) {
  const byLevel = { a: 0, b: 0, c: 0 } as Record<"a" | "b" | "c", number>;
  for (const e of draft.exercises) {
    byLevel[e.difficulty]++;
  }
  const withSource = draft.exercises.filter((e) => e.sourceTextId).length;

  return (
    <div className="mx-auto w-full max-w-lg space-y-4">
      <h2 className="text-lg font-black text-text-primary">Samenvatting</h2>
      <dl className="space-y-2 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-text-muted">Titel</dt>
          <dd className="font-bold text-text-primary">{draft.title || "—"}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-text-muted">Groep</dt>
          <dd className="font-bold">{draft.grade}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-text-muted">Kant</dt>
          <dd className="font-bold">{draft.side}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-text-muted">Pagina&apos;s</dt>
          <dd className="font-bold">{draft.pages}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-text-muted">PDF</dt>
          <dd className="font-bold">{draft.fileName ?? "—"}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-text-muted">Opdrachten</dt>
          <dd className="font-bold">{draft.exercises.length}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-text-muted">Niveau a / b / c</dt>
          <dd className="font-bold">
            {byLevel.a} / {byLevel.b} / {byLevel.c}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-text-muted">Met brontekst-koppeling</dt>
          <dd className="font-bold">{withSource}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-text-muted">Brontekst-records</dt>
          <dd className="font-bold">{draft.sources.length}</dd>
        </div>
      </dl>

      <div className="flex gap-2 pt-2">
        <button type="button" onClick={onBack} className="rounded-xl border border-border-subtle px-4 py-2 text-sm font-bold">
          Terug
        </button>
        <button type="button" onClick={onSave} className="flex-1 rounded-xl bg-brand-orange py-3 text-sm font-black text-white">
          Opslaan in bibliotheek
        </button>
      </div>
    </div>
  );
}
