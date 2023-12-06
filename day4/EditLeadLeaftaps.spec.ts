import {chromium, test} from "@playwright/test"
test("Create a new lead",async()=>{
    const browser=await chromium.launch({headless:false,channel:'chrome'});
    const browserContext= await browser.newContext();
    const page= await browserContext.newPage();
    await page.goto("http://leaftaps.com/opentaps/control/main");
    await page.locator("#username").fill("Demosalesmanager");
    await page.locator("#password").fill("crmsfa");
    await page.locator(".decorativeSubmit").click();
    await page.locator("text=CRM/SFA").click();
    await page.locator("#left-content-column li:has-text('Create Lead')").click();
    await page.locator("input:right-of(:text('Company Name'))").first().fill("Das & Co");
    await page.locator("#createLeadForm_firstName").fill("Leo");
    await page.locator("#createLeadForm_lastName").fill("Das");
    await page.locator("input.smallSubmit").click();
    await page.locator("a:has-text('Edit')").click();
    await page.locator("#updateLeadForm_companyName").clear();
    await page.locator("#updateLeadForm_companyName").fill("Wipro");
    await page.locator("input[value='Update']").click();
    
    

})