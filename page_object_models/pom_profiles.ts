import { test, expect, type Page, type Locator, Browser, BrowserContext } from '@playwright/test';

export class ProfilesPages {

    readonly page: Page;
    readonly url: string = 'http://localhost:3000/pages/profiles/'; 

    readonly voluteer_H3_base: Locator;
    readonly profile_field_base: Locator;
    readonly profile_field_wrapper_base: Locator;

    readonly facebook_link_base: Locator;
    readonly linkedin_link_base: Locator;
    readonly twitter_x_link_base: Locator;

    // readonly h3_tag: Locator;
    readonly social_media_link_base: Locator;

    public constructor(page: Page) {
        this.page = page;
        this.voluteer_H3_base = page.locator('h3');
        this.profile_field_base = page.getByRole('paragraph');
        this.profile_field_wrapper_base = page.locator('.profile-header');
        this.social_media_link_base = page.locator('.social-links a');
    }

    async navigate() {
        await this.page.goto(this.url); 
        console.log(this.page.url())
        expect(this.page.url()).toBe(this.url);
    }

    async click_social_links(base_locator: Locator, browser_context: BrowserContext) {
        for (const row of await base_locator.locator('.social-links a').all()) {
            let temp = await row.textContent();
            console.log(temp);
            
            let [newPage_1] = await Promise.all([
                    browser_context.waitForEvent("page"), // pending, fullfilled or rejected
                    await row.click()
                ]);
                
            let pp = await newPage_1.evaluate(() => window.location.href);
            console.log(pp);
            // console.log("----");

            if(temp != "Twitter") { 
                expect(pp).toContain(temp?.toLowerCase());

            } else {
                expect(pp).toContain("x.com");
            }

            await newPage_1.close();
            // expect(await row.textContent() == 'Volunteer Profile');
       }

    }

    async check_H3_tags(page: Page, phrase: string) {
        let t = await page.locator('h3').all();

        if(t.length > 0) {
            console.log(t.length);
            
        }

       // await page.waitForTimeout(5000);

        for (const row of await page.locator('h3').all()) {
            console.log(await row.textContent());
            expect(await row.textContent() == phrase);
        }
    }



}