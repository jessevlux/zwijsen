import { CONTEXT_HINT_COST, LETTER_HINT_COST } from "./data";

interface HintActionsProps {
  onLetter: () => void;
  onContext: () => void;
  onGiveUp: () => void;
  letterDisabled: boolean;
  contextDisabled: boolean;
  giveUpDisabled: boolean;
  accentColor: string;
}

export default function HintActions({
  onLetter,
  onContext,
  onGiveUp,
  letterDisabled,
  contextDisabled,
  giveUpDisabled,
  accentColor,
}: HintActionsProps) {
  const btn =
    "relative flex min-h-[52px] flex-1 flex-col items-center justify-center gap-0.5 rounded-2xl border-2 px-2 py-2 text-center text-xs font-black transition-opacity disabled:cursor-not-allowed disabled:opacity-40 sm:text-sm";

  const badge = "rounded-full px-2 py-0.5 text-[10px] font-black uppercase";

  return (
    <div className="flex w-full max-w-lg flex-col gap-2">
      <p className="text-center text-[11px] font-semibold text-text-muted">Hints van de coach (kosten punten)</p>
      <div className="flex flex-wrap gap-2 sm:flex-nowrap">
        <button
          type="button"
          className={`${btn} border-border-subtle bg-white text-text-primary shadow-sm hover:bg-surface-muted`}
          style={{ borderColor: letterDisabled ? undefined : `${accentColor}55` }}
          disabled={letterDisabled}
          onClick={onLetter}
        >
          <span className={badge} style={{ backgroundColor: `${accentColor}22`, color: accentColor }}>
            −{LETTER_HINT_COST} pt
          </span>
          <span>Letter erbij</span>
        </button>
        <button
          type="button"
          className={`${btn} border-border-subtle bg-white text-text-primary shadow-sm hover:bg-surface-muted`}
          style={{ borderColor: contextDisabled ? undefined : `${accentColor}55` }}
          disabled={contextDisabled}
          onClick={onContext}
        >
          <span className={badge} style={{ backgroundColor: `${accentColor}22`, color: accentColor }}>
            −{CONTEXT_HINT_COST} pt
          </span>
          <span>Voorbeeldzin</span>
        </button>
        <button
          type="button"
          className={`${btn} border-amber-200 bg-amber-50 text-amber-950 shadow-sm hover:bg-amber-100`}
          disabled={giveUpDisabled}
          onClick={onGiveUp}
        >
          <span className={`${badge} bg-amber-200/80 text-amber-900`}>0 pt</span>
          <span>Geef het op</span>
        </button>
      </div>
    </div>
  );
}
