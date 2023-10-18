let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://github.com/");
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForTimeout(1000);
    const pageDescriptor = await page.waitForSelector(
      ".home-campaign-hero div.col-11 > h1"
    );
    const actualOriginal = await page.evaluate(
      (el) => el.textContent,
      pageDescriptor
    );
    const actual = actualOriginal.replace(/\s+/g, " ").trim();
    const expectedOriginal = "Let’s build from here";
    const expected = expectedOriginal.replace(/\s+/g, " ").trim();
    await page.waitForTimeout(1000);
    expect(actual).toEqual(expected);
  }, 10000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  });

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Get started with Team");
  });
});

describe("GitHub Dashboard Tests", () => {
  test("GitHub Sponsors Tests give title", async () => {
    const buttonOpenSource = await page.$(
      "body > div.logged-out li:nth-child(3)  button"
    );
    await buttonOpenSource.click();
    const sourceGitHubSponsors = await page.$(
      "li:nth-child(3) div:nth-child(1) a"
    );
    await sourceGitHubSponsors.click();
    await page.waitForTimeout(1000);
    const pageSponsors = await page.waitForSelector(".application-main h1");
    await page.waitForTimeout(1000);

    const actualOriginal = await page.evaluate(
      (el) => el.textContent,
      pageSponsors
    );
    const actual = actualOriginal.trim();
    const expected = "Invest in the software that powers your world";
    expect(actual).toEqual(expected);
  }, 15000);
  test("GitHub Subscribe", async () => {
    const subscribeLinkSelector = "div footer .col-12 > div > a";
    await page.waitForSelector(subscribeLinkSelector);
    await page.click(subscribeLinkSelector);
    await page.waitForTimeout(1000);
    const titleSubscribe = "#hero-section-brand-heading";
    await page.waitForSelector(titleSubscribe);
    const actual = await page.$eval(titleSubscribe, (el) => el.textContent);
    const expected = "Subscribe to our developer newsletter";
    expect(actual).toEqual(expected);
  }, 10000);
});

test("GitHub Actions Test", async () => {
  const actionsLinkSelector = "div:nth-child(1) > card-skew a";
  await page.focus(actionsLinkSelector);
  await page.click(actionsLinkSelector);
  const getStartedLinkActions = ".application-main .position-relative > a";
  await page.waitForSelector(getStartedLinkActions, {
    visible: true,
  });
  await page.waitForTimeout(4000);
  await await page.click(getStartedLinkActions);
  const title = "#title-h1";
  await page.waitForSelector(title);
  await page.waitForTimeout(1000);
  const actualOriginal = await page.$eval(title, (el) => el.textContent);
  const actual = actualOriginal.trim();
  const expected = "Документация по GitHub Actions";
  await page.waitForTimeout(1000);
  expect(actual).toEqual(expected);
}, 15000);
