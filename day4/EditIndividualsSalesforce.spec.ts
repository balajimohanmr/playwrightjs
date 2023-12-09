import {chromium, expect, test} from "@playwright/test"
test ("Edit individuals in salesforce", async()=>{
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
    //Click on individuals tab if it is displayed on screen. 
    if (await individualsTab.isVisible()) await individualsTab.click();
    //Click on "More" if individuals tab is not displayed . Then click on the menu item "Individuals"
    else {
        await page.getByRole('button', { name: '* Show more navigation items' }).click();
        await page.waitForLoadState('load');
        await page.getByRole('menuitem',{name:'Individuals'}).click();

    }
    await page.waitForLoadState('load');
    
    //Search for name balaji
    var name='Balaji';
    await page.getByPlaceholder("Search this list...").fill(name);
    await page.keyboard.press("Enter");
    //click on the dropdrown of the first row of the search result and then click "Edit" from the menu item
    await page.waitForTimeout(5000);
    await page.locator("td:nth-child(7)").first().locator("div").click();
    await page.waitForLoadState('load');
  
    await page.locator("a[title='Edit']").click();
    await page.waitForLoadState('load');
    //Click on saluatation drop down to choose "Mr."
    await page.getByRole('group', { name: '* Name' }).getByRole('button').click();
    await page.waitForLoadState('load');
    await page.locator("a[title='Mr.']").click();
    //Fill in the first name field and save it 
    await page.getByPlaceholder("First Name").fill("Hello");
    await page.getByRole('button', { name: 'Save', exact: true }).click();
    //Verify if the first name in the success toast message
    expect((await page.locator("div[data-key='success']").innerText()).includes(`Lead Mr.{name} was created`),"First name is saved");
    
 

        
}) 
