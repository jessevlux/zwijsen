import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useLibrary } from "../../state/LibraryContext";
import EmojiRubric from "./EmojiRubric";

interface WorkbookRubricProps {
  workbookId: string;
  studentMode?: boolean;
  onContinue: () => void;
}

export default function WorkbookRubric({
  workbookId,
  studentMode = false,
  onContinue,
}: WorkbookRubricProps) {
  const { getWorkbook } = useLibrary();
  const wb = getWorkbook(workbookId);
  const goals = wb?.rubricGoals ?? [];

  const [values, setValues] = useState<Record<string, number>>({});
  const onContinueRef = useRef(onContinue);
  onContinueRef.current = onContinue;

  useEffect(() => {
    const w = getWorkbook(workbookId);
    if (!w) return;
    const g = w.rubricGoals ?? [];
    if (g.length === 0) {
      onContinueRef.current();
      return;
    }
    setValues(Object.fromEntries(g.map((x) => [x.id, 0])));
  }, [workbookId, getWorkbook]);

  const handleGoalChange = useCallback((goalId: string, value: number) => {
    setValues((prev) => ({ ...prev, [goalId]: value }));
  }, []);

  const allChosen = useMemo(
    () => goals.length > 0 && goals.every((g) => (values[g.id] ?? 0) >= 1 && (values[g.id] ?? 0) <= 4),
    [goals, values],
  );

  if (!wb) {
    return (
      <motion.div
        className="flex flex-1 flex-col items-center justify-center gap-4 p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <p className="text-sm font-bold text-text-secondary">Werkboek niet gevonden.</p>
      </motion.div>
    );
  }

  if (goals.length === 0) {
    return null;
  }

  return (
    <motion.div
      className="flex h-full min-h-0 flex-col overflow-y-auto bg-surface-base px-4 py-8 sm:px-6"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mx-auto w-full max-w-2xl flex-1">
        <h1 className="text-center text-2xl font-black leading-tight text-text-primary sm:text-3xl">
          Hoe goed ken je dit al?
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm leading-relaxed text-text-secondary">
          {studentMode
            ? "Zet per leerdoel je schuifregelaar op het niveau dat nu bij jou past. Zo weet je waar je staat voordat je aan de slag gaat."
            : "Zelfevaluatie zoals in het werkboek. Later kun je hier uitgebreidere context tonen."}
        </p>

        <div className="mt-10">
          <EmojiRubric goals={goals} values={values} onGoalChange={handleGoalChange} />
        </div>

        <div className="mt-10 flex justify-center pb-6">
          <motion.button
            type="button"
            disabled={!allChosen}
            onClick={onContinue}
            whileHover={allChosen ? { scale: 1.02 } : undefined}
            whileTap={allChosen ? { scale: 0.98 } : undefined}
            className={`inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl px-8 text-sm font-black shadow-md ${
              allChosen
                ? "bg-brand-orange text-white hover:opacity-95"
                : "cursor-not-allowed bg-text-muted/35 text-text-muted"
            }`}
          >
            Naar de opdrachten
            <ChevronRight className="h-5 w-5 shrink-0" strokeWidth={2.5} aria-hidden />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
