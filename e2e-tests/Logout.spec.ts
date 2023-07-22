import { expect, test } from "@playwright/test";
test("Logging out", async ({ page }) => {
  await page.goto('https://famtime3-1a013.web.app/');
  await page.getByRole('link', { name: 'Sign In' }).click();
  await page.getByLabel('Email Address *').click();
  await page.getByLabel('Email Address *').fill('test@gmail.com');
  await page.getByLabel('Password *').click();
  await page.getByLabel('Password *').fill('123456');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('button', { name: 'Log Out' }).click();
  const welcome =  page.getByRole('heading', { name: 'FamTime' })
  expect(welcome).toBeTruthy();
});
