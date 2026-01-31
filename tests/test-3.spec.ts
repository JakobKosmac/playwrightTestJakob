import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.youtube.com/');
  await page.getByRole('button', { name: 'Reject the use of cookies and' }).click();
  await page.getByRole('combobox', { name: 'Search' }).click();

  await page.getByRole('button', { name: 'Guide' }).click();
  await page.getByTitle('Music', { exact: true }).locator('tp-yt-paper-item').click();await page.goto('https://www.youtube.com/');
  await page.getByRole('button', { name: 'Reject the use of cookies and' }).click();
  await page.getByRole('button', { name: 'Guide' }).click();
  await page.getByTitle('Music', { exact: true }).locator('tp-yt-paper-item').click();
});