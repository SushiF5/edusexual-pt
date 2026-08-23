"use client";

import { useRef, useState, useEffect, ReactNode } from "react";
import { useI18n } from "@/i18n/context";

interface LazySectionProps {
  children: ReactNode;
  title?: string;
}

export const LazySection: React.FC<LazySectionProps> = ({
  children,
  title = "",
}) => {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) return;
    if (typeof IntersectionObserver === "undefined") {
      setLoaded(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [loaded]);

  if (!loaded) {
    return (
      <div
        ref={ref}
        className="animate-pulse bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 space-y-3"
        role="status"
        aria-label={title ? `${t.loadingTopic}: ${title}` : t.loadingTopic}
        aria-live="polite"
      >
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
      </div>
    );
  }

  return <>{children}</>;
};
