import { useEffect, useState } from "react";
import type { RefObject } from "react";

export function useInViewOnce<T extends Element>(ref: RefObject<T | null>): boolean {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || visible) return;
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setVisible(true);
      observer.disconnect();
    }, { threshold: 0.25 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, visible]);

  return visible;
}
