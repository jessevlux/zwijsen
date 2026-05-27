import WorkbookGrid from "./WorkbookGrid";

interface LibraryScreenProps {
  onOpenWorkbook: (id: string) => void;
  onImport: () => void;
}

export default function LibraryScreen({ onOpenWorkbook, onImport }: LibraryScreenProps) {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-y-auto bg-surface-base px-4 py-8">
      <div className="mx-auto w-full max-w-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-black text-text-primary">Bibliotheek</h1>
          <button
            type="button"
            onClick={onImport}
            className="rounded-xl bg-brand-orange px-4 py-2.5 text-sm font-black text-white shadow-md hover:opacity-95"
          >
            Werkboek importeren
          </button>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">
          Selecteer een werkboek om de opdrachten te bekijken of te bewerken.
        </p>

        <WorkbookGrid onOpenWorkbook={onOpenWorkbook} />
      </div>
    </div>
  );
}
