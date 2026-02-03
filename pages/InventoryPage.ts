import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  // Selectors
  readonly pageTitle = '.app_logo';
  readonly shoppingCartLink = '[data-test="shopping-cart-link"]';
  readonly shoppingCartBadge = '[data-test="shopping-cart-badge"]';
  readonly sortDropdown = '[data-test="product-sort-container"]';
  readonly inventoryItem = '.inventory_item';
  readonly inventoryItemName = '[data-test="inventory-item-name"]';
  readonly inventoryItemPrice = '[data-test="inventory-item-price"]';
  readonly inventoryItemDesc = '[data-test="inventory-item-desc"]';

  constructor(page: Page) {
    super(page);
  }

  // Navigation
  async goto() {
    await this.navigateTo('/inventory.html');
  }

  // Product actions
  async addProductToCart(productName: string) {
    const addToCartSelector = this.getAddToCartSelector(productName);
    await this.clickElement(addToCartSelector);
  }

  async removeProductFromCart(productName: string) {
    const removeSelector = this.getRemoveSelector(productName);
    await this.clickElement(removeSelector);
  }

  // Cart navigation
  async goToCart() {
    await this.clickElement(this.shoppingCartLink);
  }

  // Validation methods

  async expectShoppingCartBadgeToHaveCount(count: string) {
    if (count === '0') {
      // When cart is empty, badge should not be visible
      await expect(this.page.locator(this.shoppingCartBadge)).not.toBeVisible();
    } else {
      await this.expectElementToHaveText(this.shoppingCartBadge, count);
    }
  }

  async expectRemoveButtonToBeVisible(productName: string) {
    const removeSelector = this.getRemoveSelector(productName);
    await this.expectElementToBeVisible(removeSelector);
  }

  async expectAddToCartButtonToBeVisible(productName: string) {
    const addSelector = this.getAddToCartSelector(productName);
    await this.expectElementToBeVisible(addSelector);
  }

  // Visual validation methods
  async getRemoveButtonColor(productName: string): Promise<string> {
    const removeSelector = this.getRemoveSelector(productName);
    return await this.getElementColor(removeSelector);
  }

  async getRemoveButtonBackgroundColor(productName: string): Promise<string> {
    const removeSelector = this.getRemoveSelector(productName);
    return await this.getElementBackgroundColor(removeSelector);
  }

  async getRemoveButtonBorderColor(productName: string): Promise<string> {
    const removeSelector = this.getRemoveSelector(productName);
    return await this.getElementCSSProperty(removeSelector, 'border-top-color');
  }

  async getAddToCartButtonColor(productName: string): Promise<string> {
    const addToCartSelector = this.getAddToCartSelector(productName);
    return await this.getElementColor(addToCartSelector);
  }

  // Helper methods
  private convertProductNameToSelector(productName: string): string {
    return productName
      .toLowerCase()
      .replace(/\s+/g, '-');
  }

  private getAddToCartSelector(productName: string): string {
    const selectorName = this.convertProductNameToSelector(productName);
    return `[data-test="add-to-cart-${selectorName}"]`;
  }

  private getRemoveSelector(productName: string): string {
    const selectorName = this.convertProductNameToSelector(productName);
    return `[data-test="remove-${selectorName}"]`;
  }

  private getProductItemSelector(productName: string): string {
    const selectorName = this.convertProductNameToSelector(productName);
    return `[data-test="inventory-item-${selectorName}"]`;
  }

}
