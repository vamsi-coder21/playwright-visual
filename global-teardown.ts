import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

async function globalTeardown() {
    console.log('***** Global Teardown Started *****');

    const timestamp = new Date()
        .toISOString()
        .replace(/:/g, '-')
        .replace(/\..+/, '');

    const historyFolder = 'report-history';

    // Create history folder if it doesn't exist
    if (!fs.existsSync(historyFolder)) {
        fs.mkdirSync(historyFolder, { recursive: true });
    }

    try {
        // Archive Playwright HTML report
        if (fs.existsSync('playwright-report')) {
            fs.renameSync(
                'playwright-report',
                path.join(
                    historyFolder,
                    `playwright-report-${timestamp}`
                )
            );

            console.log('Playwright report archived');
        }

        // Archive previous Allure report
        if (fs.existsSync('allure-report')) {
            fs.renameSync(
                'allure-report',
                path.join(
                    historyFolder,
                    `allure-report-${timestamp}`
                )
            );

            console.log('Previous Allure report archived');
        }

        // Generate fresh Allure report
        if (fs.existsSync('allure-results')) {
            console.log('Generating Allure report...');

            execSync(
                'npx allure generate allure-results --clean -o allure-report',
                { stdio: 'inherit' }
            );

            console.log('Allure report generated successfully');
        } else {
            console.log('allure-results folder not found. Skipping report generation.');
        }

    } catch (error) {
        console.error('Error during teardown:', error);
    }

    console.log('***** Global Teardown Completed *****');
}

export default globalTeardown;