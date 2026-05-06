import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Flame } from "lucide-react";
import type { SwipeCardData } from "../../../types/content";
import { vloggenSwipeCards } from "./examples";
import ActionButtons from "./ActionButtons";
import DonePanel from "./DonePanel";
import { SwipeCard, type SwipeCardRef, type SwipeDirection } from "./SwipeCard";

interface SwipeDeckProps {
  /** Standaard: Vloggen-voorbeeld uit examples. */
  cards?: SwipeCardData[];
}

function applySwipeDeck(
  prev: SwipeCardData[],
  dir: SwipeDirection,
): { next: SwipeCardData[]; didCorrect: boolean } {
  const top = prev[0];
  if (!top) return { next: prev, didCorrect: false };
  const rest = prev.slice(1);
  if (dir === "up") {
    const i = Math.min(2, rest.length);
    return { next: [...rest.slice(0, i), top, ...rest.slice(i)], didCorrect: false };
  }
  const ok = dir === "left" ? top.left.isCorrect : top.right.isCorrect;
  if (ok) return { next: rest, didCorrect: true };
  const i = Math.min(3, rest.length);
  return { next: [...rest.slice(0, i), top, ...rest.slice(i)], didCorrect: false };
}

export default function SwipeDeck({ cards: cardsProp }: SwipeDeckProps) {
  const sourceCards = cardsProp ?? vloggenSwipeCards;
  const initialTotal = sourceCards.length;

  const [deck, setDeck] = useState<SwipeCardData[]>(() => [...sourceCards]);
  const [correctCount, setCorrectCount] = useState(0);
  const [attemptCount, setAttemptCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const [laterFeedback, setLaterFeedback] = useState(false);
  const feedbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cardRef = useRef<SwipeCardRef>(null);
  const [busy, setBusy] = useState(false);

  const top = deck[0];
  const done = deck.length === 0;

  const progressPct = useMemo(() => {
    if (done) return 100;
    return Math.min(100, (correctCount / initialTotal) * 100);
  }, [correctCount, done, initialTotal]);

  useEffect(() => {
    return () => {
      if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    };
  }, []);

  const showLaterFeedback = useCallback(() => {
    setLaterFeedback(true);
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    feedbackTimerRef.current = setTimeout(() => {
      setLaterFeedback(false);
      feedbackTimerRef.current = null;
    }, 2200);
  }, []);

  const handleSwipeStart = useCallback(
    (dir: SwipeDirection) => {
      if (dir === "up") showLaterFeedback();
    },
    [showLaterFeedback],
  );

  const handleSwipeComplete = useCallback((dir: SwipeDirection) => {
    let gained = false;
    setDeck((prev) => {
      const { next, didCorrect } = applySwipeDeck(prev, dir);
      gained = didCorrect;
      return next;
    });
    setAttemptCount((c) => c + 1);
    setShowSwipeHint(false);

    if (gained) {
      setCorrectCount((c) => c + 1);
      setStreak((s) => s + 1);
    } else if (dir === "left" || dir === "right") {
      setStreak(0);
    }

    setBusy(false);
  }, []);

  const onButton = useCallback(
    (dir: SwipeDirection) => {
      if (done || busy || !top) return;
      setBusy(true);
      cardRef.current?.programmaticSwipe(dir);
    },
    [busy, done, top],
  );

  const restart = useCallback(() => {
    setDeck([...sourceCards]);
    setCorrectCount(0);
    setAttemptCount(0);
    setStreak(0);
    setShowSwipeHint(true);
    setLaterFeedback(false);
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    setBusy(false);
  }, [sourceCards]);

  return (
    <div className="relative flex min-h-0 flex-1 flex-col items-center gap-3 overflow-y-auto px-4 pb-4 pt-3 sm:gap-4">
      {/* Voortgang + streak (speels, geen 'rapport'-toon) */}
      <div className="flex w-full max-w-2xl shrink-0 flex-col gap-2 rounded-xl border border-black/8 bg-white/90 px-3 py-2.5 shadow-sm backdrop-blur sm:max-w-3xl">
        <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 text-xs">
          <div className="min-w-0 font-bold text-zinc-700">
            {attemptCount === 0 ? (
              <span className="text-[11px] sm:text-xs">Klaar om te spelen</span>
            ) : (
              <span className="text-zinc-800">{correctCount} goed</span>
            )}
          </div>
          {streak >= 2 && (
            <span className="flex shrink-0 items-center gap-1 rounded-full bg-orange-100 px-2 py-0.5 text-[11px] font-black text-orange-800">
              <Flame className="h-3.5 w-3.5 text-orange-500" aria-hidden />
              {streak} op een rij
            </span>
          )}
          <span className="shrink-0 rounded-full bg-brand-orange-soft px-2 py-0.5 text-[11px] font-black text-brand-orange">
            {done ? "Klaar" : `${deck.length} in stapel`}
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100">
          <motion.div
            className="h-full rounded-full bg-brand-orange"
            initial={false}
            animate={{ width: `${progressPct}%` }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
          />
        </div>
      </div>

      <div className="flex min-h-0 w-full flex-1 flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {done ? (
            <DonePanel key="done" correct={correctCount} attempts={attemptCount} onRestart={restart} />
          ) : (
            <motion.div
              key={top.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="flex w-full max-w-3xl flex-col items-center gap-3 sm:gap-4"
            >
              <div className="flex w-full max-w-3xl flex-col items-center gap-3 sm:gap-4">
                {/* Grote woorden links/rechts + kaart in het midden */}
                <div className="flex w-full items-stretch justify-center gap-1 sm:gap-3">
                  <aside className="hidden w-[4.5rem] shrink-0 flex-col items-center justify-center rounded-2xl border border-black/8 bg-white/70 px-1.5 py-3 text-center text-[11px] font-black leading-snug text-zinc-800 shadow-sm sm:flex sm:w-24 sm:text-sm md:w-28 md:text-base">
                    <span className="break-words">{top.left.word}</span>
                  </aside>

                  <div className="flex min-w-0 flex-1 flex-col items-center gap-2">
                    {showSwipeHint && (
                      <p className="max-w-md px-1 text-center text-[11px] leading-snug text-zinc-500 sm:text-xs">
                        Sleep naar het woord aan de zijkant — of tik op de knop. Omhoog ={" "}
                        <span className="font-semibold text-accent-info">lastig</span>: die kaart komt straks nog een
                        keer terug.
                      </p>
                    )}
                    <div className="relative w-full max-w-md">
                      <AnimatePresence>
                        {laterFeedback && (
                          <motion.div
                            key="later"
                            role="status"
                            initial={{ opacity: 0, scale: 0.92, y: 6 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96, y: -6 }}
                            transition={{ type: "spring", stiffness: 440, damping: 26 }}
                            className="pointer-events-none absolute inset-x-2 top-1/2 z-30 -translate-y-1/2 rounded-2xl border border-accent-info bg-accent-info-soft/95 px-3 py-2.5 text-center shadow-lg backdrop-blur-sm sm:inset-x-4"
                          >
                            <p className="text-sm font-black text-accent-info">Komt later terug!</p>
                            <p className="mt-0.5 text-[11px] font-medium leading-snug text-text-secondary">
                              Geen fout — we oefenen die straks nog een keer.
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <SwipeCard
                        ref={cardRef}
                        card={top}
                        freezeDrag={busy}
                        onSwipeStart={handleSwipeStart}
                        onSwipeComplete={handleSwipeComplete}
                      />
                    </div>
                  </div>

                  <aside className="hidden w-[4.5rem] shrink-0 flex-col items-center justify-center rounded-2xl border border-black/8 bg-white/70 px-1.5 py-3 text-center text-[11px] font-black leading-snug text-zinc-800 shadow-sm sm:flex sm:w-24 sm:text-sm md:w-28 md:text-base">
                    <span className="break-words">{top.right.word}</span>
                  </aside>
                </div>

                <ActionButtons
                  disabled={busy}
                  leftWord={top.left.word}
                  rightWord={top.right.word}
                  onAction={onButton}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
