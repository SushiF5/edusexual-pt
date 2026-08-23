"use client";

import { useI18n } from "@/i18n/context";

export default function NotFound() {
  const { t } = useI18n();
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">🔍</div>
        <h1 className="text-3xl font-heading font-bold text-primary mb-4">{t.notFoundTitle}</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          {t.notFoundDesc}
        </p>
        <a href="/" className="btn-primary inline-block">
          {t.notFoundBack}
        </a>
      </div>
    </div>
  );
}
