import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import QuizTab from "@/components/QuizTab";

jest.mock("@/i18n/context", () => ({
  useI18n: () => ({
    t: {
      questionOf: "Pergunta",
      points: "Pontos",
      next: "Seguinte",
      seeResult: "Ver Resultado",
      quizFinished: "Terminado!",
      quizPerfect: "Perfeito!",
      quizGood: "Bom!",
      quizTryAgain: "Tenta de novo",
      tryAgain: "Tentar",
      noQuizQuestions: "Sem perguntas",
      exploreTopics: "Explorar",
      startQuiz: "Começar Quiz",
    },
  }),
}));

jest.mock("@/data/content", () => ({
  quizQuestions: [
    {
      id: "q1",
      question: "Pergunta 1?",
      options: ["Resposta A", "Resposta B", "Resposta C"],
      correctAnswer: 0,
      explanation: "A é a correta",
      topic: "geral",
      audience: "jovens",
    },
    {
      id: "q2",
      question: "Pergunta 2?",
      options: ["Opção X", "Opção Y", "Opção Z"],
      correctAnswer: 1,
      explanation: "Y é a correta",
      topic: "geral",
      audience: "jovens",
    },
  ],
}));

describe("QuizTab", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders quiz question", () => {
    render(<QuizTab audience="jovens" />);
    expect(screen.getByText("Pergunta 1?")).toBeInTheDocument();
  });

  it("shows no questions message when no questions for audience", () => {
    render(<QuizTab audience="criancas" />);
    expect(screen.getByText("Sem perguntas")).toBeInTheDocument();
  });

  it("selects an answer and highlights correct/incorrect", () => {
    render(<QuizTab audience="jovens" />);
    fireEvent.click(screen.getByText("Resposta A"));
    expect(screen.getByText("A é a correta")).toBeInTheDocument();
  });

  it("enables next button after selecting answer", () => {
    render(<QuizTab audience="jovens" />);
    fireEvent.click(screen.getByText("Resposta A"));
    const nextBtn = screen.getByText("Seguinte");
    expect(nextBtn).not.toBeDisabled();
  });

  it("navigates to next question", () => {
    render(<QuizTab audience="jovens" />);
    fireEvent.click(screen.getByText("Resposta A"));
    fireEvent.click(screen.getByText("Seguinte"));
    expect(screen.getByText("Pergunta 2?")).toBeInTheDocument();
  });

  it("shows see result button on last question", () => {
    render(<QuizTab audience="jovens" />);
    fireEvent.click(screen.getByText("Resposta A"));
    fireEvent.click(screen.getByText("Seguinte"));
    fireEvent.click(screen.getByText("Opção Y"));
    expect(screen.getByText("Ver Resultado")).toBeInTheDocument();
  });

  it("shows results screen with score after quiz completion", () => {
    render(<QuizTab audience="jovens" />);
    fireEvent.click(screen.getByText("Resposta A"));
    fireEvent.click(screen.getByText("Seguinte"));
    fireEvent.click(screen.getByText("Opção Y"));
    fireEvent.click(screen.getByText("Ver Resultado"));
    expect(screen.getByText("Terminado!")).toBeInTheDocument();
    expect(screen.getByText("Perfeito!")).toBeInTheDocument();
  });

  it("shows quizGood for partial score", () => {
    render(<QuizTab audience="jovens" />);
    fireEvent.click(screen.getByText("Resposta B"));
    fireEvent.click(screen.getByText("Seguinte"));
    fireEvent.click(screen.getByText("Opção Y"));
    fireEvent.click(screen.getByText("Ver Resultado"));
    expect(screen.getByText("Bom!")).toBeInTheDocument();
  });

  it("restarts quiz via try again", () => {
    render(<QuizTab audience="jovens" />);
    fireEvent.click(screen.getByText("Resposta A"));
    fireEvent.click(screen.getByText("Seguinte"));
    fireEvent.click(screen.getByText("Opção Y"));
    fireEvent.click(screen.getByText("Ver Resultado"));
    fireEvent.click(screen.getByText("Tentar"));
    expect(screen.getByText("Pergunta 1?")).toBeInTheDocument();
  });
});
