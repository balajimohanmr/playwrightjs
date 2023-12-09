import {chromium, test} from "@playwright/test"
test("Create a new lead",async()=>{
    test.setTimeout(50000);
    const browser=await chromium.launch({headless:false,channel:'chrome'});
    const browserContext= await browser.newContext();
    const page= await browserContext.newPage();
    //Launching leaftaps and loggins in 
    await page.goto("http://leaftaps.com/opentaps/control/main");
    await page.setViewportSize({width:1707,height:898});
    await page.locator("#username").fill("Demosalesmanager");
    await page.locator("#password").fill("crmsfa");
    await page.locator(".decorativeSubmit").click();
    //Clicking on CRM/SFA link
    await page.locator("text=CRM/SFA").click();
    //Tapping create lead option on the left and filling the mandatory details before submitting them 
    await page.locator("#left-content-column li:has-text('Create Lead')").click();
    await page.locator("input:right-of(:text('Company Name'))").first().fill("Das & Co");
    await page.locator("#createLeadForm_firstName").fill("Leo");
    await page.locator("#createLeadForm_lastName").fill("Das");
    await page.locator("input.smallSubmit").click();
    //Edit the details to modify the company name and updating it 
    await page.locator("a:has-text('Edit')").click();
    await page.locator("#updateLeadForm_companyName").clear();
    await page.locator("#updateLeadForm_companyName").fill("Wipro");
    await page.locator("input[value='Update']").click();
    
    

})
