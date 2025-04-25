import { test, expect } from '@playwright/test';
import { execPath } from 'process';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000/pages/profiles/');



  // Expect a title "to contain" a substring.
  // await expect(page.locator('h3')).toHaveText('Volunteer Profile');

  for (const row of await page.locator('h3').all()) {
    console.log(await row.textContent());
    expect(await row.textContent() == 'Volunteer Profile');
  }
});