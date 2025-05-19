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
        const upload_Button = page.getByRole('button', { name: 'Upload Your Photo' });

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
        // await page.goto('https://26-profile-page-css.volunteer-ekr.pages.dev/pages/complete-profile/'); 

        // await expect(page.locator('li').nth(1)).toHaveText('Account confirmed');

        const name_field = page.getByRole('textbox', { name: 'Name' });
        const email_field = page.getByRole('textbox', { name: 'E-mail REQUIRED' });
        const slack_field = page.getByRole('textbox', { name: 'Slack handle Required" / "' });
        const pronouns = page.getByRole('combobox', { name: 'Pronouns' });
        const dob_Month = page.getByLabel('Month');
        const dob_Day = page.getByLabel('Day');

        const based_GTA_switch = page.getByText('I\'m based in Toronto or');
        const can_join_Local_switch = page.getByText('I can join TorontoJS\'s local');
        const upload_Button = page.getByRole('button', { name: 'Upload Your Photo' });
        const file_picker = page.locator("#image-upload");

        const linkedin_profile_1 = page.getByRole('textbox', { name: 'LinkedIn profile' });
        const github_field = page.getByRole('textbox', { name: 'GitHub profile' });
        const site_field = page.getByRole('textbox', { name: 'Site/portfolio' });
        const skills_field = page.getByRole('textbox', { name: 'Your skills' });

        const facebook_icon = page.getByRole('button', { name: 'Add Facebook account' });
        const threads_icon = page.getByRole('button', { name: 'Add Threads account' });
        const instagram_icon = page.getByRole('button', { name: 'Add Instagram account' });
        const twitter_x_icon = page.getByRole('button', { name: 'Add X account' });
        const linkedin_icon = page.getByRole('button', { name: 'Add LinkedIn account' });
        const bluesky_icon = page.getByRole('button', { name: 'Add BlueSky account' })
        const dev_icon = page.getByRole('button', { name: 'Add Dev.to account' });

        const complete_button = page.getByRole('button', {name: 'Complete My Profile'});

        const button_list = [facebook_icon, threads_icon, instagram_icon, twitter_x_icon, linkedin_icon, bluesky_icon, dev_icon];

        await page.getByRole('heading', { name: 'Complete your profile' }).isVisible();

        await name_field.fill("Mr Tester");
        await email_field.fill("ct@gmail.com");
        await slack_field.fill("Toronto JS");

        //await pronouns.fill("He");


        // console.log(await pronouns.selectOption("He/him"));
        
        //await page.locator("#pronouns-options option").selectOption("1");

        await pronouns.fill("He/him");

        await dob_Month.selectOption("December");
        await dob_Day.selectOption("31");

        await based_GTA_switch.click();
        await can_join_Local_switch.click();

        await upload_Button.click();

        await file_picker.setInputFiles('C:/Users/curti/VMS_FE_Testing/Playwright_FE_Tests/tests/IH4png - asia.jpg');
        
        await github_field.fill('https://github.com/torontojs');
        await linkedin_profile_1.fill("https://www.linkedin.com/company/torontojs/");
        await site_field.fill("https://torontojs.com/");

        await skills_field.fill("Python, Javascript, Git, Playwright, Flask, Azure");

        

        for(const b of button_list) {
            console.log(await b.all());
            await b.click();
            expect(await b.count()).toEqual(0);
        }

        console.log(await page.getByRole('textbox', {name: 'LinkedIn'}).count());
        await page.getByRole('textbox', {name: 'Instagram'}).fill("www.instagram.com");
        await page.getByRole('textbox', {name: 'LinkedIn'}).nth(1).fill("www.linkedin.com");
        await page.getByRole('textbox', {name: 'X'}).fill("www.x.com");
        await page.getByRole('textbox', {name: 'Dev.to'}).fill("www.dev.to.com");
        await page.getByRole('textbox', {name: 'BlueSky'}).fill("www.bluesky.com");
        await page.getByRole('textbox', {name: 'Facebook'}).fill("www.facebook.com");
        await page.getByRole('textbox', {name: 'Threads'}).fill("www.threads.com");

        await complete_button.click();

        await page.waitForTimeout(4000);

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