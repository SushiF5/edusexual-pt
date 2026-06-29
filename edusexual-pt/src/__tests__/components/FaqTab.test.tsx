import React from "react";
import { render, screen } from "@testing-library/react";
import FaqTab from "@/components/FaqTab";

jest.mock("@/i18n/context", () => ({
  useI18n: () => ({
    t: {
      faqTitle: "Perguntas Frequentes",
      faqDescCrianca: "Para crianças",
      faqDescJovem: "Para jovens",
      faqDescAdulto: "Para adultos",
    },
  }),
}));

jest.mock("@/data/content", () => ({
  frequentlyAskedQuestions: [
    { question: "FAQ para jovens?", answer: "Resposta jovem.", audience: ["jovens"] },
    { question: "FAQ para adultos?", answer: "Resposta adulto.", audience: ["adultos"] },
    { question: "FAQ para criancas?", answer: "Resposta crianca.", audience: ["criancas"] },
    { question: "FAQ geral?", answer: "Resposta geral.", audience: ["criancas", "jovens"] },
  ],
}));

describe("FaqTab", () => {
  it("renders FAQ title", () => {
    render(<FaqTab audience="jovens" />);
    expect(screen.getByText("Perguntas Frequentes")).toBeInTheDocument();
  });

  it("shows only youth questions for youth audience", () => {
    render(<FaqTab audience="jovens" />);
    expect(screen.getByText("FAQ para jovens?")).toBeInTheDocument();
    expect(screen.getByText("FAQ geral?")).toBeInTheDocument();
    expect(screen.queryByText("FAQ para adultos?")).not.toBeInTheDocument();
    expect(screen.queryByText("FAQ para criancas?")).not.toBeInTheDocument();
  });

  it("shows only adult questions for adult audience", () => {
    render(<FaqTab audience="adultos" />);
    expect(screen.getByText("FAQ para adultos?")).toBeInTheDocument();
    expect(screen.queryByText("FAQ para jovens?")).not.toBeInTheDocument();
  });

  it("shows audience tag description", () => {
    render(<FaqTab audience="criancas" />);
    expect(screen.getByText("Para crianças")).toBeInTheDocument();
  });
});
