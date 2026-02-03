import { test, expect } from '../utils/session-helper';
import { InventoryPage } from '../pages';

test.describe('Visual Validation', () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ loginAsStandardUser }) => {
    inventoryPage = new InventoryPage(loginAsStandardUser);
  });

  test('should verify button color change from Add to Cart to Remove', async () => {
    // Go to inventory page
    await inventoryPage.goto();
    
    // Get initial button color
    const initialColor = await inventoryPage.getAddToCartButtonColor('Sauce Labs Backpack');
    console.log('Initial button color:', initialColor);
    
    // Add to cart
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    
    // Get remove button colors
    const removeTextColor = await inventoryPage.getRemoveButtonColor('Sauce Labs Backpack');
    const removeBorderColor = await inventoryPage.getRemoveButtonBorderColor('Sauce Labs Backpack');
    
    console.log('Remove button text color:', removeTextColor);
    console.log('Remove button border color:', removeBorderColor);
    
    // Assert the color is red
    expect(removeTextColor).toBe('rgb(226, 35, 26)');
    expect(removeBorderColor).toBe('rgb(226, 35, 26)');
    
    // Verify colors are different
    expect(initialColor).not.toBe(removeTextColor);
  });

  test('should verify button interactivity', async () => {
    // Go to inventory page
    await inventoryPage.goto();
    
    // Verify add to cart button is enabled
    await inventoryPage.expectAddToCartButtonToBeVisible('Sauce Labs Backpack');
    
    // Add to cart
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    
    // Verify remove button is present and enabled
    await inventoryPage.expectRemoveButtonToBeVisible('Sauce Labs Backpack');
  });
});
