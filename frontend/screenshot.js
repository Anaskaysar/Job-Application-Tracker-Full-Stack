import puppeteer from 'puppeteer';
import path from 'path';

const SCREENSHOT_DIR = path.resolve('../docs/screenshots');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport to a typical desktop size
  await page.setViewport({ width: 1280, height: 800 });

  console.log('Navigating to login...');
  await page.goto('http://localhost:5173/login', { waitUntil: 'networkidle0' });

  // I assume there's a login form, need to figure out credentials.
  // For now I'm going to just try to take a screenshot of login if we can't get in,
  // or maybe use an existing token? Let's try creating a test user first via django shell.
  // We'll update this script. First let's just capture the login page to see if it works.
  
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'login.png') });
  console.log('Login page screenshot saved.');
  
  await browser.close();
})();
