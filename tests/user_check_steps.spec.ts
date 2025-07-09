import { expect, Page } from '@playwright/test';
import { test } from './base';
import AxeBuilder from '@axe-core/playwright';
import { execPath } from 'process';
import { log } from 'console';

test.beforeEach( async ({ checkStepsPage }) => {
  test.setTimeout(120000)   
  await checkStepsPage.navigate(1);
    // Sets a 40-second timeout for all tests

});

test.afterEach(async ({ checkStepsPage }) => {
  await checkStepsPage.page.close();
});

test.describe('ACCOUNT CONFIRMED Test Suite', () => {
  test('Account Confirmed page - Text check', async ({ checkStepsPage }) => {

    await checkStepsPage.welcome_title.isVisible();

    await checkStepsPage.account_confirm_tab.isVisible();
    await checkStepsPage.conduct_code_tab.isVisible();
    await checkStepsPage.complete_profile_tab.isVisible();
    
    await checkStepsPage.complete_profile_dialog_title.isVisible();
    await checkStepsPage.complete_profile_dialog.isVisible();

    await checkStepsPage.conduct_dialog_title.isVisible();
    await checkStepsPage.conduct_dialog.isVisible();
  
    // await expect(page.locator('li').nth(1)).toHaveText('Account confirmed');

    /*
    await page.getByRole('heading', {name: 'Welcome to TorontoJS Community Hub!'}).isVisible();

    await page.getByRole('listitem', {name: 'Account confirmed'}).isVisible();
    await page.getByRole('listitem', {name: 'Check the conduct code'}).isVisible();
    await page.getByRole('listitem', {name: 'Complete your profile'}).isVisible();

    await page.getByText('Check the TorontoJS\'s conduct').isVisible();
    await page.getByRole('listitem').filter({ hasText: 'Check the TorontoJS\'s conduct' }).isVisible();

    await page.getByRole('listitem').filter({ hasText: /^Complete your profile$/ }).isVisible();
    await page.locator('#check-steps').getByText('Complete your profile').isVisible();
    */
    /*
    // Expect a title "to contain" a substring.
    // await expect(page.locator('h3')).toHaveText('Volunteer Profile');

    for (const row of await page.locator('h3').all()) {
      console.log(await row.textContent());
      expect(await row.textContent() == 'Volunteer Profile');
    } */
      
  });

  test('Account Confirmed - Lets Continue Button examination', async ({ checkStepsPage }) => {

    await checkStepsPage.welcome_title.isVisible();

    await checkStepsPage.page.waitForTimeout(3000);

    let rbgColors = checkStepsPage.convertHexToRGB("#333333");

    await checkStepsPage.continue_button.isVisible();

    await expect(checkStepsPage.continue_button).toHaveCSS('background-color',
      `rgb(${ (await rbgColors).red }, ${ (await rbgColors).green }, ${ (await rbgColors).blue })`);
      
  });

  test('Account Confirmed - Lets Continue Button Click', async ({ checkStepsPage }) => {
    
    await checkStepsPage.welcome_title.isVisible();

    // await expect(page.locator('li').nth(1)).toHaveText('Account confirmed');

    //await page.getByRole('heading', {name: 'Welcome to TorontoJS Community Hub!'}).isVisible();

    await checkStepsPage.page.waitForTimeout(3000);

    // const let_button = page.getByRole('link', {name: "Let\'s continue"});

    await checkStepsPage.continue_button.isVisible();

    let rbgColors = checkStepsPage.convertHexToRGB("#333333");

    const color = await checkStepsPage.continue_button.evaluate((ele) => {
      return window.getComputedStyle(ele).getPropertyValue("background-color");
    });

    console.log(color);

    expect(color).toBe(`rgb(${ (await rbgColors).red }, ${ (await rbgColors).green }, ${ (await rbgColors).blue })`);
    

    await checkStepsPage.continue_button.click();

    // Expect a title "to contain" a substring.
    // await expect(page.locator('h3')).toHaveText('Volunteer Profile');
    
    

    // await expect(page.getByText("Check the conduct code")).toHaveCSS('background-color',
    //  `rgb(${ rbgColors.red }, ${ rbgColors.green }, ${ rbgColors.blue })`);

   rbgColors = checkStepsPage.convertHexToRGB("#ED3731");

   for (const row2 of await checkStepsPage.page.locator('.step-text').all()) {
    console.log(await row2.textContent());
    
    if(await row2.textContent() == "Check the conduct code") {

      await expect(row2).toHaveCSS('color',
        `rgb(${ (await rbgColors).red }, ${ (await rbgColors).green }, ${ (await rbgColors).blue })`);
    } else {
        await expect(row2).toHaveCSS('color',
          'rgb(153, 153, 153)');
    }
    
  }

   
  });

  
});

test.describe('ASSESSIBILITY Suite for CHECK STEPS - ACCOUNT CONFIRMED Page', () => {

    test('BASIC WCAG22AA', async({page, checkStepsPage }) => {

      await checkStepsPage.navigate(0);
        
      const axeBuilder = await new AxeBuilder({page}).withTags(["wcag22aa"]).analyze();
      expect( axeBuilder.violations).toEqual([]);
    });
  });

  //******************************************************* */

test.describe('CHECK THE CONDUCT CODE Test Suite', () => {

  test('Page 2 - CONDUCT CODE - CHECK TEXT for HEADERS', async ({ reviewConductPage }) => {

    await reviewConductPage.navigate();
    await reviewConductPage.review_title.isVisible();
    await reviewConductPage.subtitle.isVisible();

    await expect(reviewConductPage.review_title).toHaveCSS('text-align', 'center');
    await expect(reviewConductPage.subtitle).toHaveCSS('text-align', 'center');
      

  });

  test('Page 2 - CONDUCT CODE - CHECK NUTSHELL box PROPERTIES', async ({ reviewConductPage }) => {

    // await page.goto('http://localhost:3000/pages/review-conduct-code/');

    await reviewConductPage.navigate();

    await reviewConductPage.nutshell_dialog_heading.isVisible();
    await reviewConductPage.nutshell_text_1.isVisible();
    await reviewConductPage.nutshell_text_2.isVisible();
    await reviewConductPage.nutshell_text_3.isVisible();

    expect(reviewConductPage.nutshell_dialog_heading).toHaveCSS('color', 'rgb(255, 255, 255)');
    expect(reviewConductPage.nutshell_dialog_heading).toHaveCSS('background-color', 'rgb(237, 55, 49)');


    await reviewConductPage.dropdown_Volunteering.isVisible();
    await reviewConductPage.dropdown_TorontoJS_conduct.isVisible();
    await reviewConductPage.dropdown_Release_form.isVisible();



    // await expect(page.locator('li').nth(1)).toHaveText('Account confirmed');
    /*
    await page.getByText('In a nutshell:').isVisible();
    expect(page.getByText('In a nutshell:')).toHaveCSS('color', 'rgb(255, 255, 255)');
    expect(page.getByText('In a nutshell:')).toHaveCSS('background-color', 'rgb(237, 55, 49)');


    await page.getByText('All our members are committed').isVisible();
    await page.getByText('Developers, designers and other tech workers').isVisible();
    await page.getByText('The TorontoJS activities are non-profit').isVisible(); */



    // Check NUMBERED CIRCLES <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    for(let i = 1; i < 4; i++) {

      await reviewConductPage.page.locator('#conduct-code').getByText(String(i), { exact: true }).isVisible();
      console.log(await reviewConductPage.page.locator('#conduct-code').getByText(String(i), { exact: true }).textContent());
      expect(reviewConductPage.page.locator('#conduct-code').getByText(String(i), { exact: true })).toHaveCSS('width', '36px');
      expect(reviewConductPage.page.locator('#conduct-code').getByText(String(i), { exact: true })).toHaveCSS('color', 'rgb(255, 255, 255)');
      expect(reviewConductPage.page.locator('#conduct-code').getByText(String(i), { exact: true })).toHaveCSS('background-color', 'rgb(237, 55, 49)');

    }

    let rbgColors = reviewConductPage.convertHexToRGB("#ED3731");
    //const box_header = page.getByText('In a nutshell:');

    //await box_header.isVisible();

    await expect(reviewConductPage.nutshell_dialog_heading).toHaveCSS('background-color',
      `rgb(${ (await rbgColors).red }, ${ (await rbgColors).green }, ${ (await rbgColors).blue })`);

  });

  test('PAGE 2 - CONDUCT CODE - SUMMARY DROP-DOWN LIST', async ({ reviewConductPage }) => {

    await reviewConductPage.navigate();

    await reviewConductPage.review_title.isVisible();
    await reviewConductPage.subtitle.isVisible();

    await expect(reviewConductPage.page.locator('.dropdown-list')).toHaveCSS('accent-color',
      'rgb(237, 55, 49)');

    for (let i = 1; i < 5; i++) {  
          await reviewConductPage.dropdown_TorontoJS_conduct.click();
          //await reviewConductPage.page.waitForTimeout(2000);
          await reviewConductPage.dropdown_Volunteering.click();
          //await reviewConductPage.page.waitForTimeout(2000);
          await reviewConductPage.dropdown_Release_form.click();
          //await reviewConductPage.page.waitForTimeout(2000);
          // console.log(i);

    }

    await reviewConductPage.dropdown_TorontoJS_conduct.click();

    await reviewConductPage.dropdown_Volunteering.click();

    await reviewConductPage.dropdown_Release_form.click()

  });

  

  test('PAGE 2 - CONDUCT CODE PAGE - CHECK COMPLETE PROFILE button and Checkbox Functionality', async ({ reviewConductPage, completeProfilePage}) => {

    await reviewConductPage.navigate();

    await reviewConductPage.checkbox_text.isVisible();
    //await expect(reviewConductPage.checkbox_text).toHaveCSS('font-size', '16.8697px');
    await expect(reviewConductPage.continue_button).toHaveCSS('background-color', 'rgba(0, 0, 0, 0.15)');

    //await page.getByText('I agree to TorontoJS\’s').isVisible();
    //expect(page.getByText('I agree to TorontoJS\’s')).toHaveCSS('font-size', '16.8697px');
    // expect( page.getByRole('button', { name: 'Let me complete my profile' })).toHaveCSS('background-color', 'rgba(0, 0, 0, 0.15)');

    await reviewConductPage.checkbox_I_agree.isVisible();
    await reviewConductPage.continue_button.isDisabled();
    expect(reviewConductPage.continue_button).toHaveCSS('background-color', 'rgb(237, 55, 49)');
    
    //await page.getByRole('checkbox', { name: 'I agree to TorontoJS’s' }).isVisible();
   //await page.getByRole('button', { name: 'Let me complete my profile' }).isDisabled();
   // expect( page.getByRole('button', { name: 'Let me complete my profile' })).toHaveCSS('background-color', 'rgb(237, 55, 49)');


    await reviewConductPage.checkbox_I_agree.click();
    await reviewConductPage.continue_button.isEnabled();
    expect( reviewConductPage.continue_button).toHaveCSS('background-color', 'rgba(0, 0, 0, 0.15)');

    //await page.getByRole('checkbox', { name: 'I agree to TorontoJS’s' }).click();
    //await page.getByRole('button', { name: 'Let me complete my profile' }).isEnabled();
    //expect( page.getByRole('button', { name: 'Let me complete my profile' })).toHaveCSS('background-color', 'rgba(0, 0, 0, 0.15)');

    await reviewConductPage.checkbox_I_agree.click();
    await reviewConductPage.continue_button.isDisabled();
    
    // console.log("click -----");

    await reviewConductPage.check_navbar(reviewConductPage.page);

    await reviewConductPage.checkbox_I_agree.click();
    await reviewConductPage.continue_button.click();

    //await page.getByRole('checkbox', { name: 'I agree to TorontoJS’s' }).click();
    //await page.getByRole('button', { name: 'Let me complete my profile' }).click();

    await expect(reviewConductPage.page).toHaveURL(completeProfilePage.url);

    /*
    for (const row2 of await reviewConductPage.page.locator('.step-text').all()) {
      console.log(await row2.textContent());
      
      if(await row2.textContent() == "Complete your profile") {

          const color = await row2.evaluate((ele) => {
            return window.getComputedStyle(ele).getPropertyValue("color");
          });
  
        await expect(row2).toHaveCSS('color', `rgb(237, 55, 49)`);
      } else {
          await expect(row2).toHaveCSS('color', `rgb(153, 153, 153)`);
          console.log("Checking color of disabled navbar tabs");
      }
      
    } */

    await completeProfilePage.check_navbar(completeProfilePage.page);

  });

});

test.describe('ASSESSIBILITY Suite for CHECK STEPS - REVIEW CONDUCT CODE Page', () => {

    test('BASIC WCAG22AA', async({page, reviewConductPage }) => {

      await reviewConductPage.navigate();
        
      const axeBuilder = await new AxeBuilder({page}).withTags(["wcag22aa"]).analyze();
      expect( axeBuilder.violations).toEqual([]);
    });
});

//************************************************************** */

test.describe('ALL 3-STEPS WORKFLOW TESTS', () => {
     test('MULTIPLE USER SUCCESSFUL 3-PAGE WORKFLOW with alternating values', async ({ checkStepsPage, reviewConductPage, completeProfilePage}) => {


    const switch_settings = [[true, true], [true, false], [false, false], [false, true]];     
    const date_settings = [["December", "31"], ["February", "29"], ["July", "1"], ["October", "31"]];
    const username_base =  [["RONN"], ["Luke"], ["Odo"], ["John"]]  
    
    for(let x = 0; x < switch_settings.length; x++) { 

          console.log("ALL 3-STEPS WORKFLOW TESTS: test " + x)

          let name1 = completeProfilePage.unique_username(username_base[x][0]);
          let email1 = name1 + "@zoho.com";
          
          let form1 = {
            name: name1,
            email: email1,
            slack_handle: "T06498HEJ/C0805K3R8VB",
            pronouns: "He",
            birth_month: date_settings[x][0],
            birth_day: date_settings[x][1],
            toronto_based: switch_settings[x][0],
            join_locally: switch_settings[x][1],

            site_portfolio: "www.google.com",
            github: "github.com/torontojs/",
            linkedin_profile: "https://www.linkedin.com",
            skills_field: "-Python, Typescript",
            linkedin_other: "https://www.linkedin.com/test",
        
            facebook: "www.facebook.com",
            threads: "www.threads.com/tester",
            twitter_x: "www.x.com",
            bluesky: "https://bsky.app/",
            instagram: "www.instagram.com/tester",
            devto: "www.dev.to.com"
          }

          let enable_footer = {
            linkedin_other: true,
            facebook: true,
            threads: true,
            twitter_x: true,
            bluesky: true,
            instagram: true,
            devto: true
        }

          await checkStepsPage.navigate(1);

          //console.log(checkStepsPage.page.url());
          await checkStepsPage.check_navbar(checkStepsPage.page);
          await checkStepsPage.continue_button.click();

          await reviewConductPage.check_navbar(reviewConductPage.page);
          await reviewConductPage.checkbox_I_agree.click();
          await reviewConductPage.continue_button.click();

          await completeProfilePage.check_navbar(completeProfilePage.page);

          //await completeProfilePage.enable_disable_footer_social_fields(completeProfilePage.page);
          await completeProfilePage.fill_fields(form1, enable_footer);

          await completeProfilePage.upload_avatar_image('tests/img_1926.jpeg', true);

          await completeProfilePage.complete_button.click();
        
        }
      });

      test('USER SUCCESSFUL 3-STEP WORKFLOW WITH Incomplete Info', async ({ checkStepsPage, reviewConductPage, completeProfilePage}) => {


        const name1 = completeProfilePage.unique_username("RONN");
        const email1 = name1 + "@zoho.com";

        const email_list = ["", "", email1];
        const name_list = ["", name1, name1];

         for(let x = 0; x < name_list.length; x++) { 
        let form1 = {
          name: name_list[x],
          email: email_list[x],
          slack_handle: "T06498HEJ/C0805K3R8VB",
          pronouns: "He",
          birth_month: "December",
          birth_day: "31",
          toronto_based: false,
          join_locally: true,

          site_portfolio: "www.google.com",
          github: "github.com/torontojs/",
          linkedin_profile: "https://www.linkedin.com",
          skills_field: "-Python, Typescript",
          linkedin_other: "https://www.linkedin.com/test",
      
          facebook: "www.facebook.com",
          threads: "www.threads.com/tester",
          twitter_x: "www.x.com",
          bluesky: "https://bsky.app/",
          instagram: "www.instagram.com/tester",
          devto: "www.dev.to.com"
        }

        let enable_footer = {
            linkedin_other: true,
            facebook: true,
            threads: true,
            twitter_x: true,
            bluesky: true,
            instagram: true,
            devto: true
        }

        await checkStepsPage.navigate(1);

        console.log(checkStepsPage.page.url() + " 0000");
        
        await checkStepsPage.check_navbar(checkStepsPage.page);
        await checkStepsPage.continue_button.click();

        await reviewConductPage.check_navbar(reviewConductPage.page);
        
        //await reviewConductPage.continue_button.click();
        await reviewConductPage.continue_button.isDisabled();
        await expect(reviewConductPage.continue_button).toHaveCSS('background-color', 'rgba(0, 0, 0, 0.15)');

        await reviewConductPage.checkbox_I_agree.click();
        await reviewConductPage.continue_button.click();

        await completeProfilePage.check_navbar(completeProfilePage.page);

        //await completeProfilePage.enable_disable_footer_social_fields(completeProfilePage.page);
        await completeProfilePage.fill_fields(form1, enable_footer);

        await completeProfilePage.upload_avatar_image('tests/img_1926.jpeg', true);

        await completeProfilePage.complete_button.click();

        console.log(completeProfilePage.page.url());

      }
        
      }); 

  });