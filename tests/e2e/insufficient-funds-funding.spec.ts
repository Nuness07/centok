import { test, expect } from "@playwright/test";

test("insufficient funds routes through PIX funding and restores purchase", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /Get started/i }).first().click();
  await expect(page).toHaveURL(/\/app/, { timeout: 15000 });
  await expect(page.getByRole("heading", { name: /Apple Inc/i })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: /Review order/i }).click();
  await expect(page.getByRole("dialog", { name: /Add funds/i })).toBeVisible();
  await page.getByRole("button", { name: /^Continue$/i }).click();
  await page.getByRole("button", { name: /Continue to PIX/i }).click();
  await page.getByRole("button", { name: /Simulate PIX payment/i }).click();
  await expect(page.getByText(/Funds added/i)).toBeVisible({ timeout: 8000 });
  await page.getByRole("button", { name: /^Continue$/i }).click();
  await expect(page.getByText(/Review AAPL Stock Token order/i)).toBeVisible();
});
