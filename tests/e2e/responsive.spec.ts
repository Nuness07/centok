import { test, expect } from "@playwright/test";

for (const viewport of [
  { width: 1440, height: 900 },
  { width: 1024, height: 768 },
  { width: 390, height: 844 }
]) {
  test(`landing is usable at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /Buy U\.S\. Stocks without bureaucracy/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /Get started/i }).first()).toBeVisible();
  });
}
