import { useEffect, useRef, useState } from "react";

const holdDuration = 1900;

export function HoldToSign({
  onSigned,
  onHoldingChange,
  completed,
  disabled = false,
}: {
  onSigned: () => void;
  onHoldingChange?: (holding: boolean) => void;
  completed: boolean;
  disabled?: boolean;
}) {
  const [holding, setHolding] = useState(false);
  const timerRef = useRef<number | null>(null);
  const holdingRef = useRef(false);
  const completedRef = useRef(completed);
  completedRef.current = completed;

  useEffect(() => () => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
  }, []);

  const beginHold = (pointerId?: number, target?: HTMLButtonElement) => {
    if (completedRef.current || holdingRef.current) return;
    holdingRef.current = true;
    setHolding(true);
    onHoldingChange?.(true);
    if (pointerId !== undefined && target?.setPointerCapture) target.setPointerCapture(pointerId);
    timerRef.current = window.setTimeout(() => {
      timerRef.current = null;
      holdingRef.current = false;
      completedRef.current = true;
      setHolding(false);
      onHoldingChange?.(false);
      onSigned();
    }, holdDuration);
  };

  const releaseHold = () => {
    if (!holdingRef.current) return;
    holdingRef.current = false;
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    timerRef.current = null;
    setHolding(false);
    onHoldingChange?.(false);
  };

  return (
    <div className="hold-sign">
      <button
        type="button"
        className="hold-to-sign"
        data-holding={holding}
        disabled={completed || disabled}
        aria-label={completed ? "Your lovely signature is recorded" : "Press and hold to sign"}
        aria-describedby="hold-sign-instructions"
        onPointerDown={(event) => beginHold(event.pointerId, event.currentTarget)}
        onPointerUp={releaseHold}
        onPointerCancel={releaseHold}
        onLostPointerCapture={releaseHold}
        onKeyDown={(event) => {
          if (event.key === " " || event.key === "Enter") {
            event.preventDefault();
            beginHold();
          }
        }}
        onKeyUp={(event) => {
          if (event.key === " " || event.key === "Enter") {
            event.preventDefault();
            releaseHold();
          }
        }}
        onBlur={releaseHold}
        onClick={(event) => event.preventDefault()}
      >
        <svg className="hold-to-sign__ring" viewBox="0 0 94 48" aria-hidden="true">
          <circle className="hold-to-sign__track" cx="47" cy="24" r="19" />
          <circle className="hold-to-sign__progress" cx="47" cy="24" r="19" />
        </svg>
        <span>{completed ? "Signed with love" : holding ? "Signing…" : "Sign"}</span>
      </button>
      <p id="hold-sign-instructions">Hold for two seconds. Let go early, and try again.</p>
    </div>
  );
}
