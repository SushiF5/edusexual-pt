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

test.describe("EduSexual PT — PodcastTab E2E", () => {
  test("abre o separador Podcast e mostra o player do Spotify", async ({ page }) => {
    await page.goto("/");
    await selectAudience(page, "jovens");
    await openTab(page, "podcast");

    await expect(page.getByRole("heading", { name: /Descomplicando/i })).toBeVisible();
    await expect(page.getByTitle(/Podcast Descomplicando no Spotify/i)).toBeVisible();
    await expect(page.getByRole("heading", { name: /Todos os Episódios/i })).toBeVisible();
  });

  test("reproduz um episódio (mock da API) e mostra o leitor", async ({ page }) => {
    await page.route("**/api/podcast", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          episodes: [
            {
              guid: "ep-e2e-1",
              title: "Episódio de Teste E2E",
              episode: 1,
              duration: "10 min",
              description: "Descrição de teste",
              audioUrl: "https://example.com/ep1.mp3",
              link: "https://example.com/ep1",
              pubDate: "2026-01-01T00:00:00Z",
            },
          ],
        }),
      })
    );

    await page.goto("/");
    await selectAudience(page, "jovens");
    await openTab(page, "podcast");

    const listenBtn = page.getByRole("button", { name: /Ouvir Episódio de Teste E2E/i });
    await expect(listenBtn).toBeVisible();
    await listenBtn.click();

    await expect(page.getByRole("region", { name: /Player de áudio/i })).toBeVisible();
  });

  test("estado de erro da API apresenta opção de repetir", async ({ page }) => {
    await page.route("**/api/podcast", (route) => route.fulfill({ status: 500, body: "erro" }));

    await page.goto("/");
    await selectAudience(page, "jovens");
    await openTab(page, "podcast");

    await expect(page.getByText(/Não foi possível carregar os episódios/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /Tentar novamente/i })).toBeVisible();
  });
});

test.describe("EduSexual PT — ResourcesTab E2E", () => {
  test("abre o separador Recursos e lista os guias disponíveis", async ({ page }) => {
    await page.goto("/");
    await selectAudience(page, "jovens");
    await openTab(page, "recursos");

    await expect(page.getByRole("heading", { name: /Guias e Recursos/i })).toBeVisible();
    const firstGuide = page.getByRole("button", { name: /Abrir guia/i }).first();
    await expect(firstGuide).toBeVisible();
  });

  test("abre um guia e mostra as ações de PDF e voltar", async ({ page }) => {
    await page.goto("/");
    await selectAudience(page, "jovens");
    await openTab(page, "recursos");

    const firstGuide = page.getByRole("button", { name: /Abrir guia/i }).first();
    await firstGuide.click();

    await expect(page.getByRole("button", { name: /Guardar como PDF/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /Ver todos os guias/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Download HTML/i })).toBeVisible();

    await page.getByRole("button", { name: /Ver todos os guias/i }).click();
    await expect(page.getByRole("button", { name: /Abrir guia/i }).first()).toBeVisible();
  });
});
