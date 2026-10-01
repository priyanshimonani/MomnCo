import { useEffect, useId, useRef } from "react";
import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useInViewOnce } from "../../hooks/useInViewOnce";
import { useReducedMotion } from "../../hooks/useReducedMotion";

type StatusBadgeProps = {
  children: ReactNode;
  tone?: "blue" | "yellow" | "mint" | "pink";
  className?: string;
};

export function StatusBadge({ children, tone = "yellow", className = "" }: StatusBadgeProps) {
  return <span className={`status-pill status-pill--${tone} ${className}`}>{children}</span>;
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "tertiary";
};

export function Button({ variant = "secondary", className = "", ...props }: ButtonProps) {
  return <button className={`button button--${variant} ${className}`} {...props} />;
}

export function Tooltip({ children, label }: { children: ReactNode; label: string }) {
  const id = useId();
  return (
    <span className="tooltip-wrap" aria-describedby={id}>
      {children}
      <span className="tooltip" id={id} role="tooltip">{label}</span>
    </span>
  );
}

export function Sheet({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const panelRef = useRef<HTMLElement>(null);
  const titleId = useId();
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel?.querySelector<HTMLElement>("button, a, input, select, [tabindex='0']")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab" || !panel) return;
      const focusable = [...panel.querySelectorAll<HTMLElement>(
        "button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])",
      )];
      if (!focusable.length) {
        event.preventDefault();
        panel.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [open]);

  if (!open) return null;
  return createPortal(
    <div className="sheet-backdrop" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section className="sheet" ref={panelRef} role="dialog" aria-modal="true" aria-labelledby={titleId} tabIndex={-1}>
        <header className="sheet__header">
          <h2 id={titleId}>{title}</h2>
          <Button variant="tertiary" onClick={onClose} aria-label="Close panel"><X size={18} /></Button>
        </header>
        {children}
      </section>
    </div>,
    document.body,
  );
}

export function Gauge({
  label,
  value,
  max = 100,
  draining = false,
}: {
  label: string;
  value: number;
  max?: number;
  draining?: boolean;
}) {
  const percentage = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;
  const trackRef = useRef<HTMLDivElement>(null);
  const visible = useInViewOnce(trackRef);
  const reducedMotion = useReducedMotion();
  const style = {
    transform: `scaleX(${percentage / 100})`,
    "--gauge-scale": percentage / 100,
  } as CSSProperties;
  return (
    <div className={`gauge ${visible ? "gauge--visible" : ""} ${draining ? "gauge--draining" : ""}`}>
      <div className="gauge__label"><span>{label}</span><span className="mono">{Math.round(percentage)}%</span></div>
      <div ref={trackRef} className={`gauge__track ${reducedMotion ? "gauge__track--reduced" : ""}`} role="meter" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(percentage)}>
        <span style={style} />
      </div>
    </div>
  );
}

export function Skeleton({ className = "" }: { className?: string }) {
  return <span className={`skeleton ${className}`} aria-hidden="true" />;
}
