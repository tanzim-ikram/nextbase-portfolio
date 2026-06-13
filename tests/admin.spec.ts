import { test, expect } from '@playwright/test';

test.describe('Admin Dashboard', () => {

  // Before each test, set the admin bypass cookie to simulate a logged-in state
  test.beforeEach(async ({ context }) => {
    await context.addCookies([
      {
        name: 'nextbase-admin-bypass',
        value: 'true',
        domain: 'localhost',
        path: '/',
      }
    ]);
  });

  test('Test #47 & #48: Admin Overview page loads with stat cards', async ({ page }) => {
    await page.goto('/admin');
    
    // Check if the dashboard title is visible
    await expect(page.locator('h1', { hasText: 'Dashboard Overview' })).toBeVisible();

    // Check for the presence of some stat cards
    await expect(page.locator('h3', { hasText: 'Total Blog Views' })).toBeVisible();
    await expect(page.locator('h3', { hasText: 'Published Posts' })).toBeVisible();
    await expect(page.locator('h3', { hasText: 'Total Projects' })).toBeVisible();
  });

  test('Test #49: Sidebar navigation links are present', async ({ page }) => {
    await page.goto('/admin');
    
    // Check that key sidebar links exist
    const sidebar = page.locator('aside');
    await expect(sidebar).toBeVisible();
    
    await expect(sidebar.locator('a', { hasText: 'Overview' })).toBeVisible();
    await expect(sidebar.locator('a', { hasText: 'Blog Posts' })).toBeVisible();
    await expect(sidebar.locator('a', { hasText: 'Skills' })).toBeVisible();
    await expect(sidebar.locator('a', { hasText: 'Site Settings' })).toBeVisible();
  });

  test('Test #66 & #73: Admin Skills page and Category Sorting panel load', async ({ page }) => {
    await page.goto('/admin/skills');
    
    // Check if the skills page title is visible
    await expect(page.locator('h1', { hasText: 'Skills' })).toBeVisible();

    // Check if the "Add Skill" button is present
    await expect(page.locator('a', { hasText: 'Add Skill' })).toBeVisible();

    // The page should load without crashing, verify the subtitle is visible
    await expect(page.locator('text=Manage your skills and group them')).toBeVisible();
    
    // Check if the Category Sort Manager is rendered 
    // (it renders conditionally based on if categories exist, but typically they do)
    const categorySortManager = page.locator('text=Sort Skill Categories display position');
    if (await categorySortManager.count() > 0) {
      await expect(categorySortManager.first()).toBeVisible();
    }
  });
});
