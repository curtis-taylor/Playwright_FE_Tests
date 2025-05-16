import { test, expect, Page } from '@playwright/test';
import { execPath } from 'process';
 
test.describe('USER CHECK YOUR EMAIL Suite', () => {
    test('Social Media Footer Check', async ({ browser }) => {

        const browser_context = await browser.newContext();
        const page = await browser_context.newPage();

        await page.goto('https://26-profile-page-css.volunteer-ekr.pages.dev/pages/complete-profile/');

        await page.getByRole('heading', {name: 'Complete your profile'}).isVisible();

        const facebook_icon = page.getByRole('button', { name: 'Add Facebook account' });
        const threads_icon = page.getByRole('button', { name: 'Add Threads account' });
        const instagram_icon = page.getByRole('button', { name: 'Add Instagram account' });
        const twitter_x_icon = page.getByRole('button', { name: 'Add X account' });
        const linkedin_icon = page.getByRole('button', { name: 'Add LinkedIn account' });
        const bluesky_icon = page.getByRole('button', { name: 'Add BlueSky account' })
        const dev_icon = page.getByRole('button', { name: 'Add Dev.to account' });

        const button_list = [facebook_icon, threads_icon, instagram_icon, twitter_x_icon, linkedin_icon, bluesky_icon, dev_icon];

        instagram_icon.isEnabled();
        facebook_icon.isEnabled();
        threads_icon.isEnabled();
        linkedin_icon.isEnabled();
        bluesky_icon.isEnabled();
        twitter_x_icon.isEnabled(); 
        dev_icon.isEnabled();

        for(const b of button_list) {
            console.log(await b.textContent());
            await b.click();
            expect(await b.count()).toEqual(0);
        }

        let ddd = await page.locator("#details-social-inputs").getByRole("button").all();

        console.log(ddd.length);

        for(const b2 of ddd) {
            console.log(b2.evaluate('name'));
            await b2.click();
        }

        






        await page.close();
    });

});