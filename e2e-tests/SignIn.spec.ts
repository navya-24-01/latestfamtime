import {test, expect} from "@playwright/test"

test("Signing in using a correct Email Address and password combination", async ({
  page,
}) => {
  await page.goto("https://famtime3-1a013.web.app/");
  await page.getByRole("link", { name: "Sign In" }).click();
  await page.getByLabel("Email Address *").fill("test@gmail.com");
  await page.getByLabel("Password *").fill("123456");
  await page.getByRole("button", { name: "Sign In" }).click();
  await page.goto("https://famtime3-1a013.web.app/profilepage");
  await page.goto("https://famtime3-1a013.web.app/familymenu");
  const welcome =  page.getByRole('heading', { name: 'Welcome Back To FamTime' });
  expect(welcome).toBeTruthy();
});

test(
"Attempt signing in using an incorrect Email Address and password combination", async ({ page }) => {
  await page.goto("https://famtime3-1a013.web.app/");
  await page.getByRole("link", { name: "Sign In" }).click();
  await page.getByLabel("Email Address *").fill("test@gmail.com");
  await page.getByLabel("Password *").fill("1234567");
  await page.getByRole("button", { name: "Sign In" }).click();
  const signinpage= page.locator("html");
  await expect(signinpage).toContainText(
    "Firebase: Error (auth/wrong-password)"
  );
});

 