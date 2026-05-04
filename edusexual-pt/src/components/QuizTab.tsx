"use client";

import { useState, useMemo } from "react";
import { quizQuestions, useI18n } from "@/i18n/context";
import { Locale } from "@/i18n/translations";

type Audience = "criancas" | "jovens" | "adultos";

interface QuizTabProps {
  audience: Audience;
}

export default function QuizTab({ audience }: QuizTabProps) {
  const { t } = useI18n();

  const [quizState, setQuizState] = useState({
    currentQuestion: 0,
    score: 0,
    showResult: false,
    selectedAnswer: null as number | null,
    showExplanation: false,
  });

  const filteredQuiz = useMemo(() =>
    quizQuestions.filter(q => q.audience === audience),
    [audience]
  );

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
          <button onClick={() => window.location.reload()} className="btn-secondary">{t.exploreTopics}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        {/* Progress bar */}
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
            if (quizState.showExplanation) {
              if (index === filteredQuiz[quizState.currentQuestion].correctAnswer) btnClass += "border-green-500 bg-green-50 dark:bg-green-900/30";
              else if (quizState.selectedAnswer === index) btnClass += "border-red-500 bg-red-50 dark:bg-red-900/30";
            } else {
              btnClass += "border-gray-200 dark:border-gray-600 hover:border-primary";
            }
            return (
              <button key={index} onClick={() => handleAnswer(index)} disabled={quizState.showExplanation} className={btnClass}>
                {option}
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
