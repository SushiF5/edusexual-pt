"use client";

import { useEffect, useRef, useCallback } from "react";

const FOCUSABLE = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function useFocusTrap(active: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  const trap = useCallback((e: KeyboardEvent) => {
    if (e.key !== "Tab" || !containerRef.current) return;

    const focusable = containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE);
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }, []);

  useEffect(() => {
    if (!active) return;

    previousFocus.current = document.activeElement as HTMLElement;

    // Focus the first focusable element inside the container
    requestAnimationFrame(() => {
      if (containerRef.current) {
        const first = containerRef.current.querySelector<HTMLElement>(FOCUSABLE);
        first?.focus();
      }
    });

    document.addEventListener("keydown", trap);
    return () => {
      document.removeEventListener("keydown", trap);
      // Restore focus when trap is deactivated
      previousFocus.current?.focus();
    };
  }, [active, trap]);

  return containerRef;
}
