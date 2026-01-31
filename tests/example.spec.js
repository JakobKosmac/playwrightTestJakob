// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('YouTube Functional Tests', () => {

  // 1. HOMEPAGE LOAD
  test('loads YouTube homepage', async ({ page }) => {
    await page.goto('https://www.youtube.com');

    await handleCookies(page);
    await expect(page).toHaveTitle(/YouTube/);

    // Check that the search bar is visible
    await page.waitForSelector('ytd-masthead', { state: 'visible' });

    await page.getByRole('combobox', { name: 'Search' }).click();
    await expect(page.getByRole('combobox')).toBeVisible();
  });

  // 2. SEARCH FUNCTIONALITY
  test('searches for a video', async ({ page }) => {
    await page.goto('https://www.youtube.com');

    await handleCookies(page);
    await page.getByRole('combobox', { name: 'Search' }).fill('Playwright testing tutorial');
    await page.getByRole('combobox', { name: 'Search' }).press('Enter');

    // Wait for results
    const count = await page.locator('ytd-video-renderer').count();
    expect(count).toBeGreaterThan(0);
  });

  // 3. OPEN A VIDEO
  test('opens the first video result', async ({ page }) => {
    await page.goto('https://www.youtube.com/results?search_query=playwright+testing+tutorial');

    await handleCookies(page);
    const firstVideo = page.locator('ytd-video-renderer').first();
    await firstVideo.click();

    // Check that the video player loads
    await expect(page.locator('.html5-video-player')).toBeVisible();
  });

  // 4. VIDEO PLAYER INTERACTION
  test('can play and pause a video', async ({ page }) => {
    await page.goto('https://www.youtube.com/watch?v=dQw4w9WgXcQ');

    const player = page.locator('.html5-video-player');

    // Ensure player is visible
    await expect(player).toBeVisible();

    // Play
    await page.keyboard.press('k'); // YouTube shortcut for play/pause
    await page.waitForTimeout(2000);

    // Pause
    await page.keyboard.press('k');
    await page.waitForTimeout(1000);

    // Check that the player is still visible
    await expect(player).toBeVisible();
  });

  // 5. NAVIGATION TEST
  test('navigates to Music section', async ({ page }) => {
    await page.goto('https://www.youtube.com');

    await handleCookies(page);
    await page.locator('#start #guide-button').click();
    await page.getByTitle('Music', { exact: true }).locator('tp-yt-paper-item').click();

    const pageText = await page.textContent('body');
    expect(pageText.toLowerCase()).toContain('music');

  });

  // 6. RESPONSIVE TEST
  test('renders correctly on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });

    await page.goto('https://www.youtube.com');

    await handleCookies(page);
    // Mobile menu button should be visible
    await expect(page.locator('#start #guide-button')).toBeVisible();
  });

  async function handleCookies(page) {
    const consentSelectors = [
      'button:has-text("Customize")',
      'button:has-text("Accept all")',
      'button:has-text("Reject all")'
    ];

    for (const selector of consentSelectors){
      const button = page.locator(selector);
      if(await button.isVisible().catch(()=>false)){
        await button.click();
        break;
      }
    }
    
  }

});
