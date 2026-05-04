import { motion } from "framer-motion";
import { Wrench } from "lucide-react";
import type { Concept } from "../../data/concepts";
import { toneTokens } from "../../data/concepts";

interface Props {
  concept: Concept;
}

const featurePoints: Record<string, string[]> = {
  "concept-kaart": [
    "Sleep woorden als nodes naar het canvas",
    "Trek lijnen en kies de relatie: synoniem · tegenstelling · voorbeeld",
    "Directe kleur-feedback: groen = correct, zachte rode shake = probeer opnieuw",
    "Docent ziet live welke verbindingen de klas mist",
  ],
  "swipe-kaarten": [
    "Eén kaart per scherm — minimale cognitieve belasting",
    "Swipe links / rechts / omhoog voor drie antwoordopties",
    "Foute kaarten schuiven zacht terug in de stapel",
    "Spaced repetition: moeilijke woorden komen vaker terug",
  ],
  "raad-coach": [
    "Split-screen: Coach ziet woord + definitie, Speler ziet invoerveld",
    "Coach klikt voorgedefinieerde hints aan (geen vrije tekst = veilig)",
    "Rollen wisselen automatisch na elk correct antwoord",
    "Gezamenlijke score motiveert beide leerlingen",
  ],
  "woordenwereld": [
    "Interactief isometrisch poppenkaststraatje als scène",
    "Hotspots lichten zachtjes op bij hover",
    "Sleep woorden uit de inventarisbalk naar de juiste plek",
    "Beloningsanimatie bij correcte plaatsing (muntjes, confetti)",
  ],
  "spraakstudio": [
    "Vlog-camera interface met teleprompter (autocue)",
    "Ontbrekende doelwoorden in het script — leerling spreekt ze in",
    "Gesimuleerde live-reacties: hartjes en duimpjes verschijnen",
    "Web Speech API: spraak → tekst, vergeleken met goedgekeurde woordenlijst",
  ],
};

export default function ConceptPlaceholder({ concept }: Props) {
  const points = featurePoints[concept.id] ?? [];
  const { accentColor } = toneTokens[concept.tone];
  const Icon = concept.Icon;

  return (
    <div className="flex flex-col items-center justify-center h-full px-6 py-12 text-center">
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.05 }}
        className="flex flex-col items-center gap-6 max-w-lg w-full"
      >
        <div
          className="w-28 h-28 rounded-3xl flex items-center justify-center bg-surface-card border-2 shadow-[var(--shadow-card)]"
          style={{ borderColor: accentColor }}
        >
          <Icon className="h-12 w-12" style={{ color: accentColor }} strokeWidth={2} aria-hidden />
        </div>

        <div>
          <div
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold mb-3 bg-surface-muted text-text-secondary border border-border-subtle"
          >
            Concept {concept.number} · {concept.grade}
          </div>
          <h1 className="text-3xl font-black text-text-primary leading-tight">
            {concept.subtitle}
          </h1>
          <p className="mt-2 text-text-secondary text-base leading-relaxed">
            {concept.description}
          </p>
        </div>

        <div
          className="w-full rounded-2xl border-l-4 bg-surface-card border border-border-subtle px-5 py-4 text-left shadow-[var(--shadow-card)]"
          style={{ borderLeftColor: accentColor }}
        >
          <p className="text-xs font-black uppercase tracking-wider mb-1 text-text-secondary">
            Didactisch doel
          </p>
          <p className="text-sm leading-relaxed text-text-primary">
            {concept.didacticGoal}
          </p>
        </div>

        <div className="w-full rounded-2xl bg-surface-card border border-border-subtle px-5 py-4 text-left space-y-3 shadow-[var(--shadow-card)]">
          <p className="text-xs font-black uppercase tracking-wider text-text-secondary">
            Wat gaat hier komen
          </p>
          {points.map((point, i) => (
            <motion.div
              key={i}
              initial={{ x: -12, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 + i * 0.06 }}
              className="flex items-start gap-3"
            >
              <div
                className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-text-inverted text-xs font-black shrink-0"
                style={{ backgroundColor: accentColor }}
              >
                {i + 1}
              </div>
              <p className="text-sm text-text-primary leading-relaxed">{point}</p>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center gap-2 text-text-secondary text-sm font-bold">
          <Wrench size={16} aria-hidden />
          Wordt gebouwd in Fase {concept.number + 1}
        </div>
      </motion.div>
    </div>
  );
}
