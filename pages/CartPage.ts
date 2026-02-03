import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  // Selectors
  readonly pageTitle = '.title';
  readonly cartItem = '.cart_item';
  readonly cartItemName = '[data-test="inventory-item-name"]';
  readonly cartItemPrice = '[data-test="inventory-item-price"]';
  readonly cartItemQuantity = '[data-test="item-quantity"]';
  readonly checkoutButton = '[data-test="checkout"]';
  readonly continueShoppingButton = '[data-test="continue-shopping"]';

  constructor(page: Page) {
    super(page);
  }

  // Navigation
  async goto() {
    await this.navigateTo('/cart.html');
  }

  // Cart actions
  async proceedToCheckout() {
    await this.clickElement(this.checkoutButton);
  }

  // Validation methods

  async expectItemToBeVisible(itemName: string) {
    await this.expectElementToHaveText(this.cartItemName, itemName);
  }

  async expectItemPriceToBe(price: string) {
    await this.expectElementToHaveText(this.cartItemPrice, price);
  }

  async expectItemQuantityToBe(quantity: string) {
    await this.expectElementToHaveText(this.cartItemQuantity, quantity);
  }

  async expectCheckoutButtonToBeVisible() {
    await this.expectElementToBeVisible(this.checkoutButton);
  }

  async expectContinueShoppingButtonToBeVisible() {
    await this.expectElementToBeVisible(this.continueShoppingButton);
  }

}
