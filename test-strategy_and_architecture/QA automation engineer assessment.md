### **Assessment Task: Senior QA Automation Engineer**

**Target Application:** [SauceDemo](https://www.google.com/search?q=https://www.saucedemo.com/)

**Time Limit:** 6 Hours

### **The Challenge: "Project SpeedLabs"**

We are taking over the QA process for this e-commerce platform. Management complains that the current suite takes too long to run because every single test logs in via the UI. Your goal is to fix this pattern while implementing robust checks.

#### **Part 1: Test Strategy & Architecture (Time: \~45 mins)**

*Before writing code, show me how you think.*

1. **Framework Choice:** Briefly explain which stack you are choosing (e.g., Playwright/TS, Cypress/JS, Selenium/Java) and why it fits a high-speed, modern CI environment.  
2. **Test Plan:** Create a high-level test plan (Markdown file) for the "Checkout Flow".  
3. **The "Hybrid" Approach:** Explain **risk vs. reward** of bypassing the UI for setup steps (login/data creation). What do we gain? what coverage do we lose?

#### **Part 2: The Framework & The Curveball (Time: \~3 Hours)**

*I am looking for Technical Depth and State Management.*

Set up a repository with your chosen framework. Implement the following:

1. **Constraint: Programmatic Login (The "Anti-Cheat" Requirement)**  
   * **Do NOT** use the UI to log in for your main tests.  
   * Write a utility/fixture that injects the user session (Cookie or LocalStorage) directly into the browser context.  
   * *Goal:* The test should launch the browser and immediately navigate to the /inventory.html page as a logged-in user (standard\_user), skipping the login screen entirely.  
   * *Note:* You will need to inspect the application in DevTools to see how it stores the session.  
2. **The Checkout Flow:**  
   * Start at the Inventory page (using the programmatic login above).  
   * Add "Sauce Labs Backpack" to the cart.  
   * Proceed to checkout, fill in dummy details, and finish the purchase.  
   * **Assertion:** Verify the "Thank you for your order" message appears.  
3. **Dynamic Elements:** Ensure selectors are robust. Do not rely on brittle XPaths or auto-generated IDs. Use data-test attributes or accessible roles.

#### **Part 3: UX/UI & Visual Validation (Time: \~1 Hour)**

*Functionality is useless if the interface is broken.*

1. **Visual Logic Check:**  
   * Go to the Inventory Page.  
   * **Challenge:** Verify that the "Add to Cart" button for the Backpack allows the user to click it, and **programmatically assert** that the text color changes to the specific red used by the site (inspect the CSS) when it becomes the "Remove" button.  
2. **Responsiveness:**  
   * Write a test that runs the Checkout flow in a **mobile viewport** (e.g., iPhone 12/13 dimensions).

#### **Part 4: The Senior "X-Factor" (Time: \~1.15 Hours)**

*Choose ONE of the following to demonstrate ecosystem knowledge:*

* **Option A (CI/CD):** Create a CI configuration file (GitHub Actions or GitLab CI) that installs dependencies, runs the suite, and stores the test report as a downloadable artifact.  
* **Option B (API/Network):** Write a script that intercepts the network request when clicking "Add to Cart" and mocks a failure response (e.g., 500 Server Error). Assert that the UI handles this gracefully (or fails gracefully if the UI doesn't have error handling).  
* **Option C (Performance):** Integrate a check that fails the test if the "Inventory Page" takes longer than 2.0 seconds to become interactive.

---

### **Deliverables**

Please provide a link to a **public GitHub repository** containing:

1. **README.md:** Instructions on how to install and run your tests.  
2. **Code:** Your framework, specifically highlighting the **Login/Session Injection** logic.  
3. **Video Walkthrough (Mandatory):** A short (max 5 min) video (Loom or similar) where you:  
   * Show the tests running.  
   * **Explain how you reverse-engineered the session cookie/storage to achieve the programmatic login.** (This explanation is crucial).

### **Evaluation Rubric**

| Criteria | Passing | Senior Level |
| :---- | :---- | :---- |
| **Login Mechanism** | Uses UI Login (FAIL) | **Bypasses UI Login via State Injection.** |
| **Selectors** | Copy-pasted XPaths. | Resilient selectors (data-test, Aria roles). |
| **Code Structure** | One giant file. | Clean POM / Screenplay pattern. |
| **UX Check** | Checks if button exists. | Checks button color (CSS property) and state. |
| **Explanation** | Reads code line-by-line. | Explains **decisions, trade-offs, and architecture.** |

**Good luck. Show me how you engineer a solution, not just how you write a script.**

