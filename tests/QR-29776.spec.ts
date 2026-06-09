import { test } from '@playwright/test';
import { HomeCarouselPage } from '../pages/HomeCarouselPage.js';
import urls from '../data/urls.json';
import { ProductDetailsPage } from '../pages/ProductDetailsPage.js';

test('Verify the Site wide promo is displayed with same message ', 
  { tag: ['@regression', '@29776'] } , async ({ page }) => {
  const homeCarouselPage = new HomeCarouselPage(page); 
  const productDetailsPage = new ProductDetailsPage(page);

  await homeCarouselPage.openPage(urls.autozone.us.qa1);
  await productDetailsPage.openBatteriesSection();
  await productDetailsPage.expectSiteWidePromoVisible();
  await productDetailsPage.captureHeaderPromoScreenshot('Batteries_Site_Wide_Promo.png');
  const originalImage = await productDetailsPage.takeScreenshot();
  await productDetailsPage.openEngineOilSection();
  await productDetailsPage.expectSiteWidePromoVisible();
  await productDetailsPage.captureHeaderPromoScreenshot('Engine_Oil_Site_Wide_Promo.png');
  await productDetailsPage.openBatteriesSection();
  await productDetailsPage.expectSiteWidePromoVisible();
  await productDetailsPage.compareScreenshot(originalImage);

}); 