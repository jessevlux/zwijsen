import { ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";
import type { SwipeDirection } from "./SwipeCard";

export default function ActionButtons({
  disabled,
  leftWord,
  rightWord,
  onAction,
}: {
  disabled: boolean;
  leftWord: string;
  rightWord: string;
  onAction: (dir: SwipeDirection) => void;
}) {
  const base =
    "flex min-h-[52px] flex-1 items-center justify-center gap-1.5 rounded-2xl border-2 text-xs font-black tracking-wide transition-opacity disabled:cursor-not-allowed disabled:opacity-40 sm:gap-2 sm:text-sm";

  return (
    <div className="flex w-full max-w-2xl flex-col gap-2 px-2 sm:max-w-3xl">
      <div className="flex w-full gap-2 sm:gap-3">
        <button
          type="button"
          disabled={disabled}
          className={`${base} min-w-0 border-zinc-200 bg-white text-zinc-800 shadow-sm hover:bg-zinc-50`}
          onClick={() => onAction("left")}
          aria-label={`Kies ${leftWord} (links)`}
          title={leftWord}
        >
          <ArrowLeft className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" aria-hidden />
          <span className="min-w-0 truncate normal-case tracking-normal">{leftWord}</span>
        </button>
        <button
          type="button"
          disabled={disabled}
          className={`${base} max-w-[5.5rem] shrink-0 flex-col border-accent-info bg-accent-info-soft px-2 py-2 text-accent-info shadow-sm hover:opacity-90 sm:max-w-none sm:flex-row`}
          onClick={() => onAction("up")}
          aria-label="Lastig: deze kaart komt later nog een keer terug"
        >
          <ArrowUp className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" aria-hidden />
          <span className="text-[10px] font-black uppercase leading-tight sm:text-xs">Lastig</span>
        </button>
        <button
          type="button"
          disabled={disabled}
          className={`${base} min-w-0 border-zinc-200 bg-white text-zinc-800 shadow-sm hover:bg-zinc-50`}
          onClick={() => onAction("right")}
          aria-label={`Kies ${rightWord} (rechts)`}
          title={rightWord}
        >
          <span className="min-w-0 truncate normal-case tracking-normal">{rightWord}</span>
          <ArrowRight className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" aria-hidden />
        </button>
      </div>
      <p className="text-center text-[11px] font-medium text-zinc-500">
        Sleep de kaart dezelfde kant op — of tik op een knop.
      </p>
    </div>
  );
}
