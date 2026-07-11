import { test, expect } from "@playwright/test";

test("primary presentation flow reaches portfolio and activity", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /Get started/i }).first().click();
  await expect(page).toHaveURL(/\/app/, { timeout: 15000 });
  await expect(page.getByRole("heading", { name: /Apple Inc/i })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: /Review order/i }).click();
  await page.getByRole("button", { name: /^Continue$/i }).click();
  await page.getByRole("button", { name: /Continue to PIX/i }).click();
  await page.getByRole("button", { name: /Simulate PIX payment/i }).click();
  await expect(page.getByText(/Funds added/i)).toBeVisible({ timeout: 8000 });
  await page.getByRole("button", { name: /^Continue$/i }).click();
  await page.getByRole("button", { name: /Confirm purchase/i }).click();
  await expect(page.getByText(/Purchase completed/i)).toBeVisible({ timeout: 8000 });
  await page.getByRole("button", { name: /View portfolio/i }).click();
  await expect(page.getByRole("heading", { name: /Portfolio/i })).toBeVisible();
  await page.getByRole("link", { name: /Activity/i }).click();
  await expect(page.getByRole("heading", { name: /Activity/i })).toBeVisible();
});
