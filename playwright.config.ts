import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  globalSetup: './global-setup.ts',
  globalTeardown: './global-teardown.ts',
  timeout: 1200000,
  testDir: './tests',
  headless: false,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: [
    ['html', {
      outputFolder: 'playwright-report',
      open: 'never'
    }],
    ['allure-playwright', {
      outputFolder: 'allure-results'
    }]
  ],
  use: {
    //trace: 'on-first-retry',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: false,
    slowMo: 1000,
    permissions: [],
  },

  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
      },
    },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 15'] },
    // },
  ],
});
