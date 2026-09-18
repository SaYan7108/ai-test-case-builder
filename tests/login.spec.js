// tests/login.spec.js
// Automates the AI-generated login test cases from test-cases/login-test-cases.md
// Run with: npx playwright test

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test.describe('Saucedemo — Login Functionality', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  // TC_LOGIN_01 — required minimum: at least 1 automated test case
  test('TC_LOGIN_01: successful login with valid standard user', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(loginPage.productsHeader).toHaveText('Products');
  });

  test('TC_LOGIN_02: locked-out user is blocked from logging in', async ({ page }) => {
    await loginPage.login('locked_out_user', 'secret_sauce');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('this user has been locked out');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });

  test('TC_LOGIN_03: login fails with incorrect password', async ({ page }) => {
    await loginPage.login('standard_user', 'wrong_password');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText(
      'Username and password do not match any user in this service'
    );
  });

  test('TC_LOGIN_04: login fails with empty username and password', async ({ page }) => {
    await loginPage.login('', '');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Username is required');
  });

  test('TC_LOGIN_05: login fails with valid username and empty password', async ({ page }) => {
    await loginPage.login('standard_user', '');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Password is required');
  });
});
