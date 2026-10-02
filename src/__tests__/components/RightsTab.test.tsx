import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RightsTab from "@/components/RightsTab";

jest.mock("@/i18n/context", () => ({
  useI18n: () => ({
    t: {
      tabRights: "Direitos",
      tabRightsDesc: "Conhece os teus direitos e linhas de apoio",
      emergencyNotice: "Em caso de emergência médica imediata ou perigo iminente, liga sempre 112.",
      askQuestion: "Tira Dúvidas",
      freeInSns: "Gratuito no SNS",
    },
  }),
}));

jest.mock("@/contexts/DoubtsContext", () => ({
  useDoubts: () => ({
    submitted: false,
    setSubmitted: jest.fn(),
    questionForm: { name: "", question: "" },
    setQuestionForm: jest.fn(),
    isSending: false,
    setIsSending: jest.fn(),
  }),
}));

describe("RightsTab", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders title and subtitle", () => {
    render(<RightsTab audience="jovens" />);
    expect(screen.getByText("Direitos & Apoio Confidencial")).toBeInTheDocument();
    expect(screen.getByText("Conhece os teus direitos e linhas de apoio")).toBeInTheDocument();
  });

  it("renders emergency highlights banner with 112 and SNS 24", () => {
    render(<RightsTab audience="jovens" />);
    const emergencyNumbers = screen.getAllByText("112");
    expect(emergencyNumbers.length).toBeGreaterThan(0);
    expect(screen.getByText(/Ligar 112/i)).toBeInTheDocument();
    const snsElements = screen.getAllByText(/SNS 24/i);
    expect(snsElements.length).toBeGreaterThan(0);
    expect(screen.getByText("808 24 24 24")).toBeInTheDocument();
    expect(screen.getByText(/Ligar SNS 24/i)).toBeInTheDocument();
  });

  it("renders section switcher with three tabs", () => {
    render(<RightsTab audience="jovens" />);
    expect(screen.getByRole("button", { name: /Linhas de Apoio/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Direitos no SNS/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Tira Dúvidas/ })).toBeInTheDocument();
  });

  it("shows search input when not in doubts section", () => {
    render(<RightsTab audience="jovens" />);
    expect(screen.getByPlaceholderText("Pesquisar contacto ou direito...")).toBeInTheDocument();
  });

  it("hides search input in doubts section", () => {
    render(<RightsTab audience="jovens" />);
    fireEvent.click(screen.getByRole("button", { name: /Tira Dúvidas/ }));
    expect(screen.queryByPlaceholderText("Pesquisar contacto ou direito...")).not.toBeInTheDocument();
  });

  it("shows free in SNS note in rights section", () => {
    render(<RightsTab audience="jovens" />);
    fireEvent.click(screen.getByRole("button", { name: /Direitos no SNS/ }));
    expect(screen.getByText(/Gratuito no SNS/i)).toBeInTheDocument();
  });

  it("switches to doubts section when tab clicked", () => {
    render(<RightsTab audience="jovens" />);
    fireEvent.click(screen.getByRole("button", { name: /Tira Dúvidas/ }));
    expect(screen.getByText("Tira Dúvidas")).toBeInTheDocument();
  });

  it("renders emergency notice text", () => {
    render(<RightsTab audience="jovens" />);
    expect(screen.getByText(/em caso de emergência médica imediata/i)).toBeInTheDocument();
  });

  it("shows helpline badges in emergency section", () => {
    render(<RightsTab audience="jovens" />);
    expect(screen.getByText("Emergência Nacional")).toBeInTheDocument();
    expect(screen.getByText("Saúde & Triagem 24/7")).toBeInTheDocument();
  });

  it("shows hours for emergency lines", () => {
    render(<RightsTab audience="jovens" />);
    expect(screen.getByText("24/7 permanente")).toBeInTheDocument();
    expect(screen.getByText("24 horas por dia, 365 dias por ano")).toBeInTheDocument();
  });

  it("shows cost badges in emergency section", () => {
    render(<RightsTab audience="jovens" />);
    const freeBadges = screen.getAllByText("Gratuito");
    expect(freeBadges.length).toBeGreaterThan(0);
    const localCostBadges = screen.getAllByText("Custo de chamada local");
    expect(localCostBadges.length).toBeGreaterThan(0);
  });
});