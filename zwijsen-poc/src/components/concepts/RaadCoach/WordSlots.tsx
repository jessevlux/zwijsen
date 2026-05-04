interface WordSlotsProps {
  /** Klein geschreven woord, alleen letters (geen spaties in dataset) */
  word: string;
  /** Per teken: mag dit teken zichtbaar zijn? */
  revealed: boolean[];
  /** Bij opgeven: alles tonen met display-vorm */
  showAll?: boolean;
  /** Weergave bij showAll (zelfde als word in onze data) */
  display?: string;
}

export default function WordSlots({ word, revealed, showAll, display }: WordSlotsProps) {
  const chars = [...word];
  const show = showAll === true;

  return (
    <div
      className="flex flex-wrap items-end justify-center gap-x-1 gap-y-2 sm:gap-x-1.5"
      aria-live="polite"
    >
      {chars.map((ch, i) => {
        const visible = show || revealed[i] === true;
        const letter =
          visible && show && display
            ? ([...display][i] ?? ch)
            : visible
              ? ch
              : "_";
        return (
          <span
            key={`${i}-${ch}`}
            className="flex min-w-[2rem] flex-col items-center sm:min-w-[2.25rem]"
          >
            <span
              className={`font-mono text-3xl font-black tabular-nums sm:text-4xl ${
                visible ? "text-text-primary" : "text-text-muted"
              }`}
              style={{ minHeight: "2.5rem", lineHeight: "2.5rem" }}
            >
              {letter}
            </span>
            <span className="mt-0.5 h-1 w-full rounded-full bg-border-subtle" aria-hidden />
          </span>
        );
      })}
    </div>
  );
}
