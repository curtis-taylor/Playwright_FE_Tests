import { test, expect, type Page, type Locator, Browser } from '@playwright/test';

export class SignInPage {

    readonly page: Page;
    readonly url: string = 'http://localhost:3000/pages/sign-in/'; 
    readonly signup_url = 'http://localhost:3000/pages/sign-up/';
    readonly forgot_page_url = 'http://localhost:3000/pages/forgot-passsword';
    readonly homepage_url = "http://localhost:3000/pages/home/";

    readonly test_user_login_data = [{"email" :"king.arthur@camelot.uk", "password" : "H0lyGr@il42!", "role" : "organizer"},
                                {"email" : "black.knight@bridgeguard.io", "password" : "ItzJustaFsh!", "role" : "organizer"},
                                {"email" : "sir.robin@cowardly.co", "password" : "RunAway!1234", "role" : "volunteer"},
                                {"email" : "lancelot@heroics.inc", "password" : "LeapotFaith!", "role" : "volunteer" },
                                ];
  


    readonly page_title_1: Locator;
    readonly homepage_title: Locator;

    readonly login_form: Locator;
    readonly email_field: Locator;
    readonly password_field: Locator;

    readonly login_button: Locator;
    readonly logout_button: Locator;

    readonly home_icon: Locator;
    readonly linkedin_icon: Locator;
    readonly youtube_icon: Locator;
    readonly instagram_icon: Locator;
    readonly twitter_x_icon: Locator;

    readonly signup_link: Locator;
    readonly forgot_link: Locator;

    readonly email_required_label: Locator;
    readonly password_required_label: Locator;

    public constructor(page: Page) { 
        this.page = page;
        // this.url = this.url;

        this.page_title_1 = page.getByRole('heading', {name: 'Welcome to TorontoJS Community Hub'});
        this.homepage_title = page.getByRole('heading', {name: 'Home Page'});

        this.email_field = page.getByRole('textbox', { name: 'E-mail REQUIRED' });
        this.password_field = page.getByRole('textbox', { name: 'Password: REQUIRED' });
        this.login_form = page.locator('.login-form');

        this.home_icon = page.getByRole('navigation', { name: 'Secondary Navigation' }).getByRole('link').first();
        this.youtube_icon = page.getByRole('navigation', { name: 'Secondary Navigation' }).getByRole('link').nth(1);
        this.instagram_icon = page.getByRole('navigation', { name: 'Secondary Navigation' }).getByRole('link').nth(2);
        this.twitter_x_icon = page.getByRole('navigation', { name: 'Secondary Navigation' }).getByRole('link').nth(3);
        this.linkedin_icon = page.getByRole('navigation', { name: 'Secondary Navigation' }).getByRole('link').nth(4);

        this.login_button = page.getByRole('button', { name: 'Complete sign-up form button' }); 
        this.logout_button = page.getByRole('button', { name: 'Log Out button' }); 

        this.signup_link = page.getByRole('link', { name: 'click here to sign-up' });
        this.forgot_link = page.getByRole('link', { name: 'I don\'t remember my password' });

        this.email_required_label = page.locator('label').filter({ hasText: 'E-mailREQUIRED' }).locator('span');
        this.password_required_label = page.locator('label').filter({ hasText: 'Password:REQUIRED' }).locator('span');
    
    }

    async navigate() {

      await expect(async() => {
            await this.page.goto(this.url); 
            expect(this.page.url()).toBe(this.url);
      }).toPass({ intervals: [1_000, 2_000, 10_000],
                    timeout: 60_000});
      console.log("NAVIGATING to: " + this.url);
    }

    async fill_fields(email: string, password: string) {

        await this.email_field.isVisible();
        await this.password_field.isVisible();
        await this.email_field.fill(email);
        await this.password_field.fill(password);

        expect(this.home_icon).toBeVisible();
        expect(this.youtube_icon).toBeVisible();
        expect(this.instagram_icon).toBeVisible();
        expect(this.linkedin_icon).toBeVisible();
        expect(this.twitter_x_icon).toBeVisible();

    }

    async keyboard_fill_fields(email: string, password: string) {

        let currentElement = this.page.locator(':focus').first();
        let tabCount = 0;
        const maxTabs = 30; // Prevent infinite loop
        //let href_temp = await row.getAttribute('href');
        //let expected_url = href_temp?.toString().split(".");

        while(tabCount < maxTabs) {

            await this.page.keyboard.press('Tab');
            currentElement = this.page.locator(':focus').first();

            if(currentElement === this.email_field) {
                 await this.email_field.isVisible();
                 await this.email_field.fill(email);
            }

            if(currentElement === this.password_field) {
                await this.password_field.isVisible();
                await this.password_field.fill(password);
            }

            
        }

        expect(this.home_icon).toBeVisible();
        expect(this.youtube_icon).toBeVisible();
        expect(this.instagram_icon).toBeVisible();
        expect(this.linkedin_icon).toBeVisible();
        expect(this.twitter_x_icon).toBeVisible();

    }

    

}