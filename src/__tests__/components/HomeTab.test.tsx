import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import HomeTab from "@/components/HomeTab";
import { Audience } from "@/types";

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
      audioNotSupported: "Áudio não suportado",
      listen: "Ouvir",
      noTopicsFound: "Nenhum tema encontrado",
      tryOtherTerms: "Tenta outros termos",
       audioPlayer: "Player de áudio",
       loadingTopic: "A carregar tópico…",
       loadAudio: "Carregar áudio",
       tabTools: "Ferramentas Interativas",
       tabRights: "Linhas de Apoio",
    },
  }),
}));

const mockTopics = [
  {
    id: "anatomia-jovens",
    title: "Anatomia",
    description: "Corpo humano",
    icon: "🫀",
    audience: "jovens" as Audience,
    audioUrl: "/audio/anatomia.mp3",
    articles: [
      { id: "art1", title: "Artigo 1", content: "Conteúdo do artigo", category: "Geral" },
    ],
  },
  {
    id: "teste-criancas",
    title: "Teste Crianças",
    description: "Para criancas",
    icon: "🎈",
    audience: "criancas" as Audience,
    articles: [
      { id: "art2", title: "Artigo 2", content: "Conteúdo", category: "Geral" },
    ],
  },
  {
    id: "multi-artigos",
    title: "Multi Artigos",
    description: "Tema com vários artigos",
    icon: "📚",
    audience: "jovens" as Audience,
    articles: [
      { id: "a1", title: "Art A", content: "Corpo A", category: "Cat1" },
      { id: "a2", title: "Art B", content: "Corpo B", category: "Cat2" },
      { id: "a3", title: "Art C", content: "Corpo C", category: "Cat3" },
    ],
  },
  {
    id: "tema-com-audio-artigos",
    title: "Tema Audio",
    description: "Tema com artigos com áudio",
    icon: "🎧",
    audience: "jovens" as Audience,
    articles: [
      { id: "audioart1", title: "Audio Art 1", content: "Corpo", category: "Audio", audioUrl: "/audio/track1.mp3" },
      { id: "audioart2", title: "Audio Art 2", content: "Corpo", category: "Audio" },
    ],
  },
  {
    id: "guia-adultos",
    title: "Guia para Pais e Educadores",
    description: "Como falar sobre sexualidade com os mais novos.",
    icon: "👨‍👩‍👧‍👦",
    audience: "adultos" as Audience,
    articles: [
      { id: "como-falar", title: "Como iniciar a conversa", content: "Conteúdo...", category: "Educação" },
    ],
  },
];

jest.mock("@/data/content-topics", () => ({
  loadTopicsByAudience: jest.fn((audience: Audience) =>
    Promise.resolve(mockTopics.filter((t) => t.audience === audience))
  ),
}));

async function waitForTopics(audience: Audience = "jovens") {
  const firstTopicTitle = audience === "criancas" ? "Teste Crianças" : audience === "adultos" ? "Guia para Pais e Educadores" : "Anatomia";
  await waitFor(() => {
    expect(screen.getByText(firstTopicTitle)).toBeInTheDocument();
  }, { timeout: 2000 });
}

describe("HomeTab", () => {
  it("renders hero for youth audience", async () => {
    render(<HomeTab audience="jovens" />);
    await waitForTopics("jovens");
    expect(screen.getByText("Para jovens")).toBeInTheDocument();
  });

  it("renders hero for children audience", async () => {
    render(<HomeTab audience="criancas" />);
    await waitForTopics("criancas");
    expect(screen.getByText("Para crianças")).toBeInTheDocument();
  });

  it("renders hero for adults audience", async () => {
    render(<HomeTab audience="adultos" />);
    await waitForTopics("adultos");
    expect(screen.getByText("Para adultos")).toBeInTheDocument();
  });

  it("renders topics filtered by audience", async () => {
    render(<HomeTab audience="jovens" />);
    await waitForTopics("jovens");
    const anatomiaElements = screen.getAllByText("Anatomia");
    expect(anatomiaElements.length).toBeGreaterThan(0);
    expect(screen.queryByText("Teste Crianças")).not.toBeInTheDocument();
  });

  it("renders AudioPlayer for topics with audioUrl", async () => {
    render(<HomeTab audience="jovens" />);
    await waitForTopics("jovens");
    const audioSections = screen.getAllByRole("region");
    expect(audioSections.some(r => r.getAttribute("aria-label")?.includes("Audio"))).toBe(true);
  });

  it("renders articles under topic details", async () => {
    render(<HomeTab audience="jovens" />);
    await waitForTopics("jovens");
    const summary = screen.getByText("Multi Artigos");
    fireEvent.click(summary);
    expect(screen.getByText("Art A")).toBeInTheDocument();
    expect(screen.getByText("Art B")).toBeInTheDocument();
    expect(screen.getByText("Art C")).toBeInTheDocument();
  });

  it("renders AudioPlayer for articles with audioUrl inside details", async () => {
    render(<HomeTab audience="jovens" />);
    await waitForTopics("jovens");
    const summary = screen.getByText("Tema Audio");
    fireEvent.click(summary);
    await waitFor(() => {
      expect(screen.getByLabelText(/Reproduzir: Audio Art 1/i)).toBeInTheDocument();
    });
  });

  it("closes other topics on search", async () => {
    render(<HomeTab audience="jovens" />);
    await waitForTopics("jovens");
    const input = screen.getByPlaceholderText("Pesquisar...");
    fireEvent.change(input, { target: { value: "Anatomia" } });
    const anatomiaElements = screen.getAllByText("Anatomia");
    expect(anatomiaElements.length).toBeGreaterThan(0);
    expect(screen.queryByText("Multi Artigos")).not.toBeInTheDocument();
  });

  it("shows no results message when search has no matches", async () => {
    render(<HomeTab audience="jovens" />);
    await waitForTopics("jovens");
    const input = screen.getByPlaceholderText("Pesquisar...");
    fireEvent.change(input, { target: { value: "zzzzzz" } });
    expect(screen.getByText(/Nenhum tema encontrado/)).toBeInTheDocument();
    expect(screen.getByText("Tenta outros termos")).toBeInTheDocument();
  });

  it("includes the search query in the no-results message", async () => {
    render(<HomeTab audience="jovens" />);
    await waitForTopics("jovens");
    const input = screen.getByPlaceholderText("Pesquisar...");
    fireEvent.change(input, { target: { value: "xyz123" } });
    expect(screen.getByText(/xyz123/)).toBeInTheDocument();
  });

  it("renders hero description for each audience", async () => {
    const { rerender } = render(<HomeTab audience="jovens" />);
    await waitForTopics("jovens");
    expect(screen.getByText("Desc jovens")).toBeInTheDocument();
    rerender(<HomeTab audience="criancas" />);
    await waitForTopics("criancas");
    expect(screen.getByText("Desc criancas")).toBeInTheDocument();
    rerender(<HomeTab audience="adultos" />);
    await waitForTopics("adultos");
    expect(screen.getByText("Desc adultos")).toBeInTheDocument();
  });

it("renders portal label badge", async () => {
    render(<HomeTab audience="jovens" />);
    await waitForTopics("jovens");
    expect(screen.getByText("Portal")).toBeInTheDocument();
  });

  it("renders search input with correct aria-label and placeholder", async () => {
    render(<HomeTab audience="jovens" />);
    await waitForTopics("jovens");
    const input = screen.getByLabelText("Pesquisar...");
    expect(input).toHaveAttribute("type", "search");
    expect(input).toHaveAttribute("placeholder", "Pesquisar...");
    expect(input).toHaveValue("");
  });

  it("updates search input value when typing", async () => {
    render(<HomeTab audience="jovens" />);
    await waitForTopics("jovens");
    const input = screen.getByLabelText("Pesquisar...");
    fireEvent.change(input, { target: { value: "Anatomia" } });
    expect(input).toHaveValue("Anatomia");
  });

  it("filters topics by description match", async () => {
    render(<HomeTab audience="jovens" />);
    await waitForTopics("jovens");
    const input = screen.getByPlaceholderText("Pesquisar...");
    fireEvent.change(input, { target: { value: "vários artigos" } });
    expect(screen.getByText("Multi Artigos")).toBeInTheDocument();
    expect(screen.queryByText("Anatomia")).not.toBeInTheDocument();
  });

  it("filters topics by article title match", async () => {
    render(<HomeTab audience="jovens" />);
    await waitForTopics("jovens");
    const input = screen.getByPlaceholderText("Pesquisar...");
    fireEvent.change(input, { target: { value: "Art A" } });
    expect(screen.getByText("Multi Artigos")).toBeInTheDocument();
    expect(screen.queryByText("Anatomia")).not.toBeInTheDocument();
  });

  it("renders article content after opening details", async () => {
    render(<HomeTab audience="jovens" />);
    await waitForTopics("jovens");
    const summary = screen.getByText("Artigo 1");
    fireEvent.click(summary);
    expect(screen.getByText("Conteúdo do artigo")).toBeInTheDocument();
  });

  it("renders article content for multiple articles in a topic", async () => {
    render(<HomeTab audience="jovens" />);
    await waitForTopics("jovens");
    fireEvent.click(screen.getByText("Multi Artigos"));
    expect(screen.getByText("Corpo A")).toBeInTheDocument();
    expect(screen.getByText("Corpo B")).toBeInTheDocument();
    expect(screen.getByText("Corpo C")).toBeInTheDocument();
  });

  it("does not render CTA buttons when setActiveTab is not provided", async () => {
    render(<HomeTab audience="jovens" />);
    await waitForTopics("jovens");
    expect(screen.queryByText("Começar Quiz")).not.toBeInTheDocument();
    expect(screen.queryByText("Tira Dúvidas")).not.toBeInTheDocument();
  });

  it("renders CTA buttons when setActiveTab is provided", async () => {
    render(<HomeTab audience="jovens" setActiveTab={() => {}} />);
    await waitForTopics("jovens");
    expect(screen.getByText(/Começar Quiz/)).toBeInTheDocument();
    expect(screen.getByText(/Ferramentas Interativas/)).toBeInTheDocument();
  });

  it("calls setActiveTab with quiz when quiz button clicked", async () => {
    const setActiveTab = jest.fn();
    render(<HomeTab audience="jovens" setActiveTab={setActiveTab} />);
    await waitForTopics("jovens");
    fireEvent.click(screen.getByText(/Começar Quiz/));
    expect(setActiveTab).toHaveBeenCalledWith("quiz");
    expect(setActiveTab).toHaveBeenCalledTimes(1);
  });

  it("calls setActiveTab with direitos when lines button clicked", async () => {
    const setActiveTab = jest.fn();
    render(<HomeTab audience="jovens" setActiveTab={setActiveTab} />);
    await waitForTopics("jovens");
    fireEvent.click(screen.getByText(/Linhas de Apoio/));
    expect(setActiveTab).toHaveBeenCalledWith("direitos");
    expect(setActiveTab).toHaveBeenCalledTimes(1);
  });

  it("renders topics heading and description", async () => {
    render(<HomeTab audience="jovens" />);
    await waitForTopics("jovens");
    expect(screen.getByText("Explorar")).toBeInTheDocument();
    expect(screen.getByText("Escolhe um tema")).toBeInTheDocument();
  });

  it("renders only topics matching the audience", async () => {
    render(<HomeTab audience="criancas" />);
    await waitForTopics("criancas");
    expect(screen.getByText("Teste Crianças")).toBeInTheDocument();
    expect(screen.queryByText("Multi Artigos")).not.toBeInTheDocument();
    expect(screen.queryByText("Anatomia")).not.toBeInTheDocument();
  });

  it("renders no topics status region when search has no matches", async () => {
    render(<HomeTab audience="jovens" />);
    await waitForTopics("jovens");
    fireEvent.change(screen.getByPlaceholderText("Pesquisar..."), {
      target: { value: "zzzzzz" },
    });
    const status = screen.getByRole("status");
    expect(status).toHaveAttribute("aria-live", "polite");
  });

  it("does not show no-results message when search is empty", async () => {
    render(<HomeTab audience="jovens" />);
    await waitForTopics("jovens");
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("does not show no-results message for matching search", async () => {
    render(<HomeTab audience="jovens" />);
    await waitForTopics("jovens");
    fireEvent.change(screen.getByPlaceholderText("Pesquisar..."), {
      target: { value: "Anatomia" },
    });
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("renders special icon for anatomia-jovens topic", async () => {
    render(<HomeTab audience="jovens" />);
    await waitForTopics("jovens");
    const iconContainers = screen.getAllByRole("img", { hidden: true });
    expect(iconContainers.some(el => el.textContent === "🧬")).toBe(true);
  });

  it("renders AudioPlayer for topic with audioUrl", async () => {
    render(<HomeTab audience="jovens" />);
    await waitForTopics("jovens");
    const audioSections = screen.getAllByLabelText(/Audio: Anatomia/i);
    expect(audioSections.length).toBeGreaterThan(0);
  });

  it("does not render topic AudioPlayer when topic has no audioUrl", async () => {
    render(<HomeTab audience="jovens" />);
    await waitForTopics("jovens");
    expect(screen.queryByLabelText(/Audio: Multi Artigos/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/Audio: Tema Audio/i)).not.toBeInTheDocument();
  });
});