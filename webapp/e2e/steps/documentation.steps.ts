import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/documentation.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {
  
  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: true });
    page = await browser.newPage();

    await page
      .goto("https://dede-es5a.herokuapp.com/", {
        waitUntil: "networkidle0",
      })
      .catch(() => {// This is intentional});
  });

  test('User consults project documentation', ({given,when,then}) => {
    jest.setTimeout(40000);

    given('A user who founds the site', () => {
     // This is intentional
    }); 

    when('selects the documentation button on the footer', async () => {
      await Promise.all([
        (await page.$x("/html/body/div[1]/div/div[2]/div[3]/div[2]/a")).at(0)?.click(),
        page.waitForNavigation(),
      ]);
    });

    then('is redirected to the documentation web page', async () => {
      await expect(page).toMatch('DeDe_es5a')
    });
  })

  afterAll(async ()=>{
    browser.close()
  })
});

