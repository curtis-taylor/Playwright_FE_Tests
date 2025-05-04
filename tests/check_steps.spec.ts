import { test, expect } from '@playwright/test';
import { execPath } from 'process';

export function convertHexToRGB(hex) {
  // Remove the '#' if it's included in the input
  hex = hex.replace(/^#/, '');

  // Parse the hex values into separate R, G, and B values
  const red = parseInt(hex.substring(0, 2), 16);
  const green = parseInt(hex.substring(2, 4), 16);
  const blue = parseInt(hex.substring(4, 6), 16);

  // Return the RGB values in an object
  return {
    red: red,
    green: green,
    blue: blue,
  };
}

test.describe('Account Confirmed test', () => {
  test('HEADER text', async ({ page }) => {
    await page.goto('http://localhost:3000/pages/check-steps/');

    // await expect(page.locator('li').nth(1)).toHaveText('Account confirmed');

    await page.getByRole('listitem', {name: 'Account confirmed'}).isVisible();
    await page.getByRole('listitem', {name: 'Check the conduct code'}).isVisible();
    await page.getByRole('listitem', {name: 'Complete your profile'}).isVisible();

    // Expect a title "to contain" a substring.
    // await expect(page.locator('h3')).toHaveText('Volunteer Profile');

    for (const row of await page.locator('h3').all()) {
      console.log(await row.textContent());
      expect(await row.textContent() == 'Volunteer Profile');
    }
  });

  test('Lets Continue Button examination', async ({ page }) => {

    await page.goto('http://localhost:3000/pages/check-steps/');

    // await expect(page.locator('li').nth(1)).toHaveText('Account confirmed');

    await page.getByRole('heading', {name: 'Welcome to TorontoJS Community Hub!'}).isVisible();

    await page.waitForTimeout(3000);

    let rbgColors = convertHexToRGB("#ED3731");
    const let_button = page.getByRole('link', {name: "Let\'s continue"});

    await let_button.isVisible();

    for (const row of await page.locator('.button primary  large').all()) {
      console.log(await row.textContent());
      
      if(await row.textContent() == "Let's continue") {
        /* await expect(row).toHaveCSS('background-color',
          "rbg(237,55,49)");
          console.log(":::"); */
  
        await expect(row).toHaveCSS('background-color',
          "rbg(${ rbgColors.red }, ${ rbgColors.green }, ${ rbgColors.blue })");
      }
      
    }

    await page.close();

  });

  test('Lets Continue Button Click', async ({ page }) => {
    await page.goto('http://localhost:3000/pages/check-steps/');

    // await expect(page.locator('li').nth(1)).toHaveText('Account confirmed');

    await page.getByRole('heading', {name: 'Welcome to TorontoJS Community Hub!'}).isVisible();

    await page.waitForTimeout(3000);

    let rbgColors = convertHexToRGB("#ED3731");
    const let_button = page.getByRole('link', {name: "Let\'s continue"});
    

    await let_button.isVisible();

  
    /*
    await expect(let_button).toHaveCSS('background-color',
      "rbg(${ rbgColors.red }, ${ rbgColors.green }, ${ rbgColors.blue })"); */

    await let_button.click();

    // Expect a title "to contain" a substring.
    // await expect(page.locator('h3')).toHaveText('Volunteer Profile');
    
    

   // await expect(page.getByText("Check the conduct code")).toHaveCSS('background-color',
   //   `rbg(${ rbgColors.red }, ${ rbgColors.green }, ${ rbgColors.blue })`);

   const btn = page.locator(".dropbtn");

   const all_spans = page.locator('span').all()

   await page.waitForTimeout(3000);

   for (const row2 of await page.locator('.step-text').all()) {
    console.log(await row2.textContent());
    
    if(await row2.textContent() == "Check the conduct code") {
      /* await expect(row).toHaveCSS('background-color',
        "rbg(237,55,49)");
        console.log(":::"); */

      //await expect(row2).toHaveCSS('background-color',
       // "rbg(${ rbgColors.red }, ${ rbgColors.green }, ${ rbgColors.blue }, 3000)");
    
    

       // ! is Typescript non-null assertion
        // const bgcolorDiv_element = page.getByTestId("#continue-button");
        await page.waitForTimeout(7000);
        await expect(row2).toHaveCSS("--custom-color-property", 'rgb(237, 55, 49)');
 
    }
    
  }

  await page.waitForTimeout(7000);
  
  //############## CODE WORK
  // ! is Typescript non-null assertion
  // const bgcolorDiv_element = page.locator("#pg-settings")!;
  // await expect(bgcolorDiv_element).toHaveCSS('background-color', "rgb(28, 28, 28)");

  page.close;
   
  });

});