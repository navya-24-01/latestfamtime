import {test, expect} from "@playwright/test"

test("user is able to sign up", async ({page}) => {
    await page.goto("https://famtime3-1a013.web.app/");
    await page.getByRole("link", { name: "Sign Up!" }).click();
    await page.getByLabel("Email Address *").click();
    await page.getByLabel("Email Address *").fill("test@gmail.com");
    await page.getByLabel("Password *").click();
    await page.getByLabel("Password *").fill("123456");
    await page.locator('input[name="confirmpassword"]').click();
    await page.locator('input[name="confirmpassword"]').fill("123456");
    await page.getByRole("button", { name: "Sign Up" }).click();
    const signuppage =  page.locator("html");
    await expect(signuppage).toContainText(
      "Firebase: Error (auth/email-already-in-use)"
    );
})

test("user is not able to sign up with the same email again", async ({ page }) => {
  await page.goto("https://famtime3-1a013.web.app/");
  await page.getByRole("link", { name: "Sign Up!" }).click();
  await page.getByLabel("Email Address *").click();
  await page.getByLabel("Email Address *").fill("test@gmail.com");
  await page.getByLabel("Password *").click();
  await page.getByLabel("Password *").fill("123456");
  await page.locator('input[name="confirmpassword"]').click();
  await page.locator('input[name="confirmpassword"]').fill("123456");
  await page.getByRole("button", { name: "Sign Up" }).click();
  const signuppage = page.locator("html");
  await expect(signuppage).toContainText(
    "Firebase: Error (auth/email-already-in-use)"
  );
});

test("user is not able to sign up a password of less than 6 characters", async ({
  page,
}) => {
  await page.goto("https://famtime3-1a013.web.app/");
  await page.getByRole("link", { name: "Sign Up!" }).click();
  await page.getByLabel("Email Address *").click();
  await page.getByLabel("Email Address *").fill("test@gmail.com");
  await page.getByLabel("Password *").click();
  await page.getByLabel("Password *").fill("12345");
  await page.locator('input[name="confirmpassword"]').click();
  await page.locator('input[name="confirmpassword"]').fill("12345");
  await page.getByRole("button", { name: "Sign Up" }).click();
  const signuppage = page.locator("html");
  await expect(signuppage).toContainText(
    "Firebase: Password should be at least 6 characters (auth/weak-password)"
  );
});

test("user is not able to sign up a if password and confirm password field don't match", async ({
  page,
}) => {
  await page.goto("https://famtime3-1a013.web.app/");
  await page.getByRole("link", { name: "Sign Up!" }).click();
  await page.getByLabel("Email Address *").click();
  await page.getByLabel("Email Address *").fill("test@gmail.com");
  await page.getByLabel("Password *").click();
  await page.getByLabel("Password *").fill("123456");
  await page.locator('input[name="confirmpassword"]').click();
  await page.locator('input[name="confirmpassword"]').fill("1234567");
  await page.getByRole("button", { name: "Sign Up" }).click();
  const signuppage = page.locator("html");
  await expect(signuppage).toContainText("Passwords do not match");
});

test("user is not able to sign up with an invalid email address", async ({
  page,
}) => {
  await page.goto("https://famtime3-1a013.web.app/");
  await page.getByRole("link", { name: "Sign Up!" }).click();
  await page.getByLabel("Email Address *").click();
  await page.getByLabel("Email Address *").fill("test@gmail.");
  await page.getByLabel("Password *").click();
  await page.getByLabel("Password *").fill("123456");
  await page.locator('input[name="confirmpassword"]').click();
  await page.locator('input[name="confirmpassword"]').fill("123456");
  await page.getByRole("button", { name: "Sign Up" }).click();
  const signuppage = page.locator("html");
  await expect(signuppage).toContainText(
    "Firebase: Error (auth/invalid-email)"
  );
});