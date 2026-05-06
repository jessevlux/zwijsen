import type { Exercise, ExerciseType } from "../../../types/workbook";

const COPY: Record<
  ExerciseType,
  { title: string; body: string; contract: string }
> = {
  "concept-kaart": {
    title: "Semantische conceptkaart",
    body: "Bestaat al als interactieve oefening in deze PoC.",
    contract: "Zie types.ConceptKaartContent",
  },
  "swipe-kaarten": {
    title: "Swipe-kaarten",
    body: "Bestaat al als interactieve oefening in deze PoC.",
    contract: "Zie types.SwipeKaartenContent",
  },
  "raad-coach": {
    title: "Raad & Coach",
    body: "Bestaat al als interactieve oefening in deze PoC.",
    contract: "Zie types.RaadCoachContent",
  },
  meerkeuze: {
    title: "Meerkeuze (aankruisvakjes)",
    body: "Uit requirements: standaardvraagtype in alle groepen. Nog te bouwen.",
    contract: `export type MeerkeuzeContent = { type: "meerkeuze"; /* TODO */ };`,
  },
  "koppelen-lijnen": {
    title: "Koppelen (lijnen trekken)",
    body: "Uit requirements. Los van de semantische conceptkaart: generiek koppel-item.",
    contract: `export type KoppelenLijnenContent = { type: "koppelen-lijnen"; /* TODO */ };`,
  },
  "invullen-zin": {
    title: "Invullen in een zin",
    body: "Uit requirements: vaak met brontekst op andere pagina.",
    contract: `export type InvullenZinContent = { type: "invullen-zin"; /* TODO */ };`,
  },
  "open-schrijven": {
    title: "Open schrijfopdracht",
    body: "Creatief: geen enkelvoudig goed antwoord — andere UI dan kiesvragen.",
    contract: `export type OpenSchrijvenContent = { type: "open-schrijven"; /* TODO */ };`,
  },
  markeren: {
    title: "Markeren / kleuren in tekst",
    body: "Uit requirements: vaak verwijzing naar vorige pagina.",
    contract: `export type MarkerenContent = { type: "markeren"; /* TODO */ };`,
  },
  "tabel-invullen": {
    title: "Tabel invullen",
    body: "Uit requirements.",
    contract: `export type TabelInvullenContent = { type: "tabel-invullen"; /* TODO */ };`,
  },
  "volgorde-nummeren": {
    title: "Volgorde nummeren",
    body: "Uit requirements.",
    contract: `export type VolgordeNummerenContent = { type: "volgorde-nummeren"; /* TODO */ };`,
  },
  rubric: {
    title: "Zelfreflectie (rubric)",
    body: "Uit requirements.",
    contract: `export type RubricContent = { type: "rubric"; /* TODO */ };`,
  },
};

export function TypePlaceholder({ exerciseType }: { exerciseType: ExerciseType }) {
  const c = COPY[exerciseType];
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-surface-base px-4 py-8">
      <div className="mx-auto w-full max-w-lg rounded-2xl border border-border-subtle bg-surface-card p-6 shadow-[var(--shadow-card)]">
        <span className="inline-block rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-amber-900">
          Implementeer mij
        </span>
        <h1 className="mt-3 text-xl font-black text-text-primary">{c.title}</h1>
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">{c.body}</p>
        <p className="mt-4 text-xs font-bold uppercase tracking-wide text-text-muted">Beoogd datacontract</p>
        <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-900 p-3 text-left text-[11px] leading-snug text-emerald-100">
          {c.contract}
        </pre>
        <p className="mt-4 text-xs text-text-muted">
          Zie <code className="rounded bg-surface-muted px-1">HANDOVER.md</code> — sectie nieuwe vraagtypes.
        </p>
      </div>
    </div>
  );
}

/** Lege opdracht: nog geen Exercise.content — geen verwarrende dummy-data. */
export function EmptyExerciseContent({ exercise, onBack }: { exercise: Exercise; onBack: () => void }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-surface-base px-4 py-8">
      <div className="mx-auto w-full max-w-lg rounded-2xl border border-dashed border-border-strong bg-surface-card p-6">
        <h1 className="text-lg font-black text-text-primary">Nog geen digitale inhoud</h1>
        <p className="mt-2 text-sm text-text-secondary leading-relaxed">
          Deze opdracht is aangemaakt (type: <span className="font-mono font-bold">{exercise.type}</span>, pagina{" "}
          {exercise.pageNumber}) maar heeft nog geen <code className="rounded bg-surface-muted px-1">content</code>.
          Vul handmatig in, importeer vanuit PDF-parser, of gebruik straks AI-generatie.
        </p>
        <p className="mt-3 text-xs text-text-muted">
          {/* TODO(handover): koppel editor-UI om Exercise.content te vullen. */}
          TODO(handover): editor-UI + parser + AI om <code>Exercise.content</code> te vullen.
        </p>
        <button
          type="button"
          onClick={onBack}
          className="mt-6 w-full rounded-xl border-2 border-border-subtle py-3 text-sm font-black text-text-primary hover:bg-surface-muted"
        >
          Terug
        </button>
      </div>
    </div>
  );
}
