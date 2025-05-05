import { test, expect } from "@playwright/test";

const { email, password } = require("..//user.js");
const { wrong_email, wrong_password } = require("..//user.js");

test("Успешная авторизация", async ({ page }) => {
  let i = 0;
  await page.goto("https://netology.ru/");
  await page.screenshot({ path: "screens//screenshot_succ" + i + ".png" });
  i++;
  await page.getByRole("link", { name: "Войти" }).click();
  await page.screenshot({ path: "screens//screenshot_succ" + i + ".png" });
  i++;
  await page.getByRole("textbox", { name: "Email" }).click();
  await page.getByRole("textbox", { name: "Email" }).fill(email);
  await page.getByRole("textbox", { name: "Пароль" }).click();
  await page.getByRole("textbox", { name: "Пароль" }).fill(password);
  await page.getByTestId("login-submit-btn").click();
  await expect(page.locator("h2")).toContainText("Моё обучение");
  await page.screenshot({ path: "screens//screenshot_succ" + i + ".png" });
  i++;
});

test("Неуспешная авторизация", async ({ page }) => {
  let i = 0;
  await page.goto("https://netology.ru/");
  await page.screenshot({ path: "screens//screenshot_unsucc" + i + ".png" });
  i++;
  await page.getByRole("link", { name: "Войти" }).click();
   await page.screenshot({ path: "screens//screenshot_unsucc" + i + ".png" });
  i++;
  await page.getByRole("textbox", { name: "Email" }).click();
  await page.getByRole("textbox", { name: "Email" }).fill(wrong_email);
  await page.screenshot({ path: "screens//screenshot_unsucc" + i + ".png" });
  i++;
  await page.getByRole("textbox", { name: "Пароль" }).click();
  await page.getByRole("textbox", { name: "Пароль" }).fill(wrong_password);
  await page.screenshot({ path: "screens//screenshot_unsucc" + i + ".png" });
  i++;
  await page.getByTestId("login-submit-btn").click();
  await page.screenshot({ path: "screens//screenshot_unsucc" + i + ".png" });
  i++;
  await expect(page.getByTestId("login-error-hint")).toBeVisible();
  await expect(page.getByTestId("login-error-hint")).toContainText(
      "Вы ввели неправильно логин или пароль."
    );
});
