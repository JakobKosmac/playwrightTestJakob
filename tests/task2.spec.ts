import { test, expect, Page } from '@playwright/test';

test.describe('Zebrabi Functional Tests', () => {

  async function acceptCookies(page: Page) {
    const cookies = page.getByRole('button', { name: 'Allow all' });
    if (await cookies.isVisible()) {
      await cookies.click();
    }
  }

  test.beforeEach(async ({ page }) => {
    await page.goto('https://zebrabi.com/');
    await acceptCookies(page);
  });

test('Checks if logo is visible', async ({ page }) => {
  const logo = page.locator('.zebra-bi-logo');
  await expect(logo).toBeVisible();
});

test('Checks if login is visible', async ({ page }) => {
  const login = page.getByRole('link', { name: 'Login' }); //not sure if trick question, says button, but there's only a login link, seen in other tests as well :')
  await expect(login).toBeVisible();
});

test('Checks if "ZebraBI for free" is visible twice', async ({ page }) => {
  const button = page.getByRole('link', { name: 'Try Zebra BI For Free' });
  await expect(button).toHaveCount(2);
});

test('Checks for button visibility for each section', async ({ page }) => {
   const sections = [
    'Zebra BI for Power BI',
    'Zebra BI for Office',
    'Zebra AI'
  ];
  await page.getByRole('link', { name: 'Try Zebra BI For Free' }).first().click();

 for (const heading of sections) {
    let section = page.getByRole('heading', { name: heading }).locator('..');
    // Zebra AI is div in div
    if (heading === 'Zebra AI') section = section.locator('..');
    await expect(section).toBeVisible();
    await expect(section.getByRole('link', { name: 'Get started for FREE' })).toBeVisible();
  }

  //Check "See the pricing plan" buttons
  await page.getByRole('link', { name: 'Pricing' }).first().click();

  for (const heading of sections) {
    let section = page.getByRole('heading', { name: heading }).locator('..');
    if (heading === 'Zebra AI') section = section.locator('..');
    await expect(section).toBeVisible();
    await expect(section.getByRole('link', { name: 'See the pricing plan' })).toBeVisible();
  }
});


});