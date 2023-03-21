# Puppeteer Testing for Our Web Properties

<hr>

## To Run A Test:

### 1. Install the dependencies

### 2. Use node 16.13.0 or greater

### 3. Pick the Script You Want to Run

### 4. Run the following command

```

node insert-test-script-you-want-to-run-here.js

```

EX:

```

node RVCB-Headful-Homepage-Signup-Form-Test.js

```

### The above code will run a test script for RVClickBuy. Make note of the naming convention, as this naming convention should be used throughout the test styem. In particular, this script runs a headful (a test we can watch in the browser) test on the homepage signup form for RVClickBuy. After this test runs, we can then check eLeads, the Leadhub and the lead inbox emails to make sure the form is submitting correctly.

### To run multiple scripts at once, we can add a command to the build line in the package.json that runs all scripts sequentially. Alternatively, we can just run a command that concatenates the scripts we want to run:

```

node RVCB-Headful-Homepage-Signup-Form-Test.js; node RVCB-Headful-Contact-Us-Form-Test.js; node RVCB-Headful-My-Deals-Form-Test.js;

```
