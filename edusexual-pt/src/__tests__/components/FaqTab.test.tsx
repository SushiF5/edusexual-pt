import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FaqTab from "@/components/FaqTab";

jest.mock("@/i18n/context", () => ({
  useI18n: () => ({
    t: {
      faqTitle: "Perguntas Frequentes",
      faqDescCrianca: "Respostas simples",
      faqDescJovem: "Dúvidas comuns",
      faqDescAdulto: "Dúvidas de pais",
    },
  }),
}));

jest.mock("@/data/content", () => ({
  frequentlyAskedQuestions: [
    {
      question: "O que é consentimento?",
      answer: "Consentimento é dizer sim livremente.",
      audience: ["jovens", "adultos"],
    },
    {
      question: "Como usar preservativo?",
      answer: "Abre com cuidado e coloca na ponta.",
      audience: ["jovens"],
    },
    {
      question: "Onde posso ir ao médico?",
      answer: "No centro de saúde mais perto.",
      audience: ["criancas", "jovens", "adultos"],
    },
  ],
}));

describe("FaqTab", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders FAQ title", () => {
    render(<FaqTab audience="jovens" />);
    expect(screen.getByText("Perguntas Frequentes")).toBeInTheDocument();
  });

  it("renders description based on audience", () => {
    render(<FaqTab audience="jovens" />);
    expect(screen.getByText("Dúvidas comuns")).toBeInTheDocument();
  });

  it("filters FAQs by audience", () => {
    render(<FaqTab audience="jovens" />);
    expect(screen.getByText("O que é consentimento?")).toBeInTheDocument();
    expect(screen.getByText("Como usar preservativo?")).toBeInTheDocument();
    expect(screen.getByText("Onde posso ir ao médico?")).toBeInTheDocument();
  });

  it("does not show FAQ not in audience", () => {
    render(<FaqTab audience="criancas" />);
    expect(screen.queryByText("Como usar preservativo?")).not.toBeInTheDocument();
  });

  it("expands FAQ on click", () => {
    render(<FaqTab audience="jovens" />);
    const button = screen.getByText("O que é consentimento?");
    fireEvent.click(button);
    expect(screen.getByText("Consentimento é dizer sim livremente.")).toBeInTheDocument();
  });

  it("collapses FAQ on second click", () => {
    render(<FaqTab audience="jovens" />);
    const button = screen.getByText("O que é consentimento?");
    fireEvent.click(button);
    expect(screen.getByText("Consentimento é dizer sim livremente.")).toBeInTheDocument();
    fireEvent.click(button);
    expect(screen.queryByText("Consentimento é dizer sim livremente.")).not.toBeInTheDocument();
  });

  it("only one FAQ expanded at a time", () => {
    render(<FaqTab audience="jovens" />);
    fireEvent.click(screen.getByText("O que é consentimento?"));
    expect(screen.getByText("Consentimento é dizer sim livremente.")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Como usar preservativo?"));
    expect(screen.getByText("Abre com cuidado e coloca na ponta.")).toBeInTheDocument();
    expect(screen.queryByText("Consentimento é dizer sim livremente.")).not.toBeInTheDocument();
  });

  it("has correct aria attributes", () => {
    render(<FaqTab audience="jovens" />);
    const button = screen.getByText("O que é consentimento?");
    expect(button.closest("button")).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(button);
    expect(button.closest("button")).toHaveAttribute("aria-expanded", "true");
  });

  it("renders children audience description", () => {
    render(<FaqTab audience="criancas" />);
    expect(screen.getByText("Respostas simples")).toBeInTheDocument();
  });
});
