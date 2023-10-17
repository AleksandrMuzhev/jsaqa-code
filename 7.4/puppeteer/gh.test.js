let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://github.com/team");
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  jest.setTimeout(10000);
  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
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
    expect(actual).toEqual(expected);
  });

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
