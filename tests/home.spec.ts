import { test, expect } from '@playwright/test';

test.describe('Public Home Page (/)', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page before each test
    await page.goto('/');
  });

  test('Test #1 & #2: Hero section renders with expected content', async ({ page }) => {
    // Check if the main heading is visible (should be the Name from site_settings or siteConfig)
    const mainHeading = page.locator('h1');
    await expect(mainHeading).toBeVisible();

    // The hero section contains social links, check if the container is present
    // We expect at least one link (like Github or Email) to be visible
    const githubLink = page.locator('a[href*="github.com"]');
    if (await githubLink.count() > 0) {
      await expect(githubLink.first()).toBeVisible();
    }
  });

  test('Test #4: About section renders', async ({ page }) => {
    const aboutSection = page.locator('#about');
    await expect(aboutSection).toBeVisible();
    await expect(aboutSection.locator('h2', { hasText: 'About Me' })).toBeVisible();
    
    // Check that there is some text content in the about section
    const paragraphs = aboutSection.locator('p');
    await expect(paragraphs.first()).toBeVisible();
  });

  test('Test #8 & #9: Skills section renders and has categories', async ({ page }) => {
    const skillsSection = page.locator('#skills');
    await expect(skillsSection).toBeVisible();
    await expect(skillsSection.locator('h2', { hasText: 'My Skills' })).toBeVisible();
    
    // We expect some category headers (like Design, Development, etc.) to be present
    const categories = skillsSection.locator('h3');
    const count = await categories.count();
    expect(count).toBeGreaterThan(0);

    // Verify the first category has some skill badges
    const firstCategorySkills = categories.first().locator('..').locator('.badge');
    expect(await firstCategorySkills.count()).toBeGreaterThan(0);
  });
});
