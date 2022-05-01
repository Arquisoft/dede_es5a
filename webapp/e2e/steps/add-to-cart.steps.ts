import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/add-to-cart.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {
  
  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: true });
    page = await browser.newPage();

    await page
      .goto("http://localhost:3000", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
  });

  test('User adds a product to the cart', ({given,when,then}) => {
    jest.setTimeout(40000);

    given('A user who founds the site', () => {
     
    });

    when('He selects the product\'s size, he decides to add it to the cart', async () => {
      //Se selecciona la tabla
      await page.waitForXPath("/html/body/div[1]/div/div[1]/div/div/div/div[1]/div/div[2]/div/div/div/div").then(element => {      
        element?.select
      })
      await page.waitForXPath("/html/body/div[4]/div[3]/ul/li[1]").then(element => {      
        element?.click
      })
      //Se hace click para añadir al carrito
      const buttonAddToCart = await page.waitForXPath("/html/body/div[1]/div/div[1]/div/div/div/div[1]/div/div[2]/div/button")
      buttonAddToCart?.click();
    });

    then('A confirmation message should be shown in the screen and the product is added', async () => {
      await expect(page).toMatch('British, size 37 added to cart!')
    });
  })

  afterAll(async ()=>{
    browser.close()
  })

});

