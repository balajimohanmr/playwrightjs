import {chromium, test} from "@playwright/test"
test("Create a new lead",async()=>{
    const browser=await chromium.launch({headless:false,channel:'chrome'});
    const browserContext= await browser.newContext();
    const page= await browserContext.newPage();
    await page.goto("http://leaftaps.com/opentaps/control/main");
    await page.locator("#username").fill("Demosalesmanager");
    await page.locator("#password").fill("crmsfa");
    await page.locator(".decorativeSubmit").click();
    await page.getByText("CRM/SFA").click();
    await page.waitForLoadState("load");
    console.log("Page title is "+ await page.title());
    console.log("URL of the page is "+ page.url());
    await page.locator("#left-content-column li:has-text('Create Lead')").click();
    await page.locator("input:right-of(:text('Company Name'))").first().fill("Das & Co");
    await page.locator("#createLeadForm_firstName").fill("Leo");
    await page.locator("#createLeadForm_lastName").fill("Das");
    await page.selectOption("#createLeadForm_dataSourceId",{label:'Direct Mail'});
    await page.selectOption("#createLeadForm_industryEnumId",{value:'IND_SOFTWARE'});
    await page.selectOption("#createLeadForm_ownershipEnumId",{index:2});
    
    

    

})