import { useEffect, useState } from "react";

/**
 * Mobile breakpoint in pixels (exclusive upper bound).
 */
const MOBILE_BREAKPOINT = 768;

/**
 * Custom React hook to determine if the viewport is mobile-sized.
 * Uses window.matchMedia for responsive detection.
 * @returns {boolean} True if the viewport is mobile-sized, false otherwise.
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}
