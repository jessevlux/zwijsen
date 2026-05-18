import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useLibrary } from "../../state/LibraryContext";

interface WorkbookIntroProps {
  workbookId: string;
  studentMode?: boolean;
  onContinue: () => void;
}

export default function WorkbookIntro({
  workbookId,
  studentMode = false,
  onContinue,
}: WorkbookIntroProps) {
  const { getWorkbook } = useLibrary();
  const wb = getWorkbook(workbookId);

  if (!wb) {
    return (
      <motion.div
        className="flex flex-1 flex-col items-center justify-center gap-4 p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <p className="text-sm font-bold text-text-secondary">
          Werkboek niet gevonden.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="flex h-full min-h-0 flex-col items-center justify-center overflow-y-auto px-6 py-10"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="w-full max-w-lg text-center"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.35 }}
      >
        <span
          className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase ${
            wb.origin === "example"
              ? "bg-accent-info-soft text-accent-info"
              : "bg-surface-muted text-text-secondary"
          }`}
        >
          {wb.origin === "example" ? "Voorbeeld" : "Geïmporteerd"}
        </span>

        <h1 className="mt-4 text-3xl font-black leading-tight text-text-primary sm:text-4xl">
          {wb.title}
        </h1>

        <p className="mt-3 text-base leading-relaxed text-text-secondary">
          {wb.grade} · {wb.side} · {wb.pages} pagina&apos;s ·{" "}
          {wb.exercises.length} opdrachten
          {!studentMode &&
            wb.importedAt &&
            ` · geïmporteerd ${new Date(wb.importedAt).toLocaleDateString("nl-NL")}`}
        </p>

        <p className="mt-6 text-sm leading-relaxed text-text-muted">
          {studentMode
            ? "Hier komt later extra uitleg en context over dit werkboek. Daarna vul je kort een zelfevaluatie in voordat je de opdrachten opent."
            : "Introductiescherm voor dit werkboek. Later: context, leerdoelen en bronteksten. Daarna volgt de rubric en de opdrachten."}
        </p>

        <motion.button
          type="button"
          onClick={onContinue}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-10 inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl bg-brand-orange px-8 text-sm font-black text-white shadow-md hover:opacity-95"
        >
          {studentMode ? "Verder" : "Volgende"}
          <ChevronRight
            className="h-5 w-5 shrink-0"
            strokeWidth={2.5}
            aria-hidden
          />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
