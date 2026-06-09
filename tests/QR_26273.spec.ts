
//TC004_CB-11186_Verify the rating star is not displayed on the shelf and search pages when there is no review for the product

import { test } from '@playwright/test';
import {ProductSearchPage} from '../pages/ProductSearchPage.js';
import urls from '../data/urls.json';

test('QR_26273',{ tag: '@fast'}, async ({ page }) => {
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