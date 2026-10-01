import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const finaleStep = 20;
const reducedMotionStep = 21;
const reveals = [
  [500, 1],
  [2300, 2],
  [5200, 3],
  [6500, 4],
  [7700, 5],
  [10800, 6],
  [13200, 7],
  [15100, 8],
  [16800, 9],
  [18600, 10],
  [21500, 11],
  [23200, 12],
  [24900, 13],
  [27300, 14],
  [31300, 15],
  [33300, 16],
  [35000, 17],
  [36800, 18],
  [38700, 19],
  [40500, finaleStep],
] as const;

const reportWords = [
  "ASSETS", "LIABILITIES", "REVENUE", "EXPENSES", "NET WORTH",
  "DIVIDEND", "AUDIT", "BALANCE", "RETURNS",
];

const memoryWords = [
  "MOVIES", "CHAI", "LAUGHTER", "HOME", "ADVICE", "FAMILY",
  "FOOD", "LATE NIGHTS", "WALKS", "MEMORIES", "PATIENT",
  "STRONG", "KIND", "SAFE", "LOVE", "MOM",
];

export default function ThankYou() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setStep(0);
    const timers = reducedMotion
      ? [window.setTimeout(() => setStep(reducedMotionStep), 100)]
      : reveals.map(([delay, nextStep]) => window.setTimeout(() => setStep(nextStep), delay));
    return () => timers.forEach(window.clearTimeout);
  }, []);

  const visible = (from: number, through = Number.POSITIVE_INFINITY) => step >= from && step <= through;
  const active = (condition: boolean) => condition ? "thank-you-finale__scene--active" : "";

  return (
    <article className={`screen-page thank-you-page ${step >= reducedMotionStep ? "thank-you-page--reduced-final" : ""}`} aria-label="Final birthday reveal">
      <div className="thank-you-finale">
        <div className={`thank-you-finale__scene thank-you-finale__opening ${active(step === 1)}`} aria-hidden={step !== 1}>
          <p>FINAL STATEMENT</p>
          <span>FY 2025–26</span>
        </div>

        <div className={`thank-you-finale__scene thank-you-finale__missing ${active(step === 2)}`} aria-hidden={step !== 2}>
          {"ONE ITEM WAS LEFT OFF THE BOOKS".split(" ").map((word, index) => (
            <span className="thank-you-finale__kinetic-word" style={{ "--word-index": index } as React.CSSProperties} key={`${word}-${index}`}>{word}</span>
          ))}
        </div>

        <div className={`thank-you-finale__scene thank-you-finale__valuation ${active(visible(3, 5))}`} aria-hidden={!visible(3, 5)}>
          <p className={`thank-you-finale__valuation-label ${visible(3) ? "is-visible" : ""}`}>FINAL VALUATION</p>
          <strong className={`thank-you-finale__priceless ${visible(4) ? "is-visible" : ""}`}>PRICELESS</strong>
          <span className={`thank-you-finale__rule ${visible(5) ? "is-visible" : ""}`} />
          <p className={`thank-you-finale__valuation-note ${visible(5) ? "is-visible" : ""}`}>
            Some things simply don&apos;t belong on a balance sheet.
          </p>
        </div>

        <div className={`thank-you-finale__scene thank-you-finale__accounts ${active(visible(6, 8))}`} aria-hidden={!visible(6, 8)}>
          <div className={`thank-you-finale__account-words ${step >= 7 ? "thank-you-finale__account-words--dissolving" : ""}`}>
            {reportWords.map((word, index) => (
              <span className={`thank-you-finale__account-word thank-you-finale__account-word--${index + 1}`} key={word}>{word}</span>
            ))}
          </div>
          <strong className={`thank-you-finale__value ${visible(7) ? "is-visible" : ""}`}>VALUE</strong>
          <p className={`thank-you-finale__impossible ${visible(8) ? "is-visible" : ""}`}>Impossible to calculate.</p>
        </div>

        <div className={`thank-you-finale__scene thank-you-finale__truth ${active(visible(9, 10))}`} aria-hidden={!visible(9, 10)}>
          <p className={`thank-you-finale__truth-intro ${visible(9) ? "is-visible" : ""}`}>
            One thing the books could never capture:
          </p>
          <h1 className={`thank-you-finale__truth-line ${visible(10) ? "is-visible" : ""}`}>
            {["HOW", "MUCH", "YOU", "MEAN", "TO", "ME."].map((word, index) => (
              <span style={{ "--word-index": index } as React.CSSProperties} key={word}>{word}</span>
            ))}
          </h1>
        </div>

        <div className={`thank-you-finale__scene thank-you-finale__personal ${active(visible(11, 13))}`} aria-hidden={!visible(11, 13)}>
          <p className={`thank-you-finale__personal-line thank-you-finale__personal-line--one ${visible(11) ? "is-visible" : ""}`}>
            You make hard things feel possible.
          </p>
          <p className={`thank-you-finale__personal-line thank-you-finale__personal-line--two ${visible(12) ? "is-visible" : ""}`}>
            I hope you know how loved you are.
          </p>
          <p className={`thank-you-finale__personal-line thank-you-finale__personal-line--three ${visible(13) ? "is-visible" : ""}`}>
            Happy birthday to my favorite person.
          </p>
        </div>

        <div className={`thank-you-finale__scene thank-you-finale__memories ${active(visible(14, 15))}`} aria-hidden={!visible(14, 15)}>
          <div className={`thank-you-finale__memory-words ${step === 15 ? "thank-you-finale__memory-words--dissolving" : ""}`}>
            {memoryWords.filter((word) => word !== "MOM").map((word, index) => (
              <span className={`thank-you-finale__memory-word thank-you-finale__memory-word--${index + 1}`} key={`${word}-${index}`}>{word}</span>
            ))}
          </div>
          <strong className={`thank-you-finale__mom ${visible(15) ? "is-visible" : ""}`}>MOM</strong>
        </div>

        <div className={`thank-you-finale__scene thank-you-finale__ending ${active(visible(16, finaleStep))}`} aria-hidden={!visible(16, finaleStep)}>
          <h1 className={`thank-you-finale__thanks ${visible(16) ? "is-visible" : ""}`}>Thank you, Mom.</h1>
          <p className={`thank-you-finale__for ${visible(17) ? "is-visible" : ""}`}>
            For everything you do,<br />and everything you are.
          </p>
          <p className={`thank-you-finale__birthday ${visible(18) ? "is-visible" : ""}`}>Happy Birthday.</p>
          <footer className={`thank-you-finale__filed ${visible(19) ? "is-visible" : ""}`}>
            <span>Filed with love.</span>
            <span>MOM &amp; CO. • FY 2025–26</span>
          </footer>
        </div>

        {step >= reducedMotionStep && (
          <div className="thank-you-finale__scene thank-you-finale__reduced-ending thank-you-finale__scene--active" aria-label="One item was left off the books. Final valuation: priceless. Some things simply don't belong on a balance sheet. One thing the books could never capture: how much you mean to me. You make hard things feel possible. I hope you know how loved you are. Happy birthday to my favorite person. Thank you, Mom. For everything you do, and everything you are. Happy Birthday. Filed with love. Mom & Co. FY 2025–26.">
            <p>ONE ITEM WAS LEFT OFF THE BOOKS</p>
            <p>FINAL VALUATION</p>
            <h1>Thank you, Mom.</h1>
            <span className="thank-you-finale__reduced-price">PRICELESS</span>
            <span>Some things simply don&apos;t belong on a balance sheet.</span>
            <span>One thing the books could never capture:</span>
            <span className="thank-you-finale__reduced-truth">How much you mean to me.</span>
            <span>You make hard things feel possible.</span>
            <span>I hope you know how loved you are.</span>
            <span>Happy birthday to my favorite person.</span>
            <span>For everything you do,<br />and everything you are.</span>
            <span>Happy Birthday.</span>
            <footer><span>Filed with love.</span><span>MOM &amp; CO. • FY 2025–26</span></footer>
          </div>
        )}
      </div>

      <div className="screen-continue thank-you-page__controls">
        {visible(finaleStep) && (
          <button className="replay-link" type="button" onClick={() => navigate("/01")}>
            Reopen the books
          </button>
        )}
      </div>
    </article>
  );
}
