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

  test('Lets Continue Button', async ({ page }) => {
    await page.goto('http://localhost:3000/pages/check-steps/');

    // await expect(page.locator('li').nth(1)).toHaveText('Account confirmed');

    await page.getByRole('heading', {name: 'Welcome to TorontoJS Community Hub!'}).isVisible();

    await page.waitForTimeout(3000);

    let rbgColors = convertHexToRGB("#ED3731");

    await page.getByRole('link', {name: "Let\'s continue"}).isVisible();

    await expect(page.getByRole('link', {name: "Let\'s continue"})).toHaveCSS("background-color",
      'rbg(${ rbgColors.red }, ${ rbgColors.green }, ${ rbgColors.blue })');

    await page.getByRole('link', {name: "Let\'s continue"}).click();

    // Expect a title "to contain" a substring.
    // await expect(page.locator('h3')).toHaveText('Volunteer Profile');
    
    

   // await expect(page.getByText("Check the conduct code")).toHaveCSS('background-color',
   //   `rbg(${ rbgColors.red }, ${ rbgColors.green }, ${ rbgColors.blue })`);

   const btn = await page.locator(".dropbtn");

   let all_spans = page.locator('span').all()

   for (const row of await page.locator('.step-text').all()) {
    console.log(await row.textContent());
    
    if(await row.textContent() == "Check the conduct code") {
      /* await expect(row).toHaveCSS('background-color',
        "rbg(237,55,49)");
        console.log(":::"); */

      await expect(row).toHaveCSS('background-color',
        "rbg(${ rbgColors.red }, ${ rbgColors.green }, ${ rbgColors.blue })");
    }
    
    // expect(await row.textContent() == 'Volunteer Profile');
  }

  /*
   await expect(page.locator('span')).toHaveCSS('background-color',
      `rbga(237,55,49,0)`); */
   
  });

});