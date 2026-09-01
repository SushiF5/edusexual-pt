"use client";

import { Episode } from "@/types";
import { useI18n } from "@/i18n";

interface AudioTranscriptModalProps {
  episode: Episode | null;
  onClose: () => void;
}

export default function AudioTranscriptModal({
  episode,
  onClose,
}: AudioTranscriptModalProps) {
  const { t } = useI18n();

  if (!episode) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border border-gray-100 dark:border-gray-700 space-y-6 my-8 max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 border-b border-gray-100 dark:border-gray-700 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-primary/10 text-primary dark:bg-primary/30 dark:text-primary-light">
              {t.transcriptTitle}
            </span>
            <h3 className="text-xl md:text-2xl font-heading font-bold text-gray-900 dark:text-white mt-1.5">
              {episode.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-lg"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto flex-1 space-y-4 pr-1 text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          {episode.description ? (
            <div className="bg-gray-50 dark:bg-gray-700/30 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 whitespace-pre-line">
              {episode.description}
            </div>
          ) : (
            <p className="text-gray-400 italic">Transcrição textual em processamento.</p>
          )}

          <div className="bg-primary/5 dark:bg-primary/10 p-4 rounded-2xl border border-primary/10 text-xs text-gray-600 dark:text-gray-400">
            <span className="font-bold block mb-1">Acessibilidade Universal:</span>
            Este conteúdo de áudio foi concebido para ser totalmente inclusivo e acessível para pessoas com deficiência auditiva ou que prefiram a leitura textual.
          </div>
        </div>

        <div className="pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-end">
          <button
            onClick={onClose}
            className="btn-primary text-xs py-2.5 px-6"
          >
            {t.closeTranscript}
          </button>
        </div>
      </div>
    </div>
  );
}
