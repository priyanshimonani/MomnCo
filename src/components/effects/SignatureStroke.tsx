import { useId } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export function SignatureStroke({
  label,
  title = "Digital signature",
  color = "var(--treasury)",
  delay = 0,
  drawOnDemand = false,
  active = false,
}: {
  label: string;
  title?: string;
  color?: string;
  delay?: number;
  drawOnDemand?: boolean;
  active?: boolean;
}) {
  const titleId = useId();
  const reducedMotion = useReducedMotion();
  return (
    <figure className="signature">
      <svg viewBox="0 0 280 78" role="img" aria-labelledby={titleId}>
        <title id={titleId}>{title}</title>
        <motion.path
          d="M12 55c13-24 19-29 20-18 1 6-10 26-7 28 4 3 17-22 21-23 5-2-2 19 2 21 5 2 15-20 21-21 5-1 0 15 3 19 5 6 21-20 31-28 6-5 0 15 3 19 4 5 13-12 21-17 6-4 2 10 7 12 5 2 13-12 20-14 6-2 3 8 7 11 5 4 18-7 29-9 14-3 26 0 38 5"
          fill="none"
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={drawOnDemand ? { scaleX: 0, opacity: 1 } : reducedMotion ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0.7 }}
          animate={drawOnDemand ? { scaleX: active ? 1 : 0, opacity: 1 } : undefined}
          whileInView={!drawOnDemand ? { scaleX: 1, opacity: 1 } : undefined}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: reducedMotion ? 0.01 : drawOnDemand ? 1.9 : 1.15, delay: reducedMotion ? 0 : delay, ease: "easeInOut" }}
          style={{ transformOrigin: "left center", transformBox: "fill-box" }}
        />
      </svg>
      <figcaption>{label}</figcaption>
    </figure>
  );
}
