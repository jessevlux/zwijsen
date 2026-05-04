import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, useAnimationControls } from "framer-motion";
import type { SwipeCardData } from "./data";

const SWIPE_THRESHOLD = 100;
const UP_DOMINANCE = 1.15;

export type SwipeDirection = "left" | "right" | "up";

export interface SwipeCardRef {
  programmaticSwipe: (dir: SwipeDirection) => void;
}

const overlayFor = (
  dir: SwipeDirection | "neutral",
  opts: { wrongShake: boolean; dragWrong: boolean },
) => {
  if (opts.wrongShake) return "rgba(245, 101, 101, 0.12)";
  if (dir === "neutral") return "rgba(255, 255, 255, 0)";
  if (dir === "up") return "rgba(66, 153, 225, 0.14)";
  if (opts.dragWrong) return "rgba(245, 101, 101, 0.1)";
  return "rgba(72, 187, 120, 0.14)";
};

function parsePrompt(prompt: string) {
  const parts = prompt.split("____");
  if (parts.length === 1) {
    return { before: prompt, after: "" };
  }
  return { before: parts[0] ?? "", after: parts.slice(1).join("____") };
}

export const SwipeCard = forwardRef<
  SwipeCardRef,
  {
    card: SwipeCardData;
    onSwipeComplete: (dir: SwipeDirection) => void;
    /** Vuur vóór de exit-animatie (bijv. micro-feedback bij "lastig") */
    onSwipeStart?: (dir: SwipeDirection) => void;
    /** Alleen slepen blokkeren (knoppen blijven werken) */
    freezeDrag?: boolean;
  }
>(function SwipeCard({ card, onSwipeComplete, onSwipeStart, freezeDrag }, ref) {
  const controls = useAnimationControls();
  const { before, after } = useMemo(() => parsePrompt(card.prompt), [card.prompt]);
  const [dragDir, setDragDir] = useState<SwipeDirection | "neutral">("neutral");
  const [wrongShake, setWrongShake] = useState(false);
  const exitingRef = useRef(false);

  const resetVisual = useCallback(async () => {
    exitingRef.current = false;
    setDragDir("neutral");
    setWrongShake(false);
    await controls.start({ x: 0, y: 0, rotate: 0, scale: 1 });
  }, [controls]);

  useEffect(() => {
    void resetVisual();
  }, [card.id, resetVisual]);

  const runExit = useCallback(
    async (dir: SwipeDirection) => {
      if (exitingRef.current) return;
      exitingRef.current = true;
      onSwipeStart?.(dir);
      const w = typeof window !== "undefined" ? window.innerWidth : 400;
      const h = typeof window !== "undefined" ? window.innerHeight : 700;
      const targets =
        dir === "left"
          ? { x: -w * 0.85, y: 40, rotate: -18, scale: 0.92 }
          : dir === "right"
            ? { x: w * 0.85, y: 40, rotate: 18, scale: 0.92 }
            : { x: 0, y: -h * 0.55, rotate: 0, scale: 0.9 };

      await controls.start({
        ...targets,
        transition: { type: "spring", stiffness: 380, damping: 28 },
      });
      onSwipeComplete(dir);
      await resetVisual();
    },
    [controls, onSwipeComplete, onSwipeStart, resetVisual],
  );

  const finishSwipe = useCallback(
    async (dir: SwipeDirection) => {
      if (exitingRef.current) return;
      const correct =
        dir === "left" ? card.left.isCorrect : dir === "right" ? card.right.isCorrect : true;
      if (dir === "up" || correct) {
        await runExit(dir);
        return;
      }
      setWrongShake(true);
      await controls.start({
        x: [0, -10, 10, -8, 8, 0],
        transition: { duration: 0.45 },
      });
      setWrongShake(false);
      await controls.start({
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 420, damping: 30 },
      });
      await runExit(dir);
    },
    [card.left.isCorrect, card.right.isCorrect, controls, runExit],
  );

  useImperativeHandle(
    ref,
    () => ({
      programmaticSwipe: (dir) => {
        void finishSwipe(dir);
      },
    }),
    [finishSwipe],
  );

  const classifyDrag = useCallback((x: number, y: number): SwipeDirection | null => {
    const absX = Math.abs(x);
    const absY = Math.abs(y);
    if (y < -SWIPE_THRESHOLD && absY > absX * UP_DOMINANCE) return "up";
    if (x < -SWIPE_THRESHOLD && absX >= absY) return "left";
    if (x > SWIPE_THRESHOLD && absX >= absY) return "right";
    return null;
  }, []);

  const handleDrag = useCallback(
    (_: unknown, info: { offset: { x: number; y: number } }) => {
      const { x, y } = info.offset;
      const d = classifyDrag(x, y);
      if (d === "up") setDragDir("up");
      else if (d === "left") setDragDir("left");
      else if (d === "right") setDragDir("right");
      else setDragDir("neutral");
    },
    [classifyDrag],
  );

  const handleDragEnd = useCallback(
    (_: unknown, info: { offset: { x: number; y: number } }) => {
      const { x, y } = info.offset;
      const dir = classifyDrag(x, y);
      setDragDir("neutral");
      if (!dir) {
        void controls.start({ x: 0, y: 0, rotate: 0, scale: 1, transition: { type: "spring", stiffness: 420, damping: 32 } });
        return;
      }
      void finishSwipe(dir);
    },
    [classifyDrag, controls, finishSwipe],
  );

  const dragWrong =
    dragDir === "left" ? !card.left.isCorrect : dragDir === "right" ? !card.right.isCorrect : false;

  return (
    <div className="relative w-full max-w-md px-2">
      <div className="relative w-full">
        <motion.div
          className="relative touch-pan-y"
          style={{ willChange: "transform" }}
          drag={freezeDrag ? false : true}
          dragConstraints={{ left: -240, right: 240, top: -220, bottom: 72 }}
          dragElastic={0.85}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          animate={controls}
        >
          <div
            className={`relative overflow-hidden rounded-3xl border-2 bg-white p-6 shadow-xl transition-[box-shadow] duration-200 ${
              wrongShake ? "border-accent-danger/50 shadow-sm" : "border-black/10 shadow-black/10"
            }`}
          >
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-3xl"
              animate={{
                backgroundColor: overlayFor(dragDir, { wrongShake, dragWrong }),
              }}
              transition={{ duration: 0.15 }}
            />
            <p className="relative text-center text-lg leading-relaxed text-zinc-900 md:text-xl">
              {before}
              <span className="mx-1 inline-block min-w-[3.5ch] rounded-md border border-dashed border-zinc-300 bg-zinc-50 px-2 py-0.5 font-semibold text-zinc-500">
                …
              </span>
              {after}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
});

SwipeCard.displayName = "SwipeCard";
