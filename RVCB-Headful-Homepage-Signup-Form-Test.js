const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

const { executablePath } = require("puppeteer");

(async () => {
  console.log("Launching browser...");
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: executablePath(),
    args: ['--no-sandbox']
  });
  console.log("Opening new page...");
  const page = await browser.newPage();
  console.log("Navigating to RVCB...");
  await page.goto('https://www.rvclickbuy.com/');
  console.log("website loaded");
  //   await page.waitForTimeout(50000);
  console.log("timeout started");
 

  // Apply Text to Form Fields. Await page.evalute and the callback function allows one to execute vanilla javascript within puppeteer.

  await page.evaluate(() => {
    const dummyData = {
      name: "Testing",
      email: "johndoe@example4343443443.com",
      message: "This is a dummy message",
      number: "5555555555",
      phone: "5555555555",
      mileage: "50000",
      year: "2022",
      birthday: "01/09/1970",
      location: "Atlanta",
      zipcode: "32216",
      zip: "32216",
      address: "12171 Beach Blvd",
      city: "Jacksonville",
      state: "FL",
    };
    console.log(dummyData.name);
    
    const fillAllInputsAndTextareasWithDummyData = () => {
      const inputElements = document.querySelectorAll("input");
      const textareaElements = document.querySelectorAll("textarea");
      const numberElements = document.querySelectorAll('input[type="number"]');
  
      inputElements.forEach((input) => {
        if (
          input.type !== "submit" &&
          input.type !== "button" &&
          input.type !== "hidden"
        ) {
          input.value = dummyData[input.name] || `Testing Disregard`; // try to fill with matching dummy value or "Testing" otherwise
        }
      });
  
      textareaElements.forEach((textarea) => {
        textarea.value = dummyData[textarea.name] || "Testing"; // try to fill with matching dummy value or "Testing" otherwise
      });
    };
  
    fillAllInputsAndTextareasWithDummyData();
    
    console.log("The code has executed past the final function");
    // End of Applying Text to Form Fields  
});

// The promise resolves after navigation has finished
// You have to click 3 times, otherwise the form will not submit
await Promise.all([
  page.waitForNavigation(), 
  page.click('.btn-main', {clickCount:3}),
  console.log('button clicked three times'),
  page.click('.btn-main'),
  console.log('button clicked one time')
]);

  await page.waitForTimeout(50000);
  await browser.close();
})();



// ATTEMPTS AT GETTING THE SIGN UP BUTTON TO CLICK:


// await page.evaluate(() => {
  //   const clickSubmit = () => {
  //     document.querySelector('form').submit();
  //   }
  //   clickSubmit();
  // });

  // await page.$eval( 'a#topbar-search', form => form.click() );
  // await page.$eval('input[value="SIGN UP"]', el => el.click());
  // await page.$eval('input[type="submit"]', el => el.click());
  
  // await page.waitForSelector('form'); // wait for the form to be loaded
  // await page.evaluate(() => {
  //   const form = document.querySelector('form');
  //   form.dispatchEvent(new Event('submit')); // trigger a submit event on the form
  // });

   // Click the SIGN UP button
  //  await page.waitForSelector('input[value="SIGN UP"]');
  //  await page.click('input[value="SIGN UP"]');

  // await this.page.waitFor(2000);
  // await this.page.click('.btn-main');

  // document.querySelector('form').submit();

  // $('input[type="submit"]').click();
