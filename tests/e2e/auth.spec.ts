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
  await expect(page).toHaveTitle("Login | Photo Journal");
  await expect(
    page.getByRole("complementary", { name: "Independent demo notice" }),
  ).toBeVisible();
  await expect(
    page.getByText("Use an account created for Photo Journal.", {
      exact: false,
    }),
  ).toBeVisible();
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
    scale: "css",
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
    scale: "css",
  });

  await page.getByRole("link", { name: "Create new account" }).click();
  await expect(page).toHaveURL(/\/sign-up$/);
  await expect(
    page.getByRole("heading", {
      name: "Create your Photo Journal demo account.",
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
    scale: "css",
  });
  await page.getByRole("link", { name: "Log in", exact: true }).click();
  await expect(page).toHaveURL("/");
  expect(errors).toEqual([]);
});

test("project information is readable without JavaScript or authentication", async ({
  browser,
}, testInfo) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: testInfo.project.use.viewport,
  });
  const page = await context.newPage();
  await page.goto("/about");
  await expect(page).toHaveTitle("About this demo | Photo Journal");
  await expect(
    page.getByRole("heading", { name: "About this demo", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("Never enter your Instagram password here.", {
      exact: false,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "source repository", exact: true }),
  ).toHaveAttribute(
    "href",
    "https://github.com/PerrySmithMoss/instagram-clone",
  );
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth + 1,
    ),
  ).toBe(true);
  await page.screenshot({
    path: testInfo.outputPath("about.png"),
    fullPage: true,
    scale: "css",
  });
  await page.getByRole("link", { name: "Back to Photo Journal" }).click();
  await expect(
    page.getByRole("complementary", { name: "Independent demo notice" }),
  ).toBeVisible();
  await context.close();
});

for (const path of ["/", "/sign-up"]) {
  test(`keyboard submission at ${path} sends credentials only to Firebase Authentication`, async ({
    page,
  }) => {
    const password = "qa-only-unique-password";
    const credentialRequests: string[] = [];
    page.on("request", (request) => {
      if (request.postData()?.includes(password))
        credentialRequests.push(request.url());
    });
    await page.goto(path);
    await page.getByLabel("email", { exact: true }).fill("qa@example.com");
    if (path === "/sign-up") {
      await page.getByLabel("display name", { exact: true }).fill("QA Demo");
      await page.getByLabel("username", { exact: true }).fill("qa-demo");
    }
    await page.getByLabel("password", { exact: true }).fill(password);
    await page.getByLabel("password", { exact: true }).press("Enter");
    await expect(
      page.getByRole("alert").filter({
        hasText:
          path === "/" ? "Log in failed." : "Could not create your account.",
      }),
    ).toBeVisible();
    expect(credentialRequests).toHaveLength(1);
    const destination = new URL(credentialRequests[0]);
    expect(destination.origin).toBe("https://identitytoolkit.googleapis.com");
    expect(destination.pathname).toBe(
      path === "/" ? "/v1/accounts:signInWithPassword" : "/v1/accounts:signUp",
    );
    await expect(page).toHaveURL(path);
  });
}

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
