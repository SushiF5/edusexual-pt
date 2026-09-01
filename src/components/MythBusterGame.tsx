"use client";

import { useState } from "react";
import { mythsDatabase, MythItem } from "@/data/content-myths";
import { BookmarkItem } from "@/types";

interface MythBusterGameProps {
  onBookmark?: (item: BookmarkItem) => void;
  isBookmarked?: (id: string) => boolean;
}

export default function MythBusterGame({
  onBookmark,
  isBookmarked = () => false,
}: MythBusterGameProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<boolean | null>(null);
  const [score, setScore] = useState<number>(0);
  const [answeredCount, setAnsweredCount] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [history, setHistory] = useState<{ id: string; correct: boolean }[]>([]);

  const categories = [
    { id: "all", label: "Todos os Temas" },
    { id: "contracecao", label: "Contraceção" },
    { id: "ists", label: "ISTs" },
    { id: "gravidez", label: "Gravidez" },
    { id: "relacoes", label: "Consentimento" },
    { id: "prazer", label: "Corpo & Prazer" },
  ];

  const pool = mythsDatabase.filter(
    (item) => selectedCategory === "all" || item.category === selectedCategory
  );

  const currentMyth: MythItem | undefined = pool[currentIndex % pool.length];

  const handleAnswer = (choice: boolean) => {
    if (!currentMyth || userAnswer !== null) return;

    setUserAnswer(choice);
    const isCorrect = choice === currentMyth.isTrue;
    setAnsweredCount((prev) => prev + 1);

    if (isCorrect) {
      setScore((prev) => prev + 1);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);
    } else {
      setStreak(0);
    }

    setHistory((prev) => [...prev, { id: currentMyth.id, correct: isCorrect }]);
  };

  const handleNext = () => {
    setUserAnswer(null);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setUserAnswer(null);
    setScore(0);
    setAnsweredCount(0);
    setStreak(0);
    setHistory([]);
  };

  if (!currentMyth) {
    return (
      <div className="p-8 text-center bg-white dark:bg-gray-800 rounded-3xl">
        <p>Sem afirmações disponíveis nesta categoria.</p>
      </div>
    );
  }

  const isAnswerCorrect = userAnswer !== null && userAnswer === currentMyth.isTrue;
  const bookmarked = isBookmarked(currentMyth.id);

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Game Header */}
      <div className="bg-gradient-to-r from-amber-500/10 via-secondary/20 to-primary/10 dark:from-amber-500/20 dark:to-primary/20 p-6 md:p-8 rounded-3xl border border-secondary/30 text-center relative overflow-hidden">
        <span className="inline-block text-3xl mb-2">💡</span>
        <h3 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 dark:text-white mb-2">
          Jogo: Mito ou Verdade?
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base max-w-xl mx-auto">
          Testa os teus conhecimentos e desmistifica crenças populares sobre saúde sexual, corpo e contraceção.
        </p>

        {/* Stats Row */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-6 pt-4 border-t border-secondary/20 text-xs md:text-sm font-semibold">
          <div className="bg-white/80 dark:bg-gray-800/80 px-4 py-1.5 rounded-full shadow-sm text-primary dark:text-primary-light">
            Acertos: <span className="font-bold text-base">{score}</span> / {answeredCount}
          </div>
          <div className="bg-white/80 dark:bg-gray-800/80 px-4 py-1.5 rounded-full shadow-sm text-amber-600 dark:text-amber-400">
            🔥 Sequência Atual: <span className="font-bold text-base">{streak}</span>
          </div>
          {maxStreak > 1 && (
            <div className="bg-white/80 dark:bg-gray-800/80 px-4 py-1.5 rounded-full shadow-sm text-emerald-600 dark:text-emerald-400">
              🏆 Melhor Sequência: <span className="font-bold text-base">{maxStreak}</span>
            </div>
          )}
        </div>
      </div>

      {/* Category selector */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.id);
              setCurrentIndex(0);
              setUserAnswer(null);
            }}
            className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold transition ${
              selectedCategory === cat.id
                ? "bg-secondary text-gray-900 shadow-md font-bold"
                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-100 dark:border-gray-700"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main Flashcard */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-10 shadow-lg border border-gray-100 dark:border-gray-700 space-y-6 text-center relative transition-all">
        {/* Top Badges */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 bg-primary/10 text-primary dark:bg-primary/30 dark:text-primary-light rounded-full">
            {currentMyth.categoryLabel}
          </span>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 font-medium">
              Pergunta {(currentIndex % pool.length) + 1} de {pool.length}
            </span>

            {onBookmark && (
              <button
                onClick={() =>
                  onBookmark({
                    id: currentMyth.id,
                    type: "myth",
                    title: currentMyth.statement,
                    category: currentMyth.categoryLabel,
                    tabTarget: "ferramentas",
                    savedAt: Date.now(),
                  })
                }
                className={`p-1.5 rounded-full transition ${
                  bookmarked ? "text-amber-500 bg-amber-50" : "text-gray-400 hover:text-amber-500"
                }`}
                aria-label={bookmarked ? "Remover dos favoritos" : "Guardar nos favoritos"}
              >
                {bookmarked ? "★" : "☆"}
              </button>
            )}
          </div>
        </div>

        {/* Statement */}
        <div className="py-6 px-4">
          <blockquote className="text-xl md:text-2xl font-heading font-bold text-gray-900 dark:text-white leading-relaxed">
            &ldquo;{currentMyth.statement}&rdquo;
          </blockquote>
        </div>

        {/* Action Buttons (Before answering) */}
        {userAnswer === null ? (
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto pt-2">
            <button
              onClick={() => handleAnswer(false)}
              className="bg-red-50 hover:bg-red-100 text-red-700 dark:bg-red-950/40 dark:hover:bg-red-900/50 dark:text-red-300 font-bold py-4 px-6 rounded-2xl border-2 border-red-200 dark:border-red-800 transition-all hover:scale-105 active:scale-95 shadow-sm text-base md:text-lg flex items-center justify-center gap-2"
            >
              <span>❌</span>
              <span>MITO</span>
            </button>

            <button
              onClick={() => handleAnswer(true)}
              className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/50 dark:text-emerald-300 font-bold py-4 px-6 rounded-2xl border-2 border-emerald-200 dark:border-emerald-800 transition-all hover:scale-105 active:scale-95 shadow-sm text-base md:text-lg flex items-center justify-center gap-2"
            >
              <span>✅</span>
              <span>VERDADE</span>
            </button>
          </div>
        ) : (
          /* Feedback Box (After answering) */
          <div className="space-y-6 pt-2 animate-fadeIn">
            <div
              className={`p-6 rounded-2xl border ${
                isAnswerCorrect
                  ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-900 dark:text-emerald-100"
                  : "bg-red-50 dark:bg-red-950/40 border-red-300 text-red-900 dark:text-red-100"
              }`}
            >
              <div className="text-2xl mb-1">
                {isAnswerCorrect ? "🎉 Acertaste!" : "❌ Ups, não é bem assim!"}
              </div>
              <div className="font-bold text-base md:text-lg mb-2">
                Isto é {currentMyth.isTrue ? "uma VERDADE ✅" : "um MITO ❌"}!
              </div>
              <p className="text-sm md:text-base leading-relaxed mb-3">
                {currentMyth.explanation}
              </p>
              <div className="text-xs bg-white/70 dark:bg-gray-800/70 p-3 rounded-xl border border-black/5 dark:border-white/5 text-gray-700 dark:text-gray-300 text-left">
                <span className="font-bold block mb-1">📚 Explicação Científica:</span>
                {currentMyth.scientificContext}
              </div>
            </div>

            <button
              onClick={handleNext}
              className="btn-primary text-sm md:text-base py-3.5 px-10 shadow-lg"
            >
              Próxima Afirmação →
            </button>
          </div>
        )}
      </div>

      {answeredCount > 0 && (
        <div className="text-center">
          <button
            onClick={handleReset}
            className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 underline"
          >
            Reiniciar pontuação e histórico
          </button>
        </div>
      )}
    </div>
  );
}
