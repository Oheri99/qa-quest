import { useState } from "react";
import "../styles/WebsiteUnderTestScreen.css";

interface WebsiteUnderTestScreenProps {
  onContinue: () => void;
  onBack: () => void;
}

function WebsiteUnderTestScreen({
  onContinue,
  onBack,
}: WebsiteUnderTestScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [emailError, setEmailError] =
    useState("");

  const [passwordError, setPasswordError] =
    useState("");

  const [loginError, setLoginError] =
    useState("");

  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  /*
   * Test credentials for QA Quest.
   *
   * TC001 intentionally contains a defect:
   * valid credentials are rejected.
   */
  const VALID_EMAIL =
    "tester@acme.local";

  const VALID_PASSWORD =
    "Password123!";

  /*
   * Handle login.
   */
  function handleLogin() {
    setEmailError("");
    setPasswordError("");
    setLoginError("");

    let hasError = false;

    /*
     * Email validation.
     */
    if (!email.trim()) {
      setEmailError(
        "Email is required.",
      );

      hasError = true;
    }

    /*
     * Password validation.
     */
    if (!password) {
      setPasswordError(
        "Password is required.",
      );

      hasError = true;
    }

    if (hasError) {
      return;
    }

    /*
     * Intentional application defect.
     *
     * Even with the correct credentials,
     * the application rejects the login.
     *
     * This is the bug represented by TC001.
     */
    if (
      email.trim().toLowerCase() ===
        VALID_EMAIL &&
      password === VALID_PASSWORD
    ) {
      setLoginError(
        "Invalid email or password.",
      );

      return;
    }

    /*
     * Invalid credentials.
     */
    setLoginError(
      "Invalid email or password.",
    );
  }

  /*
   * Show a simulated dashboard.
   *
   * This is useful later when you fix TC001.
   */
  if (isLoggedIn) {
    return (
      <div className="website-screen">
        <div className="website-container">

          <div className="browser-window">

            <div className="browser-toolbar">
              <div className="browser-dots">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
              </div>

              <div className="address-bar">
                🔒 qaquest.local/dashboard
              </div>
            </div>

            <div className="dashboard-page">

              <header className="dashboard-header">
                <div className="acme-brand">
                  ACME
                  <span>PORTAL</span>
                </div>

                <button
                  className="logout-button"
                  onClick={() => {
                    setIsLoggedIn(false);
                    setEmail("");
                    setPassword("");
                  }}
                >
                  Logout
                </button>
              </header>

              <main className="dashboard-content">

                <div className="success-icon">
                  ✓
                </div>

                <h1>
                  Welcome to your Dashboard
                </h1>

                <p>
                  You have successfully
                  authenticated with the
                  ACME Portal.
                </p>

                <div className="dashboard-card">
                  <strong>
                    Logged in as
                  </strong>

                  <span>
                    {email}
                  </span>
                </div>

              </main>

            </div>
          </div>

          <button
            className="continue-button"
            onClick={onContinue}
          >
            Continue to Test Planning →
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="website-screen">

      <div className="website-container">

        {/* BACK */}

        <button
          className="website-back-button"
          onClick={onBack}
        >
          ← Back
        </button>

        {/* HEADER */}

        <div className="website-header">

          <div className="application-status">
            <span className="status-dot" />

            APPLICATION UNDER TEST
          </div>

          <h1>
            ACME Portal
          </h1>

          <p>
            Explore the application before
            creating your test plan.
          </p>

        </div>

        {/* BROWSER */}

        <div className="browser-window">

          {/* BROWSER TOOLBAR */}

          <div className="browser-toolbar">

            <div className="browser-dots">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
            </div>

            <div className="address-bar">
              🔒 qaquest.local/login
            </div>

          </div>

          {/* ACME APPLICATION */}

          <div className="acme-application">

            <div className="acme-brand">
              ACME
              <span>PORTAL</span>
            </div>

            <div className="login-card">

              <div className="login-icon">
                🔐
              </div>

              <h2>
                Welcome Back
              </h2>

              <p className="login-subtitle">
                Sign in to your ACME Portal
                account
              </p>

              {/* EMAIL */}

              <div className="form-group">

                <label htmlFor="acme-email">
                  Email
                </label>

                <input
                  id="acme-email"
                  name="email"
                  type="email"
                  value={email}
                  placeholder="user@example.com"
                  autoComplete="username"
                  onChange={(event) => {
                    setEmail(
                      event.target.value,
                    );

                    setEmailError("");

                    setLoginError("");
                  }}
                />

                {emailError && (
                  <p className="field-error">
                    {emailError}
                  </p>
                )}

              </div>

              {/* PASSWORD */}

              <div className="form-group">

                <label htmlFor="acme-password">
                  Password
                </label>

                <div className="password-wrapper">

                  <input
                    id="acme-password"
                    name="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    onChange={(event) => {
                      setPassword(
                        event.target.value,
                      );

                      setPasswordError("");

                      setLoginError("");
                    }}
                  />

                  <button
                    type="button"
                    className="show-password-button"
                    onClick={() =>
                      setShowPassword(
                        (current) =>
                          !current,
                      )
                    }
                  >
                    {showPassword
                      ? "Hide"
                      : "Show"}
                  </button>

                </div>

                {passwordError && (
                  <p className="field-error">
                    {passwordError}
                  </p>
                )}

              </div>

              {/* LOGIN */}

              <button
                type="button"
                className="login-button"
                onClick={handleLogin}
              >
                Login
              </button>

              {/* LOGIN ERROR */}

              {loginError && (
                <div
                  className="login-error"
                  role="alert"
                >
                  <span>⚠</span>

                  {loginError}
                </div>
              )}

              {/* LINKS */}

              <div className="login-links">

                <button
                  type="button"
                  onClick={() =>
                    alert(
                      "Password reset is not implemented in this mission.",
                    )
                  }
                >
                  Forgot password?
                </button>

                <span>•</span>

                <button
                  type="button"
                  onClick={() =>
                    alert(
                      "Account creation is not implemented in this mission.",
                    )
                  }
                >
                  Create account
                </button>

              </div>

            </div>

          </div>

        </div>

        {/* QA INVESTIGATION */}

        <div className="investigation-panel">

          <div className="investigation-header">
            <span className="investigation-icon">
              🔎
            </span>

            <div>
              <h2>
                QA Investigation
              </h2>

              <p>
                Explore the application before
                creating your test plan.
              </p>
            </div>
          </div>

          <div className="investigation-grid">

            <div className="investigation-item">
              <span>1</span>

              <div>
                <strong>
                  Valid credentials
                </strong>

                <p>
                  Can a registered user
                  successfully log in?
                </p>
              </div>
            </div>

            <div className="investigation-item">
              <span>2</span>

              <div>
                <strong>
                  Invalid password
                </strong>

                <p>
                  Is an appropriate error
                  displayed?
                </p>
              </div>
            </div>

            <div className="investigation-item">
              <span>3</span>

              <div>
                <strong>
                  Empty fields
                </strong>

                <p>
                  Are required-field
                  validations working?
                </p>
              </div>
            </div>

            <div className="investigation-item">
              <span>4</span>

              <div>
                <strong>
                  Security input
                </strong>

                <p>
                  Does the application handle
                  unusual input safely?
                </p>
              </div>
            </div>

          </div>

          <div className="test-credentials">

            <strong>
              🧪 QA Test Account
            </strong>

            <code>
              tester@acme.local
            </code>

            <code>
              Password123!
            </code>

          </div>

        </div>

        {/* CONTINUE */}

        <button
          className="continue-button"
          onClick={onContinue}
        >
          Continue to Test Planning →
        </button>

      </div>

    </div>
  );
}

export default WebsiteUnderTestScreen;