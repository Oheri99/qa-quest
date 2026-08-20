import { useMemo, useState } from "react";
import "../styles/AutomationScreen.css";

interface AutomationScreenProps {
  websiteUrl: string;
  onComplete: (automationScore: number) => void;
  onBack: () => void;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  starterCode: string;
  requirements: string[];
}

interface Validation {
  navigation: boolean;
  username: boolean;
  password: boolean;
  click: boolean;
  assertion: boolean;
}

const CHALLENGES: Challenge[] = [
  {
    id: "login",
    title: "Automate Valid Login",
    description:
      "Create a Playwright test that logs in with valid credentials and verifies that the user reaches the Products page.",
    starterCode: `import { test, expect } from "@playwright/test";

test("valid user can login", async ({ page }) => {
  // Navigate to the login page

  // Enter a valid username

  // Enter a valid password

  // Click Login

  // Verify the Products page is displayed
});`,
    requirements: [
      "Navigate to the login page",
      "Enter a valid username",
      "Enter a valid password",
      "Click the Login button",
      "Verify the Products page is displayed",
    ],
  },

  {
    id: "invalid-password",
    title: "Automate Invalid Password",
    description:
      "Create a Playwright test that verifies an invalid password is rejected.",
    starterCode: `import { test, expect } from "@playwright/test";

test("invalid password is rejected", async ({ page }) => {
  // Navigate to the login page

  // Enter a valid username

  // Enter an invalid password

  // Click Login

  // Verify an error message
});`,
    requirements: [
      "Navigate to the login page",
      "Enter a valid username",
      "Enter an invalid password",
      "Click the Login button",
      "Verify an error message",
    ],
  },

  {
    id: "empty-username",
    title: "Automate Empty Username Validation",
    description:
      "Create a Playwright test that verifies the username field is required.",
    starterCode: `import { test, expect } from "@playwright/test";

test("username is required", async ({ page }) => {
  // Navigate to the login page

  // Leave the username field empty

  // Enter a password

  // Click Login

  // Verify the username validation message
});`,
    requirements: [
      "Navigate to the login page",
      "Leave username empty",
      "Enter a password",
      "Click the Login button",
      "Verify username validation",
    ],
  },
];

function AutomationScreen({
  websiteUrl,
  onComplete,
  onBack,
}: AutomationScreenProps) {
  const [challengeIndex, setChallengeIndex] = useState(0);

  const [code, setCode] = useState(
    CHALLENGES[0].starterCode,
  );

  const [completedChallenges, setCompletedChallenges] =
    useState<string[]>([]);

  const [feedback, setFeedback] = useState("");

  const [showHint, setShowHint] = useState(false);

  const [hasAnalysed, setHasAnalysed] = useState(false);

  const challenge = CHALLENGES[challengeIndex];

  /*
   * Analyse player code.
   */
  const validation = useMemo<Validation>(() => {
    const lowerCode = code.toLowerCase();

    const navigation =
      /page\s*\.\s*goto\s*\(/i.test(code);

    const username =
      /getbyplaceholder\s*\(\s*["']username["']\s*\)/i.test(
        code,
      ) ||
      /getbylabel\s*\(\s*["']username["']\s*\)/i.test(
        code,
      ) ||
      /username[\s\S]*?\.\s*fill\s*\(/i.test(code);

    const password =
      /getbyplaceholder\s*\(\s*["']password["']\s*\)/i.test(
        code,
      ) ||
      /getbylabel\s*\(\s*["']password["']\s*\)/i.test(
        code,
      ) ||
      /password[\s\S]*?\.\s*fill\s*\(/i.test(code);

    const click =
      /\.\s*click\s*\(/i.test(code) &&
      /login|button/i.test(code);

    let assertion = false;

    if (challenge.id === "login") {
      assertion =
        /expect\s*\(/i.test(code) &&
        (
          /inventory\.html/i.test(code) ||
          /products/i.test(lowerCode)
        );
    }

    if (challenge.id === "invalid-password") {
      assertion =
        /expect\s*\(/i.test(code) &&
        (
          /sadface/i.test(code) ||
          /username and password do not match/i.test(
            lowerCode,
          ) ||
          /error/i.test(lowerCode)
        );
    }

    if (challenge.id === "empty-username") {
      assertion =
        /expect\s*\(/i.test(code) &&
        (
          /username is required/i.test(lowerCode) ||
          /sadface/i.test(code) ||
          /error/i.test(lowerCode)
        );
    }

    return {
      navigation,
      username,
      password,
      click,
      assertion,
    };
  }, [code, challenge.id]);

  /*
   * Check whether a requirement is complete.
   */
  function requirementComplete(index: number) {
    switch (index) {
      case 0:
        return validation.navigation;

      case 1:
        if (challenge.id === "empty-username") {
          return !validation.username;
        }

        return validation.username;

      case 2:
        return validation.password;

      case 3:
        return validation.click;

      case 4:
        return validation.assertion;

      default:
        return false;
    }
  }

  /*
   * Calculate challenge XP.
   */
  function calculateChallengeScore() {
    let score = 0;

    if (validation.navigation) {
      score += 20;
    }

    if (challenge.id === "empty-username") {
      if (!validation.username) {
        score += 15;
      }
    } else {
      if (validation.username) {
        score += 15;
      }
    }

    if (validation.password) {
      score += 15;
    }

    if (validation.click) {
      score += 20;
    }

    if (validation.assertion) {
      score += 20;
    }

    if (
      code.includes("getByRole") ||
      code.includes("getByLabel") ||
      code.includes("getByPlaceholder")
    ) {
      score += 10;
    }

    return Math.min(score, 100);
  }

  const currentScore = calculateChallengeScore();

  const completedCount = completedChallenges.length;

  const progress =
    ((completedCount + (currentScore === 100 ? 1 : 0)) /
      CHALLENGES.length) *
    100;

  /*
   * Analyse code.
   */
  function runAutomation() {
    const score = calculateChallengeScore();

    setHasAnalysed(true);

    if (score === 100) {
      setFeedback(
        "Excellent. All automation requirements have been satisfied.",
      );
      return;
    }

    if (score >= 70) {
      setFeedback(
        "Good progress. Review the remaining unchecked requirements.",
      );
      return;
    }

    if (score >= 40) {
      setFeedback(
        "Partially complete. Continue working through the required Playwright steps.",
      );
      return;
    }

    setFeedback(
      "The test is incomplete. Use the requirements and hint to build the test.",
    );
  }

  /*
   * Complete challenge.
   */
  function completeChallenge() {
    const score = calculateChallengeScore();

    const alreadyCompleted =
      completedChallenges.includes(challenge.id);

    const newCompletedChallenges = alreadyCompleted
      ? completedChallenges
      : [...completedChallenges, challenge.id];

    if (!alreadyCompleted) {
      setCompletedChallenges(
        newCompletedChallenges,
      );
    }

    const nextIndex = challengeIndex + 1;

    if (nextIndex < CHALLENGES.length) {
      setChallengeIndex(nextIndex);

      setCode(
        CHALLENGES[nextIndex].starterCode,
      );

      setFeedback("");
      setShowHint(false);
      setHasAnalysed(false);

      return;
    }

    const finalScore =
      (newCompletedChallenges.length - 1) * 100 + score;

    onComplete(
      Math.min(
        finalScore,
        CHALLENGES.length * 100,
      ),
    );
  }

  /*
   * Reset editor.
   */
  function resetCode() {
    setCode(challenge.starterCode);
    setFeedback("");
  }

  /*
   * Escape URL for code example.
   */
  const safeWebsiteUrl = websiteUrl
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"');

  let hintCode = `await page.goto("${safeWebsiteUrl}");

await page.getByPlaceholder("Username").fill(
  "standard_user"
);

await page.getByPlaceholder("Password").fill(
  "secret_sauce"
);

await page.getByRole("button", {
  name: "Login",
}).click();

await expect(page).toHaveURL(
  /inventory\\.html/
);`;

  if (challenge.id === "invalid-password") {
    hintCode = `await page.goto("${safeWebsiteUrl}");

await page.getByPlaceholder("Username").fill(
  "standard_user"
);

await page.getByPlaceholder("Password").fill(
  "wrong_password"
);

await page.getByRole("button", {
  name: "Login",
}).click();

await expect(
  page.getByText(
    "Epic sadface: Username and password do not match any user in this service"
  )
).toBeVisible();`;
  }

  if (challenge.id === "empty-username") {
    hintCode = `await page.goto("${safeWebsiteUrl}");

await page.getByPlaceholder("Password").fill(
  "secret_sauce"
);

await page.getByRole("button", {
  name: "Login",
}).click();

await expect(
  page.getByText(
    "Epic sadface: Username is required"
  )
).toBeVisible();`;
  }

  return (
    <main className="automation-screen">
      <div className="automation-container">

        {/* TOP BAR */}

        <header className="automation-topbar">

          <button
            className="back-button"
            onClick={onBack}
          >
            ← Back
          </button>

          <div className="mission-label">
            QA QUEST / AUTOMATION
          </div>

          <div className="xp-display">
            <span>XP</span>
            <strong>{currentScore}</strong>
          </div>

        </header>

        {/* TITLE */}

        <section className="automation-title">

          <div>

            <span className="eyebrow">
              PLAYWRIGHT CHALLENGE
            </span>

            <h1>
              Automation Lab
            </h1>

            <p>
              Build a reliable automated test
              and satisfy every requirement.
            </p>

          </div>

          <div className="challenge-counter">

            <span>
              Challenge
            </span>

            <strong>
              {challengeIndex + 1}
            </strong>

            <span>
              / {CHALLENGES.length}
            </span>

          </div>

        </section>

        {/* PROGRESS */}

        <section className="automation-progress">

          <div className="progress-header">

            <span>
              Mission Progress
            </span>

            <strong>
              {Math.round(progress)}%
            </strong>

          </div>

          <div className="progress-track">
            <div
              className="progress-bar"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <div className="challenge-dots">

            {CHALLENGES.map(
              (item, index) => (
                <div
                  key={item.id}
                  className={
                    index < completedCount
                      ? "challenge-dot completed"
                      : index === challengeIndex
                        ? "challenge-dot active"
                        : "challenge-dot"
                  }
                >
                  {index < completedCount
                    ? "✓"
                    : index + 1}
                </div>
              ),
            )}

          </div>

        </section>

        {/* TARGET */}

        <section className="target-card">

          <div className="target-icon">
            🌐
          </div>

          <div>

            <span>
              TEST TARGET
            </span>

            <strong>
              {websiteUrl}
            </strong>

          </div>

        </section>

        {/* CHALLENGE */}

        <section className="challenge-card">

          <div className="challenge-card-header">

            <div>

              <span className="challenge-number">
                CHALLENGE {challengeIndex + 1}
              </span>

              <h2>
                {challenge.title}
              </h2>

            </div>

            <div className="score-badge">
              {currentScore} XP
            </div>

          </div>

          <p className="challenge-description">
            {challenge.description}
          </p>

        </section>

        {/* REQUIREMENTS */}

        <section className="requirements-card">

          <div className="section-heading">

            <div>
              <span className="eyebrow">
                CHECKLIST
              </span>

              <h3>
                Test Requirements
              </h3>
            </div>

            <span className="requirement-count">
              {
                challenge.requirements.filter(
                  (_, index) =>
                    requirementComplete(index),
                ).length
              }
              /{challenge.requirements.length}
            </span>

          </div>

          <div className="requirements-list">

            {challenge.requirements.map(
              (requirement, index) => {

                const complete =
                  requirementComplete(index);

                return (
                  <div
                    key={requirement}
                    className={
                      complete
                        ? "requirement complete"
                        : "requirement"
                    }
                  >

                    <div className="requirement-icon">
                      {complete ? "✓" : index + 1}
                    </div>

                    <span>
                      {requirement}
                    </span>

                    {complete && (
                      <small>
                        Complete
                      </small>
                    )}

                  </div>
                );
              },
            )}

          </div>

        </section>

        {/* EDITOR */}

        <section className="editor-card">

          <div className="editor-toolbar">

            <div className="file-name">

              <span className="file-icon">
                TS
              </span>

              <strong>
                login.spec.ts
              </strong>

            </div>

            <button
              className="reset-code-button"
              onClick={resetCode}
            >
              Reset
            </button>

          </div>

          <textarea
            className="code-editor"
            value={code}
            onChange={(event) =>
              setCode(event.target.value)
            }
            spellCheck={false}
          />

        </section>

        {/* HINT */}

        <section className="hint-card">

          <button
            className="hint-button"
            onClick={() =>
              setShowHint((current) => !current)
            }
          >
            <span>
              💡
            </span>

            <span>
              {showHint
                ? "Hide solution hint"
                : "Need help? Show hint"}
            </span>

            <span className="hint-arrow">
              {showHint ? "↑" : "↓"}
            </span>
          </button>

          {showHint && (
            <div className="hint-content">

              <p>
                Use Playwright's user-facing
                locators and web-first assertions.
              </p>

              <pre>
                {hintCode}
              </pre>

              <div className="hint-note">
                <strong>
                  Best practice
                </strong>

                <span>
                  Avoid arbitrary waits such as
                  page.waitForTimeout().
                  Playwright automatically waits
                  for actions and assertions.
                </span>
              </div>

            </div>
          )}

        </section>

        {/* ANALYSIS */}

        <section className="analysis-card">

          <div className="section-heading">

            <div>
              <span className="eyebrow">
                AUTOMATION ANALYSIS
              </span>

              <h3>
                Test Coverage
              </h3>
            </div>

            <div className="analysis-score">
              <strong>
                {currentScore}
              </strong>
              <span>
                / 100 XP
              </span>
            </div>

          </div>

          <div className="validation-grid">

            <div
              className={
                validation.navigation
                  ? "validation-item passed"
                  : "validation-item"
              }
            >
              <span>
                {validation.navigation
                  ? "✓"
                  : "○"}
              </span>

              <div>
                <strong>
                  Navigation
                </strong>

                <small>
                  Open the target page
                </small>
              </div>
            </div>

            <div
              className={
                requirementComplete(1)
                  ? "validation-item passed"
                  : "validation-item"
              }
            >
              <span>
                {requirementComplete(1)
                  ? "✓"
                  : "○"}
              </span>

              <div>
                <strong>
                  Username
                </strong>

                <small>
                  Handle username input
                </small>
              </div>
            </div>

            <div
              className={
                validation.password
                  ? "validation-item passed"
                  : "validation-item"
              }
            >
              <span>
                {validation.password
                  ? "✓"
                  : "○"}
              </span>

              <div>
                <strong>
                  Password
                </strong>

                <small>
                  Handle password input
                </small>
              </div>
            </div>

            <div
              className={
                validation.click
                  ? "validation-item passed"
                  : "validation-item"
              }
            >
              <span>
                {validation.click
                  ? "✓"
                  : "○"}
              </span>

              <div>
                <strong>
                  Login Action
                </strong>

                <small>
                  Submit the login form
                </small>
              </div>
            </div>

            <div
              className={
                validation.assertion
                  ? "validation-item passed"
                  : "validation-item"
              }
            >
              <span>
                {validation.assertion
                  ? "✓"
                  : "○"}
              </span>

              <div>
                <strong>
                  Assertion
                </strong>

                <small>
                  Verify the expected result
                </small>
              </div>
            </div>

          </div>

        </section>

        {/* FEEDBACK */}

        {feedback && (
          <div
            className={
              currentScore === 100
                ? "automation-feedback success"
                : "automation-feedback"
            }
          >
            <span>
              {currentScore === 100
                ? "✓"
                : "!"}
            </span>

            <p>
              {feedback}
            </p>
          </div>
        )}

        {/* ACTIONS */}

        <footer className="automation-actions">

          <button
            className="analyse-button"
            onClick={runAutomation}
          >
            Analyse Test
          </button>

          <button
            className="complete-button"
            onClick={completeChallenge}
            disabled={!hasAnalysed}
          >
            {challengeIndex <
            CHALLENGES.length - 1
              ? "Complete Challenge →"
              : "Finish Mission →"}
          </button>

        </footer>

      </div>
    </main>
  );
}

export default AutomationScreen;