import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  // Selectors
  readonly usernameInput = '[data-test="username"]';
  readonly passwordInput = '[data-test="password"]';
  readonly loginButton = '[data-test="login-button"]';
  readonly errorMessage = '[data-test="error"]';
  readonly loginLogo = '.login_logo';

  constructor(page: Page) {
    super(page);
  }

  // Navigation
  async goto() {
    await this.navigateTo('/');
  }
}
