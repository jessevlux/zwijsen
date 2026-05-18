import { useLibrary } from "../../state/LibraryContext";

interface WorkbookGridProps {
  onOpenWorkbook: (id: string) => void;
  /** Classes voor het `<ul>` (bv. marge boven de grid). */
  listClassName?: string;
}

export default function WorkbookGrid({
  onOpenWorkbook,
  listClassName = "mt-8",
}: WorkbookGridProps) {
  const { workbooks } = useLibrary();

  return (
    <ul className={`grid gap-4 sm:grid-cols-2 ${listClassName}`}>
      {workbooks.map((wb) => (
        <li key={wb.id}>
          <button
            type="button"
            onClick={() => onOpenWorkbook(wb.id)}
            className="flex h-full min-h-[140px] w-full flex-col rounded-2xl border border-border-subtle bg-surface-card p-5 text-left shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-card-hover)]"
          >
            <span
              className={`self-start rounded-full px-2 py-0.5 text-[10px] font-black uppercase ${
                wb.origin === "example"
                  ? "bg-accent-info-soft text-accent-info"
                  : "bg-surface-muted text-text-secondary"
              }`}
            >
              {wb.origin === "example" ? "Voorbeeld" : "Geïmporteerd"}
            </span>
            <h2 className="mt-2 text-lg font-black leading-tight text-text-primary">{wb.title}</h2>
            <p className="mt-1 text-xs text-text-muted">
              {wb.grade} · {wb.side} · {wb.pages} pag. · {wb.exercises.length} opdrachten
            </p>
          </button>
        </li>
      ))}
    </ul>
  );
}
