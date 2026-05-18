import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { ExerciseContent } from "../../types/exerciseContent";

interface VariantSelectorProps {
  open: boolean;
  variants: ExerciseContent[];
  onSelect: (variant: ExerciseContent) => void;
  onClose: () => void;
}

export default function VariantSelector({
  open,
  variants,
  onSelect,
  onClose,
}: VariantSelectorProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-40"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
          >
            <div className="bg-white rounded-3xl shadow-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-black text-text-primary">
                  Kies een variant
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-surface-muted rounded-full transition-colors"
                  type="button"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                {variants.map((variant, idx) => {
                  const brief = (variant as any).brief;
                  const title = brief?.title || `Variant ${idx + 1}`;

                  return (
                    <motion.button
                      key={idx}
                      onClick={() => {
                        onSelect(variant);
                        onClose();
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full p-4 text-left rounded-2xl border-2 border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50 transition-all font-bold text-text-primary"
                      type="button"
                    >
                      <div className="flex items-center justify-between">
                        <span>Variant {idx + 1}</span>
                        <span className="text-xs text-text-muted">
                          {title}
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
