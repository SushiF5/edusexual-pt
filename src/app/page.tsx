"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { topics, quizQuestions, frequentlyAskedQuestions } from "@/data/content";

type Audience = "criancas" | "jovens" | "adultos";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"home" | "quiz" | "faq" | "duvidas">("home");
  const [audience, setAudience] = useState<Audience>("jovens");
  const [showAudienceSelector, setShowAudienceSelector] = useState(true);

  const [quizState, setQuizState] = useState({
    currentQuestion: 0,
    score: 0,
    showResult: false,
    selectedAnswer: null as number | null,
    showExplanation: false,
  });
  const [showFaqAnswer, setShowFaqAnswer] = useState<number | null>(null);
  const [questionForm, setQuestionForm] = useState({ name: "", question: "" });
  const [submitted, setSubmitted] = useState(false);

  // Filtrar conteúdos com base na audiência
  const filteredTopics = useMemo(() => 
    topics.filter(t => t.audience === audience), 
  [audience]);

  const filteredQuiz = useMemo(() => 
    quizQuestions.filter(q => q.audience === audience), 
  [audience]);

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

  const selectAudience = (newAudience: Audience) => {
    setAudience(newAudience);
    setShowAudienceSelector(false);
    resetQuiz();
    setActiveTab("home");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-white py-4 px-6 sticky top-0 z-50 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button onClick={() => setShowAudienceSelector(true)} className="flex items-center gap-3 hover:opacity-80 transition">
            <span className="text-3xl">🧠</span>
            <div>
              <h1 className="text-2xl font-heading font-bold leading-none">EduSexual PT</h1>
              <span className="text-xs opacity-70">Perfil: {audience === 'criancas' ? 'Crianças' : audience === 'jovens' ? 'Jovens' : 'Adultos'}</span>
            </div>
          </button>
          <nav className="hidden md:flex gap-2">
            <button
              onClick={() => setActiveTab("home")}
              className={`px-4 py-2 rounded-lg transition ${activeTab === "home" ? "bg-white/20" : "hover:bg-white/10"}`}
            >
              Início
            </button>
            <button
              onClick={() => setActiveTab("quiz")}
              className={`px-4 py-2 rounded-lg transition ${activeTab === "quiz" ? "bg-white/20" : "hover:bg-white/10"}`}
            >
              Quiz
            </button>
            <button
              onClick={() => setActiveTab("faq")}
              className={`px-4 py-2 rounded-lg transition ${activeTab === "faq" ? "bg-white/20" : "hover:bg-white/10"}`}
            >
              FAQ
            </button>
            <button
              onClick={() => setActiveTab("duvidas")}
              className={`px-4 py-2 rounded-lg transition ${activeTab === "duvidas" ? "bg-white/20" : "hover:bg-white/10"}`}
            >
              Tira Dúvidas
            </button>
          </nav>
        </div>
      </header>

      {/* Audience Selector Modal/Overlay */}
      {showAudienceSelector && (
        <div className="fixed inset-0 z-[60] bg-primary/95 flex items-center justify-center p-6 backdrop-blur-sm">
          <div className="max-w-4xl w-full text-center text-white">
            <h2 className="text-4xl font-heading font-bold mb-4">Bem-vindo ao EduSexual PT</h2>
            <p className="text-xl mb-12 opacity-90">Escolhe o teu perfil para uma experiência personalizada:</p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <button 
                onClick={() => selectAudience("criancas")}
                className="bg-white text-primary p-8 rounded-3xl hover:scale-105 transition shadow-2xl group"
              >
                <div className="text-6xl mb-4 group-hover:bounce">🎈</div>
                <h3 className="text-2xl font-bold mb-2">Crianças</h3>
                <p className="text-gray-600 text-sm">Aprende sobre o teu corpo de forma divertida.</p>
              </button>
              
              <button 
                onClick={() => selectAudience("jovens")}
                className="bg-white text-primary p-8 rounded-3xl hover:scale-105 transition shadow-2xl group"
              >
                <div className="text-6xl mb-4">📱</div>
                <h3 className="text-2xl font-bold mb-2">Jovens</h3>
                <p className="text-gray-600 text-sm">Dúvidas sobre sexualidade e relações.</p>
              </button>
              
              <button 
                onClick={() => selectAudience("adultos")}
                className="bg-white text-primary p-8 rounded-3xl hover:scale-105 transition shadow-2xl group"
              >
                <div className="text-6xl mb-4">👨‍👩‍👧‍👦</div>
                <h3 className="text-2xl font-bold mb-2">Adultos / Pais</h3>
                <p className="text-gray-600 text-sm">Guia para educadores e pais.</p>
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* HOME TAB */}
        {activeTab === "home" && (
          <div className="space-y-12">
            {/* Hero Section */}
            <section className="text-center py-12">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
                {audience === 'criancas' ? 'Olá! Vamos aprender sobre o nosso corpo?' : 
                 audience === 'adultos' ? 'Guia de Educação Sexual para Adultos' : 
                 'Educação Sexual para Todos'}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                {audience === 'criancas' ? 'Um espaço seguro para descobrires como o teu corpo é especial.' : 
                 audience === 'adultos' ? 'Informação técnica e pedagógica para apoiar a educação dos mais novos.' : 
                 'Um espaço seguro e anónimo para aprenderes sobre sexualidade.'}
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <button onClick={() => setActiveTab("quiz")} className="btn-primary">Faz o Quiz</button>
                <button onClick={() => setActiveTab("duvidas")} className="btn-secondary">Tira Dúvidas</button>
              </div>
            </section>

            {/* Topics Grid */}
            <section>
              <h3 className="text-2xl font-heading font-semibold text-primary mb-6 text-center">
                Explora os Temas
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTopics.map((topic) => (
                  <div key={topic.id} className="card hover:border-primary border-2 border-transparent">
                    <div className="text-4xl mb-3">{topic.icon}</div>
                    <h4 className="text-xl font-heading font-semibold mb-2">{topic.title}</h4>
                    <p className="text-gray-600 mb-4">{topic.description}</p>
                    <div className="space-y-2">
                      {topic.articles.map((article) => (
                        <details key={article.id} className="group">
                          <summary className="cursor-pointer text-primary hover:underline text-sm font-medium">
                            📄 {article.title}
                          </summary>
                          <div className="mt-2 p-3 bg-gray-50 rounded-lg text-sm text-gray-700 whitespace-pre-line">
                            {article.content}
                          </div>
                        </details>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* QUIZ TAB (Filtrado por audiência) */}
        {activeTab === "quiz" && (
          <div className="max-w-2xl mx-auto">
            {filteredQuiz.length > 0 ? (
              !quizState.showResult ? (
                <div className="card">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-sm text-gray-500">Pergunta {quizState.currentQuestion + 1} de {filteredQuiz.length}</span>
                    <span className="text-primary font-semibold">Pontos: {quizState.score}</span>
                  </div>
                  <h3 className="text-xl font-heading font-semibold mb-6">{filteredQuiz[quizState.currentQuestion].question}</h3>
                  <div className="space-y-3">
                    {filteredQuiz[quizState.currentQuestion].options.map((option, index) => {
                      let btnClass = "w-full text-left p-4 rounded-lg border-2 transition ";
                      if (quizState.showExplanation) {
                        if (index === filteredQuiz[quizState.currentQuestion].correctAnswer) btnClass += "border-green-500 bg-green-50";
                        else if (quizState.selectedAnswer === index) btnClass += "border-red-500 bg-red-50";
                      } else {
                        btnClass += "border-gray-200 hover:border-primary";
                      }
                      return (
                        <button key={index} onClick={() => handleAnswer(index)} disabled={quizState.showExplanation} className={btnClass}>
                          {option}
                        </button>
                      );
                    })}
                  </div>
                  {quizState.showExplanation && (
                    <div className="mt-6 p-4 bg-accent/20 rounded-lg">
                      <p className="text-gray-700 mb-4">{filteredQuiz[quizState.currentQuestion].explanation}</p>
                      <button onClick={nextQuestion} className="btn-primary w-full">Seguinte</button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="card text-center">
                  <h3 className="text-2xl font-bold mb-4">Quiz Terminado!</h3>
                  <p className="text-4xl font-bold text-primary mb-6">{quizState.score} / {filteredQuiz.length}</p>
                  <button onClick={resetQuiz} className="btn-primary">Tentar de novo</button>
                </div>
              )
            ) : (
              <div className="text-center py-12">
                <p>Ainda não há perguntas para este perfil.</p>
              </div>
            )}
          </div>
        )}

        {/* ... Resto das abas (FAQ, Dúvidas) mantêm-se semelhantes ... */}
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-auto">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-400">EduSexual PT - Educação Sexual para Todas as Idades</p>
          <button onClick={() => setShowAudienceSelector(true)} className="text-xs text-primary underline mt-2">Mudar Perfil</button>
        </div>
      </footer>
    </div>
  );
}
