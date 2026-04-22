"use client";

import { useState } from "react";
import Link from "next/link";
import { topics, quizQuestions, frequentlyAskedQuestions } from "@/data/content";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"home" | "quiz" | "faq" | "duvidas">("home");
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

  const handleAnswer = (answerIndex: number) => {
    if (quizState.showExplanation) return;
    setQuizState(prev => ({ ...prev, selectedAnswer: answerIndex, showExplanation: true }));
    
    if (answerIndex === quizQuestions[quizState.currentQuestion].correctAnswer) {
      setQuizState(prev => ({ ...prev, score: prev.score + 1 }));
    }
  };

  const nextQuestion = () => {
    if (quizState.currentQuestion < quizQuestions.length - 1) {
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

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (questionForm.question.trim()) {
      setSubmitted(true);
      setQuestionForm({ name: "", question: "" });
    }
  };

  const getScoreMessage = () => {
    const percentage = (quizState.score / quizQuestions.length) * 100;
    if (percentage >= 80) return { text: "Excelente!", color: "text-green-600" };
    if (percentage >= 60) return { text: "Bom trabalho!", color: "text-yellow-600" };
    return { text: "Continua a aprender!", color: "text-orange-600" };
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-white py-4 px-6 sticky top-0 z-50 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-3xl">🧠</span>
            <h1 className="text-2xl font-heading font-bold">EduSexual PT</h1>
          </Link>
          <nav className="flex gap-2">
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

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* HOME TAB */}
        {activeTab === "home" && (
          <div className="space-y-12">
            {/* Hero Section */}
            <section className="text-center py-12">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
                Educação Sexual para Todos
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                Um espaço seguro e anónimo para aprenderes sobre sexualidade, tirares as tuas dúvidas e testares os teus conhecimentos.
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <button
                  onClick={() => setActiveTab("quiz")}
                  className="btn-primary"
                >
                  Faz o Quiz
                </button>
                <button
                  onClick={() => setActiveTab("duvidas")}
                  className="btn-secondary"
                >
                  Tira as Tuas Dúvidas
                </button>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                🔒 Sem registo • 100% anónimo • Informação confiável
              </p>
            </section>

            {/* Topics Grid */}
            <section>
              <h3 className="text-2xl font-heading font-semibold text-primary mb-6 text-center">
                Explora os Temas
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topics.map((topic) => (
                  <div key={topic.id} className="card hover:border-primary border-2 border-transparent">
                    <div className="text-4xl mb-3">{topic.icon}</div>
                    <h4 className="text-xl font-heading font-semibold mb-2">{topic.title}</h4>
                    <p className="text-gray-600 mb-4">{topic.description}</p>
                    <div className="space-y-2">
                      {topic.articles.slice(0, 2).map((article) => (
                        <details key={article.id} className="group">
                          <summary className="cursor-pointer text-primary hover:underline text-sm font-medium">
                            📄 {article.title}
                          </summary>
                          <div className="mt-2 p-3 bg-gray-50 rounded-lg text-sm text-gray-700">
                            {article.content.split("\n").slice(0, 8).join("\n")}
                            {article.content.split("\n").length > 8 && "..."}
                          </div>
                        </details>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Resources Section */}
            <section className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="text-2xl font-heading font-semibold text-primary mb-6 text-center">
                Recursos em Portugal
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-heading font-semibold text-lg">📞 Linhas de Apoio</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>Linha Saúde Sexual:</strong> 800 202 048</li>
                    <li>• <strong>Linha SIDA:</strong> 800 200 660</li>
                    <li>• <strong>APF:</strong> 21 793 20 44</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-heading font-semibold text-lg">🏥 Onde Ir</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Centros de Saúde (Planeamento Familiar)</li>
                    <li>• Centros de Atendimento a Jovens (CAJ)</li>
                    <li>• APF - Associação para o Planeamento da Família</li>
                    <li>• CheckpointLX (testes rápidos)</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* QUIZ TAB */}
        {activeTab === "quiz" && (
          <div className="max-w-2xl mx-auto">
            {!quizState.showResult ? (
              <div className="card">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm text-gray-500">
                    Pergunta {quizState.currentQuestion + 1} de {quizQuestions.length}
                  </span>
                  <span className="text-primary font-semibold">
                    Pontuação: {quizState.score}
                  </span>
                </div>
                
                <div className="mb-8">
                  <span className="inline-block bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm mb-4">
                    {quizQuestions[quizState.currentQuestion].topic}
                  </span>
                  <h3 className="text-xl font-heading font-semibold">
                    {quizQuestions[quizState.currentQuestion].question}
                  </h3>
                </div>

                <div className="space-y-3">
                  {quizQuestions[quizState.currentQuestion].options.map((option, index) => {
                    let buttonClass = "w-full text-left p-4 rounded-lg border-2 transition ";
                    const isSelected = quizState.selectedAnswer === index;
                    const isCorrect = index === quizQuestions[quizState.currentQuestion].correctAnswer;
                    
                    if (quizState.showExplanation) {
                      if (isCorrect) buttonClass += "border-green-500 bg-green-50";
                      else if (isSelected) buttonClass += "border-red-500 bg-red-50";
                      else buttonClass += "border-gray-200";
                    } else {
                      buttonClass += isSelected ? "border-primary bg-primary/5" : "border-gray-200 hover:border-primary/50";
                    }
                    
                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        disabled={quizState.showExplanation}
                        className={buttonClass}
                      >
                        <span className="font-medium mr-2">
                          {String.fromCharCode(65 + index)}.
                        </span>
                        {option}
                      </button>
                    );
                  })}
                </div>

                {quizState.showExplanation && (
                  <div className="mt-6 p-4 bg-accent/20 rounded-lg">
                    <p className="font-semibold mb-1">💡 Explicação:</p>
                    <p className="text-gray-700">
                      {quizQuestions[quizState.currentQuestion].explanation}
                    </p>
                    <button
                      onClick={nextQuestion}
                      className="btn-primary mt-4 w-full"
                    >
                      {quizState.currentQuestion < quizQuestions.length - 1 ? "Próxima Pergunta" : "Ver Resultados"}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="card text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-heading font-bold mb-2">Quiz Completo!</h3>
                <p className={`text-4xl font-bold mb-4 ${getScoreMessage().color}`}>
                  {quizState.score} / {quizQuestions.length}
                </p>
                <p className={`text-xl font-semibold mb-6 ${getScoreMessage().color}`}>
                  {getScoreMessage().text}
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                  <h4 className="font-semibold mb-2">Sugestões:</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {(quizState.score / quizQuestions.length) < 0.8 && (
                      <li>• Explora mais os tópicos para melhorar os teus conhecimentos</li>
                    )}
                    <li>• Faz o teste novamente para consolidar o aprendizado</li>
                    <li>• Consulta os recursos disponíveis para mais informação</li>
                  </ul>
                </div>
                <button onClick={resetQuiz} className="btn-primary">
                  Refazer Quiz
                </button>
              </div>
            )}
          </div>
        )}

        {/* FAQ TAB */}
        {activeTab === "faq" && (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-primary mb-8 text-center">
              Perguntas Frequentes
            </h2>
            <div className="space-y-4">
              {frequentlyAskedQuestions.map((faq, index) => (
                <div key={index} className="card">
                  <button
                    onClick={() => setShowFaqAnswer(showFaqAnswer === index ? null : index)}
                    className="w-full text-left flex justify-between items-center"
                  >
                    <span className="font-heading font-semibold text-lg pr-4">
                      {faq.question}
                    </span>
                    <span className="text-2xl text-primary">
                      {showFaqAnswer === index ? "−" : "+"}
                    </span>
                  </button>
                  {showFaqAnswer === index && (
                    <div className="mt-4 pt-4 border-t border-gray-200 text-gray-700">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DÚVIDAS TAB */}
        {activeTab === "duvidas" && (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-primary mb-8 text-center">
              Tira as Tuas Dúvidas
            </h2>
            
            {!submitted ? (
              <div className="card">
                <p className="text-gray-600 mb-6">
                  Tens alguma dúvida sobre sexualidade? Preenche o formulário abaixo. 
                  A tua pergunta será respondida por profissionais. <strong>É 100% anónimo.</strong>
                </p>
                <form onSubmit={handleSubmitQuestion} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nome (opcional)
                    </label>
                    <input
                      type="text"
                      value={questionForm.name}
                      onChange={(e) => setQuestionForm({ ...questionForm, name: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="Anónimo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      A tua pergunta *
                    </label>
                    <textarea
                      value={questionForm.question}
                      onChange={(e) => setQuestionForm({ ...questionForm, question: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary h-32 resize-none"
                      placeholder="Escreve a tua dúvida aqui..."
                      required
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full">
                    Enviar Pergunta
                  </button>
                </form>
              </div>
            ) : (
              <div className="card text-center">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-2xl font-heading font-bold mb-2">Pergunta Enviada!</h3>
                <p className="text-gray-600 mb-6">
                  Obrigado pela tua pergunta. Um profissional vai responder em breve.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-primary"
                >
                  Fazer Nova Pergunta
                </button>
              </div>
            )}

            <div className="mt-12 card bg-primary/5 border-primary/20">
              <h3 className="font-heading font-semibold text-lg mb-4">
                Precisas de ajuda imediata?
              </h3>
              <div className="space-y-2 text-gray-700">
                <p>• <strong>Linha Saúde Sexual:</strong> 800 202 048 (gratuita)</p>
                <p>• <strong>Linha SIDA:</strong> 800 200 660</p>
                <p>• <strong>Centro de Saúde</strong> mais próximo</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-auto">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-400 mb-2">
            EduSexual PT - Educação Sexual em Português Europeu
          </p>
          <p className="text-sm text-gray-500">
            Informação baseada em fontes oficiais: DGS, APF, DGE
          </p>
          <p className="text-xs text-gray-600 mt-4">
            Este site não recolhe dados pessoais. Toda a informação é anónima.
          </p>
        </div>
      </footer>
    </div>
  );
}