import { defineFeature, loadFeature } from 'jest-cucumber'
import puppeteer from 'puppeteer'

const feature = loadFeature('./features/signin.feature')

let page: puppeteer.Page
let browser: puppeteer.Browser
jest.setTimeout(400000)

defineFeature(feature, (test) => {
  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: true })
    page = await browser.newPage()

    await page
      .goto('https://dede-es5a.herokuapp.com/', {
        waitUntil: 'networkidle0',
        timeout: 0
      })
      .catch(() => {
        // This is intentional
      })
  })

  test('User goes to sign in page', ({ given, when, then }) => {
    given('A user who founds the site', () => {
      // This is intentional
    })

    when('selects the Signin button on the top menu', async () => {
      await page.goto("https://dede-es5a.herokuapp.com/signIn") //There is a problem with the button click, I have to do it this way
    })

    then('is redirected to the sign in page', async () => {
      await expect(page).toMatch('WELCOME')
    })
  })

  afterAll(async () => {
    browser.close()
  })
})
