import type { Exercise, ExerciseType } from "../../../types/workbook";

const DEFINITION_OF_DONE = [
  "ExerciseContent-interface uitbreiden in exerciseContent.ts",
  "Map src/components/concepts/<Type>/ met index.tsx + examples.ts",
  "Vloggen-voorbeeld in examples.ts + content in seedWorkbook.ts",
  "Case in ExercisePlayer.tsx",
  "Mobiel getest; screenshot in PR",
] as const;

const COPY: Record<
  ExerciseType,
  { title: string; body: string; contract: string; handoverAnchor: string }
> = {
  "concept-kaart": {
    title: "Semantische conceptkaart",
    body: "Bestaat al als interactieve oefening in deze PoC.",
    contract: "Zie types.ConceptKaartContent",
    handoverAnchor: "",
  },
  "swipe-kaarten": {
    title: "Swipe-kaarten",
    body: "Bestaat al als interactieve oefening in deze PoC.",
    contract: "Zie types.SwipeKaartenContent",
    handoverAnchor: "",
  },
  "raad-coach": {
    title: "Raad & Coach",
    body: "Bestaat al als interactieve oefening in deze PoC.",
    contract: "Zie types.RaadCoachContent",
    handoverAnchor: "",
  },
  meerkeuze: {
    title: "Meerkeuze (aankruisvakjes)",
    body: "Standaardvraagtype: één vraag, meerdere opties, één of meer juiste antwoorden. Bouw de UI in de stijl van ConceptKaart/Swipe (ConceptIntro, toneTokens.info). Volledige spec en JSON-voorbeeld staan in HANDOVER.md.",
    contract: `export interface MeerkeuzeContent {
  type: "meerkeuze";
  brief: ConceptBrief;
  question: string;
  options: { id: string; label: string }[];
  correctOptionIds: string[];
  allowMultiple: boolean;
  explanation?: string;
  sourceTextId?: string;
}`,
    handoverAnchor: "Opdrachttype: meerkeuze",
  },
  "koppelen-lijnen": {
    title: "Koppelen (lijnen trekken)",
    body: "Generiek koppel-item (woord ↔ definitie). Niet de semantische conceptkaart — geen relatietypes op canvas. Gebruik toneTokens.violet. Spec in HANDOVER.md.",
    contract: `export interface KoppelenLijnenContent {
  type: "koppelen-lijnen";
  brief: ConceptBrief;
  leftItems: { id: string; label: string }[];
  rightItems: { id: string; label: string }[];
  correctPairs: { leftId: string; rightId: string }[];
  sourceTextId?: string;
}`,
    handoverAnchor: "Opdrachttype: koppelen-lijnen",
  },
  "invullen-zin": {
    title: "Invullen in een zin",
    body: "Woord in een zin plaatsen — vaak met brontekst. Sluit aan bij contextueel woordgebruik. Gebruik toneTokens.success. Spec + brontekst-voorbeeld in HANDOVER.md.",
    contract: `export interface InvullenZinContent {
  type: "invullen-zin";
  brief: ConceptBrief;
  template: string; // bijv. "De finale was echt {{blank-1}}!"
  blanks: { id: string; correctAnswers: string[]; wordBank?: string[] }[];
  sourceTextId?: string;
}`,
    handoverAnchor: "Opdrachttype: invullen-zin",
  },
  "open-schrijven": {
    title: "Open schrijfopdracht",
    body: "Creatief: geen enkelvoudig goed antwoord — andere UI dan kiesvragen. Nog geen team-sectie in HANDOVER; stem af met de groep vóór je het datacontract vastlegt.",
    contract: `export type OpenSchrijvenContent = { type: "open-schrijven"; /* TODO */ };`,
    handoverAnchor: "",
  },
  markeren: {
    title: "Markeren / kleuren in tekst",
    body: "Woorden of zinsdelen in een tekst markeren — vaak met brontekst. Gebruik toneTokens.amber. Spec met character-spans in HANDOVER.md.",
    contract: `export interface MarkerenContent {
  type: "markeren";
  brief: ConceptBrief;
  instruction: string;
  text: string;
  correctSpans: { start: number; end: number }[];
  sourceTextId?: string;
}`,
    handoverAnchor: "Opdrachttype: markeren",
  },
  "tabel-invullen": {
    title: "Tabel invullen",
    body: "Invulvelden in rijen/kolommen — bijv. vlogplan. Gebruik toneTokens.warm. Spec in HANDOVER.md.",
    contract: `export interface TabelInvullenContent {
  type: "tabel-invullen";
  brief: ConceptBrief;
  columns: { id: string; header: string }[];
  rows: { id: string; cells: { columnId: string; editable: boolean; value?: string; correctAnswers?: string[] }[] }[];
  sourceTextId?: string;
}`,
    handoverAnchor: "Opdrachttype: tabel-invullen",
  },
  "volgorde-nummeren": {
    title: "Volgorde nummeren",
    body: "Uit requirements — nog geen uitgewerkte HANDOVER-sectie voor het team.",
    contract: `export type VolgordeNummerenContent = { type: "volgorde-nummeren"; /* TODO */ };`,
    handoverAnchor: "",
  },
  rubric: {
    title: "Zelfreflectie (rubric content-type)",
    body: "Los van de werkboek-flow EmojiRubric aan het begin. Dit content-type is nog niet toegewezen aan het team.",
    contract: `export type RubricContent = { type: "rubric"; /* TODO */ };`,
    handoverAnchor: "",
  },
};

function showTeamChecklist(type: ExerciseType): boolean {
  return (
    type === "meerkeuze" ||
    type === "koppelen-lijnen" ||
    type === "invullen-zin" ||
    type === "markeren" ||
    type === "tabel-invullen"
  );
}

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
        <p className="mt-4 text-xs font-bold uppercase tracking-wide text-text-muted">Beoogd datacontract (voorstel)</p>
        <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-900 p-3 text-left text-[11px] leading-snug text-emerald-100">
          {c.contract}
        </pre>
        {showTeamChecklist(exerciseType) && (
          <div className="mt-4 rounded-xl border border-border-subtle bg-surface-muted/60 p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-text-muted">Definition of done</p>
            <ul className="mt-2 space-y-1.5 text-sm text-text-secondary">
              {DEFINITION_OF_DONE.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-text-muted" aria-hidden>
                    ☐
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-text-muted">
              Volledige spec:{" "}
              <code className="rounded bg-surface-muted px-1">HANDOVER.md</code>
              {c.handoverAnchor ? (
                <>
                  {" "}
                  → <span className="font-bold">{c.handoverAnchor}</span>
                </>
              ) : null}
            </p>
          </div>
        )}
        {!showTeamChecklist(exerciseType) && (
          <p className="mt-4 text-xs text-text-muted">
            Zie <code className="rounded bg-surface-muted px-1">HANDOVER.md</code> — recept nieuwe oefening.
          </p>
        )}
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
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">
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
