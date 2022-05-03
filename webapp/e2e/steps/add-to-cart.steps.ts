import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/add-to-cart.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;
jest.setTimeout(400000);

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
      .catch(() => {console.log("Error while testing")});
  });

  test('User adds a product to the cart', ({given,when,then}) => {

    given('A user who founds the site', () => {
      console.log('Checking product added...')
    });

    when('He selects the product\'s size, he decides to add it to the cart', async () => {
      //Se selecciona la talla en el combobox
      await expect(page).toClick('div.MuiGrid-grid-xs-4:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1)')
      await expect(page).toClick('#menu- > div:nth-child(3) > ul:nth-child(1) > li:nth-child(1)')

      //Se hace click para añadir al carrito
      await expect(page).toClick('div.MuiGrid-grid-xs-4:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > button:nth-child(2)')
    });

    then('A confirmation message should be shown in the screen and the product is added', async () => {
      //Se muestra añadido
      await expect(page).toClick('.MuiBadge-root > button:nth-child(1)')
      await expect(page).toMatch('British')
    });
  })

  afterAll(async ()=>{
    browser.close()
  })

});

