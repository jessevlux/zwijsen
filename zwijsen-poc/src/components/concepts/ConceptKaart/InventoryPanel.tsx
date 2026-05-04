import { motion } from "framer-motion";
import type { InventoryWord } from "./data";

interface Props {
  words: InventoryWord[];
  usedWordIds: Set<string>;
}

export default function InventoryPanel({ words, usedWordIds }: Props) {
  function handleDragStart(
    e: React.DragEvent<HTMLDivElement>,
    word: InventoryWord
  ) {
    e.dataTransfer.setData("application/word-id", word.id);
    e.dataTransfer.setData("application/word-text", word.word);
    e.dataTransfer.setData("application/word-hint", word.hint);
    e.dataTransfer.effectAllowed = "copy";
  }

  return (
    <aside className="w-52 shrink-0 flex flex-col bg-white border-r border-slate-100 overflow-hidden">
      {/* Header */}
      <div className="px-4 pt-5 pb-4 border-b border-slate-100">
        <p className="font-black text-slate-800 text-sm leading-tight">
          Woordenschat
        </p>
        <p className="text-xs text-slate-400 mt-0.5">
          Sleep een woord naar het canvas →
        </p>
      </div>

      {/* Theme badge */}
      <div className="px-4 py-3 border-b border-slate-100">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#DBEAFE] text-[#1D4ED8] text-xs font-bold px-2.5 py-1">
          🎬 Groep 8 — Vloggen
        </span>
      </div>

      {/* Word list */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-2">
        {words.map((word, i) => {
          const isUsed = usedWordIds.has(word.id);
          return (
            <motion.div
              key={word.id}
              initial={{ x: -16, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              draggable={!isUsed}
              onDragStart={isUsed ? undefined : (e) => handleDragStart(e, word)}
              className="rounded-2xl px-4 py-3 font-bold text-sm leading-tight transition-all duration-200 select-none"
              style={{
                backgroundColor: isUsed ? "#F1F5F9" : "#EFF6FF",
                color: isUsed ? "#94A3B8" : "#1D4ED8",
                border: `2px solid ${isUsed ? "#E2E8F0" : "#BFDBFE"}`,
                cursor: isUsed ? "default" : "grab",
                opacity: isUsed ? 0.5 : 1,
                minHeight: 48,
              }}
              title={isUsed ? "Al op het canvas" : `Sleep '${word.word}' naar het canvas`}
            >
              <span>{word.word}</span>
              {isUsed && (
                <span className="block text-[10px] text-slate-400 font-normal mt-0.5">
                  op canvas
                </span>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="px-4 py-4 border-t border-slate-100 space-y-1.5">
        <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">
          Relaties
        </p>
        {[
          { color: "#3B82F6", label: "Synoniem" },
          { color: "#EF4444", label: "Tegenstelling" },
          { color: "#F59E0B", label: "Onderdeel van" },
          { color: "#22C55E", label: "Voorbeeld van" },
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
