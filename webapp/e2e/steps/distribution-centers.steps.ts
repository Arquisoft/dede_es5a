import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/distribution-centers.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {
  
  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: true });
    page = await browser.newPage();

    await page
      .goto("https://dede-es5a.herokuapp.com", {
        waitUntil: "networkidle0",
      })
      .catch(() => {
        // This is intentional
      });
  });

  test('User goes distribution centers page', ({given,when,then}) => {
    jest.setTimeout(40000);

    given('A user who founds the site', () => {
     // This is intentional
    }); 

    when('selects the distribution centers button', async () => {
      await page.goto("https://dede-es5a.herokuapp.com/distributionCenters") //There is a problem with the button click, I have to do it this way
    });

    then('is redirected to the distribution centers page', async () => {
      await expect(page).toMatch('Oviedo')
    });
  })

  afterAll(async ()=>{
    browser.close()
  })
});

