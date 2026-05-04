import { maskWordInContext } from "./data";

interface HintCardProps {
  category: string;
  definition: string;
  contextSentence: string;
  secretWord: string;
  contextShown: boolean;
}

export default function HintCard({ category, definition, contextSentence, secretWord, contextShown }: HintCardProps) {
  const masked = maskWordInContext(contextSentence, secretWord);

  return (
    <div className="w-full max-w-lg space-y-3 rounded-2xl border border-border-subtle bg-white/90 px-4 py-4 shadow-sm">
      <p className="text-center text-[10px] font-black uppercase tracking-wide text-text-muted">{category}</p>
      <p className="text-center text-base font-bold leading-snug text-text-primary">{definition}</p>
      {contextShown && (
        <p className="border-t border-border-subtle pt-3 text-center text-sm leading-relaxed text-text-secondary">
          {masked}
        </p>
      )}
    </div>
  );
}
