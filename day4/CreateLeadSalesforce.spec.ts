import {chromium, expect, test} from "@playwright/test"
test ("Create Lead in salesforce", async()=>{
    const page=await (await (await chromium.launch({headless:false,channel:'chrome'})).newContext()).newPage();
    await page.goto("https://login.salesforce.com/");
    await page.locator("#username").fill("balajimohanmr-jxlq@force.com");
    await page.locator(":below(:text('Password'))").first().fill("Chay2023#");
    await page.locator("#Login").click();
    await page.waitForLoadState('load');
    await page.getByRole("link",{name:'Sales'}).hover();
    await page.getByText("Leads").click();
    await page.locator("a:has-text('New')").click();
    await page.locator("button[aria-label*='Salutation']").click();
    await page.getByText("Mr.").click();
    var name='Balaji';
    await page.getByPlaceholder("Last Name").fill(name);
    await page.locator("input[name='Company']").fill("Wipro");
    await page.click("button:text-is('Save')");
    expect((await page.locator("div[data-key='success']").innerText()).includes(`Lead Mr.{name} was created`),"Succes message is displayed after creating the Lead");
    expect((await page.locator("lightning-formatted-name:below(div.entityNameTitle)").innerText()).includes(name),"Lead is created");
 

        
}) 