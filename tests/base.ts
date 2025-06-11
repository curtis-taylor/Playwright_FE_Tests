import { test as base } from "@playwright/test";
import { PrintConductPage } from "../page_object_models/pom_print_conduct";


export type TestOptions = {
    printConductPage: PrintConductPage;
};

export const test = base.extend<TestOptions>({
    printConductPage: async ({page}, use) => {
        const printConductPage = new PrintConductPage(page);
        await use(printConductPage);
    }
    
});

export { expect } from "@playwright/test";