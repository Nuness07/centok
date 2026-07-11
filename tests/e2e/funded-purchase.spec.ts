import { test, expect, type Page } from "@playwright/test";

async function login(page: Page) {
  await page.goto("/");
  await page.getByRole("button", { name: /Get started/i }).first().click();
  await expect(page).toHaveURL(/\/app/, { timeout: 15000 });
  await expect(page.getByRole("heading", { name: /Apple Inc/i })).toBeVisible({ timeout: 15000 });
}

test("funded scenario can complete a purchase", async ({ page }) => {
  await login(page);
  await page.getByLabel("Open scenario selector").click();
  await page.getByRole("button", { name: /Funded user/i }).click();
  await page.getByRole("button", { name: /Review order/i }).click();
  await expect(page.getByText(/Review AAPL Stock Token order/i)).toBeVisible();
  await page.getByRole("button", { name: /Confirm purchase/i }).click();
  await expect(page.getByText(/Purchase completed/i)).toBeVisible({ timeout: 8000 });
});
