import { useLibrary } from "../../state/LibraryContext";
import ConceptKaart from "../concepts/ConceptKaart";
import RaadCoach from "../concepts/RaadCoach";
import SwipeKaarten from "../concepts/SwipeKaarten";
import { EmptyExerciseContent, TypePlaceholder } from "../concepts/placeholders/TypePlaceholder";

interface ExercisePlayerProps {
  exerciseId: string;
  onBack: () => void;
}

export default function ExercisePlayer({ exerciseId, onBack }: ExercisePlayerProps) {
  const { findExercise } = useLibrary();
  const hit = findExercise(exerciseId);

  if (!hit) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6">
        <p className="text-sm font-bold text-text-secondary">Opdracht niet gevonden.</p>
        <button
          type="button"
          onClick={onBack}
          className="rounded-xl bg-brand-orange px-4 py-2 text-sm font-black text-white"
        >
          Terug
        </button>
      </div>
    );
  }

  const { exercise } = hit;

  if (!exercise.content) {
    return <EmptyExerciseContent exercise={exercise} onBack={onBack} />;
  }

  const c = exercise.content;
  switch (c.type) {
    case "concept-kaart":
      return (
        <div className="flex h-full min-h-0 flex-col">
          <ConceptKaart content={c} />
        </div>
      );
    case "swipe-kaarten":
      return (
        <div className="flex h-full min-h-0 flex-col">
          <SwipeKaarten content={c} />
        </div>
      );
    case "raad-coach":
      return (
        <div className="flex h-full min-h-0 flex-col">
          <RaadCoach content={c} />
        </div>
      );
    default:
      return (
        <div className="flex h-full min-h-0 flex-col">
          <TypePlaceholder exerciseType={c.type} />
        </div>
      );
  }
}
