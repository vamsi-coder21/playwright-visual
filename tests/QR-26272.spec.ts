import { test, devices } from '@playwright/test';
import {ProductSearchPage} from '../pages/ProductSearchPage.js';
import urls from '../data/urls.json';

test.use({
    ...devices['iPhone 15']
  });

test('QR_26272' ,{ tag: ['@regression', '@26272']}, async ({ page }) => {
  test.setTimeout(240000);

  const searchPage = new ProductSearchPage(page);

  await searchPage.openPage(urls.autozone.us.qa2);
  await searchPage.searchEngineOil();
  await searchPage.captureSearchResultsProductImage();
  await searchPage.openEngineOilProduct();
  await searchPage.verifyNoReviewsDisplayed();
  await searchPage.verifyNoRatingStars();
  await searchPage.captureEngineOilReviewStarbox();

  await searchPage.searchBrakePad();
  await searchPage.verifyBrakePadsTitle();
  await searchPage.captureShelfProductImage();
  await searchPage.openBrakePadProduct();
  await searchPage.verifyNoReviewsDisplayed();
  await searchPage.captureShelfReviewStarbox();

});