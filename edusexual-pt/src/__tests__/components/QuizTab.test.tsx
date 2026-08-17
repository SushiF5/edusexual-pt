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
    jest.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
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

  it("shows quizTryAgain for failing score", () => {
    render(<QuizTab audience="jovens" />);
    fireEvent.click(screen.getByText("Resposta B"));
    fireEvent.click(screen.getByText("Seguinte"));
    fireEvent.click(screen.getByText("Opção X"));
    fireEvent.click(screen.getByText("Ver Resultado"));
    expect(screen.getByText("Tenta de novo")).toBeInTheDocument();
  });

  it("shows quizGood for exactly half score", () => {
    render(<QuizTab audience="jovens" />);
    fireEvent.click(screen.getByText("Resposta B"));
    fireEvent.click(screen.getByText("Seguinte"));
    fireEvent.click(screen.getByText("Opção Y"));
    fireEvent.click(screen.getByText("Ver Resultado"));
    expect(screen.getByText("Bom!")).toBeInTheDocument();
  });

  it("renders progress bar with correct aria attributes", () => {
    render(<QuizTab audience="jovens" />);
    const progress = screen.getByRole("progressbar");
    expect(progress).toHaveAttribute("aria-valuenow", "1");
    expect(progress).toHaveAttribute("aria-valuemin", "1");
    expect(progress).toHaveAttribute("aria-valuemax", "2");
    expect(progress).toHaveAttribute("aria-label", "Pergunta 1 de 2");
  });

  it("updates progress bar aria attributes on next question", () => {
    render(<QuizTab audience="jovens" />);
    fireEvent.click(screen.getByText("Resposta A"));
    fireEvent.click(screen.getByText("Seguinte"));
    const progress = screen.getByRole("progressbar");
    expect(progress).toHaveAttribute("aria-valuenow", "2");
  });

  it("renders points counter", () => {
    render(<QuizTab audience="jovens" />);
    expect(screen.getByText(/Pontos: 0/)).toBeInTheDocument();
  });

  it("increments points on correct answer", () => {
    render(<QuizTab audience="jovens" />);
    fireEvent.click(screen.getByText("Resposta A"));
    expect(screen.getByText(/Pontos: 1/)).toBeInTheDocument();
  });

  it("does not change score on incorrect answer", () => {
    render(<QuizTab audience="jovens" />);
    fireEvent.click(screen.getByText("Resposta B"));
    expect(screen.getByText(/Pontos: 0/)).toBeInTheDocument();
  });

  it("disables answer buttons after selecting one", () => {
    render(<QuizTab audience="jovens" />);
    fireEvent.click(screen.getByText("Resposta A"));
    expect(screen.getByText("Resposta A").closest("button")).toBeDisabled();
    expect(screen.getByText("Resposta B").closest("button")).toBeDisabled();
  });

  it("ignores clicks on answers after explanation shown", () => {
    render(<QuizTab audience="jovens" />);
    fireEvent.click(screen.getByText("Resposta A"));
    fireEvent.click(screen.getByText("Resposta B"));
    expect(screen.getByText(/Pontos: 1/)).toBeInTheDocument();
  });

  it("renders question counter", () => {
    render(<QuizTab audience="jovens" />);
    expect(screen.getByText(/Pergunta 1 \/ 2/)).toBeInTheDocument();
  });

  it("shows option letters in aria-label", () => {
    render(<QuizTab audience="jovens" />);
    const btn = screen.getByLabelText(/A\) Resposta A/);
    expect(btn).toBeInTheDocument();
  });

  it("shows correct answer marker after selecting wrong answer", () => {
    render(<QuizTab audience="jovens" />);
    fireEvent.click(screen.getByText("Resposta B"));
    expect(screen.getByLabelText(/A\) Resposta A - Resposta correta/)).toBeInTheDocument();
    expect(screen.getByLabelText(/B\) Resposta B - Resposta incorreta/)).toBeInTheDocument();
  });

  it("persists quiz state to localStorage after answering", () => {
    render(<QuizTab audience="jovens" />);
    fireEvent.click(screen.getByText("Resposta A"));
    fireEvent.click(screen.getByText("Seguinte"));
    // Now currentQuestion === 1, which triggers saveState
    const saved = localStorage.getItem("edusexual-quiz-jovens");
    expect(saved).not.toBeNull();
    const parsed = JSON.parse(saved!);
    expect(parsed.currentQuestion).toBe(1);
    expect(parsed.score).toBe(1);
  });

  it("clears localStorage when quiz finishes", () => {
    render(<QuizTab audience="jovens" />);
    fireEvent.click(screen.getByText("Resposta A"));
    fireEvent.click(screen.getByText("Seguinte"));
    fireEvent.click(screen.getByText("Opção Y"));
    fireEvent.click(screen.getByText("Ver Resultado"));
    expect(localStorage.getItem("edusexual-quiz-jovens")).toBeNull();
  });

  it("restores saved quiz state from localStorage", () => {
    localStorage.setItem(
      "edusexual-quiz-jovens",
      JSON.stringify({ currentQuestion: 1, score: 1, showResult: false })
    );
    render(<QuizTab audience="jovens" />);
    expect(screen.getByText("Pergunta 2?")).toBeInTheDocument();
    expect(screen.getByText(/Pontos: 1/)).toBeInTheDocument();
  });

  it("starts fresh when saved state is invalid (no currentQuestion)", () => {
    localStorage.setItem(
      "edusexual-quiz-jovens",
      JSON.stringify({ invalid: true })
    );
    render(<QuizTab audience="jovens" />);
    expect(screen.getByText("Pergunta 1?")).toBeInTheDocument();
  });

  it("starts fresh when saved state JSON is corrupt", () => {
    localStorage.setItem("edusexual-quiz-jovens", "{not valid json");
    render(<QuizTab audience="jovens" />);
    expect(screen.getByText("Pergunta 1?")).toBeInTheDocument();
  });

  it("starts fresh when saved question index is out of bounds", () => {
    localStorage.setItem(
      "edusexual-quiz-jovens",
      JSON.stringify({ currentQuestion: 99, score: 5, showResult: false })
    );
    render(<QuizTab audience="jovens" />);
    expect(screen.getByText("Pergunta 1?")).toBeInTheDocument();
  });

  it("clears state on result screen reset", () => {
    render(<QuizTab audience="jovens" />);
    fireEvent.click(screen.getByText("Resposta A"));
    fireEvent.click(screen.getByText("Seguinte"));
    fireEvent.click(screen.getByText("Opção Y"));
    fireEvent.click(screen.getByText("Ver Resultado"));
    fireEvent.click(screen.getByText("Tentar"));
    expect(localStorage.getItem("edusexual-quiz-jovens")).toBeNull();
  });

  it("renders all 3 options for first question", () => {
    render(<QuizTab audience="jovens" />);
    expect(screen.getByText("Resposta A")).toBeInTheDocument();
    expect(screen.getByText("Resposta B")).toBeInTheDocument();
    expect(screen.getByText("Resposta C")).toBeInTheDocument();
  });

  it("renders the quiz explanation after answering", () => {
    render(<QuizTab audience="jovens" />);
    fireEvent.click(screen.getByText("Resposta A"));
    expect(screen.getByText("A é a correta")).toBeInTheDocument();
  });
});
