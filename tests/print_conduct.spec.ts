import { test, expect, Browser, Page, BrowserContext, Locator } from '@playwright/test';
import { execPath } from 'process';
import { SignInPage } from '../page_object_models/pom_sign-in';
import { link } from 'fs/promises';

const url_1 = "http://localhost:3000/pages/sign-in/";

test.describe('SIGN-IN Test Suite', () => {
    test('LICENSE LINK', async ({ page }) => {
        await page.goto('http://localhost:3000/pages/print-documents/?document=code-of-conduct');


        // Expect a title "to contain" a substring.
        // await expect(page.locator('h3')).toHaveText('Volunteer Profile');

        let t = await page.getByText('The Toronto JS Code of').getByRole('link').all();
        
        for(const row of t) {
            console.log(await row.textContent());
            await page.waitForTimeout(500);
        }

        await page.close();
    });

});