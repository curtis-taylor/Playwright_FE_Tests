import { expect, Page, BrowserContext, Locator } from '@playwright/test';
import { test } from './base';

test.beforeEach( async ({ printVolunteerPage }) => {
  test.setTimeout(50000) // Sets a 40-second timeout for all tests
  await printVolunteerPage.navigate();
});

test.afterEach( async ({ printVolunteerPage }) => {
  test.setTimeout(2000) // Sets a 40-second timeout for all tests
  await printVolunteerPage.page.close();
});


test.describe('PRINT VOLUNTEER AGREEMENT Test Suite', () => {
    test('PAGE LINKS', async ({ printVolunteerPage }) => {

        expect(printVolunteerPage.view_doc_link).toBeVisible();
        
        expect(printVolunteerPage.health_law_link).toBeVisible();
        await printVolunteerPage.health_law_link.click();
        expect(printVolunteerPage.page.url().includes("https://www.ontario.ca/laws/statut"));

        await printVolunteerPage.page.waitForTimeout(8000);

        await printVolunteerPage.page.goBack();
    
    });


    test('PRINT BUTTON TEST', async({ printVolunteerPage }) => {

       console.log("PRINT BUTTON TEST");

        await printVolunteerPage.print_button.isVisible();
        await printVolunteerPage.print_button.isEnabled();

        expect(printVolunteerPage.print_button).toHaveCSS('background-color', printVolunteerPage.print_button_color );

        await printVolunteerPage.page.evaluate('(() => {window.waitForPrintDialog = new Promise(f => window.print = f);})()');
        await printVolunteerPage.print_button.click();
        await printVolunteerPage.page.waitForFunction('window.waitForPrintDialog');

        await printVolunteerPage.page.waitForTimeout(10000);

    });

     test('SCREENSHOT COMPARISON TEST', async({ printVolunteerPage}) => {
        await printVolunteerPage.page.waitForURL(printVolunteerPage.url);
        await expect(printVolunteerPage.page).toHaveScreenshot("print_volunteer_screen.png");
      });

    


});