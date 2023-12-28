import { chromium } from "@playwright/test";

async function getAccessToken() {

    const browser = await chromium.launch();
    const browserContext = await browser.newContext();
    const apiRequestContext = browserContext.request;


    const clientId = '3MVG9fe4g9fhX0E5FlwAmbzEJYQ_B9dR07wzmGZiOtMojM5SNQG4cZ49BPzQyWLoLpxMz8X9QfFarq_E28J9I'
    const clientSecret = 'FB834F7DABF62B5ABF5460D8C026961C97582F7400C8E2BAD959E48853C8E16D';
    const username = 'balajizoe86@wipro12.com';
    const password = 'Chay2023#';
    const url = 'https://login.salesforce.com/services/oauth2/token';

    const generatingToken = await apiRequestContext.post(url,{
        headers:{

            "Content-Type": "application/x-www-form-urlencoded",
            "Connection": "keep-alive"
        },
        form:{
            "grant_type": "password",
            "client_id": clientId,
            "client_secret": clientSecret,
            "username": username,
            "password": password

        }
    
    });
    const generatingTokenJSON = await generatingToken.json();
    console.log(generatingTokenJSON);
    
    return{
        accessToken :generatingTokenJSON.access_token,
        inst_url : generatingTokenJSON.instance_url

    }

    
};
export {getAccessToken};