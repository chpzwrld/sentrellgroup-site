const { test, expect } = require('@playwright/test');
const URL = '/training/ai-small-business/';

test('visitor can read offer and reach discovery-call action', async ({page}) => {
  const pageErrors = [];
  page.on('pageerror', err => pageErrors.push(err.message));
  await page.goto(URL);
  await expect(page.getByRole('heading', {name: /get five hours back in your week/i})).toBeVisible();
  await expect(page.getByRole('link', {name: /request a discovery call/i}).first()).toHaveAttribute('href', /mailto:info@sentrellgroup.com\?subject=.*Discovery/);
  await expect(page.getByRole('heading', {name:/experience the lesson/i})).toBeVisible();
  expect(pageErrors).toEqual([]);
});
test('guided prompt builder works for both supported assistants', async ({page}) => {
  await page.goto(URL);
  await page.getByRole('button', {name:/build a prompt/i}).click();
  await page.locator('#goal').fill('Draft a clear invoice follow-up');
  await expect(page.locator('#prompt-output')).toContainText('Draft a clear invoice follow-up');
  await expect(page.getByRole('link', {name:/open microsoft 365 copilot/i})).toHaveAttribute('href', 'https://m365.cloud.microsoft/chat');
  await expect(page.getByRole('link', {name:/open chatgpt/i})).toHaveAttribute('href','https://chatgpt.com/');
});
test('learner detects false commitments and preserved restrictions', async ({page}) => {
  await page.goto(URL);
  await page.getByRole('button', {name:/customer reply/i}).click();
  await page.getByRole('radio', {name:/your estimate is ready/i}).check();
  await page.getByRole('button', {name:/check my answer/i}).click();
  await expect(page.locator('#reply-feedback')).toContainText(/correct/i);
  await page.getByRole('button', {name:/spot the error/i}).click();
  await page.getByRole('radio', {name:/FAQ: Maya by Friday/i}).check();
  await page.getByRole('button', {name:/check my answer/i}).click();
  await expect(page.locator('#source-feedback')).toContainText(/correct/i);
  await page.getByRole('button', {name:/your next move/i}).click();
  await expect(page.locator('#quiz-score')).toHaveText(/2 of 2/);
});
test('time savings calculator uses reviewed completion time', async ({page}) => {
  await page.goto(URL);
  await page.getByRole('button', {name:/measure savings/i}).click();
  await expect(page.locator('#saved-hours')).toHaveText('3.22');
  await page.locator('#a1').fill('12');
  await page.locator('#a2').fill('35');
  await page.locator('#a3').fill('20');
  await expect(page.locator('#saved-hours')).toHaveText('0.00');
  await page.locator('#a1').fill('13');
  await expect(page.locator('#saved-hours')).toHaveText('-0.20');
  await expect(page.locator('#calc-warning')).toContainText('exceeds baseline');
});
test('mobile loads at page top and layout has no horizontal overflow', async ({page}) => {
  await page.setViewportSize({width:375,height:812});
  await page.goto(URL);
  await expect(page.getByRole('heading', {name:/get five hours back in your week/i})).toBeVisible();
  const scrollY = await page.evaluate(() => window.scrollY);
  expect(scrollY).toBe(0);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  await page.getByRole('link',{name:/try the free lesson preview/i}).click();
  await expect(page.getByRole('heading',{name:/start with a mission/i})).toBeVisible();
});
test('evidence and privacy statements are transparent', async ({page}) => {
  await page.goto(URL);
  await expect(page.getByText(/aspirational target/i)).toBeVisible();
  await expect(page.getByText(/No AI API, analytics script/i)).toBeVisible();
  await page.getByRole('link',{name:/host a live workshop/i}).click();
  await expect(page.getByRole('heading',{name:/complete workshop your audience/i})).toBeVisible();
});


test('capture desktop and mobile visual review images', async ({page}) => {
  await page.setViewportSize({width:1440,height:900});
  await page.goto(URL);
  await expect(page.locator('.hero')).toBeVisible();
  await page.screenshot({path:'test-results/desktop-full.png',fullPage:true,animations:'disabled'});
  await page.setViewportSize({width:390,height:844});
  await page.reload();
  await page.screenshot({path:'test-results/mobile-full.png',fullPage:true,animations:'disabled'});
  const excess = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(excess).toBeLessThanOrEqual(1);
});
