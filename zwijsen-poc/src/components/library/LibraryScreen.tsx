import { useLibrary } from "../../state/LibraryContext";

interface LibraryScreenProps {
  onOpenWorkbook: (id: string) => void;
  onImport: () => void;
}

export default function LibraryScreen({ onOpenWorkbook, onImport }: LibraryScreenProps) {
  const { workbooks } = useLibrary();

  return (
    <div className="flex h-full min-h-0 flex-col overflow-y-auto bg-surface-base px-4 py-8">
      <div className="mx-auto w-full max-w-4xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-black text-text-primary">Bibliotheek</h1>
          <button
            type="button"
            onClick={onImport}
            className="rounded-xl bg-brand-orange px-4 py-2.5 text-sm font-black text-white shadow-md hover:opacity-95"
          >
            + Werkboek importeren
          </button>
        </div>
        <p className="mt-2 max-w-xl text-sm text-text-secondary leading-relaxed">
          Werkboeken en opdrachten (frontend-only). Voorbeeld-werkboek bevat de drie uitgewerkte oefeningen met Vloggen-content.
        </p>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {workbooks.map((wb) => (
            <li key={wb.id}>
              <button
                type="button"
                onClick={() => onOpenWorkbook(wb.id)}
                className="flex h-full min-h-[140px] w-full flex-col rounded-2xl border border-border-subtle bg-surface-card p-5 text-left shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-card-hover)]"
              >
                <span
                  className={`self-start rounded-full px-2 py-0.5 text-[10px] font-black uppercase ${
                    wb.origin === "example" ? "bg-accent-info-soft text-accent-info" : "bg-surface-muted text-text-secondary"
                  }`}
                >
                  {wb.origin === "example" ? "Voorbeeld" : "Geïmporteerd"}
                </span>
                <h2 className="mt-2 text-lg font-black text-text-primary leading-tight">{wb.title}</h2>
                <p className="mt-1 text-xs text-text-muted">
                  {wb.grade} · {wb.side} · {wb.pages} pag. · {wb.exercises.length} opdrachten
                </p>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
