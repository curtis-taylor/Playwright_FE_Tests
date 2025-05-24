import { test, expect, type Page, type Locator, Browser } from '@playwright/test';

export class SignInPage {

    readonly page: Page;
    readonly url: string = 'http://localhost:3000/pages/sign-in/'; 

    readonly page_title_1: Locator;

    readonly login_form: Locator;
    readonly email_field: Locator;
    readonly password_field: Locator;

    readonly login_button: Locator;

    readonly home_icon: Locator;
    readonly linkedin_icon: Locator;
    readonly youtube_icon: Locator;
    readonly instagram_icon: Locator;
    readonly twitter_x_icon: Locator;

    public constructor(page: Page) { 
        this.page = page;
        this.url = this.url;

        this.page_title_1 = page.getByRole('heading', {name: 'Welcome to TorontoJS Community Hub'});

        this.email_field = page.getByRole('textbox', { name: 'E-mail REQUIRED' });
        this.password_field = page.getByRole('textbox', { name: 'Password: REQUIRED' });
        this.login_form = page.locator('.login-form');

        this.home_icon = page.getByRole('navigation', { name: 'Secondary Navigation' }).getByRole('link').first();
        this.youtube_icon = page.getByRole('navigation', { name: 'Secondary Navigation' }).getByRole('link').nth(1);
        this.instagram_icon = page.getByRole('navigation', { name: 'Secondary Navigation' }).getByRole('link').nth(2);
        this.twitter_x_icon = page.getByRole('navigation', { name: 'Secondary Navigation' }).getByRole('link').nth(3);
        this.linkedin_icon = page.getByRole('navigation', { name: 'Secondary Navigation' }).getByRole('link').nth(4);

        this.login_button = page.getByRole('button', { name: 'Complete sign-up form button' }); 


    }

    async navigate() {
         await this.page.goto(this.url); 
    }

    async fill_fields(email: string, password: string) {

        await this.email_field.isVisible();
        await this.password_field.isVisible();
        await this.email_field.fill(email);
        await this.password_field.fill(password);


    }

    // CONCATENATES DATE TO SUPPLIED USERNAME TO CREATE UNIQUE PASSWORD
    async unique_username(username: string) {
        let t = (Math.round(Date.now() / 100000000)).toString();
        return username + t;
    }

}