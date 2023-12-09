import {chromium, expect, test} from "@playwright/test"
test ("Create individuals in salesforce", async()=>{
    test.setTimeout(50000);
    const page=await (await (await chromium.launch({headless:false,channel:'chrome'})).newContext()).newPage();
    //Logging in to sales force app
    await page.goto("https://login.salesforce.com");
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
    await page.locator("a[data-label=\"Individuals\"]").click();
    await page.waitForLoadState('load');
    const individualsTab=page.locator("a[title*='Individuals']");
    await page.waitForTimeout(5000);
    //Click the dropdown if individuals tab is displayed and then click "New individual"
    if (await individualsTab.isVisible()) {
        await page.getByRole("button",{name:'Individuals List',exact:false}).click();
        await page.waitForLoadState('load');
        await page.click("span:text-is('New Individual')");
    }
    //Click the more button if individuals tab is not displayed ,then click "Individuals" and "New"
    else {
        await page.getByRole('button', { name: '* Show more navigation items' }).click();
        await page.waitForLoadState('load');
        await page.getByRole('menuitem',{name:'Individuals'}).click();
        await page.waitForTimeout(3000);
        await page.getByRole("button",{name:'New',exact:true}).click();

    }
        
    //filling up the mandatory details before saving them
   
    var name='Balaji';
    await page.waitForLoadState('load');
    await page.getByPlaceholder("Last Name").fill(name);
    await page.click("button[title='Save']");
    //Verifying the individual is created 
    expect((await page.locator("div[data-key='success']").innerText()).includes(`Individual \"{name}\" was created`),"Succes message is displayed after creating the Lead");
    
 

        
}) 
