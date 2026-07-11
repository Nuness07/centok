import { test, expect } from "@playwright/test";

test("demo reset restores low balance", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /Get started/i }).first().click();
  await expect(page).toHaveURL(/\/app/, { timeout: 15000 });
  await expect(page.getByRole("heading", { name: /Apple Inc/i })).toBeVisible({ timeout: 15000 });
  await page.getByLabel("Reset demo").click();
  await page.getByRole("button", { name: /^Reset demo$/i }).click();
  await expect(page.getByText(/5.00 USDT/i).first()).toBeVisible({ timeout: 8000 });
});
