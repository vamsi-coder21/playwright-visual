import { expect } from '@playwright/test';

const SCREENSHOT_OPTIONS = {
  animations: 'disabled',
  caret: 'hide',
  maxDiffPixelRatio: 0.01,
  timeout: 15000,
};

export class HomeCarouselPage {
  constructor(page) {
    this.page = page;
    this.scrollCardSection = '[aria-label="Horizontal Cards"]';
    this.scrollCards = 'a';
    this.rightArrow = '[aria-label="Navigate to next item"]';
    this.pauseCarouselButton = '//*[@alt="Pause"]/..';
  }

  async openPage(targetUrl) {
    await this.page.goto(targetUrl);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async verifyMinimumCards(minimumCount) {
    const cardSection = this.page.locator(this.scrollCardSection);
    await cardSection.scrollIntoViewIfNeeded();

    const cards = cardSection.locator(this.scrollCards);
    const totalCards = await cards.count();
    expect(totalCards).toBeGreaterThanOrEqual(minimumCount);
  }

  async moveCarouselAndVerifyMovement() {
    const cardSection = this.page.locator(this.scrollCardSection);
    const cards = cardSection.locator(this.scrollCards);
    const rightArrowButton = this.page.locator(this.rightArrow);

    await expect(rightArrowButton).toBeVisible();

    const firstCardBefore = await cards.first().boundingBox();
    await rightArrowButton.click();
    await this.page.waitForLoadState('domcontentloaded');

    await expect
      .poll(async () => {
        const firstCardAfter = await cards.first().boundingBox();
        return firstCardAfter?.x;
      })
      .not.toBe(firstCardBefore?.x);
  }

  async captureCarouselScreenshot(snapshotName) {
    await this.page.locator(this.pauseCarouselButton).click();
    await this.page.waitForTimeout(2000); // Wait for the carousel to pause and stabilize
    const cardSection = this.page.locator(this.scrollCardSection);
    await cardSection.scrollIntoViewIfNeeded();
    await expect(cardSection).toBeVisible({ timeout: SCREENSHOT_OPTIONS.timeout });
    await expect(cardSection).toHaveScreenshot(snapshotName, SCREENSHOT_OPTIONS);
  }
}
