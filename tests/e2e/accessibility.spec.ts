import { test, expect } from "@playwright/test";

test("keyboard focus and status labels are visible", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.locator(":focus")).toBeVisible();
  await expect(page.getByText(/not direct ownership/i)).toBeVisible();
});
