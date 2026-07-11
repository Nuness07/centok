import { test, expect, type Page } from "@playwright/test";

async function login(page: Page) {
  await page.goto("/login");
  await page.getByRole("button", { name: /Continue with demo account/i }).click();
  await expect(page).toHaveURL(/\/app/, { timeout: 15000 });
  await expect(page.getByRole("heading", { name: /Apple Inc/i })).toBeVisible({ timeout: 15000 });
}

test("mock login enters dashboard and logout returns home", async ({ page }) => {
  await login(page);
  await page.getByRole("button", { name: /Gabriel/i }).click();
  await expect(page).toHaveURL(/\/$/);
});
