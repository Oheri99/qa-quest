import { useState } from "react";
import "../styles/ACMELoginScreen.css";

interface ACMELoginScreenProps {
  onContinue: () => void;
  onBack: () => void;
}

function ACMELoginScreen({
  onContinue,
  onBack,
}: ACMELoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] =
    useState("");

  /*
   * Simulated ACME Portal credentials.
   *
   * TC001 deliberately contains a defect.
   */
  const VALID_EMAIL = "user@example.com";
  const VALID_PASSWORD = "Password123!";

  function handleLogin() {
    setError("");

    /*
     * Email validation
     */
    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    /*
     * Password validation
     */
    if (!password) {
      setError("Password is required.");
      return;
    }

    /*
     * INTENTIONAL DEFECT - TC001
     *
     * Even when valid credentials are entered,
     * the application rejects the login.
     */
    if (
      email === VALID_EMAIL &&
      password === VALID_PASSWORD
    ) {
      setError(
        "Login failed. Please check your credentials.",
      );

      return;
    }

    /*
     * Invalid credentials.
     */
    setError(
      "Invalid email or password.",
    );
  }

  return (
    <div className="acme-login-screen">
      <div className="acme-login-container">

        {/* =========================
            BACK
            ========================= */}

        <button
          type="button"
          className="acme-back-button"
          onClick={onBack}
        >
          ← Back to Mission
        </button>

        {/* =========================
            ACME PORTAL
            ========================= */}

        <div className="acme-portal-card">

          {/* HEADER */}

          <div className="acme-header">
            <div className="acme-logo">
              🔐
            </div>

            <div>
              <h1>ACMEPORTAL</h1>

              <p>
                🔒 Secure Login
              </p>
            </div>
          </div>

          {/* WELCOME */}

          <div className="acme-welcome">
            <h2>
              Welcome Back
            </h2>

            <p>
              Sign in to your ACME Portal account
            </p>
          </div>

          {/* =========================
              EMAIL
              ========================= */}

          <div className="acme-form-group">

            <label htmlFor="acme-email">
              Email
            </label>

            <input
              id="acme-email"
              name="email"
              type="email"
              placeholder="user@example.com"
              value={email}
              onChange={(event) =>
                setEmail(
                  event.target.value,
                )
              }
            />

          </div>

          {/* =========================
              PASSWORD
              ========================= */}

          <div className="acme-form-group">

            <label htmlFor="acme-password">
              Password
            </label>

            <div className="acme-password-wrapper">

              <input
                id="acme-password"
                name="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter your password"
                value={password}
                onChange={(event) =>
                  setPassword(
                    event.target.value,
                  )
                }
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

          </div>

          {/* =========================
              ERROR
              ========================= */}

          {error && (
            <div
              className="acme-error"
              role="alert"
            >
              {error}
            </div>
          )}

          {/* =========================
              LOGIN
              ========================= */}

          <button
            type="button"
            className="acme-login-button"
            onClick={handleLogin}
          >
            Login
          </button>

          {/* =========================
              LINKS
              ========================= */}

          <div className="acme-links">

            <button
              type="button"
              onClick={() =>
                setError(
                  "Password reset is unavailable in this mission.",
                )
              }
            >
              Forgot password?
            </button>

            <span>•</span>

            <button
              type="button"
              onClick={() =>
                setError(
                  "Account registration is unavailable in this mission.",
                )
              }
            >
              Create account
            </button>

          </div>

          {/* =========================
              CONTINUE
              ========================= */}

          <button
            type="button"
            className="acme-continue-button"
            onClick={onContinue}
          >
            Continue to Test Planning →
          </button>

          {/* =========================
              TESTING NOTICE
              ========================= */}

          <div className="testing-notice">

            <strong>
              🧪 QA Quest Testing Environment
            </strong>

            <p>
              Explore the application and
              identify defects before creating
              your test plan.
            </p>

          </div>

        </div>
      </div>
    </div>
  );
}

export default ACMELoginScreen;