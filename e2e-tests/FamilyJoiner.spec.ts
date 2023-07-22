import { test, expect } from "@playwright/test";

test("Joining a family the user is already a part of", async ({ page }) => {
  await page.goto("https://famtime3-1a013.web.app/");
  await page.getByRole("link", { name: "Sign In" }).click();
  await page.getByLabel("Email Address *").click();
  await page.getByLabel("Email Address *").click();
  await page.getByLabel("Email Address *").fill("test@gmail.com");
  await page.getByLabel("Password *").click();
  await page.getByLabel("Password *").fill("123456");
  await page.getByRole("button", { name: "Sign In" }).click();
  await page.getByRole("heading", { name: "Welcome Back To FamTime" });
  await page.getByRole("button", { name: "Join a new family" }).click();
  await page
    .getByLabel("familycode *")
    .fill("260bc8d4-70a6-46d2-8e16-3a33bddbf774");
  await page.getByRole("button", { name: "Enter" }).click();
  const message = page.getByText(" You are already a part of this family!");
  expect(message).toBeTruthy();
});

test("Joining a family with an empty string", async ({ page }) => {
  await page.goto("https://famtime3-1a013.web.app/");
  await page.getByRole("link", { name: "Sign In" }).click();
  await page.getByLabel("Email Address *").click();
  await page.getByLabel("Email Address *").click();
  await page.getByLabel("Email Address *").fill("test@gmail.com");
  await page.getByLabel("Password *").click();
  await page.getByLabel("Password *").fill("123456");
  await page.getByRole("button", { name: "Sign In" }).click();
  await page.getByRole("heading", { name: "Welcome Back To FamTime" });
  await page.getByRole("button", { name: "Join a new family" }).click();
  await page
    .getByLabel("familycode *")
    .fill("");
  await page.getByRole("button", { name: "Enter" }).click();
  const message = page.getByText("Please enter a family code!");
  expect(message).toBeTruthy();
});

test("Joining a family with an incorrect family code", async ({ page }) => {
  await page.goto("https://famtime3-1a013.web.app/");
  await page.getByRole("link", { name: "Sign In" }).click();
  await page.getByLabel("Email Address *").click();
  await page.getByLabel("Email Address *").click();
  await page.getByLabel("Email Address *").fill("test@gmail.com");
  await page.getByLabel("Password *").click();
  await page.getByLabel("Password *").fill("123456");
  await page.getByRole("button", { name: "Sign In" }).click();
  await page.getByRole("heading", { name: "Welcome Back To FamTime" });
  await page.getByRole("button", { name: "Join a new family" }).click();
  await page.getByLabel("familycode *").fill("no code");
  await page.getByRole("button", { name: "Enter" }).click();
  const message = page.getByText("Family does not exist!");
  expect(message).toBeTruthy();
});

