// pages/LoginPage.js
// Page Object for the saucedemo.com login page

class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.url = 'https://www.saucedemo.com';

    // Locators
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
    this.productsHeader = page.locator('.title'); // "Products" header after login
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorText() {
    return this.errorMessage.textContent();
  }
}

module.exports = { LoginPage };
