import { test, expect, type Page } from "@playwright/test";

async function selectAudience(page: Page, audience: "criancas" | "jovens" | "adultos") {
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await page.getByRole("button", { name: /Crianças|Jovens|Adultos/i }).filter({ hasText: audience === "criancas" ? /Crianças/i : audience === "jovens" ? /Jovens/i : /Adultos/i }).first().click();
  await expect(dialog).toBeHidden();
}

async function openTab(page: Page, tabId: "home" | "podcast" | "recursos" | "quiz" | "faq" | "duvidas") {
  await page.locator(`#tab-${tabId}`).click();
  await expect(page.locator("#main-content")).toBeVisible();
}

test.describe("EduSexual PT — smoke E2E", () => {
  test("carrega o seletor de audiência e mostra o Início após escolher", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByRole("link", { name: /Saltar para o conteúdo principal/i })).toBeAttached();
    await selectAudience(page, "jovens");
    await expect(page.locator("#main-content")).toBeVisible();
    await expect(page.locator("main")).toBeVisible();
  });

  test("navegação por tabs no cabeçalho troca o conteúdo principal", async ({ page }) => {
    await page.goto("/");
    await selectAudience(page, "jovens");

    await openTab(page, "quiz");
    await expect(page.getByRole("button", { name: /Começar Quiz/i })).toBeVisible();

    await openTab(page, "faq");
    await expect(page.getByRole("heading", { name: /Perguntas Frequentes/i })).toBeVisible();

    await openTab(page, "recursos");
    await expect(page.getByRole("heading", { name: /Recursos/i })).toBeVisible();
  });

  test("FAQ: pesquisa filtra e estado vazio funciona", async ({ page }) => {
    await page.goto("/");
    await selectAudience(page, "jovens");
    await openTab(page, "faq");

    const search = page.getByRole("searchbox", { name: /Pesquisar perguntas/i });
    await expect(search).toBeVisible();
    await search.fill("zzzznadaencontrado");
    await expect(page.getByText(/Nenhuma pergunta encontrada para/i)).toBeVisible();

    await search.fill("");
    await expect(page.getByText(/Nenhuma pergunta encontrada para/i)).toBeHidden();
  });

  test("modo escuro alterna a classe no elemento <html>", async ({ page }) => {
    await page.goto("/");
    await selectAudience(page, "jovens");

    const toggle = page.getByRole("button", { name: /Modo (escuro|claro)/i });
    await expect(toggle).toBeVisible();
    const before = await page.evaluate(() => document.documentElement.classList.contains("dark"));
    await toggle.click();
    const after = await page.evaluate(() => document.documentElement.classList.contains("dark"));
    expect(after).toBe(!before);
  });

  test("quiz: iniciar e responder mostra feedback", async ({ page }) => {
    await page.goto("/");
    await selectAudience(page, "jovens");
    await openTab(page, "quiz");

    await page.getByRole("button", { name: /Começar Quiz/i }).click();
    await expect(page.getByRole("progressbar")).toBeVisible();

    const firstOption = page.locator('#main-content button[aria-label^="A)"]').first();
    await expect(firstOption).toBeVisible();
    await firstOption.click();

    await expect(page.locator('#main-content').getByText(/Resposta (correta|incorreta)/i)).toBeVisible();
  });

  test("duvidas: formulário anónimo tem campos e validação", async ({ page }) => {
    await page.goto("/");
    await selectAudience(page, "jovens");
    await openTab(page, "duvidas");

    await expect(page.getByRole("heading", { name: /Tira.*Dúvidas/i })).toBeVisible();

    const nameInput = page.getByRole("textbox", { name: /Nome.*opcional/i });
    await expect(nameInput).toBeVisible();

    const questionInput = page.getByRole("textbox", { name: /A tua pergunta/i });
    await expect(questionInput).toBeVisible();

    const submitBtn = page.getByRole("button", { name: /Enviar pergunta/i });
    await expect(submitBtn).toBeVisible();
    await expect(submitBtn).toBeDisabled();

    await questionInput.fill("Esta é uma pergunta de teste E2E");
    await expect(submitBtn).toBeEnabled();
  });

  test("landmarks ARIA: header, main e footer estão presentes", async ({ page }) => {
    await page.goto("/");
    await selectAudience(page, "jovens");

    await expect(page.locator("header[role='banner']")).toBeVisible();
    await expect(page.locator("main#main-content")).toBeVisible();
    await expect(page.locator("footer[role='contentinfo']")).toBeVisible();
  });

  test("skip link foca no conteúdo principal", async ({ page }) => {
    await page.goto("/");
    await selectAudience(page, "jovens");

    const skipLink = page.getByRole("link", { name: /Saltar para o conteúdo principal/i });
    await expect(skipLink).toBeAttached();

    await skipLink.focus();
    await expect(skipLink).toBeFocused();

    await page.keyboard.press("Enter");
    const mainContent = page.locator("#main-content");
    await expect(mainContent).toBeFocused();
  });

  test("atalhos de teclado: H volta ao início", async ({ page }) => {
    await page.goto("/");
    await selectAudience(page, "jovens");
    await openTab(page, "quiz");

    await page.keyboard.press("h");

    await expect(page.getByRole("heading", { name: /EduSexual PT/i })).toBeVisible();
  });
});
