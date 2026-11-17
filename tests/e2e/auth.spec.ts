import { expect, test } from "@playwright/test";

// Authentication is stubbed: these tests never create accounts or send emails.
test.beforeEach(async ({ page }) => {
  await page.route("https://identitytoolkit.googleapis.com/**", (route) =>
    route.fulfill({
      status: 400,
      contentType: "application/json",
      body: JSON.stringify({
        error: { code: 400, message: "INVALID_LOGIN_CREDENTIALS" },
      }),
    }),
  );
});

test("login, reset, and sign-up navigation work without layout overflow", async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(
    page.getByRole("button", { name: "Log in", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Log in", exact: true }),
  ).toBeDisabled();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth + 1,
    ),
  ).toBe(true);
  await page.screenshot({
    path: testInfo.outputPath("login.png"),
    fullPage: true,
  });

  await page.getByRole("link", { name: "Forgot password?" }).click();
  await expect(page).toHaveURL(/\/accounts\/password\/reset$/);
  await expect(
    page.getByRole("heading", { name: "Trouble logging in?" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Send reset link" }),
  ).toBeDisabled();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth + 1,
    ),
  ).toBe(true);
  await page.screenshot({
    path: testInfo.outputPath("reset.png"),
    fullPage: true,
  });

  await page.getByRole("link", { name: "Create new account" }).click();
  await expect(page).toHaveURL(/\/sign-up$/);
  await expect(
    page.getByRole("heading", {
      name: "Sign up to see photos and videos from your friends.",
    }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth + 1,
    ),
  ).toBe(true);
  await page.screenshot({
    path: testInfo.outputPath("sign-up.png"),
    fullPage: true,
  });
  await page.getByRole("link", { name: "Log in", exact: true }).click();
  await expect(page).toHaveURL("/");
  expect(errors).toEqual([]);
});

test("a missing password disables submission and failed login displays an error", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByLabel("email", { exact: true }).fill("qa@example.com");
  await expect(
    page.getByRole("button", { name: "Log in", exact: true }),
  ).toBeDisabled();
  await page.getByLabel("password", { exact: true }).fill("invalid-password");
  await page.getByRole("button", { name: "Log in", exact: true }).click();
  await expect(
    page.getByRole("alert").filter({ hasText: "Log in failed." }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Log in", exact: true }),
  ).toBeEnabled();
});

test("password reset waits for success and handles server errors", async ({
  page,
}) => {
  let succeed = false;
  await page.route("https://identitytoolkit.googleapis.com/**", (route) =>
    route.fulfill({
      status: succeed ? 200 : 400,
      contentType: "application/json",
      body: succeed
        ? "{}"
        : JSON.stringify({
            error: { code: 400, message: "TOO_MANY_ATTEMPTS_TRY_LATER" },
          }),
    }),
  );
  await page.goto("/accounts/password/reset");
  await page.getByLabel("email", { exact: true }).fill("qa@example.com");
  await page.getByRole("button", { name: "Send reset link" }).click();
  await expect(
    page.getByRole("alert").filter({ hasText: "Could not send a reset link." }),
  ).toHaveText("Could not send a reset link. Please try again.");
  await expect(page.getByRole("heading", { name: "Success!" })).toHaveCount(0);

  succeed = true;
  await page.getByRole("button", { name: "Send reset link" }).click();
  await expect(page.getByRole("heading", { name: "Success!" })).toBeVisible();
  await expect(
    page.getByText(
      "If an account exists for that address, you will receive a password reset link.",
    ),
  ).toBeVisible();
});

for (const path of ["/suggested-people", "/user/qa-user"]) {
  test(`anonymous visitors to ${path} return to login`, async ({ page }) => {
    await page.goto(path);
    await expect(page).toHaveURL("/");
    await expect(
      page.getByRole("button", { name: "Log in", exact: true }),
    ).toBeVisible();
  });
}
