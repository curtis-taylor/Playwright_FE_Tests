import { expect, Page } from '@playwright/test';
import { CompleteProfilePage } from '../page_object_models/pom_complete_profile';
import { test } from "./base.ts";

test.beforeEach(async ({ completeProfilePage }) => {
    
   test.setTimeout(50000) // Sets a 50-second timeout for all tests
   completeProfilePage.navigate();
  
   // await page.goto('https://26-profile-page-css.volunteer-ekr.pages.dev/pages/complete-profile/'); 


   
});

test.afterEach(async ({ completeProfilePage }) => {
    await completeProfilePage.page.close();
});
 
test.describe('USER COMPLETE PROFILE Suite', () => {
    test('Social Media Footer Check', async ({ completeProfilePage }) => {

        // const browser_context = await browser.newContext();
        // const page = await browser_context.newPage();

        // await page.goto('https://26-profile-page-css.volunteer-ekr.pages.dev/pages/complete-profile/');

        await completeProfilePage.page.getByRole('heading', {name: 'Complete your profile'}).isVisible();

        const button_list = [completeProfilePage.facebook_icon, completeProfilePage.threads_icon, completeProfilePage.instagram_icon, completeProfilePage.twitter_x_icon, 
            completeProfilePage.linkedin_icon, completeProfilePage.bluesky_icon, completeProfilePage.dev_icon];

        await completeProfilePage.instagram_icon.isEnabled();
        await completeProfilePage.facebook_icon.isEnabled();
        await completeProfilePage.threads_icon.isEnabled();
        await completeProfilePage.linkedin_icon.isEnabled();
        await completeProfilePage.bluesky_icon.isEnabled();
        await completeProfilePage.twitter_x_icon.isEnabled(); 
        await completeProfilePage.dev_icon.isEnabled();

        for(const b of button_list) {
            //console.log(await b.all());
            await b.click();
            expect(await b.count()).toEqual(0);
        }

        let detail_social_inputs = await completeProfilePage.page.locator("#details-social-inputs").getByRole("button").all();

        let temp = completeProfilePage.page.getByRole("button", { name: 'Close LinkedIn input'});

        console.log(temp);
        console.log("KKK");

        for(let i = (detail_social_inputs.length - 1); i >= 0; i-- ) {
            console.log(detail_social_inputs[i]);
            await detail_social_inputs[i].click();
            expect(await detail_social_inputs[i].count()).toEqual(0) 
        }

        // await page.close();

   
        let enable_footer = {
            linkedin_other: false,
            facebook: true,
            threads: true,
            twitter_x: true,
            bluesky: false,
            instagram: true,
            devto: false
        }

        await completeProfilePage.enable_disable_footer_social_fields(completeProfilePage.page, enable_footer);
        await completeProfilePage.page.waitForTimeout(2000);

        enable_footer = {
            linkedin_other: true,
            facebook: true,
            threads: true,
            twitter_x: true,
            bluesky: true,
            instagram: true,
            devto: false
        }

        await completeProfilePage.enable_disable_footer_social_fields(completeProfilePage.page, enable_footer);
        await completeProfilePage.page.waitForTimeout(4000);
    
    });

    test('FIELD DATA PERSISTS after RED ACCORDIAN USE', async ({ completeProfilePage }) => {
        // await page.goto('http://localhost:3000/pages/check-steps/');
        // await page.goto('https://26-profile-page-css.volunteer-ekr.pages.dev/pages/complete-profile/'); 

        let enable_footer = {
            linkedin_other: true,
            facebook: true,
            threads: true,
            twitter_x: true,
            bluesky: true,
            instagram: true,
            devto: true
        }
       
        const button_list = [completeProfilePage.facebook_icon, completeProfilePage.threads_icon, completeProfilePage.instagram_icon, completeProfilePage.twitter_x_icon, 
            completeProfilePage.linkedin_icon, completeProfilePage.bluesky_icon, completeProfilePage.dev_icon];

        await completeProfilePage.page_title.isVisible();

        await completeProfilePage.name_field.fill("Mr Tester");
        await completeProfilePage.email_field.fill("ct@gmail.com");
        await completeProfilePage.slack_field.fill("Toronto JS");

        await completeProfilePage.pronouns.fill("He/him");

        await completeProfilePage.dob_Month.selectOption("December");
        await completeProfilePage.dob_Day.selectOption("31");

        await completeProfilePage.based_GTA_switch.click();
        await completeProfilePage.can_join_Local_switch.click();

        // UPLOAD AVATAR
        await completeProfilePage.upload_avatar_image('tests/IH4png - asia.jpg', true);

        await completeProfilePage.github_field.fill('https://github.com/torontojs');
        await completeProfilePage.linkedin_profile_1.fill("https://www.linkedin.com/company/torontojs/");
        await completeProfilePage.site_field.fill("https://torontojs.com/");

        await completeProfilePage.skills_field.fill("Python, Javascript, Git, Playwright, Flask, Azure");

        await completeProfilePage.enable_disable_footer_social_fields(completeProfilePage.page, enable_footer);
        
        /*
        for(const b of button_list) {
            console.log(await b.all());
            await b.click();
            expect(await b.count()).toEqual(0);
        } */

        await completeProfilePage.instagram_field.fill("www.instagram.com");
        await completeProfilePage.linkedin_2nd_field.fill("www.linkedin.com");
        await completeProfilePage.page.getByRole('textbox', {name: 'X'}).fill("www.x.com");
        await completeProfilePage.page.getByRole('textbox', {name: 'Dev.to'}).fill("www.dev.to.com");
        await completeProfilePage.page.getByRole('textbox', {name: 'BlueSky'}).fill("www.bluesky.com");
        await completeProfilePage.page.getByRole('textbox', {name: 'Facebook'}).fill("www.facebook.com");
        await completeProfilePage.page.getByRole('textbox', {name: 'Threads'}).fill("www.threads.com");

        console.log(await completeProfilePage.page.locator('#Instagram-input').textContent());

        // REPEATABLE SELECTS red ACCORDIAN CONTROLS
        for(let x = 1; x <= 2; x++) {
            await completeProfilePage.nutshell_bar.click();
            await completeProfilePage.avatar_bar.click();
            await completeProfilePage.more_info_bar.click();

            await completeProfilePage.page.waitForTimeout(700);

        }

        // ## CHECK if fields RETAIN VALUE after using red Accordian CONTROLS
        expect(await completeProfilePage.name_field.inputValue()).toEqual("Mr Tester");
        expect(await completeProfilePage.email_field.inputValue()).toEqual("ct@gmail.com");

        expect(await completeProfilePage.page.locator('#Instagram-input').inputValue()).toEqual("www.instagram.com");
        expect(await completeProfilePage.page.locator('#X-input').inputValue()).toEqual("www.x.com");
       
       // expect(await completeProfilePage.remove_image_Button).toBeVisible;
       // expect(await completeProfilePage.upload_success_Label).toBeVisible;
       // expect(page.locator('.details-content-file-upload picture img')).toHaveCSS('height', '128px');
      //  expect(page.locator('.details-content-file-upload picture img')).toHaveCSS('width', '128px');

        await completeProfilePage.complete_button.click();

        await completeProfilePage.page.waitForTimeout(1000);


        /*
        await page.getByRole('listitem', {name: 'Account confirmed'}).isVisible();
        await page.getByRole('listitem', {name: 'Check the conduct code'}).isVisible();
        await page.getByRole('listitem', {name: 'Complete your profile'}).isVisible();

        await page.getByText('Check the TorontoJS\'s conduct').isVisible();
        await page.getByRole('listitem').filter({ hasText: 'Check the TorontoJS\'s conduct' }).isVisible();

        await page.getByRole('listitem').filter({ hasText: /^Complete your profile$/ }).isVisible();
        await page.locator('#check-steps').getByText('Complete your profile').isVisible();
        */

        // await page.close();           
  });

  test('PHOTO UPLOAD and REMOVING VALID IMAGE THEN UPLOAD AGAIN', async ({ completeProfilePage }) => {

        await completeProfilePage.page_title.isVisible();

        await completeProfilePage.upload_avatar_image('tests/IH4png - asia.jpg', true);


        await completeProfilePage.avatar_bar.isVisible();
        await expect(completeProfilePage.avatar_bar).toHaveCSS('accent-color', 'rgb(237, 55, 49)');
        
        await completeProfilePage.avatar_bar.click();
        await completeProfilePage.upload_Button.isHidden();
        await completeProfilePage.upload_New_Photo_Button.isHidden();
        await completeProfilePage.remove_image_Button.isHidden();

        await completeProfilePage.page.waitForTimeout(1000);

        await completeProfilePage.avatar_bar.click();
        await completeProfilePage.remove_image_Button.isVisible();
        await completeProfilePage.upload_Button.isHidden();
        await completeProfilePage.upload_New_Photo_Button.isVisible()


        await completeProfilePage.remove_avatar_image();

        await completeProfilePage.upload_avatar_image('tests/img_1926.jpeg', true);

        await completeProfilePage.remove_avatar_image();

        const button_list = [completeProfilePage.facebook_icon, completeProfilePage.threads_icon, completeProfilePage.instagram_icon, completeProfilePage.twitter_x_icon, 
            completeProfilePage.linkedin_icon, completeProfilePage.bluesky_icon, completeProfilePage.dev_icon];

        completeProfilePage.instagram_icon.isEnabled();
        completeProfilePage.facebook_icon.isEnabled();
        completeProfilePage.threads_icon.isEnabled();
        completeProfilePage.linkedin_icon.isEnabled();
        completeProfilePage.bluesky_icon.isEnabled();
        completeProfilePage.twitter_x_icon.isEnabled(); 
        completeProfilePage.dev_icon.isEnabled();

        for(const b of button_list) {
            console.log(await b.all());
            await b.click();
            expect(await b.count()).toEqual(0);
        }

        let detail_social_inputs = await completeProfilePage.page.locator("#details-social-inputs").getByRole("button").all();


        for(let i = (detail_social_inputs.length - 1); i >= 0; i-- ) {
            await detail_social_inputs[i].click();
            expect(await detail_social_inputs[i].count()).toEqual(0) 
        }

    });

    test('UPLOAD NON-IMAGE REMOVE THEN UPLOAD INVALID FILE AGAIN', async ({ completeProfilePage }) => {

        await completeProfilePage.page_title.isVisible();

        await completeProfilePage.upload_avatar_image('tests/test.txt', false);

        await completeProfilePage.avatar_bar.isVisible();
        await expect(completeProfilePage.avatar_bar).toHaveCSS('accent-color', 'rgb(237, 55, 49)');
        await completeProfilePage.avatar_bar.click();

        await completeProfilePage.upload_Button.isHidden();
        await completeProfilePage.upload_New_Photo_Button.isHidden();
        await completeProfilePage.remove_image_Button.isHidden();

        await completeProfilePage.page.waitForTimeout(1000);

        await completeProfilePage.avatar_bar.click();
        await completeProfilePage.remove_image_Button.isVisible();
        await completeProfilePage.upload_Button.isHidden();
        await completeProfilePage.upload_New_Photo_Button.isVisible();

        await completeProfilePage.remove_avatar_image();

        await completeProfilePage.upload_avatar_image('tests/document - TESTCASE Scenarios - May 31 2025.pdf', false);

        await completeProfilePage.remove_avatar_image();

        const button_list = [completeProfilePage.facebook_icon, completeProfilePage.threads_icon, completeProfilePage.instagram_icon, completeProfilePage.twitter_x_icon, 
            completeProfilePage.linkedin_icon, completeProfilePage.bluesky_icon, completeProfilePage.dev_icon];

        completeProfilePage.instagram_icon.isEnabled();
        completeProfilePage.facebook_icon.isEnabled();
        completeProfilePage.threads_icon.isEnabled();
        completeProfilePage.linkedin_icon.isEnabled();
        completeProfilePage.bluesky_icon.isEnabled();
        completeProfilePage.twitter_x_icon.isEnabled(); 
        completeProfilePage.dev_icon.isEnabled();

        for(const b of button_list) {
            console.log(await b.all());
            await b.click();
            expect(await b.count()).toEqual(0);
        }

        let detail_social_inputs = await completeProfilePage.page.locator("#details-social-inputs").getByRole("button").all();


        for(let i = (detail_social_inputs.length - 1); i >= 0; i-- ) {
            await detail_social_inputs[i].click();
            expect(await detail_social_inputs[i].count()).toEqual(0) 
        }

        // await page.close();
    });

    
    test("PHOTO UPLOAD USING 'UPLOAD NEW IMAGE' BUTTON", async ({ completeProfilePage }) => {

        await completeProfilePage.page_title.isVisible();

        for (let i = 1; i < 7; i++) {
            await completeProfilePage.upload_avatar_image('tests/IH4png - asia.jpg', true);
            await completeProfilePage.page.waitForTimeout(2000);

            await completeProfilePage.upload_avatar_image('tests/img_1926.jpeg', true);
            await completeProfilePage.page.waitForTimeout(2000);
        }

 
        /*
        const button_list = [completeProfilePage.facebook_icon, completeProfilePage.threads_icon, completeProfilePage.instagram_icon, completeProfilePage.twitter_x_icon, 
            completeProfilePage.linkedin_icon, completeProfilePage.bluesky_icon, completeProfilePage.dev_icon];

        completeProfilePage.instagram_icon.isEnabled();
        completeProfilePage.facebook_icon.isEnabled();
        completeProfilePage.threads_icon.isEnabled();
        completeProfilePage.linkedin_icon.isEnabled();
        completeProfilePage.bluesky_icon.isEnabled();
        completeProfilePage.twitter_x_icon.isEnabled(); 
        completeProfilePage.dev_icon.isEnabled();

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
        } */

    });

    test("NON-IMAGE UPLOAD USING 'UPLOAD NEW IMAGE' BUTTON", async ({ completeProfilePage }) => {

        await completeProfilePage.page_title.isVisible();

        for (let i = 1; i < 7; i++) {
            await completeProfilePage.upload_avatar_image('tests/document - TESTCASE Scenarios - May 31 2025.pdf', false);
            await completeProfilePage.page.waitForTimeout(2000);

            await completeProfilePage.upload_avatar_image('tests/test.txt', false);
            await completeProfilePage.page.waitForTimeout(2000);
        }


    });


});