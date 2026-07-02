"use client";

import { useState } from "react";
import { guides } from "@/data/content";
import { useI18n } from "@/i18n/context";
import { Audience } from "@/types";

interface ResourcesTabProps {
  audience: Audience;
}

export default function ResourcesTab({ audience }: ResourcesTabProps) {
  const { t } = useI18n();
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
      <div className="text-center">
        <div className="bg-accent/20 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-3xl md:text-4xl mx-auto mb-4 md:mb-6">📋</div>
        <h3 className="text-2xl md:text-4xl font-heading font-bold text-primary mb-3">{t.resourcesTitle}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base max-w-2xl mx-auto">{t.resourcesSubtitle}</p>
      </div>

      {selectedGuide ? (
        <div className="space-y-6 print-area">
          {(() => {
            const guide = guides.find((g) => g.id === selectedGuide);
            if (!guide) return null;
            return (
              <>
                <div className="card print-card">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-primary/10 dark:bg-primary/20 w-14 h-14 rounded-2xl flex items-center justify-center text-3xl">{guide.icon}</div>
                    <div>
                      <h4 className="text-xl md:text-2xl font-heading font-bold text-primary">{guide.title}</h4>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">{guide.description}</p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    {guide.sections.map((section, i) => (
                      <div key={i}>
                        <h5 className="text-lg font-heading font-semibold text-primary mb-3">{section.heading}</h5>
                        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed text-sm md:text-base">{section.body}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 text-center text-xs text-gray-400">
                    EduSexual PT — {guide.title} — edusexual-pt.vercel.app
                  </div>
                </div>
                <div className="flex gap-3 justify-center no-print">
                  <button onClick={handlePrint} className="btn-primary">{t.saveAsPdf}</button>
                  <a
                    href={`/api/pdf?id=${guide.id}`}
                    download={`${guide.id}.html`}
                    className="btn-secondary"
                  >
                    {t.download || "Download HTML"}
                  </a>
                  <button onClick={() => setSelectedGuide(null)} className="btn-secondary">{t.viewAllGuides}</button>
                </div>
              </>
            );
          })()}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
          {guides
            .filter((g) => g.audience === audience || g.audience === "todos")
            .map((guide) => (
              <button
                key={guide.id}
                onClick={() => setSelectedGuide(guide.id)}
                className="card group hover:border-primary text-left"
              >
                <div className="bg-primary/5 dark:bg-primary/20 w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  {guide.icon}
                </div>
                <h4 className="text-lg font-heading font-bold text-primary mb-2">{guide.title}</h4>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{guide.description}</p>
                <span className="text-secondary font-semibold text-sm">{t.openGuide}</span>
              </button>
            ))}
          {guides.filter((g) => g.audience === audience || g.audience === "todos").length === 0 && (
            <div className="sm:col-span-2 text-center py-12 text-gray-400">
              <p>{t.noGuides}</p>
            </div>
          )}
        </div>
      )}

      <div className="card bg-accent/10 border-accent text-center no-print">
        <h4 className="font-heading font-semibold text-primary mb-2">{t.howToPdfTitle}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">{t.howToPdfDesc}</p>
      </div>
    </div>
  );
}
