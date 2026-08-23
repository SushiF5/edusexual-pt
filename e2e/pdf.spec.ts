import { test, expect, type Page } from "@playwright/test";

async function selectAudience(page: Page, audience: "criancas" | "jovens" | "adultos") {
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await page
    .getByRole("button", { name: /Crianças|Jovens|Adultos/i })
    .filter({
      hasText:
        audience === "criancas" ? /Crianças/i : audience === "jovens" ? /Jovens/i : /Adultos/i,
    })
    .first()
    .click();
  await expect(dialog).toBeHidden();
}

async function openTab(page: Page, tabId: "home" | "podcast" | "recursos" | "quiz" | "faq" | "duvidas") {
  await page.locator(`#tab-${tabId}`).click();
  await expect(page.locator("#main-content")).toBeVisible();
}

test.describe("EduSexual PT — PDF download E2E", () => {
  test("o endpoint /api/pdf devolve um PDF válido (Content-Type + %PDF)", async ({ page }) => {
    await page.goto("/");
    await selectAudience(page, "jovens");
    await openTab(page, "recursos");

    // Abre o primeiro guia para expor o link "Download HTML" (que aponta para /api/pdf).
    const firstGuide = page.getByRole("button", { name: /Abrir guia/i }).first();
    await expect(firstGuide).toBeVisible();
    await firstGuide.click();

    const downloadLink = page.getByRole("link", { name: /Download HTML/i });
    await expect(downloadLink).toBeVisible();

    const href = await downloadLink.getAttribute("href");
    expect(href).toMatch(/^\/api\/pdf\?id=.+/);

    // Valida a resposta real da API de geração de PDF.
    const response = await page.request.get(href!);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("application/pdf");

    const contentDisposition = response.headers()["content-disposition"] ?? "";
    expect(contentDisposition).toMatch(/filename="[^"]*\.pdf"/);

    const buffer = await response.body();
    const header = buffer.subarray(0, 5).toString("latin1");
    expect(header).toBe("%PDF-");
  });

  test("o download do PDF é acionado pelo botão Guardar como PDF", async ({ page }) => {
    await page.goto("/");
    await selectAudience(page, "jovens");
    await openTab(page, "recursos");

    const firstGuide = page.getByRole("button", { name: /Abrir guia/i }).first();
    await firstGuide.click();

    const pdfButton = page.getByRole("button", { name: /Guardar como PDF/i });
    await expect(pdfButton).toBeVisible();

    const [download] = await Promise.all([
      page.waitForEvent("download"),
      pdfButton.click(),
    ]);

    // O nome sugerido reflete o guia; validamos que termina em .pdf.
    const suggested = download.suggestedFilename();
    expect(suggested).toMatch(/\.pdf$/);

    const stream = await download.createReadStream();
    expect(stream).not.toBeNull();
  });
});
