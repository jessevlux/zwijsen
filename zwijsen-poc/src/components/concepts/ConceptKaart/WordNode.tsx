import { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export type NodeStatus = "idle" | "connected" | "correct" | "wrong";

export interface WordNodeData {
  word: string;
  hint: string;
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
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      layout
      className="relative select-none"
      style={{ minWidth: 120 }}
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
        className="rounded-2xl px-4 py-3 shadow-md transition-colors duration-200 cursor-grab active:cursor-grabbing"
        style={{
          border: `2px solid ${borderColor[data.status]}`,
          backgroundColor: bgColor[data.status],
          minHeight: 52,
        }}
      >
        <p className="font-black text-sm text-slate-800 leading-tight text-center">
          {data.word}
        </p>
        <AnimatePresence>
          {hovered && (
            <motion.p
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 4 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="text-[10px] text-slate-400 text-center leading-tight overflow-hidden"
            >
              {data.hint}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Remove button */}
      <AnimatePresence>
        {hovered && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            onClick={() => data.onRemove(id)}
            className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full bg-slate-700 text-white flex items-center justify-center z-10 hover:bg-red-500 transition-colors cursor-pointer shadow"
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
