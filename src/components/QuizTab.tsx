"use client";

import { useState, useMemo, useEffect } from "react";
import { quizQuestions } from "@/data/content";
import { useI18n } from "@/i18n/context";
import { Audience } from "@/types";

const buildShareText = (t: ReturnType<typeof useI18n>["t"], score: number, total: number) =>
  `${t.quizFinished} ${score}/${total} — EduSexual PT`;

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
  } catch (e) {
    console.warn("Failed to load quiz state:", e);
  }
  return null;
}

function saveState(
  audience: Audience,
  state: { currentQuestion: number; score: number; showResult: boolean; userAnswers: (number | null)[] }
) {
  try {
    localStorage.setItem(`${STORAGE_KEY}-${audience}`, JSON.stringify(state));
  } catch (e) {
    console.warn("Failed to save quiz state:", e);
  }
}

function clearState(audience: Audience) {
  try {
    localStorage.removeItem(`${STORAGE_KEY}-${audience}`);
  } catch (e) {
    console.warn("Failed to clear quiz state:", e);
  }
}

export default function QuizTab({ audience }: QuizTabProps) {
  const { t } = useI18n();

  const filteredQuiz = useMemo(() =>
    quizQuestions.filter(q => q.audience === audience),
    [audience]
  );

  const [quizState, setQuizState] = useState(() => {
    const saved = loadState(audience);
    const initialAnswers = Array<number | null>(filteredQuiz.length).fill(null);
    if (saved && Array.isArray(saved.userAnswers) && saved.userAnswers.length === filteredQuiz.length) {
      saved.userAnswers.forEach((a: number | null, i: number) => { initialAnswers[i] = a; });
    }
    if (saved && saved.currentQuestion < filteredQuiz.length) {
      return {
        currentQuestion: saved.currentQuestion,
        score: saved.score,
        showResult: saved.showResult,
        selectedAnswer: null as number | null,
        showExplanation: false,
        userAnswers: initialAnswers,
      };
    }
    return {
      currentQuestion: 0,
      score: 0,
      showResult: false,
      selectedAnswer: null as number | null,
      showExplanation: false,
      userAnswers: initialAnswers,
    };
  });

  const [reviewOnlyWrong, setReviewOnlyWrong] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareResult = async () => {
    const text = buildShareText(t, quizState.score, filteredQuiz.length);
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.warn("Failed to copy quiz result:", e);
    }
  };

  useEffect(() => {
    if (quizState.showResult || quizState.currentQuestion === 0) {
      clearState(audience);
    } else {
      saveState(audience, {
        currentQuestion: quizState.currentQuestion,
        score: quizState.score,
        showResult: quizState.showResult,
        userAnswers: quizState.userAnswers,
      });
    }
  }, [quizState.currentQuestion, quizState.score, quizState.showResult, quizState.userAnswers, audience]);

  const handleAnswer = (answerIndex: number) => {
    if (quizState.showExplanation) return;
    const isCorrect = answerIndex === filteredQuiz[quizState.currentQuestion].correctAnswer;
    setQuizState(prev => {
      const userAnswers = [...prev.userAnswers];
      userAnswers[prev.currentQuestion] = answerIndex;
      return {
        ...prev,
        selectedAnswer: answerIndex,
        showExplanation: true,
        score: isCorrect ? prev.score + 1 : prev.score,
        userAnswers,
      };
    });
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
      userAnswers: Array<number | null>(filteredQuiz.length).fill(null),
    });
    setReviewOnlyWrong(false);
    setCopied(false);
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
    const reviewItems = filteredQuiz
      .map((q, index) => ({ q, index, chosen: quizState.userAnswers[index] }))
      .filter(({ q, chosen }) => !reviewOnlyWrong || chosen !== q.correctAnswer);

    return (
      <div className="max-w-2xl mx-auto space-y-6">
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
            <button onClick={shareResult} className="btn-secondary" aria-live="polite">
              {copied ? t.quizResultCopied : t.quizShareResult}
            </button>
          </div>
        </div>

        <section className="card" aria-labelledby="quiz-review-title">
          <h4 id="quiz-review-title" className="text-xl font-heading font-bold mb-1 text-primary">{t.quizReviewTitle}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{t.quizReviewIntro}</p>
          <label className="flex items-center gap-2 mb-4 text-sm cursor-pointer select-none">
            <input
              type="checkbox"
              checked={reviewOnlyWrong}
              onChange={(e) => setReviewOnlyWrong(e.target.checked)}
              className="w-4 h-4 accent-primary"
            />
            {t.quizReviewOnlyWrong}
          </label>

          <ol className="space-y-4">
            {reviewItems.map(({ q, index, chosen }) => {
              const isCorrect = chosen === q.correctAnswer;
              return (
                <li key={q.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <p className="font-semibold mb-3">
                    <span className="text-gray-400 mr-1">{index + 1}.</span>{q.question}
                  </p>
                  <div className="space-y-1 text-sm">
                    <p className={isCorrect ? "text-emerald-600 dark:text-emerald-400 font-medium" : "text-rose-600 dark:text-rose-400 font-medium"}>
                      {t.quizYourAnswer}: {chosen === null || chosen === undefined ? t.quizNotAnswered : q.options[chosen]}
                      {isCorrect ? " ✓" : " ✗"}
                    </p>
                    {!isCorrect && (
                      <p className="text-emerald-600 dark:text-emerald-400 font-medium">
                        {t.quizCorrectAnswerLabel}: {q.options[q.correctAnswer]} ✓
                      </p>
                    )}
                    <p className="text-gray-600 dark:text-gray-300 pt-1">{q.explanation}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
      </div>
    );
  }

  const currentQuestionData = filteredQuiz[quizState.currentQuestion];
  const isCurrentCorrect = quizState.selectedAnswer === currentQuestionData.correctAnswer;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">{t.questionOf} {quizState.currentQuestion + 1} / {filteredQuiz.length}</span>
            <span className="text-primary font-semibold">{t.points}: {quizState.score}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2" role="progressbar" aria-valuenow={quizState.currentQuestion + 1} aria-valuemin={1} aria-valuemax={filteredQuiz.length} aria-label={`Pergunta ${quizState.currentQuestion + 1} de ${filteredQuiz.length}`}>
            <div
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${((quizState.currentQuestion + 1) / filteredQuiz.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <h3 className="text-lg md:text-xl font-heading font-semibold mb-6">{filteredQuiz[quizState.currentQuestion].question}</h3>
        <div className="space-y-3">
          {filteredQuiz[quizState.currentQuestion].options.map((option, index) => {
            const optionLetter = String.fromCharCode(65 + index);
            let btnClass = "w-full text-left p-3 md:p-4 rounded-lg border-2 transition text-sm md:text-base ";
            let suffix = "";
            let ariaLabel = `${optionLetter}) ${option}`;
            if (quizState.showExplanation) {
              if (index === filteredQuiz[quizState.currentQuestion].correctAnswer) {
                btnClass += "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 dark:border-emerald-500/70 text-emerald-950 dark:text-emerald-100";
                suffix = " ✓";
                ariaLabel += " - Resposta correta";
              } else if (quizState.selectedAnswer === index) {
                btnClass += "border-rose-500 bg-rose-50 dark:bg-rose-950/40 dark:border-rose-500/70 text-rose-950 dark:text-rose-100";
                suffix = " ✗";
                ariaLabel += " - Resposta incorreta";
              }
            } else {
              btnClass += "border-gray-200 dark:border-gray-600 hover:border-primary";
            }
            return (
              <button key={index} onClick={() => handleAnswer(index)} disabled={quizState.showExplanation} className={btnClass} aria-label={ariaLabel}>
                <span className="flex items-center justify-between">
                  <span>{option}</span>
                  {suffix && <span className="font-bold" aria-live="assertive">{suffix}</span>}
                </span>
              </button>
            );
          })}
        </div>
        {quizState.showExplanation && (
          <div className="mt-6 p-4 bg-accent/20 dark:bg-accent/10 rounded-2xl border border-accent/20 dark:border-accent/15" role="status" aria-live="polite" aria-atomic="true">
            <p className={`font-bold mb-2 text-sm md:text-base ${isCurrentCorrect ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
              {isCurrentCorrect ? t.quizFeedbackCorrect : t.quizFeedbackIncorrect}
            </p>
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
