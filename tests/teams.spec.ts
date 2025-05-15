import { test, expect } from '@playwright/test';
import { execPath } from 'process';

test('Design Dragon links', async ({ browser }) => {

    const browser_context = await browser.newContext();
    const page = await browser_context.newPage();

    await page.goto("http://localhost:3000/pages/team/"); 

   // const design_team = await page.getByText('Toronto JS').getByRole("link").all();

   /*
   console.log("****");
   let i = 1;
   await page.waitForTimeout(2000);
    for(const cc2 of await page.locator(".team-member-card .team-member-profile-link").getByRole("link").all()) {
        console.log(await cc2.textContent());
        console.log(i);
        i++;
        await page.waitForTimeout(2000);
    }
    */
  
  await page.waitForTimeout(2000);
  console.log((await page.getByText('Toronto JS\' awesome creative minds!Team members').getByRole("link").all()).length);
  
  for (const row of await page.getByText('Toronto JS\' awesome creative minds!Team members').getByRole("link").all()) {
     let temp = await row.textContent();
     console.log(temp);
     console.log(await page.evaluate(() => window.location.href));

     
     
     let [newPage_1] = await Promise.all([
            browser_context.waitForEvent("page"), // pending, fullfilled or rejected
            await row.click()     
        ]);

     // expect(newPage_1.getByRole('link', { name: 'About' } ));
        
      newPage_1.waitForTimeout(5000)
      let pp = await newPage_1.evaluate(() => window.location.href);
      console.log(pp);
      // console.log("----");

      expect(pp.includes("linkedin.com"));

      await newPage_1.close();
    // expect(await row.textContent() == 'Volunteer Profile');
  } 

  await page.close();
});