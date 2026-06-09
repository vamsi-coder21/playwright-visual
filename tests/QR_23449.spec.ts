import { test } from '@playwright/test';
import { AutozoneVehiclePage } from '../pages/AutozoneVehiclePage.js';
import urls from '../data/urls.json';

test('QR_23449',{ tag: ['@regression', '@23449']}, async ({ page }) => {
  test.setTimeout(240000);
  const autozoneVehiclePage = new AutozoneVehiclePage(page);

  await autozoneVehiclePage.openPage(urls.autozone.br.qa2);
  await autozoneVehiclePage.openVehicleModal();
  await autozoneVehiclePage.expectPopupScreenshot('ymmepopupbox.png');
  await autozoneVehiclePage.verifyDropdownStates({ makeEnabled: false, modelEnabled: false, engineEnabled: false });

  await autozoneVehiclePage.selectYear('2024');
  await autozoneVehiclePage.verifyDropdownStates({ makeEnabled: true, modelEnabled: false, engineEnabled: false });

  await autozoneVehiclePage.typeMakeValue('#$%^&');
  await autozoneVehiclePage.verifyDropdownStates({ modelEnabled: false });

  await autozoneVehiclePage.chooseMake('Arrow Mobility');
  await autozoneVehiclePage.verifyDropdownStates({ modelEnabled: true });
});






//    "test:visual:baseline": "playwright test tests/QR_23449.spec.ts --project=chromium --update-snapshots",
  //  "test:visual": "playwright test tests/QR_23449.spec.ts --project=chromium"