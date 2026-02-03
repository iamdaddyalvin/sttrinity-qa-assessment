# ST Trinity QA Assessment

Playwright automated tests for QA assessment.

## Installation

```bash
npm install
npm run install:browsers
```

## Running Tests

```bash
npm test              # Run all tests
npm run test:headed   # Show browser
npm run test:debug    # Debug mode
```

## View Reports

```bash
npm run report
```

## Project Structure

- `tests/` - Test files
- `pages/` - Page Objects
- `utils/` - Utility functions
- `playwright.config.ts` - Configuration

## CI/CD Integration

### GitHub Actions
The project includes a GitHub Actions workflow (`.github/workflows/ci.yml`) that:
- Installs dependencies and Playwright browsers
- Runs the full test suite
- Uploads test reports as artifacts
- Supports multiple Node.js versions

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches

**Artifacts:**
- `playwright-report` - Full HTML report
- `test-results` - JSON test results
- Retention: 30 days

### GitLab CI
Alternative GitLab CI configuration (`.gitlab-ci.yml`) that:
- Runs tests on Docker containers
- Generates test reports
- Deploys reports to GitLab Pages
- Caches dependencies for faster builds

**Features:**
- Automatic Chrome browser installation
- JUnit test reports
- Coverage reporting
- 1-week artifact retention

### Local Development with CI Simulation
To test the CI pipeline locally:

```bash
# Install dependencies (as CI would)
npm ci

# Install browsers
npx playwright install --with-deps

# Run tests (same as CI)
npx playwright test

# Generate reports
npm run report
```
