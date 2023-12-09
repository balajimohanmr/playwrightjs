import {chromium, expect, test} from "@playwright/test"
test ("Create Lead in salesforce", async()=>{
    test.setTimeout(50000);
    const page=await (await (await chromium.launch({headless:false,channel:'chrome'})).newContext()).newPage();
    //Logging in to sales force app
    await page.goto("https://login.salesforce.com/");
    await page.setViewportSize({width:1707,height:898});
    await page.locator("#username").fill("balajizoe86@wipro12.com");
    await page.locator(":below(:text('Password'))").first().fill("Chay2023#");
    await page.locator("#Login").click();
    //waiting for the page to load
    await page.waitForLoadState('load');
    await page.waitForTimeout(5000);
    // Clicking on toggle button,view all, sales from app launcheer and then on Leads tab
    await page.click("div.slds-icon-waffle");
    await page.click("button[aria-label='View All Applications']");
    await page.click("a:has-text('Sales')");
    await page.click("a:has-text('Leads')");
    await page.waitForLoadState('load');
    //Clicking on New button and filling the mandatory details before saving them
    await page.locator("button:has-text('New')").click();
    await page.waitForLoadState('load');
    await page.locator("button[aria-label*='Salutation']").click();
    await page.click("lightning-base-combobox-item:has([title=\"Mr.\"])");
    var name='Balaji';
    await page.getByPlaceholder("Last Name").fill(name);
    await page.locator("input[name='Company']").fill("Wipro");
    await page.click("button:text-is('Save')");
    //Verifying the new lead is created 
    expect((await page.locator("div[data-key='success']").innerText()).includes(`Lead Mr.{name} was created`),"Succes message is displayed after creating the Lead");
    
 

        
}) 
