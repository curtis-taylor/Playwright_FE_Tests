import { test, expect, Browser, Page, BrowserContext, Locator } from '@playwright/test';
import { execPath } from 'process';
import { SignInPage } from '../page_object_models/pom_sign-in';
import { link } from 'fs/promises';

const url_1 = "http://localhost:3000/pages/sign-in/";

test.describe('SIGN-IN Test Suite', () => {
    test.('LICENSE LINK', async ({ browser }) => {

        const browser_context = await browser.newContext();
        const page = await browser_context.newPage();

        await page.goto('http://localhost:3000/pages/print-documents/?document=code-of-conduct');


        let lll = [];
        // Expect a title "to contain" a substring.
        // await expect(page.locator('h3')).toHaveText('Volunteer Profile');

        let t = await page.getByText('The Toronto JS Code of').getByRole('link').all();
        
        for(const row of t) {
            console.log(await row.textContent());
            await page.waitForTimeout(500);
            console.log(await row.getAttribute('href'));

            const [newPage_0] = await Promise.all([
            browser_context.waitForEvent("page"), // pending, fullfilled or rejected
            await row.click();

        ]);
        
        await expect(newPage_0).toHaveURL("https://torontojs.com/");

            
        }

        await page.close();
    });

});