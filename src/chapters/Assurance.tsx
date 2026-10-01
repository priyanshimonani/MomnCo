import { Check, Circle, X } from "lucide-react";
import { useEffect, useRef, useState, type MouseEvent, type PointerEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/primitives";
import { controls } from "../data/controls";
import { useReducedMotion } from "../hooks/useReducedMotion";

type ControlStatus = "PENDING" | "PASS" | "FAIL";
type StampPosition = { x: number; y: number };

const stampPosition = (
  target: HTMLButtonElement,
  clientX: number,
  clientY: number,
  offsetX = 0,
  offsetY = 0,
): StampPosition => {
  const bounds = target.getBoundingClientRect();
  const x = Math.max(72, Math.min(bounds.width - 72, clientX - bounds.left + offsetX));
  const y = Math.max(39, Math.min(bounds.height - 39, clientY - bounds.top + offsetY));
  return { x: (x / bounds.width) * 100, y: (y / bounds.height) * 100 };
};

export default function Assurance() {
  const [statuses, setStatuses] = useState<ControlStatus[]>(controls.map(() => "PENDING"));
  const [verified, setVerified] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewPosition, setPreviewPosition] = useState<StampPosition>({ x: 50, y: 50 });
  const [previewRotation, setPreviewRotation] = useState(0);
  const [stampPlacement, setStampPlacement] = useState<StampPosition>({ x: 50, y: 50 });
  const [stampRotation, setStampRotation] = useState(0);
  const previousPointerX = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();
  const navigate = useNavigate();
  const failed = statuses.includes("FAIL");

  useEffect(() => {
    const step = reducedMotion ? 90 : 540;
    const timers = controls.slice(0, -1).map((_, index) => window.setTimeout(() => {
      setStatuses((current) => current.map((status, row) => row === index ? "PASS" : status));
    }, (index + 1) * step));
    timers.push(window.setTimeout(() => {
      setStatuses((current) => current.map((status, row) => row === controls.length - 1 ? "FAIL" : status));
    }, controls.length * step + (reducedMotion ? 250 : 900)));
    return () => timers.forEach(window.clearTimeout);
  }, [reducedMotion]);

  const moveStampPreview = (event: PointerEvent<HTMLButtonElement>) => {
    if (verified || event.pointerType === "touch") return;
    const previousX = previousPointerX.current;
    if (previousX !== null) {
      const rotation = Math.max(-4, Math.min(4, (event.clientX - previousX) * 0.12));
      setPreviewRotation(rotation);
    } else {
      setPreviewRotation(0);
    }
    previousPointerX.current = event.clientX;
    setPreviewPosition(stampPosition(event.currentTarget, event.clientX, event.clientY, 12, 8));
    setPreviewVisible(true);
  };

  const placeStamp = (event: MouseEvent<HTMLButtonElement>) => {
    if (verified) return;
    const placement = event.detail === 0
      ? { x: 50, y: 50 }
      : stampPosition(event.currentTarget, event.clientX, event.clientY);
    setStampPlacement(placement);
    setStampRotation(event.detail === 0 ? 0 : previewRotation);
    setPreviewVisible(false);
    setVerified(true);
  };

  const sealCopy = (
    <>
      <span className="audit-stamp__seal-kicker">AUDITED WITH LOVE</span>
      <strong>VERIFIED</strong>
      <span className="audit-stamp__seal-name">MOM &amp; CO.</span>
      <span className="audit-stamp__seal-year">FY 2025–26</span>
    </>
  );

  return (
    <article className="screen-page audit-screen">
      <header className="screen-heading">
        <p className="eyebrow">Independent Auditor&apos;s Compliance Report</p>
        <h1>Compliance Audit (FY 2025–26)</h1>
      </header>
      <section className="audit-controls" aria-label="Internal control results">
        <p className="audit-controls__metadata mono">REPORT NO: MC-2026-001 | ISSUED: OCT 2026</p>
        <table className="audit-table">
          <thead>
            <tr>
              <th scope="col">Compliance Clause</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {controls.map((control, index) => {
              const status = statuses[index];
              const Icon = status === "PASS" ? Check : status === "FAIL" ? X : Circle;
              const statusLabel = status === "FAIL" ? "QUALIFIED FAIL" : status;
              return (
                <tr
                  className={`audit-control audit-control--${status.toLowerCase()} ${status === "FAIL" ? "audit-control--pulse" : ""}`}
                  key={control.id}
                  aria-live={index === controls.length - 1 ? "polite" : undefined}
                >
                  <td className="audit-control__label">
                    <span className="audit-control__clause mono">CLAUSE {control.id}</span>
                    <span>{control.description}</span>
                  </td>
                  <td className="audit-control__status-cell">
                    <span className={`audit-control__status audit-control__status--${status.toLowerCase()}`} role="status">
                      <Icon size={15} aria-hidden="true" />
                      {statusLabel}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
      {failed && (
        <p className="audit-rest-note" role="alert">
          NON-COMPLIANCE: Adequate tea breaks were not taken at prescribed intervals.
        </p>
      )}
      <div className="audit-stamp">
        <button
          type="button"
          className={`audit-stamp__target ${previewVisible && !verified ? "audit-stamp__target--previewing" : ""}`}
          disabled={verified}
          aria-label={verified ? "Verified audit seal applied." : "Stamp here to verify. Activate to apply audit seal."}
          onPointerMove={moveStampPreview}
          onPointerLeave={() => {
            setPreviewVisible(false);
            setPreviewRotation(0);
            previousPointerX.current = null;
          }}
          onClick={placeStamp}
        >
          {verified ? (
            <span
              className="audit-stamp__seal audit-stamp__seal--placed"
              aria-hidden="true"
              style={{
                left: `${stampPlacement.x}%`,
                top: `${stampPlacement.y}%`,
                transform: `translate(-50%, -50%) rotate(${stampRotation}deg)`,
              }}
            >
              {sealCopy}
            </span>
          ) : (
            <>
              <span className="audit-stamp__prompt" aria-hidden="true">
                <strong>STAMP HERE TO VERIFY</strong>
                <span>Click to apply audit seal</span>
              </span>
              {previewVisible && (
                <span
                  className="audit-stamp__seal audit-stamp__seal--preview"
                  aria-hidden="true"
                  style={{
                    left: `${previewPosition.x}%`,
                    top: `${previewPosition.y}%`,
                    transform: `translate(-50%, -50%) rotate(${previewRotation}deg)`,
                  }}
                >
                  {sealCopy}
                </span>
              )}
            </>
          )}
        </button>
        <p className="audit-stamp__asterisk">
          *Approved by Chief Audit Daughter.
        </p>
      </div>
      <div className="screen-continue">
        <Button variant="primary" onClick={() => navigate("/05")} disabled={!verified}>Continue</Button>
      </div>
    </article>
  );
}
