import { useState } from "react";
import "./App.css";

type Screen =
  | "home"
  | "mission"
  | "test-plan"
  | "execution"
  | "report"
  | "automation"
  | "result";

type TestCase = {
  id: string;
  title: string;
  description: string;
  expected: string;
  xp: number;
  hasBug?: boolean;
};

const testCases: TestCase[] = [
  {
    id: "TC001",
    title: "Valid email + valid password",
    description:
      "Verify a registered user can successfully log in.",
    expected:
      "User should be authenticated and redirected to the Dashboard.",
    xp: 20,
    hasBug: true,
  },
  {
    id: "TC002",
    title: "Valid email + invalid password",
    description:
      "Verify invalid credentials are rejected.",
    expected:
      "User should receive an appropriate error message.",
    xp: 10,
  },
  {
    id: "TC003",
    title: "Invalid email + valid password",
    description:
      "Verify an invalid email cannot log in.",
    expected:
      "User should be prevented from logging in.",
    xp: 10,
  },
  {
    id: "TC004",
    title: "Empty email",
    description:
      "Verify the email field is required.",
    expected:
      "A validation message should tell the user that email is required.",
    xp: 10,
  },
  {
    id: "TC005",
    title: "Empty password",
    description:
      "Verify the password field is required.",
    expected:
      "A validation message should tell the user that password is required.",
    xp: 10,
  },
  {
    id: "TC006",
    title: "Both fields empty",
    description:
      "Verify the form handles missing credentials.",
    expected:
      "The form should prevent submission and display validation messages.",
    xp: 10,
  },
  {
    id: "TC007",
    title: "Very long password",
    description:
      "Verify the application handles long input safely.",
    expected:
      "The application should handle the input without crashing.",
    xp: 5,
  },
  {
    id: "TC008",
    title: "Security input",
    description:
      "Verify malicious input is handled safely.",
    expected:
      "The application should safely reject malicious input.",
    xp: 5,
  },
];

function App() {
  const [screen, setScreen] =
    useState<Screen>("home");

  const [score, setScore] =
    useState(0);

  const [selectedTests, setSelectedTests] =
    useState<string[]>([]);

  const [executedTests, setExecutedTests] =
    useState<string[]>([]);

  const [failedTests, setFailedTests] =
    useState<string[]>([]);

  function toggleTest(testId: string) {
    setSelectedTests((current) =>
      current.includes(testId)
        ? current.filter(
            (id) => id !== testId
          )
        : [...current, testId]
    );
  }

  function calculatePlanScore() {
    return testCases
      .filter((test) =>
        selectedTests.includes(test.id)
      )
      .reduce(
        (total, test) =>
          total + test.xp,
        0
      );
  }

  function executeTest(test: TestCase) {
    if (
      executedTests.includes(test.id)
    ) {
      return;
    }

    setExecutedTests((current) => [
      ...current,
      test.id,
    ]);

    if (test.hasBug) {
      setFailedTests((current) => [
        ...current,
        test.id,
      ]);
    }
  }

  function startExecution() {
    setScore(calculatePlanScore());

    setExecutedTests([]);
    setFailedTests([]);

    setScreen("execution");
  }

  function resetGame() {
    setScreen("home");
    setScore(0);
    setSelectedTests([]);
    setExecutedTests([]);
    setFailedTests([]);
  }

  return (
    <div className="app">

      {/* =========================
          HOME
      ========================= */}

      {screen === "home" && (
        <HomeScreen
          score={score}
          onStart={() =>
            setScreen("mission")
          }
        />
      )}

      {/* =========================
          MISSION
      ========================= */}

      {screen === "mission" && (
        <MissionScreen
          onStart={() =>
            setScreen("test-plan")
          }
          onBack={() =>
            setScreen("home")
          }
        />
      )}

      {/* =========================
          TEST PLAN
      ========================= */}

      {screen === "test-plan" && (
        <TestPlanScreen
          selectedTests={selectedTests}
          onToggle={toggleTest}
          onExecute={startExecution}
          onBack={() =>
            setScreen("mission")
          }
        />
      )}

      {/* =========================
          TEST EXECUTION
      ========================= */}

      {screen === "execution" && (
        <TestExecutionScreen
          selectedTests={selectedTests}
          executedTests={executedTests}
          failedTests={failedTests}
          onRunTest={executeTest}
          onReport={() =>
            setScreen("report")
          }
          onBack={() =>
            setScreen("test-plan")
          }
        />
      )}

      {/* =========================
          BUG REPORT
      ========================= */}

      {screen === "report" && (
        <BugReportScreen
          onSubmit={(bugScore) => {
            setScore(
              (current) =>
                current + bugScore
            );

            setScreen("automation");
          }}
          onBack={() =>
            setScreen("execution")
          }
        />
      )}

      {/* =========================
          AUTOMATION
      ========================= */}

      {screen === "automation" && (
        <AutomationScreen
          onComplete={(automationScore) => {
            setScore(
              (current) =>
                current + automationScore
            );

            setScreen("result");
          }}
          onBack={() =>
            setScreen("report")
          }
        />
      )}

      {/* =========================
          RESULT
      ========================= */}

      {screen === "result" && (
        <ResultScreen
          score={score}
          onHome={resetGame}
        />
      )}

    </div>
  );
}


/* =====================================================
   HOME SCREEN
===================================================== */

function HomeScreen({
  score,
  onStart,
}: {
  score: number;
  onStart: () => void;
}) {
  return (
    <main className="home-screen">

      <div className="game-logo">
        🎮
      </div>

      <h1>
        QA QUEST
      </h1>

      <p className="tagline">
        Become the Bug Hunter
      </p>

      <p className="description">
        Find bugs, design tests,
        automate journeys and
        protect production.
      </p>

      <button
        className="primary-button"
        onClick={onStart}
      >
        Start Mission 🚀
      </button>

      <div className="stats">

        <div>
          <strong>
            1
          </strong>

          <span>
            Mission
          </span>
        </div>

        <div>
          <strong>
            {score}
          </strong>

          <span>
            XP
          </span>
        </div>

        <div>
          <strong>
            Junior Tester
          </strong>

          <span>
            Rank
          </span>
        </div>

      </div>

    </main>
  );
}


/* =====================================================
   MISSION SCREEN
===================================================== */

function MissionScreen({
  onStart,
  onBack,
}: {
  onStart: () => void;
  onBack: () => void;
}) {
  return (
    <main className="mission-screen">

      <button
        className="back-button"
        onClick={onBack}
      >
        ← Back
      </button>

      <div className="mission-card">

        <span className="mission-number">
          MISSION 001
        </span>

        <h1>
          🔐 Broken Login
        </h1>

        <p>
          The development team has
          released a new login page.
        </p>

        <p>
          Your job is to test it before
          it reaches production.
        </p>

        <div className="objective">

          <h3>
            🎯 Requirement
          </h3>

          <p>
            Registered users must be
            able to log in using valid
            credentials.
          </p>

        </div>

        <div className="objective">

          <h3>
            🧪 Your Mission
          </h3>

          <p>
            Design a test plan, execute
            your tests and identify
            any defects.
          </p>

        </div>

        <div className="mission-info">

          <span>
            ⭐ 180 XP
          </span>

          <span>
            🟢 Beginner
          </span>

          <span>
            ⏱ No time limit
          </span>

        </div>

        <button
          className="primary-button"
          onClick={onStart}
        >
          Create Test Plan 🚀
        </button>

      </div>

    </main>
  );
}


/* =====================================================
   TEST PLAN SCREEN
===================================================== */

function TestPlanScreen({
  selectedTests,
  onToggle,
  onExecute,
  onBack,
}: {
  selectedTests: string[];
  onToggle: (id: string) => void;
  onExecute: () => void;
  onBack: () => void;
}) {
  const currentScore =
    testCases
      .filter((test) =>
        selectedTests.includes(
          test.id
        )
      )
      .reduce(
        (total, test) =>
          total + test.xp,
        0
      );

  return (
    <main className="mission-screen">

      <button
        className="back-button"
        onClick={onBack}
      >
        ← Mission Brief
      </button>

      <div className="mission-card test-plan-card">

        <span className="mission-number">
          TEST PLANNING
        </span>

        <h1>
          🧪 Design Your Test Plan
        </h1>

        <p>
          Select the scenarios you
          believe should be tested
          before releasing the login
          feature.
        </p>

        <div className="test-plan-score">

          Potential XP:

          <strong>
            {" "}
            {currentScore}
          </strong>

        </div>

        <div className="test-case-list">

          {testCases.map((test) => (

            <label
              key={test.id}
              className={`test-case ${
                selectedTests.includes(
                  test.id
                )
                  ? "selected"
                  : ""
              }`}
            >

              <input
                type="checkbox"
                checked={selectedTests.includes(
                  test.id
                )}
                onChange={() =>
                  onToggle(
                    test.id
                  )
                }
              />

              <div>

                <strong>
                  {test.id} —{" "}
                  {test.title}
                </strong>

                <p>
                  {test.description}
                </p>

                <span>
                  +{test.xp} XP
                </span>

              </div>

            </label>

          ))}

        </div>

        <button
          className="primary-button"
          onClick={onExecute}
          disabled={
            selectedTests.length === 0
          }
        >
          Execute Test Plan 🚀
        </button>

      </div>

    </main>
  );
}


/* =====================================================
   TEST EXECUTION SCREEN
===================================================== */

function TestExecutionScreen({
  selectedTests,
  executedTests,
  failedTests,
  onRunTest,
  onReport,
  onBack,
}: {
  selectedTests: string[];
  executedTests: string[];
  failedTests: string[];
  onRunTest: (test: TestCase) => void;
  onReport: () => void;
  onBack: () => void;
}) {
  const testsToRun =
    testCases.filter((test) =>
      selectedTests.includes(
        test.id
      )
    );

  const allTestsExecuted =
    testsToRun.length > 0 &&
    executedTests.length ===
      testsToRun.length;

  const defectFound =
    failedTests.length > 0;

  return (
    <main className="mission-screen">

      <button
        className="back-button"
        onClick={onBack}
      >
        ← Test Plan
      </button>

      <div className="mission-card execution-card">

        <span className="mission-number">
          TEST EXECUTION
        </span>

        <h1>
          🧪 Execute Your Tests
        </h1>

        <p>
          Run each selected test case
          and investigate the results.
        </p>

        <div className="execution-progress">

          <strong>
            {executedTests.length}
          </strong>

          {" / "}

          {testsToRun.length}

          {" tests executed"}

        </div>

        <div className="execution-list">

          {testsToRun.map(
            (test) => {

              const executed =
                executedTests.includes(
                  test.id
                );

              const failed =
                failedTests.includes(
                  test.id
                );

              return (
                <div
                  key={test.id}
                  className="execution-test"
                >

                  <div className="execution-header">

                    <div>

                      <strong>
                        {test.id} —{" "}
                        {test.title}
                      </strong>

                      <p>
                        {test.description}
                      </p>

                    </div>

                    {!executed && (

                      <button
                        className="run-test-button"
                        onClick={() =>
                          onRunTest(
                            test
                          )
                        }
                      >
                        Run Test
                      </button>

                    )}

                  </div>

                  {executed && (

                    <div
                      className={
                        failed
                          ? "test-result failed"
                          : "test-result passed"
                      }
                    >

                      {failed ? (

                        <>
                          <strong>
                            ❌ FAILED
                          </strong>

                          <p>
                            <strong>
                              Expected:
                            </strong>{" "}
                            {test.expected}
                          </p>

                          <p>
                            <strong>
                              Actual:
                            </strong>{" "}
                            Login failed
                            and the user
                            remains on
                            the login page.
                          </p>

                          <span>
                            🐛 Potential
                            defect
                            discovered
                          </span>
                        </>

                      ) : (

                        <>
                          <strong>
                            ✅ PASSED
                          </strong>

                          <p>
                            Test completed
                            successfully.
                          </p>
                        </>

                      )}

                    </div>

                  )}

                </div>
              );
            }
          )}

        </div>

        {allTestsExecuted &&
          defectFound && (

            <div className="defect-found">

              <h2>
                🐛 Defect Discovered!
              </h2>

              <p>
                At least one test has
                failed. Investigate the
                failure and create a
                professional bug report.
              </p>

              <button
                className="primary-button"
                onClick={onReport}
              >
                Report Defect 🐛
              </button>

            </div>

          )}

        {allTestsExecuted &&
          !defectFound && (

            <div className="defect-found">

              <h2>
                🔎 No Defect Found
              </h2>

              <p>
                Your selected tests
                completed without
                detecting a defect.
              </p>

            </div>

          )}

      </div>

    </main>
  );
}


/* =====================================================
   BUG REPORT
===================================================== */

function BugReportScreen({
  onSubmit,
  onBack,
}: {
  onSubmit: (score: number) => void;
  onBack: () => void;
}) {
  const [title, setTitle] =
    useState("");

  const [expected, setExpected] =
    useState("");

  const [actual, setActual] =
    useState("");

  const [severity, setSeverity] =
    useState("");

  const [priority, setPriority] =
    useState("");

  function evaluateBug() {
    let score = 0;

    const titleText =
      title.toLowerCase();

    const expectedText =
      expected.toLowerCase();

    const actualText =
      actual.toLowerCase();

    if (
      titleText.includes("login") ||
      titleText.includes("button") ||
      titleText.includes("authentication")
    ) {
      score += 30;
    }

    if (
      expectedText.includes(
        "dashboard"
      ) ||
      expectedText.includes(
        "logged in"
      ) ||
      expectedText.includes(
        "success"
      ) ||
      expectedText.includes(
        "authenticated"
      )
    ) {
      score += 30;
    }

    if (
      actualText.includes("fail") ||
      actualText.includes(
        "does not"
      ) ||
      actualText.includes(
        "doesn't"
      ) ||
      actualText.includes(
        "remain"
      ) ||
      actualText.includes(
        "stays"
      )
    ) {
      score += 30;
    }

    if (severity !== "") {
      score += 5;
    }

    if (priority !== "") {
      score += 5;
    }

    onSubmit(score);
  }

  return (
    <main className="report-screen">

      <button
        className="back-button"
        onClick={onBack}
      >
        ← Test Execution
      </button>

      <div className="report-card">

        <span className="mission-number">
          BUG REPORT
        </span>

        <h1>
          🐛 Report a Defect
        </h1>

        <p>
          Create a professional bug
          report based on the failed
          test.
        </p>

        <label htmlFor="bug-title">
          Bug Title
        </label>

        <input
          id="bug-title"
          value={title}
          onChange={(event) =>
            setTitle(
              event.target.value
            )
          }
          placeholder="Login fails with valid credentials"
        />

        <label htmlFor="expected">
          Expected Result
        </label>

        <textarea
          id="expected"
          value={expected}
          onChange={(event) =>
            setExpected(
              event.target.value
            )
          }
          placeholder="User should be authenticated and redirected to the Dashboard."
        />

        <label htmlFor="actual">
          Actual Result
        </label>

        <textarea
          id="actual"
          value={actual}
          onChange={(event) =>
            setActual(
              event.target.value
            )
          }
          placeholder="Login fails and the user remains on the login page."
        />

        <label htmlFor="severity">
          Severity
        </label>

        <select
          id="severity"
          value={severity}
          onChange={(event) =>
            setSeverity(
              event.target.value
            )
          }
        >

          <option value="">
            Select severity
          </option>

          <option value="Low">
            Low
          </option>

          <option value="Medium">
            Medium
          </option>

          <option value="High">
            High
          </option>

          <option value="Critical">
            Critical
          </option>

        </select>

        <label htmlFor="priority">
          Priority
        </label>

        <select
          id="priority"
          value={priority}
          onChange={(event) =>
            setPriority(
              event.target.value
            )
          }
        >

          <option value="">
            Select priority
          </option>

          <option value="Low">
            Low
          </option>

          <option value="Medium">
            Medium
          </option>

          <option value="High">
            High
          </option>

        </select>

        <button
          className="primary-button"
          onClick={evaluateBug}
        >
          Submit Bug Report 🚀
        </button>

      </div>

    </main>
  );
}


/* =====================================================
   AUTOMATION CHALLENGE
===================================================== */

function AutomationScreen({
  onComplete,
  onBack,
}: {
  onComplete: (score: number) => void;
  onBack: () => void;
}) {
  const [code, setCode] =
    useState("");

  const [result, setResult] =
    useState("");

  function runAutomation() {
    const codeText =
      code.toLowerCase();

    let automationScore = 0;

    if (
      codeText.includes(
        "playwright"
      )
    ) {
      automationScore += 20;
    }

    if (
      codeText.includes(
        "goto"
      )
    ) {
      automationScore += 20;
    }

    if (
      codeText.includes(
        "locator"
      )
    ) {
      automationScore += 20;
    }

    if (
      codeText.includes(
        "expect"
      )
    ) {
      automationScore += 20;
    }

    if (
      codeText.includes(
        "login"
      )
    ) {
      automationScore += 20;
    }

    if (automationScore >= 80) {

      setResult(
        "PASS: Your automation covers the login journey successfully."
      );

      setTimeout(() => {
        onComplete(
          automationScore
        );
      }, 1200);

      return;
    }

    setResult(
      `FAIL: Automation score ${automationScore}/100. Analyse the missing steps.`
    );
  }

  return (
    <main className="mission-screen">

      <button
        className="back-button"
        onClick={onBack}
      >
        ← Bug Report
      </button>

      <div className="automation-card">

        <span className="mission-number">
          AUTOMATION CHALLENGE
        </span>

        <h1>
          🤖 Automate the Login Test
        </h1>

        <p>
          You discovered the login
          defect manually. Now automate
          the test using Playwright.
        </p>

        <div className="automation-requirement">

          <h3>
            🎯 Objective
          </h3>

          <p>
            Create an automated test
            that:
          </p>

          <ol>

            <li>
              Opens the login page
            </li>

            <li>
              Enters valid credentials
            </li>

            <li>
              Clicks the Login button
            </li>

            <li>
              Verifies the expected result
            </li>

          </ol>

        </div>

        <div className="automation-requirement">

          <h3>
            💻 Your Task
          </h3>

          <p>
            Write a Playwright test in
            the editor below.
          </p>

        </div>

        <div className="code-editor">

          <div className="editor-header">

            <span>
              login.spec.ts
            </span>

            <span>
              TypeScript
            </span>

          </div>

          <textarea
            value={code}
            onChange={(event) =>
              setCode(
                event.target.value
              )
            }
            placeholder={`import { test, expect } from "@playwright/test";

test("valid login", async ({ page }) => {

  await page.goto("/login");

  // Enter email

  // Enter password

  // Click Login

  // Verify the result

});`}
          />

        </div>

        <button
          className="primary-button"
          onClick={runAutomation}
        >
          ▶ Run Automation
        </button>

        {result && (

          <div className="automation-result">
            {result}
          </div>

        )}

        <div className="automation-hints">

          <strong>
            💡 Hints
          </strong>

          <p>
            You may need:
          </p>

          <code>
            page.goto()
          </code>

          <code>
            page.locator()
          </code>

          <code>
            expect()
          </code>

          <code>
            login
          </code>

        </div>

      </div>

    </main>
  );
}


/* =====================================================
   RESULT SCREEN
===================================================== */

function ResultScreen({
  score,
  onHome,
}: {
  score: number;
  onHome: () => void;
}) {
  let title =
    "Keep Investigating!";

  let icon = "🔎";

  if (score >= 200) {

    title =
      "Outstanding QA Work!";

    icon = "🏆";

  } else if (score >= 150) {

    title =
      "Excellent Testing!";

    icon = "🎉";

  } else if (score >= 100) {

    title =
      "Good Investigation!";

    icon = "👍";

  }

  return (
    <main className="result-screen">

      <div className="result-card">

        <div className="success-icon">
          {icon}
        </div>

        <h1>
          {title}
        </h1>

        <p>
          Mission 001 completed.
        </p>

        <div className="score">

          <strong>
            {score} XP
          </strong>

          <span>
            Mission Score
          </span>

        </div>

        <div className="breakdown">

          <p>
            🧪 Test planning
          </p>

          <p>
            ▶️ Test execution
          </p>

          <p>
            🐛 Defect identification
          </p>

          <p>
            📝 Bug report
          </p>

          <p>
            🤖 Automation
          </p>

          <p>
            🎯 Severity & priority
          </p>

        </div>

        <button
          className="primary-button"
          onClick={onHome}
        >
          Return to HQ
        </button>

      </div>

    </main>
  );
}

export default App;