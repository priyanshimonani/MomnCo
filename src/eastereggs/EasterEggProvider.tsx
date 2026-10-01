import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type EasterEggContextValue = {
  notify: (message: string) => void;
  recordLogoClick: () => void;
};

const EasterEggContext = createContext<EasterEggContextValue | null>(null);

export function useEasterEggs(): EasterEggContextValue {
  const context = useContext(EasterEggContext);
  if (!context) throw new Error("useEasterEggs must be used within EasterEggProvider");
  return context;
}

export function EasterEggProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [toast, setToast] = useState("");
  const clickCount = useRef(0);
  const clickTimer = useRef<number | null>(null);
  const toastTimer = useRef<number | null>(null);

  const notify = useCallback((message: string) => {
    setToast(message);
    if (toastTimer.current !== null) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => {
      setToast("");
      toastTimer.current = null;
    }, 3000);
  }, []);

  const recordLogoClick = useCallback(() => {
    clickCount.current += 1;
    if (clickTimer.current !== null) window.clearTimeout(clickTimer.current);
    if (clickCount.current >= 7) {
      clickCount.current = 0;
      navigate("/01");
      return;
    }
    clickTimer.current = window.setTimeout(() => {
      clickCount.current = 0;
      clickTimer.current = null;
    }, 1800);
  }, [navigate]);

  useEffect(() => () => {
    if (clickTimer.current !== null) window.clearTimeout(clickTimer.current);
    if (toastTimer.current !== null) window.clearTimeout(toastTimer.current);
  }, []);

  const value = useMemo(() => ({ notify, recordLogoClick }), [notify, recordLogoClick]);
  return (
    <EasterEggContext.Provider value={value}>
      {children}
      <div className="egg-toast" role="status" aria-live="polite" aria-atomic="true">{toast}</div>
    </EasterEggContext.Provider>
  );
}
