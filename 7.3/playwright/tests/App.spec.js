const { test, expect } = require("@playwright/test");
const { email, password } = require("../user.js");
const { describe } = require("node:test");

describe("Authorization", async ({ page }) => {
  test("Success Authorization", async ({ page }) => {
    const mail =
      "#__next > div:nth-child(2) > div > div > div.modal_container__yO5GZ > div.modal_content__Flhjj > div.styles_root__l6N51 > div > form > div:nth-child(1) > input[type=email]";
    const security =
      "#__next > div:nth-child(3) > div > div > div.modal_container__yO5GZ > div.modal_content__Flhjj > div.styles_root__l6N51 > div > form > div:nth-child(3) > input";
    const button =
      "#__next > div:nth-child(3) > div > div > div.modal_container__yO5GZ > div.modal_content__Flhjj > div.styles_root__l6N51 > div > form > button";
    await page.goto("https://netology.ru/?modal=sign_in");
    await page.fill(mail, email);
    await page.fill(security, password);
    await page.click(button);
    const profile = "https://netology.ru/profile";
    await expect(page).toHaveURL(profile);
    const h2 =
      "#app > div.src-LMS-containers-Layout--root--_7tuL.src-LMS-containers-Layout--inner--Vmi8T.src-LMS-containers-Layout--mobile--y2_ce > section > div.src-components-pages-Profile--root--GZ5Xm > div.src-components-layouts-ProfileTemplates-WrapTemplate--wrap--zrXel.src-components-layouts-ProfileTemplates-WrapTemplate--mobile--buwI5 > div > div > div.src-components-pages-Profile-Programs--root--kF8uD > div.src-components-pages-Profile-Programs--heading--vVw3p > h2";
    await page.waitForSelector(h2);
    const title = await page.$eval(h2, (element) => element.textContent);
    const expectedTitle = "Моё обучение";
    expect(title).toBe(expectedTitle);
  });
  test("Failed Authorization", async ({ page }) => {
    const mail =
      "#__next > div:nth-child(2) > div > div > div.modal_container__yO5GZ > div.modal_content__Flhjj > div.styles_root__l6N51 > div > form > div:nth-child(1) > input[type=email]";
    const security =
      "#__next > div:nth-child(3) > div > div > div.modal_container__yO5GZ > div.modal_content__Flhjj > div.styles_root__l6N51 > div > form > div:nth-child(3) > input";
    const button =
      "#__next > div:nth-child(3) > div > div > div.modal_container__yO5GZ > div.modal_content__Flhjj > div.styles_root__l6N51 > div > form > button";
    await page.goto("https://netology.ru/?modal=sign_in");
    await page.fill(mail, "test@123.ru");
    await page.fill(security, "11111");
    await page.click(button);
    const error =
      "#__next > div:nth-child(3) > div > div > div.modal_container__yO5GZ > div.modal_content__Flhjj > div.styles_root__l6N51 > div > form > div.Input_root__VNG5T.Input_size-m__VJJaZ.Input_fluid__Cycj8.Input_error__WgHA7 > div";
    await page.waitForSelector(error, { timeout: 2000 });
    const textError = await page.$eval(error, (element) => element.textContent);
    const expectedText = "Вы ввели неправильно логин или пароль";
    expect(textError).toBe(expectedText);
  });
});
