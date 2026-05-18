import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import type { TabelInvullenContent } from "../../../types/exerciseContent";

interface TabelExerciseProps {
  content: TabelInvullenContent;
  accentColor: string;
  onComplete: (correct: number, total: number) => void;
}

interface CellValue {
  rowId: string;
  columnId: string;
  value: string;
}

export default function TabelExercise({
  content,
  accentColor,
  onComplete,
}: TabelExerciseProps) {
  const [cellValues, setCellValues] = useState<CellValue[]>([]);
  const [hasChecked, setHasChecked] = useState(false);
  const [feedbackMap, setFeedbackMap] = useState<Map<string, boolean>>(new Map());

  const handleCellChange = useCallback(
    (rowId: string, columnId: string, value: string) => {
      setCellValues((prev) => {
        const filtered = prev.filter(
          (c) => !(c.rowId === rowId && c.columnId === columnId)
        );
        return [...filtered, { rowId, columnId, value }];
      });
    },
    []
  );

  const handleCheck = useCallback(() => {
    const feedback = new Map<string, boolean>();
    let correct = 0;
    const editableCells = content.rows.flatMap((row) =>
      row.cells.filter((c) => c.editable).map((c) => ({ rowId: row.id, columnId: c.columnId }))
    );

    editableCells.forEach(({ rowId, columnId }) => {
      const userValue = cellValues.find(
        (c) => c.rowId === rowId && c.columnId === columnId
      )?.value || "";
      const cellDef = content.rows
        .find((r) => r.id === rowId)
        ?.cells.find((c) => c.columnId === columnId);

      const key = rowId + "-" + columnId;
      const isCorrect =
        cellDef?.correctAnswers?.some(
          (a) => a.toLowerCase() === userValue.toLowerCase()
        ) || false;

      feedback.set(key, isCorrect);
      if (isCorrect) correct++;
    });

    setFeedbackMap(feedback);
    setHasChecked(true);
  }, [cellValues, content]);

  const handleDone = useCallback(() => {
    const editableCount = content.rows.flatMap((r) =>
      r.cells.filter((c) => c.editable)
    ).length;
    const correctCount = Array.from(feedbackMap.values()).filter((v) => v).length;
    onComplete(correctCount, editableCount);
  }, [feedbackMap, content, onComplete]);

  const editableCells = content.rows.flatMap((r) =>
    r.cells.filter((c) => c.editable)
  ).length;

  const allCellsFilled = cellValues.length === editableCells &&
    cellValues.every((c) => c.value.trim().length > 0);

  return (
    <div className="flex min-h-0 flex-1 flex-col items-center overflow-y-auto px-4 py-6 sm:py-8">
      <div className="w-full max-w-2xl space-y-6">
        <div className="overflow-x-auto rounded-2xl border border-black/8 bg-white/90 shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                {content.columns.map((col) => (
                  <th key={col.id} className="px-4 py-3 text-left font-bold text-text-primary">
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {content.rows.map((row) => (
                <tr key={row.id} className="border-b border-gray-100">
                  {row.cells.map((cell) => {
                    const key = row.id + "-" + cell.columnId;
                    const userValue = cellValues.find(
                      (c) => c.rowId === row.id && c.columnId === cell.columnId
                    )?.value || "";
                    const feedback = feedbackMap.get(key);

                    return (
                      <td key={key} className="px-4 py-3">
                        {cell.editable ? (
                          <input
                            type="text"
                            value={userValue}
                            onChange={(e) =>
                              handleCellChange(row.id, cell.columnId, e.target.value)
                            }
                            disabled={hasChecked}
                            className={`w-full rounded-lg border-2 px-3 py-2 font-bold transition-all ${
                              feedback === true
                                ? "border-green-500 bg-green-100"
                                : feedback === false
                                ? "border-red-500 bg-red-100"
                                : "border-gray-300 bg-white"
                            }`}
                            placeholder="Vul in..."
                          />
                        ) : (
                          <span className="font-bold text-text-primary">
                            {cell.value}
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-3">
          {hasChecked && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl bg-white p-4"
            >
              <div className="text-sm font-bold text-text-primary">
                {Array.from(feedbackMap.values()).filter((v) => v).length} van {editableCells} goed
              </div>
            </motion.div>
          )}

          <div className="flex gap-3">
            {!hasChecked ? (
              <button
                type="button"
                onClick={handleCheck}
                disabled={!allCellsFilled}
                className="flex-1 rounded-2xl bg-white px-4 py-3 font-black text-text-primary transition-all disabled:opacity-50"
                style={{ borderColor: accentColor, borderWidth: "2px" }}
              >
                Controleren
              </button>
            ) : (
              <motion.button
                type="button"
                onClick={handleDone}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex-1 rounded-2xl px-4 py-3 font-black text-white transition-all"
                style={{ backgroundColor: accentColor }}
              >
                Klaar
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
