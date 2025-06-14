import { test, expect, type Page, type Locator, Browser } from '@playwright/test';

export class CheckEmailPage {

    readonly page: Page;
    readonly url: string = 'http://localhost:3000/pages/check-your-email/'; 

    readonly page_title: Locator;

    readonly login_form: Locator;


    readonly home_icon: Locator;
    readonly linkedin_icon: Locator;
    readonly youtube_icon: Locator;
    readonly instagram_icon: Locator;
    readonly twitter_x_icon: Locator;

    public constructor(page: Page) { 
        this.page = page;
        
        // this.url = this.url;
    }

}