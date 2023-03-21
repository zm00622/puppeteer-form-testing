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
  await page.waitForSelector('form'); // wait for the form to be loaded

  // Apply Text to Form Fields. Await page.evaluate and the callback function allows one to execute vanilla javascript within puppeteer.
  await page.evaluate(() => {
    const dummyData = {
      name: "John Doe",
      email: "johndoe@example.com",
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

  // Click the "SIGN UP" button
  const button = await page.$('button[type="submit"]:not([disabled])');
  if (button) {
    await button.click();
  } else {
    console.error('Unable to find "SIGN UP" button');
  }

  await page.waitForTimeout(5000);
  await browser.close();
})();