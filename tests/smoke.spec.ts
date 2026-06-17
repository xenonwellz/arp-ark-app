import { test, expect } from "@playwright/test";

test.describe("Smoke tests", () => {
  test("homepage loads and shows all sections", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("h1")).toContainText("A Royal Priesthood");
    await expect(page.locator("#home")).toBeVisible();
    await expect(page.locator("#testimony")).toBeVisible();
    await expect(page.locator("#name")).toBeVisible();
    await expect(page.locator("#treasury")).toBeVisible();
  });

  test("header navigation links work", async ({ page }) => {
    await page.goto("/");

    const navLinks = page.locator(".desktop-nav a");
    await expect(navLinks.first()).toBeVisible();
    await expect(navLinks).toHaveCount(4);
  });

  test("name reveal button works", async ({ page }) => {
    await page.goto("/");

    const button = page.locator(".gold-button");
    await button.click();

    const name = page.locator(".script-name");
    await expect(name).toContainText("Prince Zion Nathaniel");
  });

  test("gift cards have mailto links", async ({ page }) => {
    await page.goto("/");

    const links = page.locator(".gift-card .outline-button");
    const count = await links.count();
    expect(count).toBe(3);

    for (let i = 0; i < count; i++) {
      const href = await links.nth(i).getAttribute("href");
      expect(href).toContain("mailto:");
    }
  });

  test("page has correct metadata", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.ok()).toBeTruthy();

    const title = await page.title();
    expect(title).toContain("AROYALPRIESTHOOD");
  });
});
