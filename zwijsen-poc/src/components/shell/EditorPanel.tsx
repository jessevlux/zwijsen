import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  Pencil,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Tag,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { editorWords } from "../../data/concepts";

type WordStatus = "approved" | "flagged" | "pending";

interface WordEntry {
  id: string;
  word: string;
  definition: string;
  status: WordStatus;
}

const statusConfig: Record<
  WordStatus,
  { label: string; color: string; bg: string; Icon: React.ElementType }
> = {
  approved: {
    label: "Goedgekeurd",
    color: "#276749",
    bg: "#E6F6EC",
    Icon: CheckCircle2,
  },
  flagged: {
    label: "Controleren",
    color: "#C53030",
    bg: "#FCE6E6",
    Icon: AlertCircle,
  },
  pending: {
    label: "Wacht op review",
    color: "#2B6CB0",
    bg: "#E4F0FB",
    Icon: Pencil,
  },
};

const initialWords: WordEntry[] = editorWords.map((w, i) => ({
  ...w,
  status: (["approved", "pending", "flagged", "approved", "pending", "approved"] as WordStatus[])[i],
}));

export default function EditorPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [aiEnabled, setAiEnabled] = useState(true);
  const [words, setWords] = useState<WordEntry[]>(initialWords);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  function cycleStatus(id: string) {
    const order: WordStatus[] = ["pending", "approved", "flagged"];
    setWords((prev) =>
      prev.map((w) =>
        w.id === id
          ? { ...w, status: order[(order.indexOf(w.status) + 1) % order.length] }
          : w
      )
    );
  }

  function startEdit(word: WordEntry) {
    setEditingId(word.id);
    setEditValue(word.definition);
  }

  function saveEdit(id: string) {
    setWords((prev) =>
      prev.map((w) => (w.id === id ? { ...w, definition: editValue } : w))
    );
    setEditingId(null);
  }

  const approvedCount = words.filter((w) => w.status === "approved").length;

  return (
    <div className="relative flex h-full">
      {/* Toggle button */}
      <motion.button
        onClick={() => setIsOpen((v) => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="absolute top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-7 h-16 rounded-l-xl bg-editor-bg text-white shadow-lg cursor-pointer"
        style={{ right: isOpen ? "calc(100% - 7px)" : "-1px" }}
        title={isOpen ? "Paneel sluiten" : "Redacteurspaneel openen"}
      >
        {isOpen ? (
          <ChevronRight size={16} />
        ) : (
          <ChevronLeft size={16} />
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.aside
            key="editor-panel"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 340, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="overflow-hidden h-full bg-editor-bg text-white flex flex-col shadow-2xl"
            style={{ minWidth: 0 }}
          >
            <div className="flex flex-col h-full" style={{ width: 340 }}>
              {/* Panel header */}
              <div className="px-5 pt-5 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen size={18} className="text-brand-orange" />
                  <span className="font-black text-base tracking-tight">
                    Redacteurspaneel
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Controleer en keur AI-gegenereerde content goed voordat leerlingen deze zien.
                </p>

                {/* AI toggle */}
                <div className="mt-4 flex items-center justify-between bg-editor-surface rounded-xl px-4 py-3">
                  <div>
                    <p className="font-bold text-sm">AI-suggesties</p>
                    <p className="text-xs text-slate-400">Automatisch genereren</p>
                  </div>
                  <button
                    onClick={() => setAiEnabled((v) => !v)}
                    className="flex items-center gap-1 cursor-pointer"
                    title="AI aan/uit"
                  >
                    {aiEnabled ? (
                      <ToggleRight size={32} className="text-accent-success" />
                    ) : (
                      <ToggleLeft size={32} className="text-slate-500" />
                    )}
                  </button>
                </div>

                {/* Status bar */}
                <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                  <Tag size={12} />
                  <span>
                    <span className="text-accent-success font-bold">{approvedCount}</span>
                    /{words.length} woorden goedgekeurd
                  </span>
                  <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-accent-success rounded-full"
                      animate={{ width: `${(approvedCount / words.length) * 100}%` }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                </div>
              </div>

              {/* Word list */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Woordenschatlijst — Groep 8 · Vloggen
                </p>
                {words.map((entry) => {
                  const cfg = statusConfig[entry.status];
                  const StatusIcon = cfg.Icon;
                  return (
                    <motion.div
                      key={entry.id}
                      layout
                      className="bg-editor-surface rounded-xl p-3 space-y-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-black text-sm text-white">
                          {entry.word}
                        </span>
                        <button
                          onClick={() => cycleStatus(entry.id)}
                          className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-bold whitespace-nowrap cursor-pointer transition-colors"
                          style={{
                            backgroundColor: cfg.bg,
                            color: cfg.color,
                          }}
                          title="Klik om status te wisselen"
                        >
                          <StatusIcon size={12} />
                          {cfg.label}
                        </button>
                      </div>

                      {editingId === entry.id ? (
                        <div className="space-y-1.5">
                          <textarea
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="w-full bg-editor-bg text-white text-xs rounded-lg px-3 py-2 resize-none border border-brand-orange outline-none"
                            rows={2}
                            autoFocus
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => saveEdit(entry.id)}
                              className="flex-1 bg-accent-success text-white text-xs font-bold rounded-lg py-1.5 cursor-pointer hover:opacity-90 transition-opacity"
                            >
                              Opslaan
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="flex-1 bg-slate-600 text-white text-xs font-bold rounded-lg py-1.5 cursor-pointer hover:bg-slate-500 transition-colors"
                            >
                              Annuleren
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-end justify-between gap-2">
                          <p className="text-xs text-slate-400 leading-relaxed flex-1">
                            {entry.definition}
                          </p>
                          <button
                            onClick={() => startEdit(entry)}
                            className="shrink-0 p-1.5 rounded-lg bg-slate-700 text-slate-400 hover:text-white hover:bg-slate-600 transition-colors cursor-pointer"
                            title="Definitie aanpassen"
                          >
                            <Pencil size={12} />
                          </button>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="px-4 pb-5 pt-3 border-t border-white/10">
                <button
                  type="button"
                  className="w-full bg-brand-orange hover:bg-brand-orange-hover transition-colors text-text-inverted font-black rounded-xl py-3 text-sm cursor-pointer"
                >
                  Alle goedgekeurde publiceren
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
