import React from "react";
import { render, screen } from "@testing-library/react";
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
    },
  }),
}));

jest.mock("@/data/content", () => ({
  quizQuestions: [
    {
      id: "q1",
      question: "Qual é a resposta?",
      options: ["A", "B", "C", "D"],
      correctAnswer: 0,
      explanation: "Porque sim",
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
    expect(screen.getByText("Qual é a resposta?")).toBeInTheDocument();
  });

  it("shows no questions message when no questions for audience", () => {
    render(<QuizTab audience="criancas" />);
    expect(screen.getByText("Sem perguntas")).toBeInTheDocument();
  });

  it("renders question count", () => {
    render(<QuizTab audience="jovens" />);
    expect(screen.getByText("Pergunta 1 / 1")).toBeInTheDocument();
  });
});
