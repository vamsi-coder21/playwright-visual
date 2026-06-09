import fs from 'fs';

async function globalSetup() {
    console.log('***** Global Setup Started *****');

    if (fs.existsSync('allure-report/history')) {

        if (!fs.existsSync('allure-results')) {
            fs.mkdirSync('allure-results', { recursive: true });
        }

        fs.cpSync(
            'allure-report/history',
            'allure-results/history',
            { recursive: true }
        );

        console.log('Allure history preserved');
    }
}

export default globalSetup;