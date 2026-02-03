import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  // Selectors - Checkout Step One
  readonly checkoutStepOneTitle = '.title';
  readonly firstNameInput = '[data-test="firstName"]';
  readonly lastNameInput = '[data-test="lastName"]';
  readonly postalCodeInput = '[data-test="postalCode"]';
  readonly continueButton = '[data-test="continue"]';
  readonly cancelButton = '[data-test="cancel"]';
  readonly errorMessage = '[data-test="error"]';

  // Selectors - Checkout Step Two
  readonly checkoutStepTwoTitle = '.title';
  readonly itemTotal = '[data-test="subtotal-label"]';
  readonly tax = '[data-test="tax-label"]';
  readonly total = '[data-test="total-label"]';
  readonly finishButton = '[data-test="finish"]';
  readonly cancelButtonStepTwo = '[data-test="cancel"]';

  // Selectors - Checkout Complete
  readonly completeHeader = '[data-test="complete-header"]';
  readonly completeText = '[data-test="complete-text"]';
  readonly backToProductsButton = '[data-test="back-to-products"]';
  readonly ponyExpressImage = '.pony_express';

  constructor(page: Page) {
    super(page);
  }

  // Checkout Step One - Information

  async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
    await this.fillInput(this.firstNameInput, firstName);
    await this.fillInput(this.lastNameInput, lastName);
    await this.fillInput(this.postalCodeInput, postalCode);
  }

  async continueCheckout() {
    await this.clickElement(this.continueButton);
  }

  async cancelCheckout() {
    await this.clickElement(this.cancelButton);
  }

  // Checkout Step Two - Overview
  async finishCheckout() {
    await this.clickElement(this.finishButton);
  }

  // Checkout Step Two - Overview

  // Validation methods - Step One

  async expectErrorMessageToContain(message: string) {
    await this.expectElementToHaveText(this.errorMessage, message);
  }

  async expectContinueButtonToBeEnabled() {
    await this.expectElementToBeEnabled(this.continueButton);
  }

  // Validation methods - Step Two
  async expectCheckoutStepTwoTitleToBe(title: string) {
    await this.expectElementToHaveText(this.checkoutStepTwoTitle, title);
  }

  async expectItemTotalToContain(amount: string) {
    await this.expectElementToHaveText(this.itemTotal, amount);
  }

  // Validation methods - Complete
  async expectThankYouMessageToBe(message: string) {
    await this.expectElementToHaveText(this.completeHeader, message);
  }

  async expectBackToProductsButtonToBeVisible() {
    await this.expectElementToBeVisible(this.backToProductsButton);
  }

  async expectBackToProductsButtonToBeEnabled() {
    await this.expectElementToBeEnabled(this.backToProductsButton);
  }

}
