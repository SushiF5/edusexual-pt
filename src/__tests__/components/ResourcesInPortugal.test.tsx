import React from "react";
import { render, screen } from "@testing-library/react";
import { I18nProvider } from "@/i18n/context";
import ResourcesInPortugal from "@/components/ResourcesInPortugal";

function mount(ui: React.ReactNode) {
  return render(<I18nProvider>{ui}</I18nProvider>);
}

describe("ResourcesInPortugal", () => {
  it("renders emergency notice", () => {
    mount(<ResourcesInPortugal />);
    const emergencyText = screen.getAllByText(/em caso de emergência médica imediata/i);
    expect(emergencyText.length).toBe(2);
    expect(screen.getByText("112")).toBeInTheDocument();
  });

  it("renders helplines directory section", () => {
    mount(<ResourcesInPortugal />);
    expect(screen.getByText(/diretório de linhas telefónicas/i)).toBeInTheDocument();
  });

  it("renders all helplines for jovens (default audience)", () => {
    mount(<ResourcesInPortugal audience="jovens" />);
    expect(screen.getByText("Sexualidade em Linha (IPDJ / APF)")).toBeInTheDocument();
    expect(screen.getByText("SNS 24 — Triagem e Saúde")).toBeInTheDocument();
    expect(screen.getByText("SOS Criança (IAC)")).toBeInTheDocument();
    expect(screen.getByText("Linha de Apoio à Vítima (APAV)")).toBeInTheDocument();
    expect(screen.getByText("Linha Juventude")).toBeInTheDocument();
    expect(screen.getByText("Linha e Apoio LGBTI+ (Rede ex aequo / ILGA)")).toBeInTheDocument();
    expect(screen.getByText("Número Nacional de Emergência")).toBeInTheDocument();
  });

  it("filters helplines for crianças audience", () => {
    mount(<ResourcesInPortugal audience="criancas" />);
    expect(screen.queryByText("Sexualidade em Linha (IPDJ / APF)")).not.toBeInTheDocument();
    expect(screen.getByText("SNS 24 — Triagem e Saúde")).toBeInTheDocument();
    expect(screen.getByText("SOS Criança (IAC)")).toBeInTheDocument();
    expect(screen.queryByText("Linha de Apoio à Vítima (APAV)")).not.toBeInTheDocument();
    expect(screen.queryByText("Linha Juventude")).not.toBeInTheDocument();
    expect(screen.queryByText("Linha e Apoio LGBTI+ (Rede ex aequo / ILGA)")).not.toBeInTheDocument();
    expect(screen.getByText("Número Nacional de Emergência")).toBeInTheDocument();
  });

  it("filters helplines for adultos audience", () => {
    mount(<ResourcesInPortugal audience="adultos" />);
    expect(screen.getByText("Sexualidade em Linha (IPDJ / APF)")).toBeInTheDocument();
    expect(screen.getByText("SNS 24 — Triagem e Saúde")).toBeInTheDocument();
    expect(screen.queryByText("SOS Criança (IAC)")).not.toBeInTheDocument();
    expect(screen.getByText("Linha de Apoio à Vítima (APAV)")).toBeInTheDocument();
    expect(screen.queryByText("Linha Juventude")).not.toBeInTheDocument();
    expect(screen.getByText("Linha e Apoio LGBTI+ (Rede ex aequo / ILGA)")).toBeInTheDocument();
    expect(screen.getByText("Número Nacional de Emergência")).toBeInTheDocument();
  });

  it("shows phone numbers as clickable tel links", () => {
    mount(<ResourcesInPortugal />);
    const apavLink = screen.getByText("116 006").closest("a");
    expect(apavLink).toHaveAttribute("href", "tel:116006");
    const snsLink = screen.getByText("808 24 24 24").closest("a");
    expect(snsLink).toHaveAttribute("href", "tel:808242424");
  });

  it("shows cost badges for helplines", () => {
    mount(<ResourcesInPortugal />);
    const costBadges = screen.getAllByText("Gratuito");
    expect(costBadges.length).toBeGreaterThan(0);
    const localCostBadges = screen.getAllByText("Custo de chamada local");
    expect(localCostBadges.length).toBe(2);
    expect(screen.getByText("Custo de chamada móvel nacional")).toBeInTheDocument();
  });

  it("shows anonymous badge for applicable helplines", () => {
    mount(<ResourcesInPortugal />);
    const anonBadges = screen.getAllByText("🔒 Anónimo");
    expect(anonBadges.length).toBe(5);
  });

  it("shows website links for helplines that have them", () => {
    mount(<ResourcesInPortugal />);
    const siteLinks = screen.getAllByText("🌐 Site");
    expect(siteLinks.length).toBe(6);
    const apavLi = screen.getByText("Linha de Apoio à Vítima (APAV)").closest("li");
    const apavSite = apavLi?.querySelector("a[href='https://apav.pt']");
    expect(apavSite).toBeInTheDocument();
  });

  it("renders free services note", () => {
    mount(<ResourcesInPortugal />);
    const freeNotes = screen.getAllByText(/consultas de planeamento familiar.*são 100% gratuitos/i);
    expect(freeNotes.length).toBe(2);
  });

  it("renders legal rights section", () => {
    mount(<ResourcesInPortugal />);
    expect(screen.getByText("Os Teus Direitos")).toBeInTheDocument();
  });

  it("renders all legal rights from data", () => {
    mount(<ResourcesInPortugal />);
    expect(screen.getByText("Acesso Gratuito e Universal ao Planeamento Familiar")).toBeInTheDocument();
    expect(screen.getByText("Autonomia e Sigilo Médico para Jovens")).toBeInTheDocument();
    expect(screen.getByText("Educação Sexual Obrigatória nas Escolas")).toBeInTheDocument();
    expect(screen.getByText("Direito à PEP e Testes Rápidos em Urgência")).toBeInTheDocument();
    expect(screen.getByText("Proteção Legal Contra Divulgação Não-Autorizada de Imagens Íntimas")).toBeInTheDocument();
  });

  it("shows legal basis for each right", () => {
    mount(<ResourcesInPortugal />);
    expect(screen.getByText(/Lei n\.º 3\/84/i)).toBeInTheDocument();
    expect(screen.getByText(/Código Deontológico/i)).toBeInTheDocument();
    expect(screen.getByText(/Lei n\.º 60\/2009/i)).toBeInTheDocument();
    expect(screen.getByText(/Norma da Direção-Geral da Saúde/i)).toBeInTheDocument();
    expect(screen.getByText(/Artigo 192.º e 193.º do Código Penal/i)).toBeInTheDocument();
  });

  it("shows practical application for each right", () => {
    mount(<ResourcesInPortugal />);
    expect(screen.getByText(/não precisas de pagar taxa moderadora/i)).toBeInTheDocument();
    expect(screen.getByText(/não pode contactar os pais/i)).toBeInTheDocument();
    expect(screen.getByText(/mínimo de 6 a 12 horas/i)).toBeInTheDocument();
    expect(screen.getByText(/dirige-te à urgência/i)).toBeInTheDocument();
    expect(screen.getByText(/podes apresentar queixa/i)).toBeInTheDocument();
  });

  it("shows target audience for each right", () => {
    mount(<ResourcesInPortugal />);
    expect(screen.getByText("Todos os cidadãos e residentes em Portugal")).toBeInTheDocument();
    expect(screen.getByText("Jovens e Adolescentes")).toBeInTheDocument();
    expect(screen.getByText("Alunos do Ensino Básico e Secundário")).toBeInTheDocument();
    expect(screen.getByText("População em Geral")).toBeInTheDocument();
    expect(screen.getByText("Jovens e Adultos")).toBeInTheDocument();
  });
});