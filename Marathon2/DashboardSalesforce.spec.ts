import { chromium,expect, test} from "@playwright/test";
import { text } from "stream/consumers";
import {getAccessToken} from "./authHelper.ts"
let oppId:string;
let access_token:string;
let url:string;
test ("1.Create Opportunity in salesforceUI", async({page,request})=>{
    test.setTimeout(100000);
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
    await page.locator("one-app-launcher-modal input.slds-input").fill("Dashboards");
    await page.locator("one-app-launcher-tab-item p").filter({hasText:"Dashboards"}).click();
    await page.waitForLoadState('load');
    await page.waitForTimeout(7000);
    expect(await page.title()).toContain("Dashboards");
    await page.locator("a[title=\"New Dashboard\"]").click();
    await page.waitForLoadState('load');
    await page.waitForTimeout(5000);
    const dashBoardName="Salesforce Automation by Zoe";
    
    
    
    const dashBoardFrame= page.frameLocator("iframe[title=\"dashboard\"]");
    
    await dashBoardFrame.locator("#dashboardNameInput").fill(dashBoardName);
    
    await dashBoardFrame.locator("#submitBtn").click();
    await page.waitForLoadState('load');
    await dashBoardFrame.locator("div.actionRibbon button").filter({hasText:"Save"||"save"}).click();
    await page.locator("a[title=\"Dashboards\"]").click();
    await page.waitForLoadState('load');
    //await page.pause();
    await page.locator("a[title='All Dashboards']").click();
    await page.waitForLoadState('load');
    await page.waitForTimeout(10000);
    const dashBoardNames= page.locator("th[data-label='Dashboard Name'] span");
    let isDashboardNamePresent=0;
    //dashBoardNames.waitFor();
   
    
  

    for (let i=0;i<await (dashBoardNames.count());i++){
        console.log((await dashBoardNames.nth(i).textContent()));
               
        if ((await dashBoardNames.nth(i).textContent())?.includes(dashBoardName)){
            isDashboardNamePresent=1;
            break;
        } 
    }
    expect(isDashboardNamePresent).toEqual(1);
    
})

test("2.Fetching bearer token",async()=>{
    access_token=(await getAccessToken()).accessToken;
    url=(await getAccessToken()).inst_url;

}
)

test("3.Retrieve opportunity from sf via api",async({request})=>{
    const response =await request.get(`${url}/services/data/v59.0/sobjects/Dashboard`,{
        headers:{
            "Authorization":`Bearer ${access_token}`

        }


    })
    const responseBody= await response.json();
    console.log(responseBody);
    console.log(response.status());
     oppId=responseBody.recentItems[0].Id;
    console.log(`Id of the new opporunity : ${responseBody.recentItems[0].Id}`);
    
})


test("4.Delete opportunity from sf via api",async({request})=>{
    
    const response =await request.delete(`${url}/services/data/v59.0/sobjects/Dashboard/${oppId}`,{
        headers:{
            "Authorization":`Bearer ${access_token}`

        }


    })
    
    expect(response.status()).toBe(204);
})
