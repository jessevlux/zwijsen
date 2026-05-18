import { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import type { KoppelenLijnenContent } from "../../../types/exerciseContent";

interface KoppelenExerciseProps {
  content: KoppelenLijnenContent;
  accentColor: string;
  onComplete: (correct: number, total: number) => void;
}

interface Pair {
  leftId: string;
  rightId: string;
}

interface ItemPosition {
  id: string;
  x: number;
  y: number;
}

export default function KoppelenExercise({
  content,
  accentColor,
  onComplete,
}: KoppelenExerciseProps) {
  const [pairs, setPairs] = useState<Pair[]>([]);
  const [hasChecked, setHasChecked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [leftPositions, setLeftPositions] = useState<ItemPosition[]>([]);
  const [rightPositions, setRightPositions] = useState<ItemPosition[]>([]);
  const [selectedLeftId, setSelectedLeftId] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const canvasRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePositions = () => {
      if (!containerRef.current) return;

      const leftButtons = containerRef.current.querySelectorAll('[data-side="left"]');
      const rightButtons = containerRef.current.querySelectorAll('[data-side="right"]');

      const leftPos: ItemPosition[] = [];
      const rightPos: ItemPosition[] = [];

      leftButtons.forEach((btn) => {
        const rect = (btn as HTMLElement).getBoundingClientRect();
        const containerRect = containerRef.current?.getBoundingClientRect();
        if (containerRect) {
          leftPos.push({
            id: btn.getAttribute("data-id") || "",
            x: rect.left - containerRect.left + rect.width / 2,
            y: rect.top - containerRect.top + rect.height / 2,
          });
        }
      });

      rightButtons.forEach((btn) => {
        const rect = (btn as HTMLElement).getBoundingClientRect();
        const containerRect = containerRef.current?.getBoundingClientRect();
        if (containerRect) {
          rightPos.push({
            id: btn.getAttribute("data-id") || "",
            x: rect.left - containerRect.left + rect.width / 2,
            y: rect.top - containerRect.top + rect.height / 2,
          });
        }
      });

      setLeftPositions(leftPos);
      setRightPositions(rightPos);
    };

    updatePositions();
    window.addEventListener("resize", updatePositions);
    const timer = setTimeout(updatePositions, 100);

    return () => {
      window.removeEventListener("resize", updatePositions);
      clearTimeout(timer);
    };
  }, [content.leftItems, content.rightItems]);

  const handleLeftItemClick = useCallback(
    (itemId: string) => {
      if (hasChecked) return;
      setSelectedLeftId(selectedLeftId === itemId ? null : itemId);
    },
    [selectedLeftId, hasChecked]
  );

  const handleRightItemClick = useCallback(
    (itemId: string) => {
      if (hasChecked || !selectedLeftId) return;

      const existingPair = pairs.find((p) => p.rightId === itemId);
      if (existingPair) {
        setPairs((prev) => prev.filter((p) => p.rightId !== itemId));
        return;
      }

      setPairs((prev) => {
        const newPairs = prev.filter((p) => p.leftId !== selectedLeftId);
        return [...newPairs, { leftId: selectedLeftId, rightId: itemId }];
      });

      setSelectedLeftId(null);
    },
    [selectedLeftId, pairs, hasChecked]
  );

  const handleCanvasMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!selectedLeftId || !canvasRef.current) {
      setMousePos(null);
      return;
    }

    const rect = canvasRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleCanvasLeave = () => {
    setMousePos(null);
  };

  const handleRemovePair = (pairId: number) => {
    setPairs((prev) => prev.filter((_, idx) => idx !== pairId));
  };

  const handleCheck = useCallback(() => {
    const correct = pairs.filter((p) =>
      content.correctPairs.some(
        (cp) => cp.leftId === p.leftId && cp.rightId === p.rightId
      )
    ).length;
    setCorrectCount(correct);
    setHasChecked(true);
  }, [pairs, content.correctPairs]);

  const handleDone = useCallback(() => {
    onComplete(correctCount, content.correctPairs.length);
  }, [correctCount, content.correctPairs.length, onComplete]);

  const allPaired = pairs.length === content.leftItems.length;

  const getLineColor = (pair: Pair) => {
    if (!hasChecked) return accentColor;
    const isCorrect = content.correctPairs.some(
      (cp) => cp.leftId === pair.leftId && cp.rightId === pair.rightId
    );
    return isCorrect ? "#22c55e" : "#ef4444";
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col items-center overflow-y-auto px-4 py-6 sm:py-8">
      <div className="w-full max-w-5xl space-y-6">
        <div className="rounded-2xl border border-black/8 bg-white/90 p-6 shadow-sm">
          <p className="text-sm leading-relaxed text-text-secondary">
            Klik een woord links, dan een betekenis rechts om ze te verbinden. Klik op de lijn om deze te verwijderen.
          </p>
        </div>

        <div
          ref={containerRef}
          className="relative bg-white/50 rounded-2xl border border-black/8 shadow-sm overflow-hidden"
          style={{ minHeight: "400px" }}
        >
          <svg
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            onMouseMove={handleCanvasMouseMove}
            onMouseLeave={handleCanvasLeave}
          >
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 10 3, 0 6" fill={accentColor} />
              </marker>
              <marker
                id="arrowhead-green"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 10 3, 0 6" fill="#22c55e" />
              </marker>
              <marker
                id="arrowhead-red"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 10 3, 0 6" fill="#ef4444" />
              </marker>
            </defs>

            {pairs.map((pair, idx) => {
              const leftPos = leftPositions.find((p) => p.id === pair.leftId);
              const rightPos = rightPositions.find((p) => p.id === pair.rightId);

              if (!leftPos || !rightPos) return null;

              const color = getLineColor(pair);
              const markerUrl = color === "#22c55e"
                ? "url(#arrowhead-green)"
                : color === "#ef4444"
                ? "url(#arrowhead-red)"
                : "url(#arrowhead)";

              return (
                <g key={idx}>
                  <motion.line
                    x1={leftPos.x}
                    y1={leftPos.y}
                    x2={rightPos.x}
                    y2={rightPos.y}
                    stroke={color}
                    strokeWidth="3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.3 }}
                    strokeLinecap="round"
                    markerEnd={markerUrl}
                  />
                  {!hasChecked && (
                    <line
                      x1={leftPos.x}
                      y1={leftPos.y}
                      x2={rightPos.x}
                      y2={rightPos.y}
                      stroke="transparent"
                      strokeWidth="12"
                      onClick={() => handleRemovePair(idx)}
                      style={{ cursor: "pointer" }}
                    />
                  )}
                </g>
              );
            })}

            {selectedLeftId && mousePos && (
              <motion.line
                x1={leftPositions.find((p) => p.id === selectedLeftId)?.x || 0}
                y1={leftPositions.find((p) => p.id === selectedLeftId)?.y || 0}
                x2={mousePos.x}
                y2={mousePos.y}
                stroke={accentColor}
                strokeWidth="3"
                strokeDasharray="5,5"
                strokeLinecap="round"
                opacity={0.5}
              />
            )}
          </svg>

          <div className="relative z-10 grid grid-cols-2 gap-6 p-6">
            {/* Links */}
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase text-text-muted">Woorden</p>
              {content.leftItems.map((item) => {
                const isPaired = pairs.some((p) => p.leftId === item.id);
                const isSelected = selectedLeftId === item.id;

                return (
                  <motion.button
                    key={item.id}
                    data-side="left"
                    data-id={item.id}
                    type="button"
                    onClick={() => handleLeftItemClick(item.id)}
                    disabled={hasChecked}
                    className={`w-full rounded-2xl border-2 p-4 text-left font-bold transition-all ${
                      isSelected
                        ? "border-2 bg-blue-50"
                        : isPaired
                        ? "border-gray-400 bg-gray-50"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                    style={
                      isSelected
                        ? { borderColor: accentColor, borderWidth: "2px" }
                        : undefined
                    }
                  >
                    {item.label}
                  </motion.button>
                );
              })}
            </div>

            {/* Rechts */}
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase text-text-muted">Betekenissen</p>
              {content.rightItems.map((item) => {
                const isPaired = pairs.some((p) => p.rightId === item.id);

                return (
                  <motion.button
                    key={item.id}
                    data-side="right"
                    data-id={item.id}
                    type="button"
                    onClick={() => handleRightItemClick(item.id)}
                    disabled={hasChecked}
                    className={`w-full rounded-2xl border-2 p-4 text-left font-bold transition-all ${
                      isPaired
                        ? "border-gray-400 bg-gray-50"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    {item.label}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Connections list */}
        {pairs.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl border border-black/8 bg-white/90 p-4 shadow-sm"
          >
            <p className="mb-3 text-xs font-bold uppercase text-text-muted">Verbindingen:</p>
            <div className="space-y-2">
              {pairs.map((pair, idx) => {
                const left = content.leftItems.find((i) => i.id === pair.leftId);
                const right = content.rightItems.find((i) => i.id === pair.rightId);
                const isCorrect = content.correctPairs.some(
                  (cp) => cp.leftId === pair.leftId && cp.rightId === pair.rightId
                );

                return (
                  <div
                    key={idx}
                    className={`flex items-center justify-between rounded-lg p-3 text-sm ${
                      hasChecked
                        ? isCorrect
                          ? "bg-green-100 text-green-900"
                          : "bg-red-100 text-red-900"
                        : "bg-gray-50"
                    }`}
                  >
                    <span className="font-bold">
                      {left?.label} → {right?.label}
                    </span>
                    {!hasChecked && (
                      <button
                        onClick={() => handleRemovePair(idx)}
                        className="p-1 hover:bg-white/50 rounded"
                        type="button"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          {!hasChecked ? (
            <button
              type="button"
              onClick={handleCheck}
              disabled={!allPaired}
              className="flex-1 rounded-2xl bg-white px-4 py-3 font-black text-text-primary transition-all disabled:opacity-50"
              style={{ borderColor: accentColor, borderWidth: "2px" }}
            >
              Controleren
            </button>
          ) : (
            <motion.button
              type="button"
              onClick={handleDone}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex-1 rounded-2xl px-4 py-3 font-black text-white transition-all"
              style={{ backgroundColor: accentColor }}
            >
              Klaar
            </motion.button>
          )}
        </div>

        {hasChecked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl border border-black/8 bg-white/90 p-4 shadow-sm"
          >
            <p className="text-sm font-bold text-text-primary">
              {correctCount} van {content.correctPairs.length} goed
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
