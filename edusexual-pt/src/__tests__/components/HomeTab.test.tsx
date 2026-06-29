import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import HomeTab from "@/components/HomeTab";

jest.mock("@/i18n/context", () => ({
  useI18n: () => ({
    t: {
      portalLabel: "Portal",
      heroTitleCrianca: "Para crianças",
      heroTitleJovem: "Para jovens",
      heroTitleAdulto: "Para adultos",
      heroDescCrianca: "Desc criancas",
      heroDescJovem: "Desc jovens",
      heroDescAdulto: "Desc adultos",
      startQuiz: "Começar Quiz",
      askQuestion: "Tira Dúvidas",
      exploreTopics: "Explorar",
      exploreTopicsDesc: "Escolhe um tema",
      searchTopics: "Pesquisar...",
      home: "Início",
    },
  }),
}));

jest.mock("@/data/content", () => ({
  topics: [
    {
      id: "anatomia-jovens",
      title: "Anatomia",
      slug: "anatomia",
      description: "Corpo humano",
      icon: "🫀",
      audience: "jovens",
      audioUrl: "/audio/anatomia.mp3",
      articles: [
        { id: "art1", title: "Artigo 1", content: "Conteúdo do artigo", category: "Geral" },
      ],
    },
    {
      id: "teste-criancas",
      title: "Teste",
      slug: "teste",
      description: "Para criancas",
      icon: "🎈",
      audience: "criancas",
      articles: [
        { id: "art2", title: "Artigo 2", content: "Conteúdo", category: "Geral" },
      ],
    },
  ],
}));

describe("HomeTab", () => {
  it("renders hero for youth audience", () => {
    render(<HomeTab audience="jovens" />);
    expect(screen.getByText("Para jovens")).toBeInTheDocument();
  });

  it("renders hero for children audience", () => {
    render(<HomeTab audience="criancas" />);
    expect(screen.getByText("Para crianças")).toBeInTheDocument();
  });

  it("renders topics filtered by audience", () => {
    render(<HomeTab audience="jovens" />);
    const headings = screen.getAllByRole("heading", { level: 4 });
    expect(headings.map(h => h.textContent)).toContain("Anatomia");
    expect(screen.queryByText("Teste")).not.toBeInTheDocument();
  });

  it("renders AudioPlayer for topics with audioUrl", () => {
    render(<HomeTab audience="jovens" />);
    const audioSections = screen.getAllByRole("region");
    expect(audioSections.some(r => r.getAttribute("aria-label")?.includes("Audio"))).toBe(true);
  });

  it("filters topics by search query", () => {
    render(<HomeTab audience="jovens" />);
    const input = screen.getByLabelText("Pesquisar...");
    fireEvent.change(input, { target: { value: "Corpo" } });
    expect(screen.getByText("Corpo humano")).toBeInTheDocument();
  });

  it("shows no topics when search has no matches", () => {
    render(<HomeTab audience="jovens" />);
    const input = screen.getByLabelText("Pesquisar...");
    fireEvent.change(input, { target: { value: "zzzzzz" } });
    const headings = screen.queryAllByRole("heading", { level: 4 });
    expect(headings.length).toBe(0);
  });
});
