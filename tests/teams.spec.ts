import { test, expect } from '@playwright/test';
import { execPath } from 'process';

test('Design Dragon links', async ({ browser }) => {

    const browser_context = await browser.newContext();
    const page = await browser_context.newPage();

    await page.goto("http://localhost:3000/pages/team/"); 

    const design_team = await page.getByText('Toronto JS').getByRole("link").all();

    for(const cc of await page.getByText('Toronto JS\' awesome creative minds!Team members').getByRole("link").all()) {
        console.log(await cc.textContent());
        console.log("::");
        await page.waitForTimeout(2000);
    }

  for (const row of await page.locator('.social-links a').all()) {
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

  await page.close();
});