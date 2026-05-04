import { motion } from "framer-motion";
import { concepts, toneTokens } from "../../data/concepts";

interface TopNavProps {
  activeId: string;
  onChange: (id: string) => void;
}

export default function TopNav({ activeId, onChange }: TopNavProps) {
  return (
    <nav className="flex items-center gap-2 px-6 py-3 bg-surface-card border-b border-border-subtle overflow-x-auto">
      <div className="flex items-center gap-2 mr-4 shrink-0">
        <div className="w-9 h-9 rounded-xl bg-brand-orange flex items-center justify-center shadow-[var(--shadow-card)]">
          <span className="text-white font-black text-sm leading-none">Z</span>
        </div>
        <span className="font-black text-text-primary text-base hidden sm:block">
          Zwijsen
        </span>
      </div>

      <div className="flex items-center gap-2 flex-1">
        {concepts.map((concept) => {
          const isActive = concept.id === activeId;
          const Icon = concept.Icon;
          const accent = toneTokens[concept.tone].accentColor;
          return (
            <motion.button
              key={concept.id}
              type="button"
              onClick={() => onChange(concept.id)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`relative z-0 flex min-h-[48px] items-center gap-2 rounded-2xl border px-4 py-2 text-sm font-bold whitespace-nowrap transition-colors duration-200 cursor-pointer shrink-0 ${
                isActive
                  ? "border-brand-orange bg-brand-orange text-text-inverted"
                  : "border-border-subtle bg-surface-card text-text-secondary hover:border-border-strong/25"
              }`}
            >
              <Icon
                size={18}
                className="shrink-0"
                style={{ color: isActive ? "var(--color-text-inverted)" : accent }}
                strokeWidth={2}
                aria-hidden
              />
              <span className="hidden md:inline">{concept.title}</span>
              <span className="md:hidden font-black">{concept.number}</span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
