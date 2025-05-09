import { test, expect, Browser, Page, BrowserContext, Locator } from '@playwright/test';
import { execPath } from 'process';

test.describe('SIGN-IN Test Suite', () => {
    test('Check page Elements and Text', async ({ page }) => {
        await page.goto('http://localhost:3000/pages/sign-in/');

        // Expect a title "to contain" a substring.
        // await expect(page.locator('h3')).toHaveText('Volunteer Profile');

        await page.getByRole('heading', {name: 'Welcome to TorontoJS Community Hub'}).isVisible()

        await page.locator('#email-input').isVisible();
        await page.locator('#password-input').isVisible();


        await page.getByRole('button', { name: 'Log in'}).isVisible();

        
        page.close;
    });

    test('Enter invalid password', async ({ page }) => {
        await page.goto('http://localhost:3000/pages/sign-in/');

        // Expect a title "to contain" a substring.
        // await expect(page.locator('h3')).toHaveText('Volunteer Profile');

        await page.getByRole('heading', {name: 'Welcome to TorontoJS Community Hub'}).isVisible()

        await page.locator('#email-input').fill("test@gmail.com")
        await page.locator('#password-input').fill("xxxxxxxxx");


        await page.getByRole('button', { name: 'Log in'}).isVisible();

        await page.getByRole('button', { name: 'Log in'}).click();

        
        page.close;
    });

    test('Enter invalid email', async ({ page }) => {
        await page.goto('http://localhost:3000/pages/sign-in/');

        // Expect a title "to contain" a substring.
        // await expect(page.locator('h3')).toHaveText('Volunteer Profile');

        await page.getByRole('heading', {name: 'Welcome to TorontoJS Community Hub'}).isVisible()

        await page.locator('#email-input').fill("xxxxxx");
        await page.locator('#password-input').fill("password");


        await page.getByRole('button', { name: 'Log in'}).isVisible();

        await expect(page.getByRole('button', { name: 'Log in'})).toHaveCSS('color', `rgb(237, 55, 49)`);

        await page.getByRole('button', { name: 'Log in'}).click();

        
        page.close;
    });

    test('Social Media Footer Check', async ({ browser }) => {

        const browser_context = await browser.newContext();
        const page = await browser_context.newPage();

        await page.goto('http://localhost:3000/pages/sign-in/');

        await page.getByRole('heading', {name: 'Welcome to TorontoJS Community Hub'}).isVisible()

        const tt = await page.getByRole('list').all();

        for(const t of tt) {
            console.log(t.allInnerTexts);

        }


        await page.locator('#email-input').fill("test@gmail.com")
        await page.locator('#password-input').fill("xxx");


        await page.getByRole('button', { name: 'Complete sign-up form button' }).isVisible();

        await page.getByRole('button', { name: 'Complete sign-up form button' }).click();

        const home_icon = page.getByRole('navigation', { name: 'Secondary Navigation' }).getByRole('link').first();
        const youtube_icon = page.getByRole('navigation', { name: 'Secondary Navigation' }).getByRole('link').nth(1);
        const instagram_icon = page.getByRole('navigation', { name: 'Secondary Navigation' }).getByRole('link').nth(2);
        const twitter_x_icon = page.getByRole('navigation', { name: 'Secondary Navigation' }).getByRole('link').nth(3);
        const linkedin_icon = page.getByRole('navigation', { name: 'Secondary Navigation' }).getByRole('link').nth(4);
        
        const [newPage] = await Promise.all([
            browser_context.waitForEvent("page"), // pending, fullfilled or rejected
            youtube_icon.click()

        ])

        
        await expect(newPage).toHaveURL("https://www.youtube.com/channel/UC1samyyfqiKmOT6fq3uVO1A");
        console.log(String(newPage.url));

        let pp = await newPage .evaluate(() => window.location.href)
        console.log(pp);
        page.close;
    });

});