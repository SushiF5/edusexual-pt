"use client";

import { BookmarkItem, TabId } from "@/types";
import { useI18n } from "@/i18n";

interface BookmarksModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarks: BookmarkItem[];
  onRemoveBookmark: (id: string) => void;
  onNavigateTab: (tab: TabId) => void;
}

export default function BookmarksModal({
  isOpen,
  onClose,
  bookmarks,
  onRemoveBookmark,
  onNavigateTab,
}: BookmarksModalProps) {
  const { t } = useI18n();

  if (!isOpen) return null;

  const handleOpenItem = (item: BookmarkItem) => {
    onNavigateTab(item.tabTarget || "home");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl border border-gray-100 dark:border-gray-700 space-y-6 my-8 max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⭐</span>
            <h3 className="text-xl md:text-2xl font-heading font-bold text-gray-900 dark:text-white">
              {t.myBookmarks} ({bookmarks.length})
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-lg"
          >
            ✕
          </button>
        </div>

        {/* Bookmarks List */}
        <div className="overflow-y-auto flex-1 space-y-3 pr-1">
          {bookmarks.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="text-4xl">📭</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t.noBookmarks}
              </p>
              <p className="text-xs text-gray-400">
                Clica no ícone de estrela (☆) em qualquer artigo, ferramenta, termo ou guia para guardar aqui.
              </p>
            </div>
          ) : (
            bookmarks.map((item) => (
              <div
                key={item.id}
                className="bg-gray-50 dark:bg-gray-700/40 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 flex items-center justify-between gap-3 hover:border-primary/40 transition group"
              >
                <div
                  onClick={() => handleOpenItem(item)}
                  className="flex-1 cursor-pointer"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary dark:text-primary-light block">
                    {item.category || item.type}
                  </span>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-primary transition line-clamp-2">
                    {item.title}
                  </h4>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenItem(item)}
                    className="p-2 text-xs font-semibold text-primary dark:text-primary-light hover:bg-white dark:hover:bg-gray-600 rounded-xl transition"
                    title="Abrir"
                  >
                    Ver →
                  </button>
                  <button
                    onClick={() => onRemoveBookmark(item.id)}
                    className="p-2 text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition text-sm"
                    title={t.removeBookmark}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-end">
          <button
            onClick={onClose}
            className="btn-primary text-xs py-2.5 px-6"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
