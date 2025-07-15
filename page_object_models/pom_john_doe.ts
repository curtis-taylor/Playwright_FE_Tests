import { test, expect, type Page, type Locator, Browser } from '@playwright/test';

export class JohnDoePage {

    readonly page: Page;
    readonly url: string = 'http://localhost:3000/pages/profile/?pid=2'; 

    readonly profile_name: string = "John Doe";

    readonly page_h1_title: Locator;

    readonly fig_caption: Locator;

    readonly member_since_label: Locator;

    readonly avatar_image: Locator;

    readonly home_icon: Locator;
    readonly linkedin_icon: Locator;
    readonly youtube_icon: Locator;
    readonly instagram_icon: Locator;
    readonly twitter_x_icon: Locator;
    readonly facebook_icon: Locator;


    public constructor(page: Page) { 
        this.page = page;
        // this.url = this.url;

        this.page_h1_title = page.getByRole('heading').nth(0);

        this.fig_caption = page.locator('.user-profile-column figcaption');

        this.member_since_label = page.getByText("Member Since: ");

        this.avatar_image = page.locator("img");

        this.facebook_icon = page.getByRole("link", {name: /facebook for/});
        //this.home_icon = page.getByRole('navigation', { name: 'Secondary Navigation' }).getByRole('link').first();
        //this.youtube_icon = page.getByRole('navigation', { name: 'Secondary Navigation' }).getByRole('link').nth(1);
        //this.instagram_icon = page.getByRole('navigation', { name: 'Secondary Navigation' }).getByRole('link').nth(2);
        this.twitter_x_icon = page.getByRole('link', { name: '/twitter for/'});
        this.linkedin_icon = page.getByRole('link', { name: '/linkedin for/'});
        this.youtube_icon = page.getByRole('link', { name: '/youtube for/'});
        this.facebook_icon = page.getByRole('link', { name: '/facebook for/'});
    }

    async navigate() {

      await expect(async() => {
            await this.page.goto(this.url); 
            expect(this.page.url()).toBe(this.url);
      }).toPass({ intervals: [1_000, 2_000, 10_000],
                    timeout: 60_000});
      console.log("NAVIGATING to: " + this.url);
    }

    async johndoe_check_social_links(page: Page, should_click: Boolean) {
        // await page.waitForLoadState('domcontentloaded');

        let johndoe_url = page.url();

        let t2 = page.locator('li a').all();

        for(const row of await t2) {

          await expect(row).toBeVisible();
          await row.isEnabled();
          let href_temp = await row.getAttribute('href');
          let expected_url = href_temp?.toString().split(".");
          let link_target = await row.getAttribute('target');

          if(should_click) {

            await row.click();

            if(link_target === '_blank') {
              const [newPage] = await Promise.all([
              page.waitForEvent('popup'),
              row.click()
            ]);

             await newPage.waitForLoadState();
             
            // expect(newPage.url()).toBe();
            await newPage.close();

            } else {

              /*
              // Test hover state
            await row.hover();
            
            // Check if cursor changes to pointer on hover
            let cursor = await row.evaluate((el) => {
              return window.getComputedStyle(el).cursor;
            });
            expect(cursor).toBe('pointer'); */

              expect(page.url().includes(expected_url?.[0] as string));
              console.log("@@@@");
              await page.goBack();
              expect(page.url()).toEqual(johndoe_url);
              await page.waitForURL(johndoe_url);

            }
            
          } 
       }

        /*
        // await page.waitForSelector('ul');
        await page.getByRole('list', { name: 'Social Media Links' }).waitFor({state: 'visible', timeout: 5000});
        // console.log(await this.twitter_x_icon.count());

        if(await this.facebook_icon.count() > 0) {

          await expect(this.facebook_icon).toBeVisible();
          await this.facebook_icon.isEnabled();
          if(should_click) {
            let href_temp = await this.facebook_icon.getAttribute('href');
            let expected_url = href_temp?.toString().split(".");

            await this.facebook_icon.click();
            expect(this.page.url().includes(expected_url?.[0] as string));

            await this.page.goBack();
            expect(this.page.url()).toEqual(johndoe_url);
            await this.page.waitForURL(johndoe_url);
          
          }
      
        }


        // await this.page.waitForSelector('ul');
        await page.getByRole('list', { name: 'Social Media Links' }).waitFor({state: 'visible', timeout: 5000});
        console.log(await this.twitter_x_icon.count());

        if(await this.twitter_x_icon.isVisible()) {
          await expect(this.twitter_x_icon).toBeVisible();
          await this.twitter_x_icon.isEnabled();

          if(should_click) {
            let href_temp = await this.twitter_x_icon.getAttribute('href');
            let expected_url = href_temp?.toString().split(".");

            await this.twitter_x_icon.click();
            expect(this.page.url().includes(expected_url?.[0] as string));

            await this.page.goBack();
            expect(this.page.url()).toEqual(johndoe_url);
          
          }
        }

        // await page.waitForSelector('ul');
        await page.getByRole('list', { name: 'Social Media Links' }).waitFor({state: 'visible', timeout: 5000});

        if(await this.linkedin_icon.count() > 0) {
          await expect(this.linkedin_icon).toBeVisible();

          if(should_click) {
            let href_temp = await this.linkedin_icon.getAttribute('href');
            let expected_url = href_temp?.toString().split(".");

            await this.linkedin_icon.click();
            expect(this.page.url().includes(expected_url?.[0] as string));

            await this.page.goBack();
            expect(this.page.url()).toEqual(johndoe_url);
          
          }

        } */


    }


}