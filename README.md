# AI-Generated Test Case Builder + Script Execution

**Target application:** [saucedemo.com](https://www.saucedemo.com) — login functionality
**Automation framework:** Playwright (JavaScript), Page Object Model
**AI tool used for test design:** Claude

---

## 1. AI-Generated Test Cases

Full test cases (AI output, copy/pasted) are in [`test-cases/login-test-cases.md`](./test-cases/login-test-cases.md).

Summary of the 5 cases generated:

| ID | Title | Type |
|---|---|---|
| TC_LOGIN_01 | Successful login with valid standard user | Positive |
| TC_LOGIN_02 | Login attempt with locked-out user | Negative |
| TC_LOGIN_03 | Login with invalid/incorrect password | Negative |
| TC_LOGIN_04 | Login with empty username and password | Edge / validation |
| TC_LOGIN_05 | Login with valid username, empty password | Edge / validation |

## 2. Automated Script

All 5 cases were automated (only 1 was required) to demonstrate the page object scales cleanly
across positive, negative, and edge-case flows:

- [`pages/LoginPage.js`](./pages/LoginPage.js) — Page Object encapsulating locators and actions for the login page.
- [`tests/login.spec.js`](./tests/login.spec.js) — Playwright spec file automating TC_LOGIN_01 through TC_LOGIN_05.

## 3. Execution Steps

```bash
# 1. Install dependencies
npm install

# 2. Install Playwright browsers
npx playwright install --with-deps chromium

# 3. Run the tests
npm test

# 4. (Optional) run in headed mode to watch the browser
npm run test:headed

# 5. View the HTML report
npm run report
```

**Requirements:** Node.js 18+.

## 4. How AI Helped Test Design

This is the core reasoning piece for the assignment:

- **Coverage breadth, faster.** Rather than writing test cases from a blank page, I described the
  feature ("login functionality of saucedemo.com") to the AI and got a first draft covering
  positive, negative, and edge/validation paths in under a minute. That draft became the checklist
  I refined, rather than something I had to invent from scratch.
- **Caught an edge case I'd have likely skipped.** Empty-password-with-valid-username
  (TC_LOGIN_05) is a case I probably would have batched together with the
  empty-username-and-password case. The AI treated them as separate cases because saucedemo
  returns a *different* error message for each ("Username is required" vs "Password is required"),
  which is actually the more useful granularity for catching a real regression (e.g. if only one
  of the two validation messages broke).
- **Surfaced a domain-specific case from its own knowledge.** The AI knew saucedemo.com ships a
  `locked_out_user` test account specifically to exercise the account-lockout flow (TC_LOGIN_02) —
  that's app-specific trivia I'd have had to discover by reading the site's source/docs myself.
- **Also proposed cases I deliberately excluded**, and said so in the notes: a SQL-injection-style
  input case, and a `problem_user` visual-bug case. I kept the reasoning transparent in
  `test-cases/login-test-cases.md` rather than silently dropping them — a static demo app with no
  real backend doesn't meaningfully validate injection handling, and the `problem_user` case is a
  visual/exploratory check, not really a login-logic assertion.
- **What the AI did *not* do:** it didn't write the automation code. I built the Page Object and
  Playwright assertions myself, mapping each AI-authored expected result (e.g. specific error
  message text, URL after login) directly into an `expect()` — so the test design came from AI
  assistance, but the implementation and the decision of what to assert on is my own.

## 5. Repo Structure

```
ai-test-case-builder/
├── README.md
├── package.json
├── playwright.config.js
├── pages/
│   └── LoginPage.js
├── tests/
│   └── login.spec.js
└── test-cases/
    └── login-test-cases.md
```
