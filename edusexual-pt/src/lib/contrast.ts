/**
 * WCAG 2.1 — Critério 1.4.3 (Contraste Mínimo).
 *
 * Utilitários para calcular a taxa de contraste relativo entre duas cores e
 * verificar se cumpre os limiares de conformidade (AA / AAA).
 *
 * Referência: https://www.w3.org/TR/WCAG21/#contrast-minimum
 */

export type RGB = { r: number; g: number; b: number };

/** Converte uma cor hexadecimal (#RGB ou #RRGGBB) num objeto RGB (0-255). */
export function hexToRgb(hex: string): RGB {
  let value = hex.trim().replace(/^#/, "");
  if (value.length === 3) {
    value = value
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const int = parseInt(value, 16);
  return {
    r: (int >> 16) & 255,
    g: (int >> 8) & 255,
    b: int & 255,
  };
}

/** Calcula a luminância relativa (WCAG) de uma cor RGB. */
export function relativeLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  const channel = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

/** Taxa de contraste (1.0 - 21.0) entre duas cores hex. */
export function contrastRatio(fg: string, bg: string): number {
  const l1 = relativeLuminance(fg);
  const l2 = relativeLuminance(bg);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/** Limiares WCAG por nível e tipo de texto. */
export type WCAGLevel = "AA" | "AAA";
export type WCAGTextKind = "normal" | "large";

export function threshold(level: WCAGLevel, kind: WCAGTextKind): number {
  if (level === "AAA") return kind === "large" ? 4.5 : 7;
  return kind === "large" ? 3 : 4.5;
}

/** Verifica se o par de cores cumpre o critério de contraste indicado. */
export function meetsContrast(
  fg: string,
  bg: string,
  level: WCAGLevel = "AA",
  kind: WCAGTextKind = "normal"
): boolean {
  return contrastRatio(fg, bg) >= threshold(level, kind);
}
