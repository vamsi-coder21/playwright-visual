import { test } from '@playwright/test';
import { HomeCarouselPage } from '../pages/HomeCarouselPage.js';
import urls from '../data/urls.json';

test('Verify carousel functionality',{ tag: ['@regression', '@23111']}, async ({ page }) => {
        const homeCarouselPage = new HomeCarouselPage(page);

        await homeCarouselPage.openPage(urls.autozone.br.qa2);
        await homeCarouselPage.verifyMinimumCards(8);
        await homeCarouselPage.moveCarouselAndVerifyMovement();
        await homeCarouselPage.captureCarouselScreenshot('homepage-carousel.png');
    });