import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RelationshipsConsentTool from "@/components/RelationshipsConsentTool";

describe("RelationshipsConsentTool", () => {
  it("renders three sub-navigation tabs", () => {
    render(<RelationshipsConsentTool />);
    expect(screen.getByRole("button", { name: /modelo fries de consentimento/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sinais verdes vs sinais de alerta/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /scripts de comunicação real/i })).toBeInTheDocument();
  });

  it("defaults to FRIES tab and shows all 5 principles", () => {
    render(<RelationshipsConsentTool />);
    const principles = screen.getAllByRole("heading", { level: 4, name: /livremente concedido|reversível a qualquer momento|informado|entusiasmado & mútuo|específico/i });
    expect(principles).toHaveLength(5);
  });

  it("renders each FRIES principle with letter, translation, explanation, example, myth and fact", () => {
    render(<RelationshipsConsentTool />);
    expect(screen.getByRole("heading", { level: 4, name: /livremente concedido/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 4, name: /reversível a qualquer momento/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 4, name: /informado/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 4, name: /entusiasmado & mútuo/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 4, name: /específico/i })).toBeInTheDocument();
    const examples = screen.getAllByText(/exemplo prático:/i);
    expect(examples.length).toBe(5);
    const myths = screen.getAllByText(/mito:/i);
    expect(myths.length).toBe(5);
    const facts = screen.getAllByText(/facto:/i);
    expect(facts.length).toBe(5);
  });

  it("switches to Flags tab and shows filter buttons", () => {
    render(<RelationshipsConsentTool />);
    fireEvent.click(screen.getByRole("button", { name: /sinais verdes vs sinais de alerta/i }));
    expect(screen.getByRole("button", { name: /todos \(\d+\)/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /🟢 sinais verdes/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /🟡 atenção/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /🔴 sinais de alerta/i })).toBeInTheDocument();
  });

  it("filters flags by type when clicking filter buttons", () => {
    render(<RelationshipsConsentTool />);
    fireEvent.click(screen.getByRole("button", { name: /sinais verdes vs sinais de alerta/i }));
    fireEvent.click(screen.getByRole("button", { name: /🟢 sinais verdes/i }));
    const greenFlags = screen.getAllByText(/sinal verde \(saudável\)/i);
    expect(greenFlags.length).toBeGreaterThan(0);
    const yellowFlags = screen.queryAllByText(/atenção \(conversar\)/i);
    expect(yellowFlags.length).toBe(0);
    const redFlags = screen.queryAllByText(/sinal de alerta \(tóxico\/abusivo\)/i);
    expect(redFlags.length).toBe(0);
  });

  it("shows flag details: title, category, description, example, advice", () => {
    render(<RelationshipsConsentTool />);
    fireEvent.click(screen.getByRole("button", { name: /sinais verdes vs sinais de alerta/i }));
    expect(screen.getByRole("heading", { level: 4, name: /respeito pelos teus 'nãos' e limites/i })).toBeInTheDocument();
    const manifestations = screen.getAllByText(/como se manifesta:/i);
    expect(manifestations.length).toBeGreaterThan(0);
    const advice = screen.getAllByText(/o que fazer \/ conselho:/i);
    expect(advice.length).toBeGreaterThan(0);
  });

  it("switches to Scripts tab and shows category filters", () => {
    render(<RelationshipsConsentTool />);
    fireEvent.click(screen.getByRole("button", { name: /scripts de comunicação real/i }));
    expect(screen.getByRole("button", { name: /todos os cenários/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /limites/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /contracepcao/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /digital/i })).toBeInTheDocument();
  });

  it("filters scripts by category", () => {
    render(<RelationshipsConsentTool />);
    fireEvent.click(screen.getByRole("button", { name: /scripts de comunicação real/i }));
    fireEvent.click(screen.getByRole("button", { name: /contracepcao/i }));
    const scripts = screen.getAllByText(/cenário: contracepcao/i);
    expect(scripts.length).toBeGreaterThan(0);
  });

  it("renders script details: scenario, what to say, why it works", () => {
    render(<RelationshipsConsentTool />);
    fireEvent.click(screen.getByRole("button", { name: /scripts de comunicação real/i }));
    expect(screen.getByText(/propor o uso de preservativo sem vergonha/i)).toBeInTheDocument();
    const whyItWorks = screen.getAllByText(/por que funciona:/i);
    expect(whyItWorks.length).toBeGreaterThan(0);
  });

  it("renders script with what to say content", () => {
    render(<RelationshipsConsentTool />);
    fireEvent.click(screen.getByRole("button", { name: /scripts de comunicação real/i }));
    expect(screen.getByText(/adoro estar contigo/i)).toBeInTheDocument();
  });
});