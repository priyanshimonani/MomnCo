import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BarRows } from "../components/charts/BarRows";
import { Waterfall } from "../components/charts/Waterfall";
import { Button, StatusBadge, Tooltip } from "../components/ui/primitives";
import { personalize } from "../data/config";
import {
  balanceAssets,
  balanceLiabilities,
  cashFlowLines,
  hugsPerRupee,
  operatingLines,
} from "../data/statements";
import { useReducedMotion } from "../hooks/useReducedMotion";

const tabs = ["Balance Sheet", "P&L", "Cash Flow"] as const;
type StatementTab = (typeof tabs)[number];

function formatAmount(amount: number, hugs: boolean) {
  const displayValue = hugs ? amount * hugsPerRupee : amount;
  const negative = displayValue < 0;
  const formatted = Math.abs(displayValue).toLocaleString("en-IN");
  return `${negative ? "(" : ""}${hugs ? "" : "₹ "}${formatted}${negative ? ")" : ""}`;
}

function BalanceSheet({ hugs }: { hugs: boolean }) {
  const [netWorth, setNetWorth] = useState("Calculating…");
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setNetWorth("Cannot be quantified (I tried).");
      return;
    }
    const unit = hugs ? "HUG " : "₹ ";
    const stages = [`${unit}12,480,000`, `${unit}12,48,0—`, `${unit}∞`, "Cannot be quantified (I tried)."];
    const timers = stages.map((stage, index) => window.setTimeout(() => setNetWorth(stage), 830 * (index + 1)));
    return () => timers.forEach(window.clearTimeout);
  }, [reducedMotion]);

  const renderLedger = (title: string, lines: typeof balanceAssets, type: "asset" | "liability") => (
    <section className="ledger-column" aria-labelledby={`ledger-${type}`}>
    <h3 id={`ledger-${type}`}>{title === "Assets" ? "My favorite assets" : "Things I owe you"}</h3>
      <div className="ledger-rows">
        {lines.map((line) => (
          <details className="ledger-row" key={line.code}>
            <summary>
              <span className="mono ledger-row__code">{line.code}</span>
              <span className="ledger-row__description">{personalize(line.description)}</span>
              <span className="mono tabular-nums">{formatAmount(line.amount, hugs)}</span>
            </summary>
            <p>{personalize(line.note)}</p>
          </details>
        ))}
      </div>
      <p className="ledger-total">
        <strong>Total {type === "asset" ? "assets" : "liabilities"}</strong>
        <span className="mono tabular-nums">
          {formatAmount(lines.reduce((total, line) => total + line.amount, 0), hugs)}
        </span>
      </p>
    </section>
  );

  return (
    <div className="balance-sheet">
      <div className="balance-sheet__columns">
        {renderLedger("Assets", balanceAssets, "asset")}
        {renderLedger("Liabilities", balanceLiabilities, "liability")}
      </div>
      <div className="net-worth">
        <span className="eyebrow">Net worth</span>
        <motion.strong
          key={netWorth}
          className="mono"
          initial={reducedMotion ? false : { opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.24 }}
          aria-live="polite"
        >
          {netWorth}
        </motion.strong>
      </div>
    </div>
  );
}

export default function Statements() {
  const [activeTab, setActiveTab] = useState<StatementTab>(tabs[0]);
  const [hugs, setHugs] = useState(false);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const navigate = useNavigate();
  const currencyLabel = hugs ? "HUG " : "₹ ";

  const moveTabFocus = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else return;
    event.preventDefault();
    setActiveTab(tabs[next]);
    tabRefs.current[next]?.focus();
  };

  const continueReport = () => {
    navigate("/04");
  };

  return (
    <article className="screen-page statements-page">
      <header className="screen-heading screen-heading--compact">
        <p className="eyebrow">
          {activeTab === "Cash Flow" ? "Suspicious Liquidity Statement" : "A little accounting joke"}
        </p>
        <h1>Our balance sheet</h1>
      </header>
      <div className="statement-toolbar">
        <div className="statement-tabs" role="tablist" aria-label="Financial statement">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              ref={(element) => { tabRefs.current[index] = element; }}
              id={`statement-tab-${index}`}
              type="button"
              role="tab"
              tabIndex={activeTab === tab ? 0 : -1}
              aria-selected={activeTab === tab}
              aria-controls={`statement-panel-${index}`}
              onClick={() => setActiveTab(tab)}
              onKeyDown={(event) => moveTabFocus(event, index)}
            >
              {tab}
            </button>
          ))}
        </div>
        <button type="button" className="unit-toggle" role="switch" aria-checked={hugs} onClick={() => setHugs((value) => !value)}>
          <span>₹</span><span className="unit-toggle__track"><span /></span><span>Hugs</span>
        </button>
      </div>
      <section
        className="statement-panel"
        id={`statement-panel-${tabs.indexOf(activeTab)}`}
        role="tabpanel"
        aria-labelledby={`statement-tab-${tabs.indexOf(activeTab)}`}
        tabIndex={0}
      >
        <div className="statement-panel__heading">
          <div>
            <StatusBadge>Audited with love</StatusBadge>
            <h2>{activeTab === "Cash Flow" ? "Where Did All The Money Go?" : activeTab}</h2>
          </div>
          <Tooltip label={hugs ? "One rupee, ten hugs. Very scientific." : "Switch to hugs. I did the math."}>
            <span className="statement-unit-label mono">{currencyLabel}· units</span>
          </Tooltip>
        </div>
        {activeTab === "Balance Sheet" && <BalanceSheet hugs={hugs} />}
        {activeTab === "P&L" && (
          <div className="pnl-panel" aria-label="Profit and loss statement">
            <BarRows rows={operatingLines} currencyLabel={currencyLabel} multiplier={hugs ? hugsPerRupee : 1} />
          </div>
        )}
        {activeTab === "Cash Flow" && (
          <Waterfall
            rows={cashFlowLines}
            currencyLabel={currencyLabel}
            unitLabel="₹ · Unaudited Financial Behavior"
            multiplier={hugs ? hugsPerRupee : 1}
          />
        )}
      </section>
      <div className="screen-continue">
        <Button variant="primary" onClick={continueReport}>Continue</Button>
      </div>
    </article>
  );
}
