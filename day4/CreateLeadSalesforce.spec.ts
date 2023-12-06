import {chromium, expect, test} from "@playwright/test"
test ("Create Lead in salesforce", async()=>{
    const page=await (await (await chromium.launch({headless:false,channel:'chrome'})).newContext()).newPage();
    //Launching the salesforce site and loggin in with credentials
    await page.goto("https://login.salesforce.com/");
    await page.locator("#username").fill("balajimohanmr-jxlq@force.com");
    await page.locator(":below(:text('Password'))").first().fill("Chay2023#");
    await page.locator("#Login").click();
    //waiting for the page to load
    await page.waitForLoadState('load');
    //Mouse over on sales tab
    await page.getByRole("link",{name:'Sales'}).hover();
    //Clicking on Leads and New button 
    await page.getByText("Leads").click();
    await page.locator("a:has-text('New')").click();
    //Filling in salutaion,Last name and company details and saving them
    await page.locator("button[aria-label*='Salutation']").click();
    await page.getByText("Mr.").click();
    var name='Balaji';
    await page.getByPlaceholder("Last Name").fill(name);
    await page.locator("input[name='Company']").fill("Wipro");
    await page.click("button:text-is('Save')");
    //validating if the success message is displayed after creating a lead and if Leads name is displayed under the title "Leads"
    expect((await page.locator("div[data-key='success']").innerText()).includes(`Lead Mr.{name} was created`),"Succes message is displayed after creating the Lead");
    expect((await page.locator("lightning-formatted-name:below(div.entityNameTitle)").innerText()).includes(name),"Lead is created");
 

        
}) 
