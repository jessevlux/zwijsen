import { motion } from "framer-motion";
import { concepts, toneTokens } from "../../data/concepts";

interface Props {
  onSelect: (id: string) => void;
}

export default function WelcomeScreen({ onSelect }: Props) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 py-10">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <div className="w-20 h-20 rounded-3xl bg-brand-orange flex items-center justify-center mx-auto mb-5 shadow-[var(--shadow-card-hover)]">
          <span className="text-white font-black text-4xl leading-none">Z</span>
        </div>
        <h1 className="text-4xl font-black text-text-primary leading-tight">
          Zwijsen POC
        </h1>
        <p className="mt-3 text-text-secondary text-lg max-w-md mx-auto leading-relaxed">
          Kies een concept om te verkennen. Elk scherm laat een andere manier
          zien om woordenschat te leren.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl w-full">
        {concepts.map((concept, i) => {
          const { accentColor } = toneTokens[concept.tone];
          const Icon = concept.Icon;
          return (
            <motion.button
              key={concept.id}
              type="button"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.08 * i,
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(concept.id)}
              className="min-h-[160px] text-left rounded-3xl p-6 cursor-pointer bg-surface-card border border-border-subtle shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-card-hover)]"
              style={{ borderTop: `3px solid ${accentColor}` }}
            >
              <div className="flex items-start justify-between mb-4">
                <Icon
                  className="h-9 w-9 shrink-0"
                  style={{ color: accentColor }}
                  strokeWidth={2}
                  aria-hidden
                />
                <span
                  className="text-xs font-black rounded-full px-2.5 py-1 text-text-inverted"
                  style={{ backgroundColor: accentColor }}
                >
                  {concept.number}
                </span>
              </div>
              <h3 className="font-black text-base leading-tight mb-1 text-text-primary">
                {concept.title}
              </h3>
              <p className="text-xs leading-relaxed text-text-secondary">
                {concept.dashboardSubtitle}
              </p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
