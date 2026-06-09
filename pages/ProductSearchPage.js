import { expect } from '@playwright/test';

export class ProductSearchPage {
  constructor(page) {
    this.page = page;

    this.searchInput = "//input[@data-testid='desktop-search-input']";
    this.searchResultsTitle = '(//div[@data-testid="search-count-info"])[1]';
    this.searchResultsProductContainer = "(//li[@data-testid='product-container'])[5]";
    this.shelfProductContainer = "(//li[@data-testid='product-container'])[1]";

    this.engineOilProductImage = "//img[@alt='STP Full Synthetic 0W-30 Motor Oil 1 Quart']";
    this.brakePadProductImage = "//img[@alt='Duralast Gold Ceramic Premium Brake Pads DG1379']";
    this.addVehicleText = 'text=Add your vehicle';
    this.noReviewsText = "//div[text()='No reviews from customers.']";
    this.ratingItem = '[data-testid="rating-item"][class*="-name"]';
    this.engineOilReviewStarbox = "(//div[@data-testid='st-accordion'])[3]";
    this.brakePadReviewStarbox = "(//div[@data-testid='st-accordion'])[3]";
    this.pageTitle = "//h1[@data-testid='at_title_first_text']";
    this.searchResultsTitleMobile = '(//div[@data-testid="search-count-info"])[2]';
  }

  async openPage(targetUrl) {
    await this.page.goto(targetUrl);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async searchEngineOil() {
    await this.page.locator(this.searchInput).fill('Engine oil');
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(9000);
    if (this.page.viewportSize() && this.page.viewportSize().width < 768) {
        await this.page.waitForSelector(this.searchResultsTitleMobile, { timeout: 10000 });
    } else {
        await this.page.waitForSelector(this.searchResultsTitle, { timeout: 10000 });
    }
    await this.page.waitForLoadState('domcontentloaded');
  }

  async captureSearchResultsProductImage() {
    const element = this.page.locator(this.searchResultsProductContainer);
    //await element.scrollIntoViewIfNeeded();
    await expect(element).toBeVisible({ timeout: 15000 });
    if (this.page.viewportSize() && this.page.viewportSize().width < 768) {
      await this.page.waitForTimeout(8000);
      await this.page.waitForLoadState('networkidle');
      await expect(element).toHaveScreenshot('ProductImagePageMobile.png', {
      animations: 'disabled',
      caret: 'hide',
      maxDiffPixelRatio: 0.01,
      timeout: 15000,
    });
    } else {
        await expect(element).toHaveScreenshot('ProductImagePage.png', {
      animations: 'disabled',
      caret: 'hide',
      maxDiffPixelRatio: 0.01,
      timeout: 15000,
    });
    }

  }

  async openEngineOilProduct() {
    await this.page.locator(this.engineOilProductImage).click();
    await this.page.waitForSelector(this.addVehicleText, { timeout: 10000 });
    await this.page.waitForLoadState('domcontentloaded');
  }

  async verifyNoReviewsDisplayed() {
    await this.page.waitForTimeout(2000);
    await this.page.waitForLoadState('domcontentloaded');
    const reviewBoxText = this.page.locator(this.noReviewsText);
    await this.page.waitForTimeout(2000);
    await expect(reviewBoxText).toBeVisible();
    await reviewBoxText.scrollIntoViewIfNeeded();
  }

  async verifyNoRatingStars() {
    const checkedStars = this.page.locator(this.ratingItem);
    await expect(checkedStars).toHaveCount(0);
  }

  async captureEngineOilReviewStarbox() {
    const reviewBox = this.page.locator(this.engineOilReviewStarbox);

    await this.page.waitForLoadState('domcontentloaded');
    await reviewBox.scrollIntoViewIfNeeded();
    await expect(reviewBox).toBeVisible({ timeout: 15000 });
    await this.page.waitForTimeout(8000);
    await this.page.waitForLoadState('networkidle');
    if (this.page.viewportSize() && this.page.viewportSize().width < 768) {
      await expect(reviewBox).toHaveScreenshot('CustomerreviewstarboxMobile.png', {
      animations: 'disabled',
      caret: 'hide',
      maxDiffPixelRatio: 0.05,
      timeout: 15000,
    });
    } else {
      await expect(reviewBox).toHaveScreenshot('Customerreviewstarbox.png', {
      animations: 'disabled',
      caret: 'hide',
      maxDiffPixelRatio: 0.05,
      timeout: 15000,
    });
    }
  }

  async searchBrakePad() {
    await this.page.locator(this.searchInput).fill('brake pad');
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(9000);
    if (this.page.viewportSize() && this.page.viewportSize().width < 768) {
        await this.page.waitForSelector(this.searchResultsTitleMobile, { timeout: 10000 });
    } else {
        await this.page.waitForSelector(this.searchResultsTitle, { timeout: 10000 });
    }
    await this.page.waitForLoadState('domcontentloaded');
  }

  async verifyBrakePadsTitle() {
    if (this.page.viewportSize() && this.page.viewportSize().width < 768) {
        await this.page.waitForSelector(this.searchResultsTitleMobile, { timeout: 10000 });
    } else {
        await this.page.waitForSelector(this.searchResultsTitle, { timeout: 10000 });
    }
    await this.page.waitForLoadState('domcontentloaded');
  }

  async captureShelfProductImage() {
    const element = this.page.locator(this.shelfProductContainer);
    await element.scrollIntoViewIfNeeded();
    await expect(element).toBeVisible({ timeout: 15000 });
    if (this.page.viewportSize() && this.page.viewportSize().width < 768) {
      await expect(element).toHaveScreenshot('ShelfProductImagePageMobile.png', {
      animations: 'disabled',
      caret: 'hide',
      maxDiffPixelRatio: 0.01,
      timeout: 15000,
    });
    } else {
      await expect(element).toHaveScreenshot('ShelfProductImagePage.png', {
      animations: 'disabled',
      caret: 'hide',
      maxDiffPixelRatio: 0.01,
      timeout: 15000,
    });
    }
  }

  async openBrakePadProduct() {
    await this.page.locator(this.brakePadProductImage).click();
    await this.page.waitForSelector(this.addVehicleText, { timeout: 10000 });
    await this.page.waitForLoadState('domcontentloaded');
  }

  async captureShelfReviewStarbox() {
    const reviewBox = this.page.locator(this.brakePadReviewStarbox);

    await this.page.waitForLoadState('domcontentloaded');
    await reviewBox.scrollIntoViewIfNeeded();
    await expect(reviewBox).toBeVisible({ timeout: 15000 });
    await this.page.waitForTimeout(8000);
    await this.page.waitForLoadState('networkidle');
    if (this.page.viewportSize() && this.page.viewportSize().width < 768) {
      await expect(reviewBox).toHaveScreenshot('ShelfCustomerReviewStarboxMobile.png', {
        animations: 'disabled',
        caret: 'hide',
        maxDiffPixelRatio: 0.01,
        timeout: 15000,
      });
    } else {
      await expect(reviewBox).toHaveScreenshot('ShelfCustomerReviewStarbox.png', {
        animations: 'disabled',
        caret: 'hide',
        maxDiffPixelRatio: 0.01,
        timeout: 15000,
      });
    }
  }

  // Pause for manual inspection
  // async pauseForInspection() {
  //   await this.page.pause();
  // }
};
