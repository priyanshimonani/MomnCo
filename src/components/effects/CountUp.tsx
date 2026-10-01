import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export function CountUp({
  value,
  decimals = 0,
  suffix = "",
}: {
  value: number;
  decimals?: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);
  const [count, setCount] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || started) return;
    if (reducedMotion || !("IntersectionObserver" in window)) {
      setCount(value);
      setStarted(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setStarted(true);
      observer.disconnect();
    }, { threshold: 0.3 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [reducedMotion, started, value]);

  useEffect(() => {
    if (!started) return;
    if (reducedMotion) {
      setCount(value);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min(1, (now - start) / 900);
      const eased = 1 - (1 - progress) ** 3;
      setCount(value * eased);
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [reducedMotion, started, value]);

  return (
    <span ref={ref} aria-label={`${value.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`}>
      {count.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}
    </span>
  );
}
