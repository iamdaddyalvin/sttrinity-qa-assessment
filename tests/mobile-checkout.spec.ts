import { test, expect } from '../utils/session-helper';
import { InventoryPage, CartPage, CheckoutPage } from '../pages';

test.describe('Mobile Checkout Flow', () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ loginAsStandardUser }) => {
    inventoryPage = new InventoryPage(loginAsStandardUser);
    cartPage = new CartPage(loginAsStandardUser);
    checkoutPage = new CheckoutPage(loginAsStandardUser);
  });

  test('should complete checkout flow on mobile viewport', async () => {
    // Start at inventory page
    await inventoryPage.goto();
    
    // Verify mobile layout - check if elements are properly sized for mobile
    await inventoryPage.expectElementToBeVisible(inventoryPage.shoppingCartLink);
    
    // Add Sauce Labs Backpack to cart
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    
    // Verify cart badge updates (mobile-specific check)
    await inventoryPage.expectShoppingCartBadgeToHaveCount('1');
    
    // Go to cart (might need to scroll on mobile)
    await inventoryPage.goToCart();
    
    // Verify item in cart
    await cartPage.expectItemToBeVisible('Sauce Labs Backpack');
    
    // Proceed to checkout
    await cartPage.proceedToCheckout();
    
    // Fill checkout information (mobile form validation)
    await checkoutPage.fillCheckoutInformation('Test', 'User', '12345');
    
    // Continue to order summary
    await checkoutPage.continueCheckout();
    
    // Verify order summary on mobile
    await checkoutPage.expectCheckoutStepTwoTitleToBe('Checkout: Overview');
    await checkoutPage.expectItemTotalToContain('Item total: $29.99');
    
    // Finish order
    await checkoutPage.finishCheckout();
    
    // Verify thank you message on mobile
    await checkoutPage.expectThankYouMessageToBe('Thank you for your order!');
    await checkoutPage.expectBackToProductsButtonToBeVisible();
    
    // Verify mobile-specific elements are still accessible
    await checkoutPage.expectBackToProductsButtonToBeEnabled();
  });
});
