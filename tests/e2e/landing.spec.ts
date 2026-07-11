import { test, expect } from "@playwright/test";

test("landing page communicates value proposition and enters dashboard", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("banner")).toBeVisible();
  await expect(page.getByRole("heading", { name: /Buy U\.S\. Stocks without bureaucracy/i })).toBeVisible();
  await expect(page.getByText(/A new way to use Stocks/i)).toBeVisible();
  await expect(page.getByLabel(/Powered by Robinhood/i)).toBeVisible();
  await expect(page.getByText(/not direct ownership/i)).toBeVisible();
  await page.getByRole("button", { name: /Get started/i }).first().click();
  await expect(page).toHaveURL(/\/app/, { timeout: 15000 });
});


