import { expect } from '@playwright/test';

const SCREENSHOT_OPTIONS = {
  animations: 'disabled',
  caret: 'hide',
  maxDiffPixelRatio: 0.01,
  timeout: 15000,
};

export class ProductDetailsPage {
  constructor(page) {
    this.page = page;

    this.menuButton = 'button#menuNavBtnScroll>div>div:nth-of-type(2)';
    this.menuButtonDesktop = '#hamburgerMenuBtn';
    this.bateriasSideNavItem = 'div[data-testid="baterías-side-nav-item"]';
    this.firstProductCard = '[data-testid="product-image-container"]';
    this.reviewStats = 'div[data-testid="review-stats"]';
    this.reviewAccordionTrigger = '//*[text()="Reseñas de los clientes"]';
    this.noReviewsText = 'Aún no hay reseñas.';
    this.beFirstText = '¡Se el primero en dejar una!';
    this.ratingStar = '#field-rating-4';
    this.customerReviewsContainer = 'div#customer-reviews>div>div>div';
    this.writeReviewButton = 'text="Escribe una Reseña"';
    this.reviewFormTitle = '//*[text()="Reseña Este Producto"]';
    this.generalRatingText = 'Calificación general*';
    this.headerpromo = '#header-promo-desktop';
    this.engineOilSideNavItem = 'div[data-testid="engine-oil-side-nav-item"]';
    this.batteriesSideNavItem = 'div[data-testid="batteries-side-nav-item"]';
  }

  async openPage(targetUrl) {
    await this.page.goto(targetUrl);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async openBateriasSection() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.locator(this.menuButton).click();
    await this.page.locator(this.bateriasSideNavItem).click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async openBatteriesSection() {
    await this.page.locator(this.menuButtonDesktop).click();
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.page.locator(this.batteriesSideNavItem)).toBeVisible();
    await this.page.locator(this.batteriesSideNavItem).click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.waitFor(10000);
  }
  
  async openFirstProductCard() {
    await this.page.locator(this.firstProductCard).first().click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async openProductByRef(refText) {
    await this.page
      .locator('div')
      .filter({ hasText: this._escapeRegex(refText) })
      .nth(1)
      .click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async expectProductVisible(refText) {
    await expect(
      this.page
        .locator('div')
        .filter({ hasText: this._escapeRegex(refText) })
        .nth(1)
    ).toBeVisible();
  }

  async expectReviewStatsNotVisible() {
    await expect(this.page.locator(this.reviewStats)).not.toBeVisible();
  }

  async expectReviewAccordionVisible() {
    await expect(this.page.locator(this.reviewAccordionTrigger)).toBeVisible();
  }

  async expectNoReviewsText() {
    await expect(this.page.getByText(this.noReviewsText)).toBeVisible();
    await expect(this.page.getByText(this.beFirstText)).toBeVisible();
  }

  async hoverReviewRatingStar() {
    await this.page.hover(this.ratingStar);
    await this.waitFor(5000);
  }

  async captureReviewRatingsScreenshot(snapshotName) {
    const snapshotTarget = this.page.locator(this.customerReviewsContainer);
    await expect(snapshotTarget).toBeVisible({ timeout: SCREENSHOT_OPTIONS.timeout });
    await expect(snapshotTarget).toHaveScreenshot(snapshotName, SCREENSHOT_OPTIONS);
  }

//   async captureReviewRatingsScreenshot(snapshotName) {
//     const snapshotTarget = this.page.locator(this.customerReviewsContainer);
//     await expect(snapshotTarget).toBeVisible({ timeout: SCREENSHOT_OPTIONS.timeout });
//     await expect(snapshotTarget).toHaveScreenshot(snapshotName, SCREENSHOT_OPTIONS);
//   }

  async openWriteReview() {
    await this.page.locator(this.writeReviewButton).nth(0).click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.waitFor(5000);
  }

  async expectReviewFormVisible() {
    await this.page.waitForTimeout(5000);
    await expect(this.page.locator(this.reviewFormTitle)).toBeVisible();
  }

  async expectGeneralRatingVisible() {
    await expect(this.page.getByText(this.generalRatingText)).toBeVisible();
  }

  async waitFor(milliseconds = 5000) {
    await this.page.waitForTimeout(milliseconds);
  }

  _escapeRegex(text) {
    return new RegExp(`^${text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`);
  }

  async expectSiteWidePromoVisible() {
    await expect(this.page.locator(this.headerpromo)).toBeVisible();
  }

  async captureHeaderPromoScreenshot(snapshotName) {
    const snapshotTarget = this.page.locator(this.headerpromo);
    await expect(snapshotTarget).toBeVisible({ timeout: SCREENSHOT_OPTIONS.timeout });
    await expect(snapshotTarget).toHaveScreenshot(snapshotName, SCREENSHOT_OPTIONS);
  }

  async takeScreenshot() {
    const snapshotTarget = this.page.locator(this.headerpromo);
    const originalImage = await snapshotTarget.screenshot();
    return originalImage;
  }

  async compareScreenshot(originalImage) {
    const currentPromoImage = await this.page.locator(this.headerpromo).screenshot();
    expect(currentPromoImage.equals(originalImage))
    .toBeTruthy();
  }

  async openEngineOilSection() {
    await this.page.locator(this.menuButtonDesktop).click();
    await this.page.locator(this.engineOilSideNavItem).click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.waitFor(10000);
  }

  async openBatteriesSection() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.locator(this.menuButtonDesktop).click();
    await this.page.locator(this.batteriesSideNavItem).click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.waitFor(10000);
  }
}
