import { test as base, Page, BrowserContext } from '@playwright/test';

export interface SessionFixtures {
  loginAsStandardUser: Page;
}

export const test = base.extend<SessionFixtures>({
  loginAsStandardUser: async ({ browser }, use) => {
    // Create new context
    const context = await browser.newContext();
    
    // Add session cookie directly to bypass UI login completely
    await context.addCookies([
      {
        name: 'session-username',
        value: 'standard_user',
        domain: 'www.saucedemo.com',
        path: '/'
      }
    ]);
    
    // Create page with authenticated session
    const page = await context.newPage();
    
    await use(page);
    
    await context.close();
  },
});

export { expect } from '@playwright/test';
