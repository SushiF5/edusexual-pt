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

test.describe("EduSexual PT — DoubtsTab E2E (envio de pergunta)", () => {
  test("o botão de envio está desativado sem pergunta e ativa ao preencher", async ({ page }) => {
    await page.goto("/");
    await selectAudience(page, "jovens");
    await openTab(page, "duvidas");

    const question = page.getByLabel(/A tua pergunta|Qual é a tua dúvida|Qual é a sua dúvida|tua dúvida|sua dúvida/i);
    await expect(question).toBeVisible();

    const submit = page.getByRole("button", { name: /Submeter|Enviar|Submit/i });
    await expect(submit).toBeDisabled();

    await question.fill("O que é o consentimento?");
    await expect(submit).toBeEnabled();
  });

  test("envia a pergunta com sucesso (mock da API 200)", async ({ page }) => {
    await page.route("**/api/telegram", (route) =>
      route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ success: true }) })
    );

    await page.goto("/");
    await selectAudience(page, "jovens");
    await openTab(page, "duvidas");

    await page.getByLabel(/Como te queres chamar/i).fill("Ana");
    const question = page.getByLabel(/A tua pergunta|Qual é a tua dúvida|Qual é a sua dúvida|tua dúvida|sua dúvida/i);
    await question.fill("Como sei se estou pronto para ter relações sexuais?");

    await page.getByRole("button", { name: /Submeter|Enviar|Submit/i }).click();

    await expect(page.getByText(/Pergunta enviada|enviada com sucesso/i)).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole("button", { name: /Enviar outra|outra pergunta/i })).toBeVisible();
  });

  test("apresenta erro quando a API falha (mock 500)", async ({ page }) => {
    await page.route("**/api/telegram", (route) => route.fulfill({ status: 500, body: "erro" }));

    await page.goto("/");
    await selectAudience(page, "jovens");
    await openTab(page, "duvidas");

    const question = page.getByLabel(/A tua pergunta|Qual é a tua dúvida|Qual é a sua dúvida|tua dúvida|sua dúvida/i);
    await question.fill("Dúvida de teste que deve falhar ao enviar.");

    await page.getByRole("button", { name: /Submeter|Enviar|Submit/i }).click();

    await expect(page.getByText(/Erro ao enviar|tenta novamente|não foi possível/i)).toBeVisible({ timeout: 10000 });
  });
});
