import { useEffect, useRef, useState, type PointerEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button, StatusBadge } from "../components/ui/primitives";
import { useReducedMotion } from "../hooks/useReducedMotion";

const SIGNATURE_WIDTH = 640;
const SIGNATURE_HEIGHT = 140;

export default function Dividend() {
  const [signaturePaths, setSignaturePaths] = useState<string[]>([]);
  const [activePath, setActivePath] = useState("");
  const [signatureStarted, setSignatureStarted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [approved, setApproved] = useState(false);
  const pointerId = useRef<number | null>(null);
  const currentPath = useRef("");
  const signatureEndTimer = useRef<number | null>(null);
  const navigate = useNavigate();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!submitting) return;
    const timer = window.setTimeout(() => {
      setApproved(true);
      setSubmitting(false);
    }, reducedMotion ? 120 : 1050);
    return () => window.clearTimeout(timer);
  }, [reducedMotion, submitting]);

  useEffect(() => () => {
    if (signatureEndTimer.current !== null) window.clearTimeout(signatureEndTimer.current);
  }, []);

  const getSignaturePoint = (event: PointerEvent<SVGSVGElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * SIGNATURE_WIDTH;
    const y = ((event.clientY - bounds.top) / bounds.height) * SIGNATURE_HEIGHT;
    return {
      x: Math.max(0, Math.min(SIGNATURE_WIDTH, x)),
      y: Math.max(0, Math.min(SIGNATURE_HEIGHT, y)),
    };
  };

  const startSignature = (event: PointerEvent<SVGSVGElement>) => {
    if (approved || submitting) return;
    event.preventDefault();
    if (signatureEndTimer.current !== null) {
      window.clearTimeout(signatureEndTimer.current);
      signatureEndTimer.current = null;
    }
    event.currentTarget.setPointerCapture(event.pointerId);
    pointerId.current = event.pointerId;
    const { x, y } = getSignaturePoint(event);
    currentPath.current = `M ${x.toFixed(1)} ${y.toFixed(1)}`;
    setActivePath(currentPath.current);
    setSignatureStarted(true);
  };

  const drawSignature = (event: PointerEvent<SVGSVGElement>) => {
    if (pointerId.current !== event.pointerId) return;
    const { x, y } = getSignaturePoint(event);
    currentPath.current += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
    setActivePath(currentPath.current);
  };

  const finishSignature = (event: PointerEvent<SVGSVGElement>) => {
    if (pointerId.current !== event.pointerId) return;
    const { x, y } = getSignaturePoint(event);
    currentPath.current += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
    setSignaturePaths((paths) => [...paths, currentPath.current]);
    setActivePath("");
    currentPath.current = "";
    pointerId.current = null;
    signatureEndTimer.current = window.setTimeout(() => {
      signatureEndTimer.current = null;
      setSubmitting(true);
    }, reducedMotion ? 180 : 650);
  };

  const clearSignature = () => {
    if (signatureEndTimer.current !== null) {
      window.clearTimeout(signatureEndTimer.current);
      signatureEndTimer.current = null;
    }
    setSignaturePaths([]);
    setActivePath("");
    setSignatureStarted(false);
    currentPath.current = "";
    pointerId.current = null;
  };

  return (
    <article className="screen-page dividend-page">
      <header className="screen-heading">
        <p className="eyebrow">A VERY OFFICIAL LOVE NOTE</p>
        <h1>Your dividend has arrived.</h1>
      </header>

      <section className={`dividend-document ${approved ? "dividend-document--approved" : ""}`} aria-label="Mom & Co. dividend certificate">
        <div className="dividend-certificate">
          <header className="dividend-certificate__header">
            <div className="dividend-certificate__brand">
              <span className="dividend-certificate__seal" aria-hidden="true">M&amp;C</span>
              <span>MOM &amp; CO.</span>
            </div>
            <StatusBadge className="dividend-document__ticket-label">AUDITED WITH LOVE</StatusBadge>
            <h2>DIVIDEND CERTIFICATE</h2>
            <p className="dividend-certificate__lead">This certifies that</p>
            <p className="dividend-certificate__recipient">MOM</p>
            <p className="dividend-certificate__entitlement">is entitled to receive</p>
            <p className="dividend-certificate__distribution">ONE SPECIAL DIVIDEND</p>
          </header>

          <div className="dividend-certificate__amount" aria-label="Amount: infinity love">
            <span className="dividend-certificate__amount-label">AMOUNT</span>
            <strong>∞</strong>
            <span className="dividend-certificate__currency">LOVE</span>
          </div>

          <p className="dividend-certificate__copy">The Board has approved a special distribution.</p>
          <p className="dividend-certificate__detail">
            After careful review of the year&apos;s accounts, one very important stakeholder has been deemed eligible.
          </p>

          <dl className="dividend-certificate__terms">
            <div><dt>Tax status</dt><dd>Non-taxable</dd></div>
            <div><dt>Transferability</dt><dd>Non-transferable</dd></div>
            <div><dt>Expiry</dt><dd>Never</dd></div>
          </dl>

          <footer className="dividend-certificate__footer">
            <p>Issued with love, FY 2025–26</p>
            <p>Authorized by:<br /><strong>Chief Audit Daughter</strong></p>
          </footer>

          {approved && (
            <>
              <div className="dividend-approval-stamp" role="img" aria-label="Approved by Mom & Co., FY 2025–26">
                <span>AUDITED WITH LOVE</span>
                <strong>APPROVED</strong>
                <span>MOM &amp; CO.</span>
                <span>FY 2025–26</span>
              </div>
              <div className="dividend-certificate__credited" role="status" aria-live="polite">
                <strong>APPROVED</strong>
                <span>Dividend successfully credited.</span>
                <b>DIVIDEND: ∞ LOVE</b>
              </div>
            </>
          )}

          {submitting && !approved && (
            <p className="dividend-certificate__submitting" role="status" aria-live="polite">
              Submitting for approval...
            </p>
          )}
        </div>

        <section className="dividend-signing" aria-labelledby="dividend-signing-title">
          <div className="dividend-signing__copy">
            <h2 id="dividend-signing-title">One tiny signature, please.</h2>
            <p>The Board has one final formality before releasing your dividend.</p>
          </div>
          <div className="dividend-signature" role="group" aria-labelledby="dividend-signature-label">
            <p id="dividend-signature-label">AUTHORIZED RECIPIENT</p>
            <div className="dividend-signature__paper">
              {!signatureStarted && <span className="dividend-signature__hint" aria-hidden="true">Sign here</span>}
              <svg
                className="dividend-signature__pad"
                viewBox={`0 0 ${SIGNATURE_WIDTH} ${SIGNATURE_HEIGHT}`}
                role="img"
                aria-label="Draw your signature here using a mouse, touch, or stylus"
                onPointerDown={startSignature}
                onPointerMove={drawSignature}
                onPointerUp={finishSignature}
                onPointerCancel={finishSignature}
              >
                {signaturePaths.map((path, index) => (
                  <path key={index} d={path} className="dividend-signature__stroke" />
                ))}
                {activePath && <path d={activePath} className="dividend-signature__stroke" />}
              </svg>
              <span className="dividend-signature__rule" aria-hidden="true" />
            </div>
            <div className="dividend-signature__actions">
              <p>Non-taxable. Non-transferable. Valid forever.</p>
              <button type="button" onClick={clearSignature} disabled={!signatureStarted || submitting || approved}>Clear</button>
            </div>
          </div>
        </section>
      </section>

      <div className="screen-continue">
        <Button variant="primary" onClick={() => navigate("/06")} disabled={!approved}>Continue</Button>
      </div>
    </article>
  );
}
