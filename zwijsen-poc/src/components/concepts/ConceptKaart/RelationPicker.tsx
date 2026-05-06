import { motion, AnimatePresence } from "framer-motion";
import type { Relation } from "../../../types/content";
import { relations } from "./relationConfig";

interface Props {
  position: { x: number; y: number };
  onSelect: (relation: Relation) => void;
  onCancel: () => void;
}

export default function RelationPicker({
  position,
  onSelect,
  onCancel,
}: Props) {
  return (
    <AnimatePresence>
      {/* Backdrop to cancel on outside click */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40"
        onClick={onCancel}
      />

      <motion.div
        key="picker"
        initial={{ scale: 0.85, opacity: 0, y: 6 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 6 }}
        transition={{ type: "spring", stiffness: 400, damping: 24 }}
        className="fixed z-50 bg-white rounded-3xl shadow-2xl p-4 w-64 border border-slate-100"
        style={{
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -110%)",
        }}
      >
        <p className="font-black text-slate-800 text-sm text-center mb-3">
          Wat is de relatie?
        </p>
        <div className="space-y-2">
          {relations.map((rel) => {
            const Icon = rel.Icon;
            return (
            <motion.button
              key={rel.value}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelect(rel.value)}
              className="w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-left transition-colors cursor-pointer hover:opacity-90"
              style={{
                backgroundColor: rel.color + "22",
                color: rel.color,
                border: `2px solid ${rel.color}44`,
                minHeight: 48,
              }}
            >
              <Icon className="h-5 w-5 shrink-0" strokeWidth={2} aria-hidden />
              <div
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: rel.color }}
              />
              <span>{rel.label}</span>
            </motion.button>
            );
          })}
        </div>

        {/* Cancel */}
        <button
          onClick={onCancel}
          className="mt-3 w-full text-xs text-slate-400 hover:text-slate-600 transition-colors py-1 cursor-pointer"
        >
          Annuleren
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
