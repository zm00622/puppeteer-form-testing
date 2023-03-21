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
  console.log("Website loaded");

  // Fill out the form
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
    console.log("Filled the form");
  });
  
  // Click the button with the text "SIGN UP"
  await page.waitForSelector('button'); // Wait for all buttons to be loaded
  const buttons = await page.$$('button'); // Get all buttons
  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    const text = await button.evaluate(b => b.innerText.trim()); // Get the text of the button and remove whitespace
    if (text === "SIGN UP") {
      await button.click();
      console.log("Clicked the button with text: " + text);
      break;
    }
  }

  // Wait for some time before closing the browser
  await page.waitForTimeout(5000);
  await browser.close();
})();