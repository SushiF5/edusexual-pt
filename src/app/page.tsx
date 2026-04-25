"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { topics, quizQuestions, frequentlyAskedQuestions } from "@/data/content";
import StitchLayout from "@/components/StitchLayout";

type Audience = "criancas" | "jovens" | "adultos";

const audienceLabels: Record<Audience, string> = {
  criancas: "Crianças",
  jovens: "Jovens",
  adultos: "Adultos",
};

const navTabs = [
  { id: "home", label: "Início", icon: "🏠" },
  { id: "quiz", label: "Quiz", icon: "🧠" },
  { id: "faq", label: "FAQ", icon: "❓" },
  { id: "duvidas", label: "Dúvidas", icon: "💬" },
] as const;

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [stitchLayout, setStitchLayout] = useState<{ htmlUrl: string } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateWithStitch = async (type: "quiz" | "faq") => {
    setIsGenerating(true);
    try {
      const contentStr = type === "quiz"
        ? JSON.stringify(filteredQuiz[quizState.currentQuestion])
        : JSON.stringify(frequentlyAskedQuestions.slice(0, 5));

      const prompt = `Gera um layout moderno e educativo para um ${type} de educação sexual.
Conteúdo: ${contentStr}.
Usa as cores: primária #2D5A5A, secundária #F4A261.
Estilo: Limpo, acessível para ${audience}.`;

      const response = await fetch("/api/stitch/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) throw new Error("Falha na geração");

      const data = await response.json();
      setStitchLayout({ htmlUrl: data.htmlUrl });
    } catch (error) {
      alert("Erro ao gerar layout dinâmico. Tenta novamente.");
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

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

  const heroImage = audience === 'criancas' ? '/hero-criancas.png' : audience === 'adultos' ? '/hero-adultos.png' : '/hero-jovens.png';

  return (
    <div className="min-h-screen bg-background">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-lg">
        Saltar para o conteúdo principal
      </a>

      {stitchLayout && (
        <StitchLayout
          htmlUrl={stitchLayout.htmlUrl}
          onClose={() => setStitchLayout(null)}
        />
      )}

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 py-3 px-4 md:px-6 sticky top-0 z-50 transition-all relative">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <button
            onClick={() => setShowAudienceSelector(true)}
            className="flex items-center gap-2 hover:opacity-80 transition group shrink-0"
            aria-label="Mudar perfil de audiência"
          >
            <div className="bg-primary/10 p-1.5 md:p-2 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
              <span className="text-lg md:text-2xl">🧠</span>
            </div>
            <div className="text-left hidden sm:block">
              <h1 className="text-base md:text-xl font-heading font-bold text-primary leading-tight">EduSexual PT</h1>
              <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-gray-400">Perfil: {audienceLabels[audience]}</span>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex bg-gray-100 p-2 rounded-full gap-2 shadow-sm" aria-label="Navegação principal">
            {navTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-2 rounded-full transition-all duration-300 font-medium ${activeTab === tab.id ? "bg-primary text-white shadow-md" : "text-gray-600 hover:text-primary hover:bg-white"}`}
                aria-current={activeTab === tab.id ? "page" : undefined}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileMenuOpen}
          >
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop: Mudar Perfil */}
          <button
            onClick={() => setShowAudienceSelector(true)}
            className="btn-primary text-xs md:text-sm py-2 px-3 md:px-6 hidden md:inline-flex"
          >
            Mudar Perfil
          </button>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden z-50 border-t">
            {navTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id as any); setMobileMenuOpen(false); }}
                className={`w-full text-left px-6 py-4 border-b border-gray-100 transition flex items-center gap-3 ${activeTab === tab.id ? "bg-primary text-white font-bold" : "text-gray-700 hover:bg-gray-50"}`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
            <button
              onClick={() => { setShowAudienceSelector(true); setMobileMenuOpen(false); }}
              className="w-full text-left px-6 py-4 text-primary font-bold hover:bg-gray-50 flex items-center gap-3"
            >
              <span>🔄</span>
              Mudar Perfil
            </button>
          </div>
        )}
      </header>

      {/* Audience Selector Modal */}
      {showAudienceSelector && (
        <div className="fixed inset-0 z-[60] bg-primary/40 flex items-center justify-center p-4 md:p-6 backdrop-blur-xl overflow-y-auto" role="dialog" aria-modal="true" aria-label="Escolher perfil">
          <div className="max-w-5xl w-full text-center py-4 md:py-0">
            <div className="mb-6 md:mb-12 animate-float">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-2 md:mb-4 text-white drop-shadow-lg">Bem-vindo ao EduSexual PT</h2>
              <p className="text-lg md:text-2xl mb-6 md:mb-12 text-white/90 font-light">Escolhe o teu perfil para uma experiência personalizada:</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8">
              {[
                { id: "criancas", icon: "🎈", title: "Crianças", desc: "Aprende sobre o teu corpo de forma divertida." },
                { id: "jovens", icon: "📱", title: "Jovens", desc: "Dúvidas sobre sexualidade e relações." },
                { id: "adultos", icon: "👨‍👩‍👧‍👦", title: "Adultos / Educadores", desc: "Guia para educadores e pais." }
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => selectAudience(p.id as Audience)}
                  className="bg-white/90 hover:bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] hover:scale-105 transition-all shadow-2xl group border-4 border-transparent hover:border-secondary"
                  aria-label={`Selecionar perfil ${p.title}`}
                >
                  <div className="text-5xl md:text-7xl mb-3 md:mb-6 group-hover:scale-110 transition-transform">{p.icon}</div>
                  <h3 className="text-xl md:text-3xl font-bold mb-2 md:mb-3 text-primary">{p.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-sm md:text-base">{p.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <main id="main-content" className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* HOME TAB */}
        {activeTab === "home" && (
          <div className="space-y-12 md:space-y-20">
            {/* Hero Section */}
            <section className="relative overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-primary/5 p-6 md:p-16 hero-gradient">
              <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
                <div className="flex-1 text-center lg:text-left z-10">
                  <div className="inline-block px-4 py-1 rounded-full bg-secondary/10 text-secondary font-bold text-sm mb-4 md:mb-6 uppercase tracking-widest">
                    Portal de Educação Sexual
                  </div>
                  <h2 className="text-3xl md:text-5xl lg:text-7xl font-heading font-bold text-primary mb-4 md:mb-6 leading-tight">
                    {audience === 'criancas' ? 'Vamos aprender sobre o nosso corpo?' :
                     audience === 'adultos' ? 'Guia para Adultos e Educadores' :
                     'Sexualidade sem Tabus e com Segurança'}
                  </h2>
                  <p className="text-base md:text-xl text-gray-600 mb-6 md:mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
                    {audience === 'criancas' ? 'Um espaço divertido e seguro para descobrires como o teu corpo é especial.' :
                     audience === 'adultos' ? 'Informação técnica e pedagógica baseada em fontes oficiais para apoiar a educação.' :
                     'Um espaço 100% anónimo para aprenderes sobre saúde, relações e o teu corpo.'}
                  </p>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                    <button onClick={() => setActiveTab("quiz")} className="btn-primary">Começar Quiz</button>
                    <button onClick={() => setActiveTab("duvidas")} className="btn-secondary">Tira Dúvidas</button>
                  </div>
                </div>
                <div className="flex-1 relative max-w-md lg:max-w-none">
                  <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full"></div>
                  <img
                    src={heroImage}
                    alt={audience === 'criancas' ? 'Crianças a aprender' : audience === 'adultos' ? 'Pais e educadores' : 'Jovens e educação sexual'}
                    className="relative z-10 rounded-3xl shadow-2xl animate-float w-full"
                  />
                </div>
              </div>
            </section>

            {/* Topics Grid */}
            <section>
              <div className="text-center mb-8 md:mb-12">
                <h3 className="text-2xl md:text-4xl font-heading font-bold text-primary mb-3 md:mb-4">
                  O que queres explorar hoje?
                </h3>
                <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base">Temos conteúdo especializado preparado para o teu perfil. Escolhe um tema para começar a ler.</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                {filteredTopics.map((topic) => (
                  <div key={topic.id} className="card group hover:border-primary">
                    <div className="bg-primary/5 w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-3xl md:text-4xl mb-4 md:mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                      {topic.id === 'anatomia-jovens' ? '🧬' : topic.icon}
                    </div>
                    <h4 className="text-lg md:text-2xl font-heading font-bold mb-2 md:mb-3 text-primary">{topic.title}</h4>
                    <p className="text-gray-500 mb-4 md:mb-6 line-clamp-2 leading-relaxed text-sm md:text-base">{topic.description}</p>

                    <div className="space-y-3">
                      {topic.articles.map((article) => (
                        <details key={article.id} className="group border-t border-gray-50 pt-3">
                          <summary className="cursor-pointer text-primary hover:text-secondary text-sm font-bold flex items-center justify-between list-none">
                            <span className="flex items-center gap-2">📄 {article.title}</span>
                            <span className="text-xs opacity-50 group-open:rotate-180 transition-transform">▼</span>
                          </summary>
                          <div className="mt-4 p-4 md:p-5 bg-gray-50 rounded-2xl text-sm text-gray-700 whitespace-pre-line leading-relaxed shadow-inner">
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

        {/* QUIZ TAB */}
        {activeTab === "quiz" && (
          <div className="max-w-2xl mx-auto">
            {filteredQuiz.length > 0 ? (
              !quizState.showResult ? (
                <div className="card">
                  {/* Progress bar */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-500">Pergunta {quizState.currentQuestion + 1} de {filteredQuiz.length}</span>
                      <span className="text-primary font-semibold">Pontos: {quizState.score}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2" role="progressbar" aria-valuenow={quizState.currentQuestion + 1} aria-valuemin={1} aria-valuemax={filteredQuiz.length}>
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
                      <p className="text-gray-700 mb-4 text-sm md:text-base">{filteredQuiz[quizState.currentQuestion].explanation}</p>
                      <div className="flex gap-3">
                        <button onClick={nextQuestion} className="btn-primary flex-grow">
                          {quizState.currentQuestion < filteredQuiz.length - 1 ? "Seguinte" : "Ver Resultado"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="card text-center">
                  <div className="text-5xl mb-4">{quizState.score === filteredQuiz.length ? '🏆' : quizState.score >= filteredQuiz.length / 2 ? '👏' : '📚'}</div>
                  <h3 className="text-2xl font-bold mb-2">Quiz Terminado!</h3>
                  <p className="text-gray-500 mb-2">
                    {quizState.score === filteredQuiz.length ? 'Parabéns! Acertaste tudo!' :
                     quizState.score >= filteredQuiz.length / 2 ? 'Bom resultado! Continua a aprender.' :
                     'Não desanimes! Explora os temas e tenta de novo.'}
                  </p>
                  <p className="text-4xl font-bold text-primary mb-6">{quizState.score} / {filteredQuiz.length}</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button onClick={resetQuiz} className="btn-primary">Tentar de novo</button>
                    <button onClick={() => setActiveTab("home")} className="btn-secondary">Explorar Temas</button>
                  </div>
                </div>
              )
            ) : (
              <div className="text-center py-12">
                <p>Ainda não há perguntas para este perfil.</p>
              </div>
            )}
          </div>
        )}

        {/* FAQ TAB */}
        {activeTab === "faq" && (
          <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
            <div className="text-center mb-8 md:mb-12">
              <h3 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-3 md:mb-4">Perguntas Frequentes</h3>
              <p className="text-gray-500 text-sm md:text-base">
                {audience === 'criancas' ? 'Respostas simples para as tuas dúvidas.' :
                 audience === 'adultos' ? 'Dúvidas comuns de pais e educadores.' :
                 'Esclarece as tuas dúvidas com as perguntas mais comuns.'}
              </p>
            </div>

            <div className="space-y-3 md:space-y-4">
              {frequentlyAskedQuestions
                .filter((faq) => {
                  const parentQuestions = [
                    "A que idade devo começar a falar sobre sexualidade com o meu filho?",
                    "Se eu falar de sexo, não vai estimular o meu filho a experimentar?",
                    "O meu filho brinca com os órgãos genitais. É normal?",
                    "Como explicar de onde vêm os bebés a uma criança?",
                    "O que fazer se a criança diz que foi tocada?",
                  ];
                  const kidsQuestions = [
                    "É normal ter dúvidas sobre sexualidade?",
                    "O meu filho brinca com os órgãos genitais. É normal?",
                    "Como explicar de onde vêm os bebés a uma criança?",
                  ];
                  if (audience === "adultos") return parentQuestions.includes(faq.question);
                  if (audience === "criancas") return kidsQuestions.includes(faq.question);
                  return !parentQuestions.includes(faq.question) || kidsQuestions.includes(faq.question);
                })
                .map((faq, index) => (
                  <div key={index} className="card !p-0 overflow-hidden">
                    <button
                      onClick={() => setShowFaqAnswer(showFaqAnswer === index ? null : index)}
                      className="w-full text-left p-4 md:p-6 flex justify-between items-center hover:bg-gray-50 transition"
                      aria-expanded={showFaqAnswer === index}
                    >
                      <span className="text-base md:text-lg font-bold text-primary pr-4">{faq.question}</span>
                      <span className={`text-2xl transition-transform shrink-0 ${showFaqAnswer === index ? "rotate-45" : ""}`}>+</span>
                    </button>
                    {showFaqAnswer === index && (
                      <div className="p-4 md:p-6 bg-gray-50 border-t border-gray-100 text-gray-700 leading-relaxed text-sm md:text-base">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* DUVIDAS TAB */}
        {activeTab === "duvidas" && (
          <div className="max-w-3xl mx-auto">
            {!submitted ? (
              <div className="glass-card">
                <div className="text-center mb-6 md:mb-10">
                  <div className="bg-secondary/20 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-3xl md:text-4xl mx-auto mb-4 md:mb-6">🕵️</div>
                  <h3 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-2 md:mb-3">Tira as tuas Dúvidas</h3>
                  <p className="text-gray-500 text-sm md:text-base">Envia a tua pergunta de forma 100% anónima. Não guardamos nenhuns dados pessoais.</p>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); if (questionForm.question.trim()) setSubmitted(true); }} className="space-y-4 md:space-y-6">
                  <div>
                    <label htmlFor="question-name" className="block text-sm font-bold text-gray-700 mb-2">Como te queres chamar? (Opcional)</label>
                    <input
                      id="question-name"
                      type="text"
                      value={questionForm.name}
                      onChange={(e) => setQuestionForm((prev) => ({ ...prev, name: e.target.value }))}
                      className="w-full p-3 md:p-4 rounded-2xl border-2 border-gray-100 focus:border-primary outline-none transition text-sm md:text-base"
                      placeholder={audience === 'criancas' ? 'Ex: Explorador(a)' : audience === 'adultos' ? 'Ex: Pai/Mãe' : 'Ex: Jovem Curioso'}
                    />
                  </div>
                  <div>
                    <label htmlFor="question-text" className="block text-sm font-bold text-gray-700 mb-2">A tua pergunta</label>
                    <textarea
                      id="question-text"
                      required
                      value={questionForm.question}
                      onChange={(e) => setQuestionForm((prev) => ({ ...prev, question: e.target.value }))}
                      className="w-full p-3 md:p-4 rounded-2xl border-2 border-gray-100 focus:border-primary outline-none transition min-h-[120px] md:min-h-[150px] text-sm md:text-base"
                      placeholder={
                        audience === 'criancas'
                          ? 'O que queres saber?'
                          : audience === 'adultos'
                          ? 'Escreva aqui a sua pergunta...'
                          : 'Escreve aqui o que queres saber...'
                      }
                    ></textarea>
                  </div>
                  <button type="submit" className="btn-primary w-full py-3 md:py-4 text-base md:text-lg" disabled={!questionForm.question.trim()}>Submeter Pergunta Anónima</button>
                  <p className="text-xs text-gray-400 text-center">🔒 A tua pergunta é anónima. Não recolhemos dados pessoais.</p>
                </form>
              </div>
            ) : (
              <div className="card text-center py-10 md:py-16">
                <div className="text-5xl md:text-6xl mb-4 md:mb-6">✅</div>
                <h3 className="text-2xl md:text-3xl font-bold text-primary mb-3 md:mb-4">Pergunta Enviada!</h3>
                <p className="text-gray-500 mb-6 md:mb-8 text-sm md:text-base">Obrigado pela tua confiança. A tua pergunta será analisada pela nossa equipa e poderá ser adicionada ao FAQ brevemente.</p>
                <button onClick={() => { setSubmitted(false); setQuestionForm({ name: '', question: '' }); }} className="btn-secondary">Enviar outra pergunta</button>
              </div>
            )}

            <div className="mt-8 md:mt-10 card bg-accent/10 border-accent">
              <h3 className="font-heading font-semibold text-primary mb-3">
                {audience === 'criancas' ? '📞 Precisas de ajuda?' : '📞 Linhas de apoio em Portugal'}
              </h3>
              {audience === 'criancas' ? (
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>📞 <strong>Linha Criança</strong> — 116 111 (grátis)</li>
                  <li>📞 <strong>SOS Criança</strong> — 21 793 1629</li>
                  <li>💬 Podes falar com um professor ou adulto de confiança</li>
                </ul>
              ) : audience === 'jovens' ? (
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>📞 <strong>SNS 24</strong> — 808 200 204 (saúde)</li>
                  <li>📞 <strong>APF</strong> — Planeamento Familiar grátis</li>
                  <li>📞 <strong>Linha do Arco-Íris</strong> — apoio LGBTQI+</li>
                  <li>📞 <strong>APAV</strong> — 800 200 2200 (vítimas de crime)</li>
                  <li>📞 <strong>Voz de Apoio</strong> — 21 354 4090</li>
                </ul>
              ) : (
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>📞 <strong>APAV</strong> — 800 200 2200 (apoio vítimas)</li>
                  <li>📞 <strong>CPCJ</strong> — Comissão de Proteção de Crianças e Jovens</li>
                  <li>📞 <strong>APF</strong> — Consultas de Planeamento Familiar</li>
                  <li>📞 <strong>DGE</strong> — Educação Sexual nas Escolas</li>
                  <li>📞 <strong>Linha Criança</strong> — 116 111</li>
                </ul>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 md:py-12 mt-auto">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8">
            <div>
              <h4 className="font-heading font-bold text-lg mb-3">EduSexual PT</h4>
              <p className="text-gray-400 text-sm leading-relaxed">Portal de educação sexual em português. Conteúdo validado, 100% anónimo, para todas as idades.</p>
            </div>
            <div>
              <h4 className="font-heading font-bold text-lg mb-3">Navegar</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => setActiveTab("home")} className="hover:text-white transition">Início</button></li>
                <li><button onClick={() => setActiveTab("quiz")} className="hover:text-white transition">Quiz</button></li>
                <li><button onClick={() => setActiveTab("faq")} className="hover:text-white transition">FAQ</button></li>
                <li><button onClick={() => setActiveTab("duvidas")} className="hover:text-white transition">Tira Dúvidas</button></li>
                <li><button onClick={() => setShowAudienceSelector(true)} className="hover:text-white transition">Mudar Perfil</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-bold text-lg mb-3">Fontes Oficiais</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="https://apf.pt" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">APF — Planeamento da Família</a></li>
                <li><a href="https://dgs.pt" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">DGS — Direção-Geral da Saúde</a></li>
                <li><a href="https://dge.mec.pt" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">DGE — Direção-Geral da Educação</a></li>
                <li><a href="https://who.int" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">OMS — Organização Mundial de Saúde</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
            <p className="text-gray-500 text-xs">EduSexual PT — Educação Sexual para Todas as Idades</p>
            <p className="text-gray-600 text-xs">Conteúdo informativo. Não substitui aconselhamento médico.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
