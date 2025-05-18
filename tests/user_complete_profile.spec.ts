import { test, expect, Page } from '@playwright/test';
import { execPath } from 'process';

test.beforeEach(async ({page }) => {
  
   await page.goto('https://26-profile-page-css.volunteer-ekr.pages.dev/pages/complete-profile/'); 

   
})
 
test.describe('USER CHECK YOUR EMAIL Suite', () => {
    test('Social Media Footer Check', async ({ page }) => {

        // const browser_context = await browser.newContext();
        // const page = await browser_context.newPage();

        // await page.goto('https://26-profile-page-css.volunteer-ekr.pages.dev/pages/complete-profile/');

        await page.getByRole('heading', {name: 'Complete your profile'}).isVisible();

        const facebook_icon = page.getByRole('button', { name: 'Add Facebook account' });
        const threads_icon = page.getByRole('button', { name: 'Add Threads account' });
        const instagram_icon = page.getByRole('button', { name: 'Add Instagram account' });
        const twitter_x_icon = page.getByRole('button', { name: 'Add X account' });
        const linkedin_icon = page.getByRole('button', { name: 'Add LinkedIn account' });
        const bluesky_icon = page.getByRole('button', { name: 'Add BlueSky account' })
        const dev_icon = page.getByRole('button', { name: 'Add Dev.to account' });

        const button_list = [facebook_icon, threads_icon, instagram_icon, twitter_x_icon, linkedin_icon, bluesky_icon, dev_icon];
        const button_list2 = [facebook_icon, threads_icon];

        instagram_icon.isEnabled();
        facebook_icon.isEnabled();
        threads_icon.isEnabled();
        linkedin_icon.isEnabled();
        bluesky_icon.isEnabled();
        twitter_x_icon.isEnabled(); 
        dev_icon.isEnabled();

        for(const b of button_list) {
            console.log(await b.all());
            await b.click();
            expect(await b.count()).toEqual(0);
        }

        let ddd = await page.locator("#details-social-inputs").getByRole("button").all();


        for(let i = (ddd.length - 1); i >= 0; i-- ) {
            console.log(ddd[i]);
            await ddd[i].click();
            expect(await ddd[i].count()).toEqual(0) 
        }




        await page.close();
    });

    test('FILL Fields with GOOD DATA Test ', async ({ page }) => {
        // await page.goto('http://localhost:3000/pages/check-steps/');

        // await expect(page.locator('li').nth(1)).toHaveText('Account confirmed');

        const name_field = page.getByRole('textbox', { name: 'Name' });
        const email_field = page.getByRole('textbox', { name: 'E-mail REQUIRED' });
        const slack_field = page.getByRole('textbox', { name: 'Slack handle Required" / "' });
        const pronouns = page.getByRole('combobox', { name: 'Pronouns' });
        const dob_Month = page.getByLabel('Month');
        const dob_Day = page.getByLabel('Day');

        const based_GTA_switch = page.getByText('I\'m based in Toronto or');

        await page.getByRole('heading', { name: 'Complete your profile' }).isVisible();

        await name_field.fill("Mr Tester");
        await email_field.fill("ct@gmail.com");
        await slack_field.fill("Toronto JS");

        //await pronouns.fill("He");

        console.log(await page.locator("#pronouns-options options").count());
        
        await page.locator("#pronouns-options").nth(1).click();

        await dob_Month.selectOption("December");
        await dob_Day.selectOption("31");

        await based_GTA_switch.click();
        

        /*
        await page.getByRole('listitem', {name: 'Account confirmed'}).isVisible();
        await page.getByRole('listitem', {name: 'Check the conduct code'}).isVisible();
        await page.getByRole('listitem', {name: 'Complete your profile'}).isVisible();

        await page.getByText('Check the TorontoJS\'s conduct').isVisible();
        await page.getByRole('listitem').filter({ hasText: 'Check the TorontoJS\'s conduct' }).isVisible();

        await page.getByRole('listitem').filter({ hasText: /^Complete your profile$/ }).isVisible();
        await page.locator('#check-steps').getByText('Complete your profile').isVisible();
        */

        await page.close();           
  });

});