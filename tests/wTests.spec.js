import { test, expect } from "@playwright/test";

const { email, password } = require("..//user.js");
const { wrong_email, wrong_password } = require("..//user.js");

test("Успешная авторизация", async ({ page }) => {
  await page.goto("https://netology.ru/");
  await page.getByRole("link", { name: "Войти" }).click();
  await page.getByRole("textbox", { name: "Email" }).click();
  await page.getByRole("textbox", { name: "Email" }).fill(email);
  await page.getByRole("textbox", { name: "Пароль" }).click();
  await page.getByRole("textbox", { name: "Пароль" }).fill(password);
  await page.getByTestId("login-submit-btn").click();
  await expect(page.locator("h2")).toContainText("Моё обучение");
});

test("Неуспешная авторизация", async ({ page }) => {
  await page.goto("https://netology.ru/");
  await page.getByRole("link", { name: "Войти" }).click();
  await page.getByRole("textbox", { name: "Email" }).click();
  await page.getByRole("textbox", { name: "Email" }).fill(email);
  await page.getByRole("textbox", { name: "Пароль" }).click();
  await page.getByRole("textbox", { name: "Пароль" }).fill(wrong_password);
  await page.getByTestId("login-submit-btn").click();
  await expect(page.getByTestId("login-error-hint")).toBeVisible();
  await expect(page.getByTestId("login-error-hint")).toContainText(
      "Вы ввели неправильно логин или пароль."
    );
});
