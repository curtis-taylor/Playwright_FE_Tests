import { expect, type Page, type Locator, Browser } from '@playwright/test';

export class PrintConductPage {

    readonly page: Page; 
    readonly url: string = 'http://localhost:3000/pages/print-documents/?document=code-of-conduct';
    readonly print_button: Locator;
    readonly print_button_color: string = 'rgb(237, 55, 49)';

    readonly email_field: Locator;
    readonly text_box: Locator;
    readonly send_button: Locator;

    readonly base_link_location: Locator;
    readonly goBack_link: Locator;

    
    public constructor(page: Page) { 
        this.page = page;
        this.print_button = page.getByRole('button', { name: 'Print document' });
        this.email_field = page.getByRole('textbox', { name: 'Email' });
        this.text_box = page.getByRole('textbox', { name: 'Message' });
        this.send_button = page.getByRole('button', { name: 'Send' });
        this.base_link_location = page.getByText('The Toronto JS Code of').getByRole('link');
        this.goBack_link = page.getByText('Go back');
    }

    async navigate() {
        await this.page.goto(this.url); 
        console.log(this.page.url())
        expect(this.page.url()).toBe(this.url);
    }

}