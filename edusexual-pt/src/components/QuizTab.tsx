"use client";

import { useState, useMemo, useEffect } from "react";
import { quizQuestions } from "@/data/content";
import { useI18n } from "@/i18n/context";

type Audience = "criancas" | "jovens" | "adultos";

interface QuizTabProps {
  audience: Audience;
}

const STORAGE_KEY = "edusexual-quiz";

function loadState(audience: Audience) {
  try {
    const saved = localStorage.getItem(`${STORAGE_KEY}-${audience}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (typeof parsed.currentQuestion === "number" && typeof parsed.score === "number") {
        return parsed;
      }
    }
  } catch {}
  return null;
}

function saveState(audience: Audience, state: { currentQuestion: number; score: number; showResult: boolean }) {
  try {
    localStorage.setItem(`${STORAGE_KEY}-${audience}`, JSON.stringify(state));
  } catch {}
}

function clearState(audience: Audience) {
  try {
    localStorage.removeItem(`${STORAGE_KEY}-${audience}`);
  } catch {}
}

export default function QuizTab({ audience }: QuizTabProps) {
  const { t } = useI18n();

  const filteredQuiz = useMemo(() =>
    quizQuestions.filter(q => q.audience === audience),
    [audience]
  );

  const [quizState, setQuizState] = useState(() => {
    const saved = loadState(audience);
    if (saved && saved.currentQuestion < filteredQuiz.length) {
      return {
        currentQuestion: saved.currentQuestion,
        score: saved.score,
        showResult: saved.showResult,
        selectedAnswer: null as number | null,
        showExplanation: false,
      };
    }
    return {
      currentQuestion: 0,
      score: 0,
      showResult: false,
      selectedAnswer: null as number | null,
      showExplanation: false,
    };
  });

  useEffect(() => {
    if (quizState.showResult || quizState.currentQuestion === 0) {
      clearState(audience);
    } else {
      saveState(audience, {
        currentQuestion: quizState.currentQuestion,
        score: quizState.score,
        showResult: quizState.showResult,
      });
    }
  }, [quizState.currentQuestion, quizState.score, quizState.showResult, audience]);

  const handleAnswer = (answerIndex: number) => {
    if (quizState.showExplanation) return;
    setQuizState(prev => ({ ...prev, selectedAnswer: answerIndex, showExplanation: true }));
    if (answerIndex === filteredQuiz[quizState.currentQuestion].correctAnswer) {
      setQuizState(prev => ({ ...prev, score: prev.score + 1 }));
    }
  };

  const nextQuestion = () => {
    if (quizState.currentQuestion < filteredQuiz.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
        selectedAnswer: null,
        showExplanation: false,
      }));
    } else {
      setQuizState(prev => ({ ...prev, showResult: true }));
      clearState(audience);
    }
  };

  const resetQuiz = () => {
    setQuizState({
      currentQuestion: 0,
      score: 0,
      showResult: false,
      selectedAnswer: null,
      showExplanation: false,
    });
    clearState(audience);
  };

  if (filteredQuiz.length === 0) {
    return (
      <div className="text-center py-12">
        <p>{t.noQuizQuestions}</p>
      </div>
    );
  }

  if (quizState.showResult) {
    return (
      <div className="card text-center">
        <div className="text-5xl mb-4">{quizState.score === filteredQuiz.length ? '🏆' : quizState.score >= filteredQuiz.length / 2 ? '👏' : '📚'}</div>
        <h3 className="text-2xl font-bold mb-2">{t.quizFinished}</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-2">
          {quizState.score === filteredQuiz.length ? t.quizPerfect :
          quizState.score >= filteredQuiz.length / 2 ? t.quizGood : t.quizTryAgain}
        </p>
        <p className="text-4xl font-bold text-primary mb-6">{quizState.score} / {filteredQuiz.length}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={resetQuiz} className="btn-primary">{t.tryAgain}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">{t.questionOf} {quizState.currentQuestion + 1} / {filteredQuiz.length}</span>
            <span className="text-primary font-semibold">{t.points}: {quizState.score}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2" role="progressbar" aria-valuenow={quizState.currentQuestion + 1} aria-valuemin={1} aria-valuemax={filteredQuiz.length}>
            <div
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${((quizState.currentQuestion + 1) / filteredQuiz.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <h3 className="text-lg md:text-xl font-heading font-semibold mb-6">{filteredQuiz[quizState.currentQuestion].question}</h3>
        <div className="space-y-3">
          {filteredQuiz[quizState.currentQuestion].options.map((option, index) => {
            let btnClass = "w-full text-left p-3 md:p-4 rounded-lg border-2 transition text-sm md:text-base ";
            let suffix = "";
            if (quizState.showExplanation) {
              if (index === filteredQuiz[quizState.currentQuestion].correctAnswer) {
                btnClass += "border-green-500 bg-green-50 dark:bg-green-900/30";
                suffix = " ✓";
              } else if (quizState.selectedAnswer === index) {
                btnClass += "border-red-500 bg-red-50 dark:bg-red-900/30";
                suffix = " ✗";
              }
            } else {
              btnClass += "border-gray-200 dark:border-gray-600 hover:border-primary";
            }
            return (
              <button key={index} onClick={() => handleAnswer(index)} disabled={quizState.showExplanation} className={btnClass}>
                <span className="flex items-center justify-between">
                  <span>{option}</span>
                  {suffix && <span className="font-bold" aria-live="assertive">{suffix}</span>}
                </span>
              </button>
            );
          })}
        </div>
        {quizState.showExplanation && (
          <div className="mt-6 p-4 bg-accent/20 dark:bg-accent/10 rounded-lg">
            <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm md:text-base">{filteredQuiz[quizState.currentQuestion].explanation}</p>
            <div className="flex gap-3">
              <button onClick={nextQuestion} className="btn-primary flex-grow">
                {quizState.currentQuestion < filteredQuiz.length - 1 ? t.next : t.seeResult}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
