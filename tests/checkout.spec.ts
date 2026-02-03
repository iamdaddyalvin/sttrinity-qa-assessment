import { test, expect } from '../utils/session-helper';
import { InventoryPage, CartPage, CheckoutPage } from '../pages';

test.describe('Checkout Flow', () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ loginAsStandardUser }) => {
    inventoryPage = new InventoryPage(loginAsStandardUser);
    cartPage = new CartPage(loginAsStandardUser);
    checkoutPage = new CheckoutPage(loginAsStandardUser);
  });

  test('should complete checkout flow', async () => {
    // Start at inventory page
    await inventoryPage.goto();
    
    // Verify we're logged in
    await inventoryPage.expectShoppingCartBadgeToHaveCount('0');
    
    // Add Sauce Labs Backpack to cart
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    
    // Verify cart badge updates
    await inventoryPage.expectShoppingCartBadgeToHaveCount('1');
    await inventoryPage.expectRemoveButtonToBeVisible('Sauce Labs Backpack');
    
    // Go to cart
    await inventoryPage.goToCart();
    
    // Verify item in cart
    await cartPage.expectItemToBeVisible('Sauce Labs Backpack');
    await cartPage.expectItemPriceToBe('$29.99');
    await cartPage.expectItemQuantityToBe('1');
    
    // Proceed to checkout
    await cartPage.proceedToCheckout();
    
    // Fill checkout information
    await checkoutPage.fillCheckoutInformation('Test', 'User', '12345');
    await checkoutPage.continueCheckout();
    
    // Verify order summary
    await checkoutPage.expectCheckoutStepTwoTitleToBe('Checkout: Overview');
    await checkoutPage.expectItemTotalToContain('Item total: $29.99');
    
    // Finish order
    await checkoutPage.finishCheckout();
    
    // Verify thank you message
    await checkoutPage.expectThankYouMessageToBe('Thank you for your order!');
    await checkoutPage.expectBackToProductsButtonToBeVisible();
  });

  test('should validate checkout form with missing information', async () => {
    // Start checkout process
    await inventoryPage.goto();
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();
    
    // Try to continue without filling form
    await checkoutPage.continueCheckout();
    
    // Should show error message
    await checkoutPage.expectErrorMessageToContain('Error: First Name is required');
  });
});
