import { motion } from "framer-motion";
import { concepts } from "../../data/concepts";

interface TopNavProps {
  activeId: string;
  onChange: (id: string) => void;
}

export default function TopNav({ activeId, onChange }: TopNavProps) {
  return (
    <nav className="flex items-center gap-2 px-6 py-3 bg-white border-b border-slate-100 overflow-x-auto">
      {/* Logo / Brand */}
      <div className="flex items-center gap-2 mr-4 shrink-0">
        <div className="w-9 h-9 rounded-xl bg-[#FF7A35] flex items-center justify-center shadow-sm">
          <span className="text-white font-black text-sm leading-none">Z</span>
        </div>
        <span className="font-black text-slate-800 text-base hidden sm:block">
          Zwijsen
        </span>
      </div>

      {/* Concept tabs */}
      <div className="flex items-center gap-2 flex-1">
        {concepts.map((concept) => {
          const isActive = concept.id === activeId;
          return (
            <motion.button
              key={concept.id}
              onClick={() => onChange(concept.id)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="relative flex items-center gap-2 px-4 py-2 rounded-2xl font-bold text-sm whitespace-nowrap transition-colors duration-200 cursor-pointer shrink-0"
              style={{
                minHeight: 48,
                backgroundColor: isActive ? concept.color : "#F1F5F9",
                color: isActive ? "#fff" : "#475569",
              }}
            >
              <span className="text-base leading-none">{concept.emoji}</span>
              <span className="hidden md:block">{concept.title}</span>
              <span className="md:hidden font-black">{concept.number}</span>
              {isActive && (
                <motion.div
                  layoutId="active-tab-indicator"
                  className="absolute inset-0 rounded-2xl"
                  style={{ backgroundColor: concept.color, zIndex: -1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
