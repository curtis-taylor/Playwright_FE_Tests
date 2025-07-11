import { test, expect, type Page, type Locator, Browser } from '@playwright/test';

export class JohnDoePage {

    readonly page: Page;
    readonly url: string = 'http://localhost:3000/pages/profile/?pid=1'; 

    readonly page_h1_title: Locator;

    readonly fig_caption: Locator;

    readonly home_icon: Locator;
    readonly linkedin_icon: Locator;
    readonly youtube_icon: Locator;
    readonly instagram_icon: Locator;
    readonly twitter_x_icon: Locator;
    readonly facebook_icon: Locator;


    public constructor(page: Page) { 
        this.page = page;
        // this.url = this.url;

        this.page_h1_title = page.getByRole('heading');

        this.fig_caption = page.locator('figcaption');

        this.facebook_icon = page.getByRole("link", {name: /facebook for/});
        //this.home_icon = page.getByRole('navigation', { name: 'Secondary Navigation' }).getByRole('link').first();
        //this.youtube_icon = page.getByRole('navigation', { name: 'Secondary Navigation' }).getByRole('link').nth(1);
        //this.instagram_icon = page.getByRole('navigation', { name: 'Secondary Navigation' }).getByRole('link').nth(2);
        this.twitter_x_icon = page.getByRole('link', { name: '/twitter for/' });
        this.linkedin_icon = page.getByRole('link', { name: '/linkedin for/' });
    
    }

    async navigate() {

      await expect(async() => {
            await this.page.goto(this.url); 
            expect(this.page.url()).toBe(this.url);
      }).toPass({ intervals: [1_000, 2_000, 10_000],
                    timeout: 60_000});
      console.log("NAVIGATING to: " + this.url);
    }

    async fill_fields(email: string, password: string) {



    }

}