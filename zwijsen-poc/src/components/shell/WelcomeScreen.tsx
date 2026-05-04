import { motion } from "framer-motion";
import { concepts } from "../../data/concepts";

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
        <div className="w-20 h-20 rounded-3xl bg-[#FF7A35] flex items-center justify-center mx-auto mb-5 shadow-lg">
          <span className="text-white font-black text-4xl leading-none">Z</span>
        </div>
        <h1 className="text-4xl font-black text-slate-800 leading-tight">
          Zwijsen Interactief
        </h1>
        <p className="mt-3 text-slate-500 text-lg max-w-md mx-auto leading-relaxed">
          Kies een concept om te verkennen. Elk scherm laat een andere manier
          zien om woordenschat te leren.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl w-full">
        {concepts.map((concept, i) => (
          <motion.button
            key={concept.id}
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 0.08 * i,
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect(concept.id)}
            className="text-left rounded-3xl p-5 cursor-pointer transition-shadow hover:shadow-xl"
            style={{ backgroundColor: concept.colorLight }}
          >
            <div className="flex items-start justify-between mb-4">
              <span className="text-4xl">{concept.emoji}</span>
              <span
                className="text-xs font-black rounded-full px-2.5 py-1"
                style={{ backgroundColor: concept.color, color: "#fff" }}
              >
                {concept.number}
              </span>
            </div>
            <h3
              className="font-black text-base leading-tight mb-1"
              style={{ color: concept.colorText }}
            >
              {concept.title}
            </h3>
            <p
              className="text-xs leading-relaxed"
              style={{ color: concept.colorText, opacity: 0.8 }}
            >
              {concept.grade} · {concept.theme}
            </p>
          </motion.button>
        ))}

        {/* Info card */}
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.08 * 5 }}
          className="rounded-3xl p-5 bg-slate-800 text-white sm:col-span-2 lg:col-span-1 flex flex-col justify-between"
        >
          <div>
            <span className="text-3xl">👩‍🏫</span>
            <h3 className="font-black text-base mt-3 mb-1">
              Redacteursweergave
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Open het paneel rechts om AI-content te reviewen, definities aan
              te passen en woorden goed te keuren.
            </p>
          </div>
          <div className="mt-4 text-xs text-[#FF7A35] font-bold">
            → Klik op het pijltje rechts in beeld
          </div>
        </motion.div>
      </div>
    </div>
  );
}
