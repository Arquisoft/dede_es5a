import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/create-order.feature');

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
      .catch(() => {});
  });

  test('User adds a product to the cart and decide to buy it', ({given,when,then}) => {
    given('A user adds a product', async () => {
      console.log('Checking order creation...')
    });

    when('He goes to the cart and start procesing the order', async () => {
      //Se selecciona la talla en el combobox
      await expect(page).toClick('div.MuiGrid-grid-xs-4:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1)')
      await expect(page).toClick('#menu- > div:nth-child(3) > ul:nth-child(1) > li:nth-child(1)')

      //Se hace click para añadir al carrito
      await expect(page).toClick('div.MuiGrid-grid-xs-4:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > button:nth-child(2)')
    

      //Se va al carrito
      await expect(page).toClick('.MuiBadge-root > button:nth-child(1)')

      //Se clica en "process order"
      await expect(page).toClick('.MuiButton-fullWidth')

      //Se clica en "next"
      await expect(page).toClick("button.css-1e6y48t-MuiButtonBase-root-MuiButton-root:nth-child(3)")

      //Se selcciona una dirección
      await expect(page).toClick("div.MuiDataGrid-row:nth-child(1)")

      //Se clica en "next"
      await expect(page).toClick("button.css-1e6y48t-MuiButtonBase-root-MuiButton-root:nth-child(3)")

      //Se hace clcick en pay y se compruea que se está en la página en cuestión
      await expect(page).toMatch("Simulating the filling of payment data")
      await expect(page).toClick(".css-1e6y48t-MuiButtonBase-root-MuiButton-root")

    });

    then('Order is created', async () => {
      await expect(page).toMatch("The sale has been done and it can proceed with the delivery.")

    });
  })

  afterAll(async ()=>{
    browser.close()
  })

});

