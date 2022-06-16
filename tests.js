const puppeteer = require('puppeteer');
(async () => {
    try{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.click('[name="addName"]');
    await page.waitForSelector("#status:not(:empty)");
  
    await browser.close();
    }
    catch(e){
        console.log(e);
    }
  })(); 