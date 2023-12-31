import {chromium, test} from "@playwright/test"
test("Login to Salesforce",async()=>{
    const page=await (await (await chromium.launch({headless:false,channel:'chrome'})).newContext()).newPage();
    //Launching the salesforce site and logging in to it 
    await page.goto("https://login.salesforce.com/");
    await page.locator("#username").fill("balajimohanmr-jxlq@force.com");
    await page.locator(":below(:text('Password'))").first().fill("Chay2023#");
    await page.locator("#Login").click();
    //waiting for the page to load
    await page.waitForLoadState('load');
    //Printing the title and url of the page
    console.log("Title of the page is "+ await page.title());
    console.log("URL of the page is "+ await page.url());
    
})
