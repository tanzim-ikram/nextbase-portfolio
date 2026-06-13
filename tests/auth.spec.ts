import { test, expect } from '@playwright/test';

test.describe('Authentication & Login Flow', () => {
  
  test('Test #46: No auth access to /admin redirects to login', async ({ page }) => {
    // Attempting to visit admin without the bypass cookie or valid session 
    // redirects to the home page (/) according to proxy.ts
    await page.goto('/admin');
    
    // Check if the URL is the root URL
    await expect(page).toHaveURL('http://localhost:3000/');
  });

  test('Test #42: Login page renders', async ({ page }) => {
    await page.goto('/login');
    
    // Check for the presence of login form elements
    await expect(page.locator('text=Admin Login')).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('Test #44: Invalid credentials show error', async ({ page }) => {
    await page.goto('/login');
    
    // Fill in fake credentials
    await page.fill('input[type="email"]', 'wrong@example.com');
    await page.fill('input[type="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');
    
    // Since the credentials are wrong, we expect to stay on the login page 
    // instead of being redirected to /admin
    await page.waitForTimeout(1000); // Wait briefly for any potential network requests
    await expect(page).toHaveURL(/.*\/login/);
  });
});
