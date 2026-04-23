"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { topics, quizQuestions, frequentlyAskedQuestions } from "@/data/content";
import StitchLayout from "@/components/StitchLayout";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Stitch states
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
      {/* Stitch Modal */}
      {stitchLayout && (
        <StitchLayout 
          htmlUrl={stitchLayout.htmlUrl} 
          onClose={() => setStitchLayout(null)} 
        />
      )}
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 py-4 px-6 sticky top-0 z-50 transition-all relative">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button onClick={() => setShowAudienceSelector(true)} className="flex items-center gap-3 hover:opacity-80 transition group">
            <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
              <span className="text-2xl">🧠</span>
            </div>
            <div className="text-left">
              <h1 className="text-xl font-heading font-bold text-primary leading-tight">EduSexual PT</h1>
              <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Perfil: {audience === 'criancas' ? 'Crianças' : audience === 'jovens' ? 'Jovens' : 'Adultos'}</span>
            </div>
          </button>
          
      <nav className="hidden md:flex bg-gray-100/50 p-1 rounded-full gap-1">
        {[
          { id: "home", label: "Início" },
          { id: "quiz", label: "Quiz" },
          { id: "faq", label: "FAQ" },
          { id: "duvidas", label: "Dúvidas" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`nav-link ${activeTab === tab.id ? "bg-primary text-white shadow-md" : "text-gray-600 hover:text-primary hover:bg-white"}`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden p-2 rounded-lg hover:bg-white/10 transition"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {mobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden z-50 border-t">
          {[
            { id: "home", label: "Início" },
            { id: "quiz", label: "Quiz" },
            { id: "faq", label: "FAQ" },
            { id: "duvidas", label: "Dúvidas" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id as any); setMobileMenuOpen(false); }}
              className={`w-full text-left px-6 py-4 border-b border-gray-100 transition ${activeTab === tab.id ? "bg-primary text-white font-bold" : "text-gray-700 hover:bg-gray-50"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}
          
          <button onClick={() => setShowAudienceSelector(true)} className="btn-primary text-sm py-2 px-6">
            Mudar Perfil
          </button>
        </div>
      </header>

      {/* Audience Selector Modal/Overlay */}
      {showAudienceSelector && (
        <div className="fixed inset-0 z-[60] bg-primary/40 flex items-center justify-center p-6 backdrop-blur-xl">
          <div className="max-w-5xl w-full text-center">
            <div className="mb-12 animate-float">
              <h2 className="text-5xl md:text-6xl font-heading font-bold mb-4 text-white drop-shadow-lg">Bem-vindo ao EduSexual PT</h2>
              <p className="text-2xl mb-12 text-white/90 font-light">Escolhe o teu perfil para uma experiência personalizada:</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { id: "criancas", icon: "🎈", title: "Crianças", desc: "Aprende sobre o teu corpo de forma divertida." },
                { id: "jovens", icon: "📱", title: "Jovens", desc: "Dúvidas sobre sexualidade e relações." },
                { id: "adultos", icon: "👨‍👩‍👧‍👦", title: "Adultos / Pais", desc: "Guia para educadores e pais." }
              ].map((p) => (
                <button 
                  key={p.id}
                  onClick={() => selectAudience(p.id as Audience)}
                  className="bg-white/90 hover:bg-white p-10 rounded-[2.5rem] hover:scale-105 transition-all shadow-2xl group border-4 border-transparent hover:border-secondary"
                >
                  <div className="text-7xl mb-6 group-hover:scale-110 transition-transform">{p.icon}</div>
                  <h3 className="text-3xl font-bold mb-3 text-primary">{p.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{p.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* HOME TAB */}
        {activeTab === "home" && (
          <div className="space-y-20">
            {/* Hero Section */}
            <section className="relative overflow-hidden rounded-[3rem] bg-primary/5 p-8 md:p-16 hero-gradient">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="flex-1 text-center lg:text-left z-10">
                  <div className="inline-block px-4 py-1 rounded-full bg-secondary/10 text-secondary font-bold text-sm mb-6 uppercase tracking-widest">
                    Portal de Educação Sexual
                  </div>
                  <h2 className="text-5xl md:text-7xl font-heading font-bold text-primary mb-6 leading-tight">
                    {audience === 'criancas' ? 'Vamos aprender sobre o nosso corpo?' : 
                     audience === 'adultos' ? 'Guia para Adultos e Educadores' : 
                     'Sexualidade sem Tabus e com Segurança'}
                  </h2>
                  <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-xl">
                    {audience === 'criancas' ? 'Um espaço divertido e seguro para descobrires como o teu corpo é especial.' : 
                     audience === 'adultos' ? 'Informação técnica e pedagógica baseada em fontes oficiais para apoiar a educação.' : 
                     'Um espaço 100% anónimo para aprenderes sobre saúde, relações e o teu corpo.'}
                  </p>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                    <button onClick={() => setActiveTab("quiz")} className="btn-primary">Começar Quiz</button>
                    <button onClick={() => setActiveTab("duvidas")} className="btn-secondary">Tira Dúvidas</button>
                  </div>
                </div>
                <div className="flex-1 relative">
                  <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full"></div>
                  <img 
                    src="/hero.png" 
                    alt="Educação Sexual" 
                    className="relative z-10 rounded-3xl shadow-2xl animate-float"
                  />
                </div>
              </div>
            </section>

            {/* Topics Grid */}
            <section>
              <div className="text-center mb-12">
                <h3 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
                  O que queres explorar hoje?
                </h3>
                <p className="text-gray-500 max-w-2xl mx-auto">Temos conteúdo especializado preparado para o teu perfil. Escolhe um tema para começar a ler.</p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTopics.map((topic) => (
                  <div key={topic.id} className="card group hover:border-primary">
                    <div className="bg-primary/5 w-16 h-16 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                      {topic.id === 'anatomia-jovens' ? '🧬' : topic.icon}
                    </div>
                    <h4 className="text-2xl font-heading font-bold mb-3 text-primary">{topic.title}</h4>
                    <p className="text-gray-500 mb-6 line-clamp-2 leading-relaxed">{topic.description}</p>
                    
                    <div className="space-y-3">
                      {topic.articles.map((article) => (
                        <details key={article.id} className="group border-t border-gray-50 pt-3">
                          <summary className="cursor-pointer text-primary hover:text-secondary text-sm font-bold flex items-center justify-between list-none">
                            <span className="flex items-center gap-2">📄 {article.title}</span>
                            <span className="text-xs opacity-50 group-open:rotate-180 transition-transform">▼</span>
                          </summary>
                          <div className="mt-4 p-5 bg-gray-50 rounded-2xl text-sm text-gray-700 whitespace-pre-line leading-relaxed shadow-inner">
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
                      <div className="flex gap-3">
                        <button onClick={nextQuestion} className="btn-primary flex-grow">Seguinte</button>
                        <button 
                          onClick={() => generateWithStitch("quiz")} 
                          disabled={isGenerating}
                          className="bg-white border-2 border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary/5 transition disabled:opacity-50"
                        >
                          {isGenerating ? "A gerar..." : "✨ Design IA"}
                        </button>
                      </div>
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

        {/* FAQ TAB */}
        {activeTab === "faq" && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-heading font-bold text-primary mb-4">Perguntas Frequentes</h3>
              <p className="text-gray-500">Esclarece as tuas dúvidas com as perguntas mais comuns.</p>
              <button 
                onClick={() => generateWithStitch("faq")}
                className="mt-6 inline-flex items-center gap-2 px-6 py-2 bg-secondary/10 text-secondary rounded-full font-bold hover:bg-secondary hover:text-white transition-all"
              >
                {isGenerating ? "A gerar design..." : "✨ Gerar FAQ com Design IA"}
              </button>
            </div>
            
        <div className="space-y-4">
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
                  className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50 transition"
                >
                  <span className="text-lg font-bold text-primary">{faq.question}</span>
                  <span className={`text-2xl transition-transform ${showFaqAnswer === index ? "rotate-45" : ""}`}>+</span>
                </button>
                {showFaqAnswer === index && (
                  <div className="p-6 bg-gray-50 border-t border-gray-100 text-gray-700 leading-relaxed animate-in fade-in slide-in-from-top-2">
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
                <div className="text-center mb-10">
                  <div className="bg-secondary/20 w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">🕵️</div>
                  <h3 className="text-3xl font-heading font-bold text-primary mb-3">Tira as tuas Dúvidas</h3>
                  <p className="text-gray-500">Envia a tua pergunta de forma 100% anónima. Não guardamos nenhuns dados pessoais.</p>
                </div>
                
        <form onSubmit={(e) => { e.preventDefault(); if (questionForm.question.trim()) setSubmitted(true); }} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Como te queres chamar? (Opcional)</label>
                <input
                  type="text"
                  value={questionForm.name}
                  onChange={(e) => setQuestionForm((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full p-4 rounded-2xl border-2 border-gray-100 focus:border-primary outline-none transition"
                  placeholder={audience === 'criancas' ? 'Ex: Explorador(a)' : audience === 'adultos' ? 'Ex: Pai/Mãe' : 'Ex: Jovem Curioso'}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">A tua pergunta</label>
                <textarea
                  required
                  value={questionForm.question}
                  onChange={(e) => setQuestionForm((prev) => ({ ...prev, question: e.target.value }))}
                  className="w-full p-4 rounded-2xl border-2 border-gray-100 focus:border-primary outline-none transition min-h-[150px]"
                  placeholder={
                    audience === 'criancas'
                      ? 'O que queres saber?'
                      : audience === 'adultos'
                      ? 'Escreva aqui a sua pergunta...'
                      : 'Escreve aqui o que queres saber...'
                  }
                ></textarea>
              </div>
              <button type="submit" className="btn-primary w-full py-4 text-lg" disabled={!questionForm.question.trim()}>Submeter Pergunta Anónima</button>
              <p className="text-xs text-gray-400 text-center">🔒 A tua pergunta é anónima. Não recolhemos dados pessoais.</p>
            </form>
              </div>
            ) : (
              <div className="card text-center py-16">
                <div className="text-6xl mb-6">✅</div>
                <h3 className="text-3xl font-bold text-primary mb-4">Pergunta Enviada!</h3>
                <p className="text-gray-500 mb-8">Obrigado pela tua confiança. A tua pergunta será analisada pela nossa equipa e poderá ser adicionada ao FAQ brevemente.</p>
              <button onClick={() => { setSubmitted(false); setQuestionForm({ name: '', question: '' }); }} className="btn-secondary">Enviar outra pergunta</button>
              </div>
            )}

            <div className="mt-10 card bg-accent/10 border-accent">
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

      <footer className="bg-gray-800 text-white py-8 mt-auto">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-400">EduSexual PT - Educação Sexual para Todas as Idades</p>
          <button onClick={() => setShowAudienceSelector(true)} className="text-xs text-primary underline mt-2">Mudar Perfil</button>
        </div>
      </footer>
    </div>
  );
}
