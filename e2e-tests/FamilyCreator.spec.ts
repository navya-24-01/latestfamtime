import { test, expect } from "@playwright/test";

test("Creating a family with a valid name", async ({ page }) => {
  await page.goto("https://famtime3-1a013.web.app/");
  await page.getByRole("link", { name: "Sign In" }).click();
  await page.getByLabel("Email Address *").click();
  await page.getByLabel("Email Address *").click();
  await page.getByLabel("Email Address *").fill("test@gmail.com");
  await page.getByLabel("Password *").click();
  await page.getByLabel("Password *").fill("123456");
  await page.getByRole("button", { name: "Sign In" }).click();
  await page.getByRole("heading", { name: "Welcome Back To FamTime" });
  await page.getByRole("button", { name: "Create a new family" }).click();
  await page.getByLabel("familyname *").click();
  await page.getByLabel("familyname *").press("CapsLock");
  await page.getByLabel("familyname *").fill("T");
  await page.getByLabel("familyname *").press("CapsLock");
  await page.getByLabel("familyname *").fill("Test ");
  await page.getByLabel("familyname *").press("CapsLock");
  await page.getByLabel("familyname *").fill("Test F");
  await page.getByLabel("familyname *").press("CapsLock");
  await page.getByLabel("familyname *").fill("Test Family");
  await page.getByRole("button", { name: "Save" }).click();
  const family = page.getByText("Test Family");
  expect(family).not.toBeNull();
});

test("Creating a family with an empty string", async ({ page }) => {
  await page.goto("https://famtime3-1a013.web.app/");
  await page.getByRole("link", { name: "Sign In" }).click();
  await page.getByLabel("Email Address *").click();
  await page.getByLabel("Email Address *").click();
  await page.getByLabel("Email Address *").fill("test@gmail.com");
  await page.getByLabel("Password *").click();
  await page.getByLabel("Password *").fill("123456");
  await page.getByRole("button", { name: "Sign In" }).click();
  await page.getByRole("heading", { name: "Welcome Back To FamTime" });
  await page.getByRole("button", { name: "Create a new family" }).click();
  await page.getByLabel("familyname *").fill("");
  await page.getByRole("button", { name: "Save" }).click();
  const dialog = page.locator("div").filter({
    hasText: "Family has been created!",
  });
  expect(dialog).toBeFalsy;
});
