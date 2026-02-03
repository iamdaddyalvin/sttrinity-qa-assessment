import { Page, expect } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  // Common navigation and utility methods
  async navigateTo(path: string) {
    await this.page.goto(path);
  }

  async navigateToRelativePath(path: string) {
    await this.page.goto(path);
  }

  async waitForElement(selector: string) {
    await this.page.waitForSelector(selector);
  }

  async clickElement(selector: string) {
    await this.page.click(selector);
  }

  async fillInput(selector: string, value: string) {
    await this.page.fill(selector, value);
  }

  async getElementText(selector: string): Promise<string> {
    return await this.page.textContent(selector) || '';
  }

  async isElementVisible(selector: string): Promise<boolean> {
    return await this.page.isVisible(selector);
  }

  async isElementEnabled(selector: string): Promise<boolean> {
    return await this.page.isEnabled(selector);
  }

  async waitForURL(urlPattern: string) {
    await this.page.waitForURL(urlPattern);
  }

  async getCurrentURL(): Promise<string> {
    return this.page.url();
  }

  // Common assertions
  async expectElementToBeVisible(selector: string) {
    await expect(this.page.locator(selector)).toBeVisible();
  }

  async expectElementToHaveText(selector: string, text: string) {
    await expect(this.page.locator(selector)).toHaveText(text);
  }

  async expectElementToBeEnabled(selector: string) {
    await expect(this.page.locator(selector)).toBeEnabled();
  }

  // CSS property helper for visual tests
  async getElementCSSProperty(selector: string, property: string): Promise<string> {
    return await this.page.locator(selector).evaluate((el: any, prop: string) => {
      return (el as any).ownerDocument.defaultView?.getComputedStyle(el).getPropertyValue(prop);
    }, property);
  }

  async getElementBackgroundColor(selector: string): Promise<string> {
    return await this.page.locator(selector).evaluate((el: any) => {
      return (el as any).ownerDocument.defaultView?.getComputedStyle(el).backgroundColor;
    });
  }

  async getElementColor(selector: string): Promise<string> {
    return await this.page.locator(selector).evaluate((el: any) => {
      return (el as any).ownerDocument.defaultView?.getComputedStyle(el).color;
    });
  }
}
