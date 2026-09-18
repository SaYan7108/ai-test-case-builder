# AI-Generated Test Cases — Login Functionality (saucedemo.com)

**Prompt given to AI tool (e.g. ChatGPT / Claude):**
> "Generate 5 test cases for the login functionality of https://www.saucedemo.com.
> Cover positive, negative, and edge cases. Include test case ID, title,
> preconditions, steps, test data, and expected result."

**AI output (copy/pasted, lightly reformatted into a table for readability):**

---

## TC_LOGIN_01 — Successful login with valid standard user

| Field | Detail |
|---|---|
| **Preconditions** | Browser open, navigated to `https://www.saucedemo.com` |
| **Test Data** | Username: `standard_user`, Password: `secret_sauce` |
| **Steps** | 1. Enter username `standard_user`<br>2. Enter password `secret_sauce`<br>3. Click "Login" button |
| **Expected Result** | User is redirected to the Products (inventory) page, URL contains `/inventory.html`, and the page header "Products" is visible |

---

## TC_LOGIN_02 — Login attempt with locked-out user

| Field | Detail |
|---|---|
| **Preconditions** | Browser open, navigated to login page |
| **Test Data** | Username: `locked_out_user`, Password: `secret_sauce` |
| **Steps** | 1. Enter username `locked_out_user`<br>2. Enter password `secret_sauce`<br>3. Click "Login" |
| **Expected Result** | Login is blocked. Error message displayed: "Epic sadface: Sorry, this user has been locked out." |

---

## TC_LOGIN_03 — Login with invalid/incorrect password

| Field | Detail |
|---|---|
| **Preconditions** | Browser open, navigated to login page |
| **Test Data** | Username: `standard_user`, Password: `wrong_password` |
| **Steps** | 1. Enter username `standard_user`<br>2. Enter incorrect password<br>3. Click "Login" |
| **Expected Result** | Login fails. Error message: "Epic sadface: Username and password do not match any user in this service" |

---

## TC_LOGIN_04 — Login with empty username and password fields

| Field | Detail |
|---|---|
| **Preconditions** | Browser open, navigated to login page |
| **Test Data** | Username: *(blank)*, Password: *(blank)* |
| **Steps** | 1. Leave username field empty<br>2. Leave password field empty<br>3. Click "Login" |
| **Expected Result** | Login fails. Error message: "Epic sadface: Username is required" |

---

## TC_LOGIN_05 — Login with valid username but empty password

| Field | Detail |
|---|---|
| **Preconditions** | Browser open, navigated to login page |
| **Test Data** | Username: `standard_user`, Password: *(blank)* |
| **Steps** | 1. Enter username `standard_user`<br>2. Leave password field empty<br>3. Click "Login" |
| **Expected Result** | Login fails. Error message: "Epic sadface: Password is required" |

---

### Notes on AI-generated cases
- The AI proposed a 6th case (SQL-injection-style input in the username field). It was excluded
  from automation scope for this assignment since saucedemo.com is a static demo app with no real
  backend auth layer to meaningfully validate injection handling — kept as a "nice to have" below.

### Additional case suggested by AI (not automated)
- **TC_LOGIN_06** — Login with `problem_user`: app should log in successfully but is known to have
  broken product images (useful as an exploratory/visual-regression case, out of scope here).
