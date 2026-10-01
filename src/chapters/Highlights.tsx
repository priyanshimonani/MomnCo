import { CheckCheck, CircleHelp, Gauge as GaugeIcon, Utensils } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "../components/ui/primitives";
import { highlights } from "../data/highlights";

const icons = {
  meals: Utensils,
  problems: CheckCheck,
  inquiries: CircleHelp,
  patience: GaugeIcon,
};

export default function Highlights() {
  const navigate = useNavigate();
  return (
    <article className="screen-page highlights-screen">
      <header className="screen-heading">
        <p className="eyebrow">A tiny list of big things</p>
        <h1>My favorite highlights</h1>
      </header>
      <section className="metrics-grid metrics-grid--visual" aria-label="Four annual operating metrics">
        {highlights.map((metric) => {
          const Icon = icons[metric.id];
          return (
            <article
              className={`metric metric--${metric.tone}`}
              key={metric.id}
              aria-labelledby={`metric-label-${metric.id}`}
            >
              <div className="metric__topline">
                <span className="metric__icon"><Icon size={19} strokeWidth={1.8} aria-hidden="true" /></span>
                <span className="eyebrow" id={`metric-label-${metric.id}`}>{metric.label}</span>
              </div>
              <strong className="metric__value mono tabular-nums">
                <span >{metric.value}</span>
              </strong>
              <svg className="metric__sparkline" viewBox="0 0 90 32" role="img" aria-label={`${metric.label} trend ${metric.id === "patience" ? "declines" : "rises"} over the reporting period`}>
                <path d="M0 31H90" className="metric__sparkline-track" />
                <polyline points={metric.points} className="metric__sparkline-line" />
              </svg>
              
              
            </article>
          );
        })}
      </section>
      
      <div className="screen-continue">
        <Button variant="primary" onClick={() => navigate("/03")}>Continue</Button>
      </div>
    </article>
  );
}
