import { useCallback, useEffect, useRef } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { Check } from "lucide-react";

interface AnswerInputProps {
  value: string;
  onChange: (v: string) => void;
  onCheck: () => void;
  disabled?: boolean;
  accentColor: string;
  /** Verhoog bij elke foute poging om schud-animatie te triggeren */
  shakeNonce: number;
  /** Verhoog bij goed antwoord voor korte succes-flits */
  successNonce: number;
}

export default function AnswerInput({
  value,
  onChange,
  onCheck,
  disabled,
  accentColor,
  shakeNonce,
  successNonce,
}: AnswerInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const rowControls = useAnimationControls();
  const prevShake = useRef(0);

  useEffect(() => {
    if (shakeNonce <= 0 || shakeNonce === prevShake.current) return;
    prevShake.current = shakeNonce;
    void rowControls.start({
      x: [0, -10, 10, -8, 8, 0],
      transition: { duration: 0.42 },
    });
  }, [shakeNonce, rowControls]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !disabled) {
        e.preventDefault();
        onCheck();
      }
    },
    [disabled, onCheck],
  );

  useEffect(() => {
    if (successNonce > 0) inputRef.current?.blur();
  }, [successNonce]);

  return (
    <div className="flex w-full max-w-lg flex-col gap-2">
      <motion.div animate={rowControls} className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          autoComplete="off"
          disabled={disabled}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Typ het woord…"
          className="min-h-14 flex-1 rounded-2xl border-2 border-border-subtle bg-white px-4 text-lg font-semibold text-text-primary shadow-inner outline-none transition-[box-shadow,transform] placeholder:text-text-muted focus:border-[color:var(--focus)] disabled:opacity-50"
          style={
            {
              ["--focus" as string]: accentColor,
              boxShadow: successNonce > 0 ? `0 0 0 3px ${accentColor}55` : undefined,
            } as React.CSSProperties
          }
        />
        <button
          type="button"
          disabled={disabled}
          onClick={onCheck}
          className="flex min-h-14 min-w-14 shrink-0 items-center justify-center rounded-2xl font-black text-white shadow-md transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-40"
          style={{ backgroundColor: accentColor }}
          aria-label="Controleren"
        >
          <Check className="h-7 w-7" strokeWidth={2.5} aria-hidden />
        </button>
      </motion.div>
      <p className="text-center text-[11px] text-text-muted">Druk op Enter om te controleren.</p>
    </div>
  );
}
