import { useCallback, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import AnswerInput from "./AnswerInput";
import DonePanel from "./DonePanel";
import HintActions from "./HintActions";
import HintCard from "./HintCard";
import RoundResult from "./RoundResult";
import WordSlots from "./WordSlots";
import {
  CONTEXT_HINT_COST,
  isGuessCorrect,
  LETTER_HINT_COST,
  raadCoachWords,
  ROUND_START_SCORE,
  STREAK_BONUS,
  STREAK_BONUS_AT,
  WRONG_GUESS_PENALTY,
} from "./data";

interface RaadCoachGameProps {
  accentColor: string;
}

export default function RaadCoachGame({ accentColor }: RaadCoachGameProps) {
  const totalRounds = raadCoachWords.length;
  const [wordIndex, setWordIndex] = useState(0);
  const isDone = wordIndex >= totalRounds;
  const current = raadCoachWords[Math.min(wordIndex, totalRounds - 1)];

  const [guess, setGuess] = useState("");
  const [revealed, setRevealed] = useState<boolean[]>(() => [...raadCoachWords[0].word].map(() => false));
  const [contextShown, setContextShown] = useState(false);
  const [surrendered, setSurrendered] = useState(false);
  const [letterHintClicks, setLetterHintClicks] = useState(0);
  const [scoreThisRound, setScoreThisRound] = useState(ROUND_START_SCORE);

  const [showResult, setShowResult] = useState(false);
  const [resultPoints, setResultPoints] = useState(0);
  const [resultWord, setResultWord] = useState("");
  const [resultStreakBonus, setResultStreakBonus] = useState(false);

  const [totalScore, setTotalScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [shakeNonce, setShakeNonce] = useState(0);
  const [successNonce, setSuccessNonce] = useState(0);
  const advanceGuard = useRef(false);

  const resetRoundStateForIndex = useCallback((idx: number) => {
    if (idx >= totalRounds) return;
    const w = raadCoachWords[idx];
    setGuess("");
    setRevealed([...w.word].map(() => false));
    setContextShown(false);
    setSurrendered(false);
    setLetterHintClicks(0);
    setScoreThisRound(ROUND_START_SCORE);
    setSuccessNonce(0);
  }, [totalRounds]);

  const allRevealed = useMemo(() => revealed.length > 0 && revealed.every(Boolean), [revealed]);

  const openResult = useCallback(
    (points: number, word: string, streakBonus: boolean) => {
      setResultPoints(points);
      setResultWord(word);
      setResultStreakBonus(streakBonus);
      setShowResult(true);
    },
    [],
  );

  const advanceRound = useCallback(() => {
    if (advanceGuard.current) return;
    advanceGuard.current = true;
    setShowResult(false);
    const next = wordIndex + 1;
    setWordIndex(next);
    resetRoundStateForIndex(next);
    window.setTimeout(() => {
      advanceGuard.current = false;
    }, 400);
  }, [wordIndex, resetRoundStateForIndex]);

  const restartAll = useCallback(() => {
    setWordIndex(0);
    resetRoundStateForIndex(0);
    setTotalScore(0);
    setStreak(0);
    setShowResult(false);
    setShakeNonce(0);
    setSuccessNonce(0);
  }, [resetRoundStateForIndex]);

  const handleCheck = useCallback(() => {
    if (showResult || isDone || surrendered) return;
    if (isGuessCorrect(guess, current.word)) {
      const nextStreak = streak + 1;
      const bonus = nextStreak >= STREAK_BONUS_AT ? STREAK_BONUS : 0;
      const pts = Math.max(0, scoreThisRound) + bonus;
      setTotalScore((t) => t + pts);
      setStreak(nextStreak);
      openResult(pts, current.display, bonus > 0);
      setSuccessNonce((n) => n + 1);
    } else {
      setShakeNonce((n) => n + 1);
      setScoreThisRound((s) => Math.max(0, s - WRONG_GUESS_PENALTY));
      setStreak(0);
    }
  }, [guess, current, scoreThisRound, streak, showResult, isDone, surrendered, openResult]);

  const revealLetter = useCallback(() => {
    if (surrendered || showResult) return;
    const chars = [...current.word];
    const hiddenIdx = chars.map((_, i) => (!revealed[i] ? i : -1)).filter((i) => i >= 0);
    if (hiddenIdx.length === 0) return;
    const pick =
      letterHintClicks === 0 ? Math.min(...hiddenIdx) : hiddenIdx[Math.floor(Math.random() * hiddenIdx.length)];
    setRevealed((prev) => {
      const next = [...prev];
      next[pick] = true;
      return next;
    });
    setLetterHintClicks((c) => c + 1);
    setScoreThisRound((s) => Math.max(0, s - LETTER_HINT_COST));
  }, [current.word, revealed, letterHintClicks, surrendered, showResult]);

  const showContext = useCallback(() => {
    if (surrendered || showResult || contextShown) return;
    setContextShown(true);
    setScoreThisRound((s) => Math.max(0, s - CONTEXT_HINT_COST));
  }, [contextShown, surrendered, showResult]);

  const giveUp = useCallback(() => {
    if (surrendered || showResult) return;
    setSurrendered(true);
    setRevealed([...current.word].map(() => true));
    setScoreThisRound(0);
    setStreak(0);
    openResult(0, current.display, false);
  }, [current, surrendered, showResult, openResult]);

  const progressPct = isDone ? 100 : Math.min(100, (wordIndex / totalRounds) * 100);

  if (isDone) {
    return (
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-y-auto px-4 py-6">
        <DonePanel
          totalScore={totalScore}
          roundsPlayed={totalRounds}
          onRestart={restartAll}
          accentColor={accentColor}
        />
      </div>
    );
  }

  return (
    <div className="relative flex min-h-0 flex-1 flex-col items-center gap-4 overflow-y-auto px-4 pb-6 pt-3">
      <RoundResult
        open={showResult}
        word={resultWord}
        points={resultPoints}
        streakBonus={resultStreakBonus}
        onNext={advanceRound}
        accentColor={accentColor}
      />

      <div className="flex w-full max-w-2xl shrink-0 flex-col gap-2 rounded-xl border border-border-subtle bg-white/90 px-3 py-2.5 shadow-sm backdrop-blur sm:max-w-3xl">
        <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 text-xs">
          <span className="font-bold text-text-primary">Score: {totalScore}</span>
          {streak >= STREAK_BONUS_AT && (
            <span className="flex items-center gap-1 rounded-full bg-orange-100 px-2 py-0.5 text-[11px] font-black text-orange-800">
              <Flame className="h-3.5 w-3.5 text-orange-500" aria-hidden />
              {streak} op een rij
            </span>
          )}
          <span className="rounded-full bg-surface-muted px-2 py-0.5 text-[11px] font-black text-text-secondary">
            Ronde {wordIndex + 1} / {totalRounds}
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-surface-muted">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: accentColor }}
            initial={false}
            animate={{ width: `${progressPct}%` }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
          />
        </div>
        <p className="text-[11px] font-medium text-text-muted">
          Deze ronde: <span className="font-bold text-text-primary">{Math.max(0, scoreThisRound)}</span> pt
          (start {ROUND_START_SCORE}, min 0)
        </p>
      </div>

      <p className="text-center text-sm font-bold text-text-primary">Raad het woord van de coach</p>

      <WordSlots word={current.word} revealed={revealed} showAll={surrendered} display={current.display} />

      <HintCard
        category={current.category}
        definition={current.definition}
        contextSentence={current.contextSentence}
        secretWord={current.word}
        contextShown={contextShown}
      />

      <AnswerInput
        value={guess}
        onChange={setGuess}
        onCheck={handleCheck}
        disabled={showResult || surrendered}
        accentColor={accentColor}
        shakeNonce={shakeNonce}
        successNonce={successNonce}
      />

      <HintActions
        onLetter={revealLetter}
        onContext={showContext}
        onGiveUp={giveUp}
        letterDisabled={showResult || surrendered || allRevealed}
        contextDisabled={showResult || surrendered || contextShown}
        giveUpDisabled={showResult || surrendered}
        accentColor={accentColor}
      />
    </div>
  );
}
