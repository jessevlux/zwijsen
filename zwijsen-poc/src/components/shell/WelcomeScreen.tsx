import { motion } from "framer-motion";
import { BookOpen, Upload } from "lucide-react";
import { concepts, toneTokens } from "../../data/concepts";

interface Props {
  /** Leerling: geen bibliotheek/import-CTA's en neutrale introtekst. */
  studentMode?: boolean;
  onSelectDemo: (id: string) => void;
  onOpenLibrary: () => void;
  onOpenImport: () => void;
}

export default function WelcomeScreen({
  studentMode = false,
  onSelectDemo,
  onOpenLibrary,
  onOpenImport,
}: Props) {
  return (
    <div className="flex h-full flex-col items-center overflow-y-auto px-6 py-10">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-brand-orange shadow-[var(--shadow-card-hover)]">
          <span className="text-4xl font-black leading-none text-white">Z</span>
        </div>
        <h1 className="text-4xl font-black leading-tight text-text-primary">Zwijsen POC</h1>
        {studentMode ? (
          <p className="mx-auto mt-3 max-w-md text-lg leading-relaxed text-text-secondary">
            Kies hieronder een oefening om te starten.
          </p>
        ) : (
          <>
            <p className="mx-auto mt-3 max-w-md text-lg leading-relaxed text-text-secondary">
              Werkboek-bibliotheek en import. Voorbeeldoefeningen vind je via{" "}
              <span className="font-bold text-text-primary">Leerling</span> (rechtsboven). Import en AI zijn nog concept —
              zie <code className="rounded bg-surface-muted px-1 text-sm">HANDOVER.md</code>.
            </p>

            <div className="mx-auto mt-6 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={onOpenLibrary}
                className="flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 text-sm font-black text-white shadow-md hover:opacity-95"
              >
                <BookOpen className="h-5 w-5 shrink-0" strokeWidth={2} aria-hidden />
                Bibliotheek openen
              </button>
              <button
                type="button"
                onClick={onOpenImport}
                className="flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-2xl border-2 border-brand-orange bg-white px-4 text-sm font-black text-brand-orange shadow-sm hover:bg-brand-orange-soft"
              >
                <Upload className="h-5 w-5 shrink-0" strokeWidth={2} aria-hidden />
                Werkboek importeren
              </button>
            </div>
          </>
        )}
      </motion.div>

      {studentMode && (
        <>
          <p className="mb-3 w-full max-w-3xl text-center text-xs font-black uppercase tracking-wide text-text-muted">
            Oefeningen
          </p>
          <div className="grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                  onClick={() => onSelectDemo(concept.id)}
                  className="min-h-[160px] cursor-pointer rounded-3xl border border-border-subtle bg-surface-card p-6 text-left shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-card-hover)]"
                  style={{ borderTop: `3px solid ${accentColor}` }}
                >
                  <div className="mb-4 flex items-start justify-between">
                    <Icon className="h-9 w-9 shrink-0" style={{ color: accentColor }} strokeWidth={2} aria-hidden />
                    <span
                      className="rounded-full px-2.5 py-1 text-xs font-black text-text-inverted"
                      style={{ backgroundColor: accentColor }}
                    >
                      {concept.number}
                    </span>
                  </div>
                  <h3 className="mb-1 text-base font-black leading-tight text-text-primary">{concept.title}</h3>
                  <p className="text-xs leading-relaxed text-text-secondary">{concept.dashboardSubtitle}</p>
                </motion.button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
