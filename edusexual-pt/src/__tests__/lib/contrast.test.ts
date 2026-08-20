import {
  contrastRatio,
  hexToRgb,
  meetsContrast,
  relativeLuminance,
  threshold,
} from "@/lib/contrast";

/**
 * Auditoria de contraste (WCAG 2.1 — 1.4.3) para a paleta do EduSexual PT.
 * Estes testes funcionam como guarda de regressão: se alguém alterar as cores
 * do tema quebrando o contraste mínimo AA, o teste falha.
 *
 * Cores canónicas (ver src/app/globals.css e SPEC.md):
 *   primary       #2D5A5A   secondary   #F4A261
 *   background     #FAFAF9  footer bg   #1F2937 (gray-800) / #0b0f19 (gray-950)
 *   gray-300      #D1D5DB   white       #FFFFFF
 */
const PALETTE = {
  white: "#FFFFFF",
  primary: "#2D5A5A",
  secondary: "#F4A261",
  background: "#FAFAF9",
  footerBg: "#1F2937",
  footerBgDark: "#0b0f19",
  gray300: "#D1D5DB",
  gray900: "#111827",
} as const;

describe("contrast utilities", () => {
  it("hexToRgb converte cores curtas e longas", () => {
    expect(hexToRgb("#fff")).toEqual({ r: 255, g: 255, b: 255 });
    expect(hexToRgb("#2D5A5A")).toEqual({ r: 45, g: 90, b: 90 });
  });

  it("relativeLuminance de preto e branco", () => {
    expect(relativeLuminance("#000000")).toBeCloseTo(0, 5);
    expect(relativeLuminance("#FFFFFF")).toBeCloseTo(1, 5);
  });

  it("contrastRatio é comutativa e vai de 1 a 21", () => {
    expect(contrastRatio("#000000", "#FFFFFF")).toBeCloseTo(21, 2);
    expect(contrastRatio("#FFFFFF", "#000000")).toBeCloseTo(21, 2);
    expect(contrastRatio("#888888", "#888888")).toBeCloseTo(1, 5);
  });

  it("threshold respeita AA/AAA e texto grande", () => {
    expect(threshold("AA", "normal")).toBe(4.5);
    expect(threshold("AA", "large")).toBe(3);
    expect(threshold("AAA", "normal")).toBe(7);
    expect(threshold("AAA", "large")).toBe(4.5);
  });
});

describe("EduSexual PT — contraste da paleta (WCAG 1.4.3 AA)", () => {
  it("texto primário sobre o fundo do corpo cumpre AA", () => {
    expect(meetsContrast(PALETTE.primary, PALETTE.background, "AA")).toBe(true);
  });

  it("texto branco no botão primário cumpre AA", () => {
    expect(meetsContrast(PALETTE.white, PALETTE.primary, "AA")).toBe(true);
  });

  it("rodapé (gray-300) cumpre AA sobre o fundo claro e escuro", () => {
    expect(meetsContrast(PALETTE.gray300, PALETTE.footerBg, "AA")).toBe(true);
    expect(meetsContrast(PALETTE.gray300, PALETTE.footerBgDark, "AA")).toBe(true);
  });

  // Corrigido na execução de 20 Ago 2026: o botão secundário usava texto
  // branco sobre o laranja (#F4A261), com contraste ~2.1:1 (abaixo de AA).
  // Agora usa texto escuro (gray-900, #111827), subindo para ~8.6:1 (AA + AAA).
  it("btn-secondary (texto escuro sobre laranja) cumpre AA", () => {
    expect(meetsContrast(PALETTE.gray900, PALETTE.secondary, "AA")).toBe(true);
  });

  it("btn-secondary (texto escuro sobre laranja) cumpre AAA", () => {
    expect(meetsContrast(PALETTE.gray900, PALETTE.secondary, "AAA")).toBe(true);
  });
});
