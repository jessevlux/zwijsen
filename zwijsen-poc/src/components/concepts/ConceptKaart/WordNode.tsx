import { useState, useEffect, useRef } from "react";
import { Handle, Position } from "@xyflow/react";
import { motion, AnimatePresence } from "framer-motion";
import { X, HelpCircle } from "lucide-react";

export type NodeStatus = "idle" | "connected" | "correct" | "wrong";

export interface WordNodeData {
  word: string;
  hint: string;
  contextSentence: string;
  status: NodeStatus;
  onRemove: (id: string) => void;
}

export default function WordNode({
  id,
  data,
}: {
  id: string;
  data: WordNodeData;
}) {
  const [hovered, setHovered] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!infoOpen) return;
    function closeOnOutside(ev: MouseEvent | TouchEvent) {
      const el = rootRef.current;
      if (!el || !(ev.target instanceof globalThis.Node) || el.contains(ev.target)) return;
      setInfoOpen(false);
    }
    document.addEventListener("mousedown", closeOnOutside);
    document.addEventListener("touchstart", closeOnOutside, { passive: true });
    return () => {
      document.removeEventListener("mousedown", closeOnOutside);
      document.removeEventListener("touchstart", closeOnOutside);
    };
  }, [infoOpen]);

  const borderColor: Record<NodeStatus, string> = {
    idle: "#CBD5E1",
    connected: "#93C5FD",
    correct: "#4ADE80",
    wrong: "#F87171",
  };

  const bgColor: Record<NodeStatus, string> = {
    idle: "#FFFFFF",
    connected: "#EFF6FF",
    correct: "#F0FDF4",
    wrong: "#FEF2F2",
  };

  return (
    <motion.div
      ref={rootRef}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative select-none"
      style={{ minWidth: 112, maxWidth: 160 }}
    >
      {/* Source handle — left */}
      <Handle
        type="source"
        position={Position.Left}
        id="left"
        className="!w-4 !h-4 !border-2 !border-[#3B82F6] !bg-white !rounded-full transition-opacity duration-150"
        style={{ opacity: hovered ? 1 : 0, cursor: "crosshair" }}
      />

      {/* Node body */}
      <div
        className="rounded-2xl px-2 py-2.5 shadow-md transition-colors duration-200 cursor-grab active:cursor-grabbing"
        style={{
          border: `2px solid ${borderColor[data.status]}`,
          backgroundColor: bgColor[data.status],
          minHeight: 48,
        }}
      >
        <div className="flex items-center gap-1">
          <p className="font-black text-sm text-slate-800 leading-tight text-center flex-1 min-w-0 truncate px-0.5">
            {data.word}
          </p>
          <button
            type="button"
            className="nodrag nopan flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-slate-100 hover:text-[#3B82F6] cursor-pointer"
            aria-expanded={infoOpen}
            aria-label={`Meer uitleg bij ${data.word}`}
            title="Meer uitleg (context)"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              setInfoOpen((v) => !v);
            }}
          >
            <HelpCircle size={20} strokeWidth={2.25} />
          </button>
        </div>

        {/* Korte betekenis — alleen bij hover (zoals eerst) */}
        <AnimatePresence>
          {hovered && (
            <motion.p
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 6 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="text-[10px] text-slate-500 text-center leading-snug overflow-hidden px-0.5"
            >
              {data.hint}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Uitleg-popover (alleen na klik op ?) */}
      <AnimatePresence>
        {infoOpen && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="nodrag nopan absolute left-1/2 top-full z-20 mt-1 w-[min(16rem,calc(100vw-2rem))] -translate-x-1/2 rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-left shadow-lg"
            onPointerDown={(e) => e.stopPropagation()}
          >
            <p className="text-[11px] text-slate-600 leading-snug">
              {data.contextSentence}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Remove button */}
      <AnimatePresence>
        {hovered && (
          <motion.button
            type="button"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            onClick={() => data.onRemove(id)}
            className="nodrag nopan absolute -top-2.5 -right-2.5 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-slate-700 text-white shadow transition-colors hover:bg-red-500 cursor-pointer"
            title="Verwijder van canvas"
          >
            <X size={12} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Target handle — right */}
      <Handle
        type="target"
        position={Position.Right}
        id="right"
        className="!w-4 !h-4 !border-2 !border-[#3B82F6] !bg-white !rounded-full transition-opacity duration-150"
        style={{ opacity: hovered ? 1 : 0, cursor: "crosshair" }}
      />
    </motion.div>
  );
}
