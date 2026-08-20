import { chromium } from "@playwright/test";

export type LoginTestResult = {
  passed: boolean;
  message: string;
  duration: number;
};

export async function runLoginTest(
  websiteUrl: string,
): Promise<LoginTestResult> {
  const startTime = Date.now();

  let browser;

  try {
    browser = await chromium.launch({
      headless: true,
    });

    const page = await browser.newPage();

    await page.goto(websiteUrl, {
      waitUntil: "domcontentloaded",
      timeout: 15000,
    });

    const emailField = page.getByLabel("Email");

    const passwordField =
      page.getByLabel("Password");

    const loginButton =
      page.getByRole("button", {
        name: /login/i,
      });

    await emailField.waitFor({
      state: "visible",
      timeout: 5000,
    });

    await passwordField.waitFor({
      state: "visible",
      timeout: 5000,
    });

    await loginButton.waitFor({
      state: "visible",
      timeout: 5000,
    });

    return {
      passed: true,
      message:
        "Login page detected successfully. Email, password and Login controls were found.",
      duration: Date.now() - startTime,
    };
  } catch (error) {
    return {
      passed: false,
      message:
        error instanceof Error
          ? error.message
          : "The Playwright test failed.",
      duration: Date.now() - startTime,
    };
  } finally {
    await browser?.close();
  }
}