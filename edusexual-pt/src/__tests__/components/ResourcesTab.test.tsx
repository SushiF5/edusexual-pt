import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ResourcesTab from "@/components/ResourcesTab";

jest.mock("@/i18n/context", () => ({
  useI18n: () => ({
    t: {
      resourcesTitle: "Guias e Recursos",
      resourcesSubtitle: "Guias práticos",
      openGuide: "Abrir guia",
      noGuides: "Sem guias",
      saveAsPdf: "Guardar como PDF",
      download: "Download HTML",
      viewAllGuides: "Ver todos",
      howToPdfTitle: "Como guardar?",
      howToPdfDesc: "Usa a impressão do browser.",
    },
  }),
}));

jest.mock("@/data/content", () => ({
  guides: [
    {
      id: "guia-consentimento",
      title: "Guia de Consentimento",
      description: "Tudo sobre consentimento",
      icon: "🤝",
      audience: "jovens",
      sections: [
        { heading: "O que é", body: "Consentimento é..." },
        { heading: "Como praticar", body: "Comunicação é..." },
      ],
    },
    {
      id: "guia-pais",
      title: "Guia para Pais",
      description: "Como falar com os filhos",
      icon: "👨‍👩‍👧",
      audience: "adultos",
      sections: [
        { heading: "Abertura", body: "Começa por..." },
      ],
    },
    {
      id: "guia-todos",
      title: "Guia Geral",
      description: "Para toda a gente",
      icon: "📚",
      audience: "todos",
      sections: [
        { heading: "Intro", body: "Bem-vindo..." },
      ],
    },
  ],
}));

describe("ResourcesTab", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders title", () => {
    render(<ResourcesTab audience="jovens" />);
    expect(screen.getByText("Guias e Recursos")).toBeInTheDocument();
  });

  it("filters guides by audience", () => {
    render(<ResourcesTab audience="jovens" />);
    expect(screen.getByText("Guia de Consentimento")).toBeInTheDocument();
    expect(screen.getByText("Guia Geral")).toBeInTheDocument();
    expect(screen.queryByText("Guia para Pais")).not.toBeInTheDocument();
  });

  it("shows 'todos' guides for all audiences", () => {
    render(<ResourcesTab audience="criancas" />);
    expect(screen.getByText("Guia Geral")).toBeInTheDocument();
  });

  it("shows no guides message when none match", () => {
    render(<ResourcesTab audience="criancas" />);
    expect(screen.queryByText("Guia para Pais")).not.toBeInTheDocument();
  });

  it("opens guide on click", () => {
    render(<ResourcesTab audience="jovens" />);
    fireEvent.click(screen.getByText("Guia de Consentimento"));
    expect(screen.getByText("O que é")).toBeInTheDocument();
    expect(screen.getByText("Consentimento é...")).toBeInTheDocument();
  });

  it("shows guide sections", () => {
    render(<ResourcesTab audience="jovens" />);
    fireEvent.click(screen.getByText("Guia de Consentimento"));
    expect(screen.getByText("Como praticar")).toBeInTheDocument();
    expect(screen.getByText("Comunicação é...")).toBeInTheDocument();
  });

  it("shows print and download buttons when guide is open", () => {
    render(<ResourcesTab audience="jovens" />);
    fireEvent.click(screen.getByText("Guia de Consentimento"));
    expect(screen.getByText("Guardar como PDF")).toBeInTheDocument();
    expect(screen.getByText("Download HTML")).toBeInTheDocument();
    expect(screen.getByText("Ver todos")).toBeInTheDocument();
  });

  it("returns to guide list when 'Ver todos' is clicked", () => {
    render(<ResourcesTab audience="jovens" />);
    fireEvent.click(screen.getByText("Guia de Consentimento"));
    expect(screen.getByText("O que é")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Ver todos"));
    expect(screen.queryByText("O que é")).not.toBeInTheDocument();
    expect(screen.getByText("Guia de Consentimento")).toBeInTheDocument();
  });

  it("shows how-to section", () => {
    render(<ResourcesTab audience="jovens" />);
    expect(screen.getByText("Como guardar?")).toBeInTheDocument();
  });

  it("has correct download link", () => {
    render(<ResourcesTab audience="jovens" />);
    fireEvent.click(screen.getByText("Guia de Consentimento"));
    const link = screen.getByText("Download HTML").closest("a");
    expect(link).toHaveAttribute("href", "/api/pdf?id=guia-consentimento");
    expect(link).toHaveAttribute("download", "guia-consentimento.html");
  });
});
