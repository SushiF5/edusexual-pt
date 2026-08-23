"use client";

import { useI18n } from "@/i18n/context";

export default function TabSkeleton() {
  const { t } = useI18n();
  return (
    <div className="animate-pulse space-y-6 p-6" role="status" aria-label={t.loadingContent || "A carregar conteúdo"} aria-live="polite">
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mx-auto"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mx-auto"></div>
      <div className="space-y-3 mt-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 bg-gray-100 dark:bg-gray-800 rounded-2xl"></div>
        ))}
      </div>
    </div>
  );
}
