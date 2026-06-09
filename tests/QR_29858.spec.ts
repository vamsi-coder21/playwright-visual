import { test, devices  } from '@playwright/test';
import { ProductDetailsPage } from '../pages/ProductDetailsPage.js';
import urls from '../data/urls.json';

 test.use({
    ...devices['iPhone 15']
  });

test.describe('Mobile Tests', () => {
 test('Verify the review summary is displaying in PDP page for available products', 
  { tag: ['@regression', '@29858'] }, async ({ page }) => {
  const productDetailsPage = new ProductDetailsPage(page);

  await productDetailsPage.openPage(urls.autozone.mx.qa1);
  await productDetailsPage.openBateriasSection();
  await productDetailsPage.openFirstProductCard();
  await productDetailsPage.openProductByRef('Refacción #34-78-DL');
  await productDetailsPage.expectProductVisible('Refacción #34-78-DL');
  await productDetailsPage.expectReviewStatsNotVisible();
  await productDetailsPage.expectReviewAccordionVisible();
  await productDetailsPage.expectNoReviewsText();
  await productDetailsPage.hoverReviewRatingStar();
  await productDetailsPage.captureReviewRatingsScreenshot('Review_Ratings.png');
  await productDetailsPage.openWriteReview();
  await productDetailsPage.expectReviewFormVisible();
  await productDetailsPage.expectGeneralRatingVisible();
 });
}); 