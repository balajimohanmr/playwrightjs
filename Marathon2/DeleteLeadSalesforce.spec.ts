import { chromium,expect, test} from "@playwright/test";
import { text } from "stream/consumers";
import {getAccessToken} from "./authHelper.ts"
let leadId:string;
let access_token:string;
let url:string;
let lastName:string;
let name:string;

test("Fetching token",async()=>{
    access_token=(await getAccessToken()).accessToken;
    url=(await getAccessToken()).inst_url;

}
)

test("Creating lead in sf via api",async({request})=>{
    const response =await request.post(`${url}/services/data/v59.0/sobjects/Lead`,{
        headers:{
            "Authorization":`Bearer ${access_token}`,
            "Content-Type":"application/json"

        },
        data:{
            "Salutation": "Mr.",
            "LastName": "Moorthy12",
            "Company": "sdsd"
        }


    })
    const responseBody= await response.json();
    //console.log(responseBody);
     leadId=responseBody.id;
    console.log(`Id of the new opporunity : ${leadId}`);
    
})

test("Retrieving Lead from sf via api",async({request})=>{
    const response =await request.get(`${url}/services/data/v59.0/sobjects/Lead/${leadId}`,{
        headers:{
            "Authorization":`Bearer ${access_token}`

        }


    })
    const responseBody= await response.json();
    //console.log(responseBody);
    lastName=responseBody.LastName;
    name=responseBody.FirstName+responseBody.LastName;
    console.log(`Id of the retrieved opporunity : ${responseBody.LastName}`);
    
})



test("Deleting Lead from sf via api",async({page})=>{
    
    test.setTimeout(120000);
    
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
    await page.waitForLoadState('load');
    await page.locator("one-app-launcher-search-bar.searchBar input").fill('Leads');
    //await page.keyboard.press('Enter');
    await page.locator("a[data-label=\"Leads\"]").click();
    await page.waitForLoadState('load');
   await page.waitForTimeout(5000);
    const search=page.locator("button[aria-label*='Search']");
    if (await (search.isEnabled({timeout:20000}))) await search.click(); 
    else {
        console.log("Timeout wins")
        await page.waitForTimeout(5000);
        await search.click();
    }
    await page.waitForTimeout(5000);
    const search2=page.locator(".forceSearchAssistantDialog input[type='search']");
    if  (await (search2.isEditable({timeout:10000})))  await search2.fill(lastName);
    await page.waitForTimeout(5000);
    const searchResult= page.locator("//*[@title='Lead']/ancestor::search_dialog-instant-result-item //mark");
    expect(searchResult.first()).toContainText(lastName);
    await searchResult.first().click();
    await page.waitForLoadState('load');
    await page.waitForTimeout(4000);
    expect(page.locator("lightning-formatted-name")).toContainText(lastName);
    await page.locator("//button[contains(.,'Show more action')]").click();
    await page.locator("//a[contains(.,'Delete')]").click();
    const dialog= page.locator(".forceModalActionContainer .uiButton--default");
    if (await (dialog.isVisible({timeout:10000}))) await dialog.click();
    await page.waitForLoadState('load');
    await page.waitForTimeout(2000);
    if (await (search.isEnabled({timeout:20000}))) await search.click(); 
    else {
        console.log("Timeout wins")
        await page.waitForTimeout(5000);
        await search.click();
    }
    const searchAll= page.locator("[data-value='Search: All']");
    await page.waitForTimeout(2000);
    
    if (await(searchAll.isEnabled({timeout:10000}))) await searchAll.click();
    await page.waitForTimeout(2000);
    await page.locator("li:has(span[title='Leads'])").first().click();
    await page.waitForTimeout(2000);
    await page.getByPlaceholder("Search...").click();
    await page.keyboard.press('Enter');
    expect(page.locator("[class*='noResultsTitle']")).toBeVisible();

   
    
    

})
