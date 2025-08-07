import { test, expect, chromium, Locator, Page } from '@playwright/test';
import { exit } from 'node:process';

test('Open Y-axis for job apply', async ({ page }) => {
  let count = 0;
  // <select id="search_where_q" name="search[where_q]" class="country-selector ui-autocomplete-input" onchange="showFlag()" autocomplete="off" data-gtm-form-interact-field-id="0">
  //   <option value="">Select Country</option>
  //     <option value="Australia">Australia</option>
  //     <option value="Canada">Canada</option>
  //     <option value="Denmark">Denmark</option>
  //     <option value="Germany">Germany</option>
  //     <option value="Hong Kong">Hong Kong</option>
  //     <option value="Ireland">Ireland</option>
  //     <option value="New Zealand">New Zealand</option>
  //     <option value="Singapore">Singapore</option>
  //     <option value="South Africa">South Africa</option>
  //     <option value="UAE">UAE</option>
  //     <option value="United Kingdom">United Kingdom</option>
  //     <option value="USA">USA</option>
  //   <!-- Add more country options here -->
  // </select>

  const datafor = {
    job: "software engineer",
    // country: "Canada",
    // country: "Hong Kong",
    // country: "New Zealand",
    // country: "Ireland",
    // country: "Australia",
    // country: "USA",
    // country: "Singapore",
    // country: "Denmark",
    // country: "Germany",
    // country: "United Kingdom",
  }

  await page.goto('https://jobs.y-axis.com/software-jobs', { timeout: 800000 });

  await expect(page).toHaveTitle(/Software Jobs/);

  await page.locator("(//a[contains(text(), 'Log in') and @data-bs-target='#login-modal-post-resume'])[1]").waitFor({ state: "visible" });

  const login_element = await page.locator("(//a[contains(text(), 'Log in') and @data-bs-target='#login-modal-post-resume'])[1]");
  await login_element.click()


  await page.locator('//input[@placeholder="Email" and @name="user[email]"]').waitFor({ state: "visible" });
  const email_loc = await page.locator('//input[@placeholder="Email" and @name="user[email]"]')
  await email_loc.fill("vnithyanandhan55@gmail.com")

  const pass_loc = await page.locator('//input[@placeholder="Password" and @name="user[password]"]')
  await pass_loc.fill("Nick@lex55")

  const login_btn_element = await page.locator("//input[@value='Login' and @name='commit']");
  await login_btn_element.click()
  await page.waitForLoadState();


  await page.getByText("Nithyanandhan").waitFor({ state: "visible", timeout: 100000 });
  await expect(page).toHaveTitle(/Jobs/);
  await page.waitForLoadState();
  await page.waitForLoadState("domcontentloaded");


  await page.locator('//input[@name="search[q]" and @id="jobs-search-page-search-field"]').waitFor({ state: "visible", timeout: 300000 });
  await page.locator('//input[@name="search[q]" and @id="jobs-search-page-search-field"]').fill(datafor["job"])
  // await page.locator('select#search_where_q').first().selectOption({ value: datafor["country"] })
  await page.waitForLoadState("domcontentloaded");


  await page.locator('button.find-jobs-btn').click()
  await page.waitForLoadState();

  let pageination = await page.locator('ul.pagination').isVisible()

  do {

    let founded_element: Locator[] = await page.locator('div#search-data > div').all()


    if (await page.locator('text="Applied for the job successfully"').isVisible() || await page.locator('//h2[text()="Information"]').isVisible()) {
      await page.locator('button.btn-close[aria-label="Close"]').last().click({ timeout: 40000 })
    }
    await search_to_data(founded_element, page);
    try {
      if (await page.locator('text="Applied for the job successfully"').isVisible() || await page.locator('//h2[text()="Information"]').isVisible()) {
        await page.locator('button.btn-close[aria-label="Close"]').last().click({ timeout: 40000 })
      }
    }
    catch (error) {
      console.log("Error", error)
    }

    // await page.waitForSelector('[class*="loader"]', { state: 'hidden', timeout: 60000 });
    await waitForLoaderToDisappear(page);
    if (await page.locator('ul.pagination').isVisible()) {
      if (await page.locator('ul.pagination li.next.disabled').isVisible()) {
        // End of list
        pageination = false;
        // return;
        break;
      }

      // await page.waitForSelector('[class*="loader"]', { state: 'hidden', timeout: 60000 });
      await waitForLoaderToDisappear(page);
      if (await page.locator('ul.pagination li.next').isVisible()) {
        pageination = true;
        await page.locator('ul.pagination li.next').click()

        // await page.waitForSelector('[class*="loader"]', { state: 'hidden', timeout: 60000 });
        await waitForLoaderToDisappear(page);
        await page.waitForLoadState("domcontentloaded");
        // await page.waitForSelector('div.container-loader d-flex', { state: 'detached' });
        // await page.waitForSelector('[class*="loader"]', { state: 'hidden', timeout: 60000 });
        await waitForLoaderToDisappear(page);

      }
    }

    // await page.waitForSelector('[class*="loader"]', { state: 'hidden', timeout: 60000 });
    await waitForLoaderToDisappear(page);
    await page.waitForLoadState("domcontentloaded");
    // await page.waitForSelector('div.container-loader d-flex', { state: 'detached' });
    // await page.waitForSelector('[class*="loader"]', { state: 'hidden', timeout: 60000 });
    await waitForLoaderToDisappear(page);


  } while (pageination);

});



const search_to_data = async (founded_element: Locator[], page): Promise<number | undefined> => {
  let counter: number = 0;
  for (const ele of founded_element) {
    try {


      await page.waitForLoadState("domcontentloaded");
      // await page.waitForSelector('[class*="loader"]', { state: 'hidden', timeout: 60000 });
      await waitForLoaderToDisappear(page);

      if (await page.locator('text="Applied for the job successfully"').isVisible() || await page.locator('//h2[text()="Information"]').isVisible()) {
        await page.locator('button.btn-close[aria-label="Close"]').last().click({ timeout: 40000 })
      }
      await waitForLoaderToDisappear(page);
      await page.waitForLoadState("domcontentloaded");

      // await expect(ele).toBeVisible();


      // while (!(await ele.isVisible() && await ele.isEnabled())) {
      //   await page.waitForTimeout(500); // Check again after 500ms
      //   // await ele.click();
      // }


      // for (let i = 0; i < 5; i++) {
      // if (await ele.isVisible() && await ele.isEnabled()) {
      // await page.waitForSelector('div#search-data > div', { state: 'visible', timeout: 60000 });
      await page.evaluate((el) => el.scrollIntoView({ behavior: "smooth", block: "center" }), await ele.elementHandle());

      // await ele.click();
      await ele.click({ timeout: 60000 }); // Wait up to 60 seconds
      // break;
      // }
      // await page.waitForTimeout(2000); // Try again after 2 seconds
      // }

      // await page.waitForSelector('[class*="loader"]', { state: 'hidden', timeout: 60000 });
      await waitForLoaderToDisappear(page);
      await page.waitForLoadState("domcontentloaded");
      // await page.waitForSelector('div.container-loader d-flex', { state: 'detached' });
      // await page.waitForSelector('[class*="loader"]', { state: 'hidden', timeout: 60000 });
      await waitForLoaderToDisappear(page);
      await page.waitForLoadState("domcontentloaded");
      await page.waitForLoadState("networkidle");

      let job_title = await page.locator('div.job-display-card div.jobs-body-2 div.job-page-title span.search-job-title1')

      let job_txt = job_title.innerText();
      console.log(job_txt)


      const applyJobButton = page.locator('//button[contains(@class, "apply-job") and text()="Apply Job"]');
      console.log(await applyJobButton.count());

      if ((await applyJobButton.count())) {
        await page.evaluate((el) => el.scrollIntoView({ behavior: "smooth", block: "center" }), await applyJobButton.elementHandle());

        // if (job_txt.includes("Director") || job_txt.includes("Executive") || job_txt.includes("Sales")) {
        //   continue;
        // }

        // if (await page.locator('//button[contains(@class, "apply-job") and text()="Apply Job"]').isVisible()) {
        await page.locator('//button[contains(@class, "apply-job") and text()="Apply Job"]').click({ timeout: 60000 })
        await page.waitForLoadState("domcontentloaded");
        // await page.waitForSelector('div.container-loader d-flex', { state: 'detached' });
        // await page.waitForSelector('[class*="loader"]', { state: 'hidden', timeout: 60000 });
        await waitForLoaderToDisappear(page);

        await page.locator('button.btn-close[aria-label="Close"]').last().click({ timeout: 40000 })
        await page.waitForLoadState("domcontentloaded");
        // await page.waitForSelector('[class*="loader"]', { state: 'hidden', timeout: 60000 });
        await waitForLoaderToDisappear(page);
        counter++;
        // await page.waitForSelector('div.container-loader d-flex', { state: 'detached' });
      }
    }
    catch (error) {
      continue
    }

  }

  return counter;

}



async function waitForLoaderToDisappear(page: Page, timeout: number = 120000) {
  console.log("Waiting for loader to disappear...");

  try {
    // Increase timeout and try different states
    await Promise.race([
      page.waitForSelector('[class*="loader"]', { state: 'hidden', timeout }),
      page.waitForSelector('[class*="loader"]', { state: 'detached', timeout }),
      page.waitForLoadState('networkidle')
    ]);

    // Small delay for animations or transitions
    await page.waitForTimeout(2000);

    console.log("Loader has disappeared.");
  } catch (error) {
    console.error("Timeout exceeded: Loader did not disappear in time.", error);
  }
}
