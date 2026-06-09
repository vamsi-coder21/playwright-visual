import { expect } from '@playwright/test';

const SCREENSHOT_OPTIONS = {
  animations: 'disabled',
  caret: 'hide',
  maxDiffPixelRatio: 0.01,
  timeout: 15000,
};

export class AutozoneVehiclePage {
  constructor(page) {
    this.page = page;
    this.vehicleMenuButton = "//button[@data-testid='deskTopVehicle-menu-lg']//div[@data-testid='add-vehicle-header-btn']";
    this.yearInput = '//input[@aria-label="Select the ano"]';
    this.makeInput = '//input[@aria-label="Select the marca"]';
    this.modelInput = '//input[@aria-label="Select the modelo"]';
    this.engineInput = '//input[@aria-label="Select the motor"]';
    this.ymmePopupBox = '//div[@aria-labelledby="workingOnModal"]';
    this.makeArrowDownButton = '//button[@data-testid="makeheader-arrow-down-button"]';
  }

  async openPage(targetUrl) {
    await this.page.goto(targetUrl);
    await this.page.waitForLoadState('domcontentloaded');
  }

  // async openLaunchPage(url) {
  //   await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  // }

  async openVehicleModal() {
    await this.page.click(this.vehicleMenuButton);
    // Wait for the modal inputs to be visible
    await this.page.waitForSelector(this.yearInput, { timeout: 10000 });
    await this.page.waitForSelector(this.makeInput, { timeout: 10000 });
    await this.page.waitForLoadState('domcontentloaded');
  }

  async expectPopupScreenshot(snapshotName) {
    const popup = this.page.locator(this.ymmePopupBox);
    await popup.scrollIntoViewIfNeeded();
    await expect(popup).toBeVisible({ timeout: SCREENSHOT_OPTIONS.timeout });
    await expect(popup).toHaveScreenshot(snapshotName, {
      ...SCREENSHOT_OPTIONS,
      maxDiffPixelRatio: 0.1,
    });
  }

  async verifyDropdownState(locator, enabled) {
    const assertion = enabled ? 'toBeEnabled' : 'toBeDisabled';
    await expect(this.page.locator(locator))[assertion]();
  }

  async verifyDropdownStates({ yearEnabled, makeEnabled, modelEnabled, engineEnabled } = {}) {
    if (yearEnabled !== undefined) {
      await this.verifyDropdownState(this.yearInput, yearEnabled);
    }
    if (makeEnabled !== undefined) {
      await this.verifyDropdownState(this.makeInput, makeEnabled);
    }
    if (modelEnabled !== undefined) {
      await this.verifyDropdownState(this.modelInput, modelEnabled);
    }
    if (engineEnabled !== undefined) {
      await this.verifyDropdownState(this.engineInput, engineEnabled);
    }
  }

  async selectYear(year) {
    await this.page.click(this.yearInput);
    await this.page.getByText(year).click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async typeMakeValue(text) {
    await this.page.click(this.makeInput);
    await this.page.fill(this.makeInput, text);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async chooseMake(make) {
    await this.page.click(this.makeArrowDownButton);
    await this.page.getByText(make).click();
    await this.page.waitForLoadState('domcontentloaded');
  }
}
