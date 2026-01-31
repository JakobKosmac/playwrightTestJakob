import { test, expect, Locator, Page } from '@playwright/test';

test.describe('Zebrabi Functional Tests', () => {

  // Sections we care about
  const sections = ['Zebra BI for Power BI', 'Zebra BI for Office', 'Zebra AI'];

  // Helper: Accept cookies
  async function acceptCookies(page: Page) {
    const cookieBtn = page.getByRole('button', { name: 'Allow all' });
    if (await cookieBtn.isVisible()) {
      await cookieBtn.click();
    }
  }

  // Helper: Get section container
  function getSection(page: Page, heading: string): Locator {
    let section = page.getByRole('heading', { name: heading }).locator('..');
    if (heading === 'Zebra AI') section = section.locator('..');
    return section;
  }

  test.beforeEach(async ({ page }) => {
    await page.goto('https://zebrabi.com/');
    await acceptCookies(page);
  });

  test('Logo should be visible', async ({ page }) => {
    const logo = page.locator('.zebra-bi-logo');
    await expect(logo).toBeVisible();
  });

  test('Login link should be visible', async ({ page }) => {
    const login = page.getByRole('link', { name: 'Login' });
    await expect(login).toBeVisible();
  });

  test('"Try Zebra BI For Free" appears twice', async ({ page }) => {
    const buttons = page.getByRole('link', { name: 'Try Zebra BI For Free' });
    await expect(buttons).toHaveCount(2);
  });

  test('Buttons visibility in main sections', async ({ page }) => {
    await page.getByRole('link', { name: 'Try Zebra BI For Free' }).first().click();

    for (const heading of sections) {
      const section = getSection(page, heading);
      await expect(section).toBeVisible();
      await expect(section.getByRole('link', { name: 'Get started for FREE' })).toBeVisible();
    }
  });

  test('Buttons visibility in pricing sections', async ({ page }) => {
    await page.getByRole('link', { name: 'Pricing' }).first().click();

    for (const heading of sections) {
      const section = getSection(page, heading);
      await expect(section).toBeVisible();
      await expect(section.getByRole('link', { name: 'See the pricing plan' })).toBeVisible();
    }
  });

});