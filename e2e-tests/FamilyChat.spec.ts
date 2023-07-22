import { test, expect } from '@playwright/test';

test('enter family chat/testcomplete', async ({ page }) => {
    await page.goto('https://famtime3-1a013.web.app/');
    await page.getByRole('link', { name: 'Sign In' }).click();
    await page.getByLabel('Email Address *').click();
    await page.getByLabel('Email Address *').fill('test@gmail.com');
    await page.getByLabel('Password *').click();
    await page.getByLabel('Password *').fill('123456');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.getByRole('button', { name: 'Enter Family' }).first().click();
    await page.getByRole('button', { name: 'Enter Family Chat' }).click();
  
    // Expect to have entered FamilyChat
    const logOutButton = await page.getByRole('button', { name: 'Log Out' });
    expect(logOutButton).not.toBeNull();
  
    const myConversationsDiv = page.locator('div').filter({ hasText: /^My Conversations$/ });
    await expect(myConversationsDiv).toHaveText('My Conversations');
  
    const messageInput = await page.getByPlaceholder('Enter your message');
    expect(messageInput).not.toBeNull();
  
    const familyChatButton = await page.getByRole('button', { name: 'The Family Chat' });
    expect(familyChatButton).not.toBeNull();
  });

  test('enter private chats with other users of the same family/testcomplete', async ({ page }) => {
    await page.goto('https://famtime3-1a013.web.app/');
    await page.getByRole('link', { name: 'Sign In' }).click();
    await page.getByLabel('Email Address *').click();
    await page.getByLabel('Email Address *').fill('test@gmail.com');
    await page.getByLabel('Password *').click();
    await page.getByLabel('Password *').fill('123456');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.getByRole('button', { name: 'Enter Family' }).first().click();
    await page.getByRole('button', { name: 'Enter Family Chat' }).click();
    await page.getByRole('button', { name: 'test user2' }).click();
    await page.getByRole('button', { name: 'test1' }).click();
  
    // Expect to have entered FamilyChat, or any private chat (the buttons available on the screen remain the same)
    const logOutButton = await page.getByRole('button', { name: 'Log Out' });
    expect(logOutButton).not.toBeNull();
  
    const myConversationsDiv = page.locator('div').filter({ hasText: /^My Conversations$/ });
    await expect(myConversationsDiv).toHaveText('My Conversations');
  
    const messageInput = await page.getByPlaceholder('Enter your message');
    expect(messageInput).not.toBeNull();
  
    const familyChatButton = await page.getByRole('button', { name: 'The Family Chat' });
    expect(familyChatButton).not.toBeNull();
  
    const testuser2Button = await page.getByRole('button', { name: 'test user2' });
    expect(testuser2Button).not.toBeNull();
  
    const testuser1Button = await page.getByRole('button', { name: 'test1' });
    expect(testuser1Button).not.toBeNull();
  });

  test('user sending message in the family chat/testcomplete', async ({ page }) => {
    await page.goto('https://famtime3-1a013.web.app/');
    await page.getByRole('link', { name: 'Sign In' }).click();
    await page.getByLabel('Email Address *').click();
    await page.getByLabel('Email Address *').fill('test@gmail.com');
    await page.getByLabel('Password *').click();
    await page.getByLabel('Password *').fill('123456');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.getByRole('button', { name: 'Enter Family' }).first().click();
    await page.getByRole('button', { name: 'Enter Family Chat' }).click();

    // Expect to have entered FamilyChat
    const logOutButton = await page.getByRole('button', { name: 'Log Out' });
    expect(logOutButton).not.toBeNull();
  
    const myConversationsDiv = page.locator('div').filter({ hasText: /^My Conversations$/ });
    await expect(myConversationsDiv).toHaveText('My Conversations');
  
    const messageInput = await page.getByPlaceholder('Enter your message');
    expect(messageInput).not.toBeNull();
  
    const familyChatButton = await page.getByRole('button', { name: 'The Family Chat' });
    expect(familyChatButton).not.toBeNull();

    const testuser2Button = await page.getByRole('button', { name: 'test user2' });
    expect(testuser2Button).not.toBeNull();
  
    const testuser1Button = await page.getByRole('button', { name: 'test1' });
    expect(testuser1Button).not.toBeNull();

    //Entering a new message for FamilyChat
    await page.getByPlaceholder('Enter your message').click();
    await page.getByPlaceholder('Enter your message').fill('Hello everyone. This is test user in the family chat.');
    await page.getByRole('button', { name: 'Send' }).click();
  
    // Expect alert with the given message
    const alertMessage = await page.waitForSelector('div[role="alert"]');
    const alertMessageText = await alertMessage.innerText();
    await expect(alertMessageText).not.toBeNull();
  
  });

  test('view message sent by another user and send a new message/testcomplete', async ({ page }) => {
    await page.goto('https://famtime3-1a013.web.app/');
    await page.getByRole('button', { name: 'Sign In With an Existing Account' }).click();
    await page.getByRole('link', { name: 'Sign In' }).click();
    await page.getByLabel('Email Address *').click();
    await page.getByLabel('Email Address *').fill('test1@gmail.com');
    await page.getByLabel('Password *').click();
    await page.getByLabel('Password *').fill('123456');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.getByRole('button', { name: 'Enter Family' }).nth(1).click();
    await page.getByRole('button', { name: 'Enter Family Chat' }).click();

    //Expect already existing message from another member of the family
    const alertMessageA = await page.waitForSelector('div[role="alert"]');
    const alertMessageAText = await alertMessageA.innerText();
    await expect(alertMessageAText).not.toBeNull();

    //Send a new message to the family chat
    await page.getByPlaceholder('Enter your message').click();
    await page.getByPlaceholder('Enter your message').fill('Hi this is test user1. I can see your message and also respond to it.');
    await page.getByRole('button', { name: 'Send' }).click();
    //await page.getByRole('button', { name: 'Send' }).click();
   
    //Expect message to have been sent
    const alertMessageB = await page.waitForSelector('div[role="alert"]');
    const alertMessageBText = await alertMessageB.innerText();
    await expect(alertMessageBText).not.toBeNull();
  
  });

  test('send private message to a family member/testcomplete', async ({ page }) => {
    await page.goto('https://famtime3-1a013.web.app/');
    await page.getByRole('link', { name: 'Sign In' }).click();
    await page.getByLabel('Email Address *').click();
    await page.getByLabel('Email Address *').fill('test@gmail.com');
    await page.getByLabel('Password *').click();
    await page.getByLabel('Password *').fill('123456');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.getByRole('button', { name: 'Enter Family' }).first().click();
    await page.getByRole('button', { name: 'Enter Family Chat' }).click();
    await page.getByRole('button', { name: 'test1' }).click();

    //Expect to have entered (test and test1)'s private chat
    const logOutButton = await page.getByRole('button', { name: 'Log Out' });
    expect(logOutButton).not.toBeNull();
  
    const myConversationsDiv = page.locator('div').filter({ hasText: /^My Conversations$/ });
    await expect(myConversationsDiv).toHaveText('My Conversations');
  
    const messageInput = await page.getByPlaceholder('Enter your message');
    expect(messageInput).not.toBeNull();
  
    const familyChatButton = await page.getByRole('button', { name: 'The Family Chat' });
    expect(familyChatButton).not.toBeNull();
  
    const testuser2Button = await page.getByRole('button', { name: 'test user2' });
    expect(testuser2Button).not.toBeNull();
  
    const testuser1Button = await page.getByRole('button', { name: 'test1' });
    expect(testuser1Button).not.toBeNull();

    //Send a message in private chat
    await page.getByPlaceholder('Enter your message').click();
    await page.getByPlaceholder('Enter your message').fill('hi test user1');
    await page.getByRole('button', { name: 'Send' }).click();
    //await page.getByPlaceholder('Enter your message').press('Enter');
    
    //Expect the message to get delivered
    const alertMessage = await page.waitForSelector('div[role="alert"]');
    const alertMessageText = await alertMessage.innerText();
    await expect(alertMessageText).not.toBeNull();
  });


  test('view private message from another user and respond to it', async ({ page }) => {
    await page.goto('https://famtime3-1a013.web.app/');
    await page.getByRole('link', { name: 'Sign In' }).click();
    await page.getByLabel('Email Address *').click();
    await page.getByLabel('Email Address *').fill('test1@gmail.com');
    await page.getByLabel('Password *').click();
    await page.getByLabel('Password *').fill('123456');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.getByRole('button', { name: 'Enter Family' }).nth(1).click();
    await page.getByRole('button', { name: 'Enter Family Chat' }).click();
    await page.getByRole('button', { name: 'test', exact: true }).click();

   //Expect to see already existing message in the private chat
    const alertMessageA = await page.waitForSelector('div[role="alert"]');
    const alertMessageAText = await alertMessageA.innerText();
    await expect(alertMessageA).not.toBeNull();

    //Send a new message in (test and test1)'s private chat
    await page.getByPlaceholder('Enter your message').click();
    await page.getByPlaceholder('Enter your message').fill('hi test user. I can view your message and also respond to it.');
    await page.getByRole('button', { name: 'Send' }).click();
    //await page.getByPlaceholder('Enter your message').press('Enter');

    //Expect the message to get delivered
    const alertMessageB = await page.waitForSelector('div[role="alert"]');
    const alertMessageBText = await alertMessageB.innerText();
    await expect(alertMessageB).not.toBeNull();
  });