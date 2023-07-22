import { test, expect } from "@playwright/test";

test("Entering the family docs", async ({ page }) => {
  await page.goto("https://famtime3-1a013.web.app/");
  await page.getByRole("link", { name: "Sign In" }).click();
  await page.getByLabel("Email Address *").click();
  await page.getByLabel("Email Address *").fill("test@gmail.com");
  await page.getByLabel("Password *").click();
  await page.getByLabel("Password *").fill("123456");
  await page.getByRole("button", { name: "Sign In" }).click();
  await page.getByRole("button", { name: "Enter Family" }).nth(1).click();
  await page.getByRole("button", { name: "Enter Family Docs" }).click();
  const familydocs = page.locator("html");
  await expect(familydocs).toContainText("FamilyDocs")
});

test("Creating a new document", async ({ page }) => {
  await page.goto("https://famtime3-1a013.web.app/");
  await page.getByRole("link", { name: "Sign In" }).click();
  await page.getByLabel("Email Address *").click();
  await page.getByLabel("Email Address *").fill("test@gmail.com");
  await page.getByLabel("Password *").click();
  await page.getByLabel("Password *").fill("123456");
  await page.getByRole("button", { name: "Sign In" }).click();
  await page.getByRole("button", { name: "Enter Family" }).nth(1).click();
  await page.getByRole("button", { name: "Enter Family Docs" }).click();
  await page.getByRole("button", { name: "Add a Document" }).click();
  await page.getByPlaceholder("Add a Title...").click();
  await page.getByPlaceholder("Add a Title...").fill("Docs by test");
  await page.getByRole("button", { name: "Add a Document" }).click();
  const familydocs = page.locator("html");
  await expect(familydocs).toContainText("Docs by test");
});

test("Entering and editing a document", async ({ page }) => {
  await page.goto("https://famtime3-1a013.web.app/");
  await page.getByRole("link", { name: "Sign In" }).click();
  await page.getByLabel("Email Address *").click();
  await page.getByLabel("Email Address *").fill("test@gmail.com");
  await page.getByLabel("Password *").click();
  await page.getByLabel("Password *").fill("123456");
  await page.getByRole("button", { name: "Sign In" }).click();
  await page.getByRole("button", { name: "Enter Family" }).nth(1).click();
  await page.getByRole("button", { name: "Enter Family Docs" }).click();
  await page.getByRole("img", { name: "familydoc" }).nth(3).click();
  await page.locator(".ql-editor").fill("I am editing");
  await page.getByRole("button", { name: "Go Back" }).click();
  const familydocs = page.locator("html");
  await expect(familydocs).toContainText("I am editing");
});

test("Entering and editing a document made by another user", async ({ page }) => {
   await page.goto("https://famtime3-1a013.web.app/");
   await page.getByRole("link", { name: "Sign In" }).click();
   await page.getByLabel("Email Address *").click();
   await page.getByLabel("Email Address *").fill("test@gmail.com");
   await page.getByLabel("Password *").click();
   await page.getByLabel("Password *").fill("123456");
   await page.getByRole("button", { name: "Sign In" }).click();
   await page.getByRole("button", { name: "Enter Family" }).nth(1).click();
   await page.getByRole("button", { name: "Enter Family Docs" }).click();
   await page.getByRole("img", { name: "familydoc" }).nth(1).click();
   await page.locator(".ql-editor").fill("hi i am test 1");
   await page.getByRole("button", { name: "Go Back" }).click();
   const familydocs = page.locator("html");
   await expect(familydocs).toContainText("hi i am test 1");
});