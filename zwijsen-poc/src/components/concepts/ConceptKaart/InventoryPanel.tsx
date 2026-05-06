import { motion } from "framer-motion";
import type { InventoryCategory, InventoryWord } from "../../../types/content";

interface Props {
  categories: InventoryCategory[];
  words: InventoryWord[];
  usedWordIds: Set<string>;
}

export default function InventoryPanel({
  categories,
  words,
  usedWordIds,
}: Props) {
  function handleDragStart(
    e: React.DragEvent<HTMLDivElement>,
    word: InventoryWord,
  ) {
    e.dataTransfer.setData("application/word-id", word.id);
    e.dataTransfer.setData("application/word-text", word.word);
    e.dataTransfer.setData("application/word-hint", word.hint);
    e.dataTransfer.setData("application/word-context", word.contextSentence);
    e.dataTransfer.effectAllowed = "copy";
  }

  let delayIndex = 0;

  return (
    <aside className="w-56 shrink-0 flex flex-col bg-white border-r border-slate-100 overflow-hidden">
      {/* Header */}
      <div className="px-4 pt-5 pb-4 border-b border-slate-100">
        <p className="font-black text-slate-800 text-sm leading-tight">
          Woordenschat
        </p>
        <p className="text-xs text-slate-400 mt-0.5">
          Sleep een woord naar het canvas
        </p>
      </div>

      {/* Grouped word list */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {categories.map((cat) => {
          const catWords = words.filter((w) => w.categoryId === cat.id);
          return (
            <div key={cat.id}>
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-0.5">
                {cat.title}
              </p>
              <p className="text-[11px] text-slate-400 mb-2 leading-snug">
                {cat.subtitle}
              </p>
              <div className="space-y-2">
                {catWords.map((word) => {
                  const isUsed = usedWordIds.has(word.id);
                  const i = delayIndex++;
                  return (
                    <motion.div
                      key={word.id}
                      initial={{ x: -16, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <div
                        draggable={!isUsed}
                        onDragStart={
                          isUsed ? undefined : (e) => handleDragStart(e, word)
                        }
                        className="rounded-2xl px-4 py-3 font-bold text-sm leading-tight transition-all duration-200 select-none"
                        style={{
                          backgroundColor: isUsed ? "#F1F2F4" : "#E4F0FB",
                          color: isUsed ? "#718096" : "#2B6CB0",
                          border: `2px solid ${isUsed ? "#E8E8EA" : "#90CDF4"}`,
                          cursor: isUsed ? "default" : "grab",
                          opacity: isUsed ? 0.5 : 1,
                          minHeight: 48,
                        }}
                        title={
                          isUsed
                            ? "Al op het canvas"
                            : `Sleep '${word.word}' naar het canvas`
                        }
                      >
                        <span>{word.word}</span>
                        {isUsed && (
                          <span className="block text-[10px] text-slate-400 font-normal mt-0.5">
                            op canvas
                          </span>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="px-4 py-4 border-t border-slate-100 space-y-1.5">
        <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">
          Relaties
        </p>
        {[
          { color: "#4299E1", label: "Synoniem" },
          { color: "#F56565", label: "Tegenstelling" },
          { color: "#D69E2E", label: "Onderdeel van" },
          { color: "#48BB78", label: "Voorbeeld van" },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-2">
            <div
              className="w-4 h-1.5 rounded-full shrink-0"
              style={{ backgroundColor: color }}
            />
            <span className="text-xs text-slate-500">{label}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
