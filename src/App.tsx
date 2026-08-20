import { useState } from "react";

import HomeScreen from "./screens/HomeScreen";
import BugReportScreen from "./screens/BugReportScreen";
import AutomationScreen from "./screens/AutomationScreen";
import TestPlanScreen from "./screens/TestPlanScreen";

import { testCases } from "./data/testCases";

import "./styles/TestExecutionScreen.css";

type Screen =
  | "home"
  | "website"
  | "mission"
  | "test-plan"
  | "execution"
  | "report"
  | "automation"
  | "result";

type TestResult = "pass" | "fail";

type TestExecutionScreenProps = {
  selectedTests: string[];
  executedTests: string[];
  failedTests: string[];

  onRunTest: (
    test: (typeof testCases)[number],
    result: TestResult,
  ) => void;

  onReport: () => void;
  onBack: () => void;
};

function TestExecutionScreen({
  selectedTests,
  executedTests,
  failedTests,
  onRunTest,
  onReport,
  onBack,
}: TestExecutionScreenProps) {
  const selectedTestCases = testCases.filter((test) =>
    selectedTests.includes(test.id),
  );

  const allExecuted =
    selectedTestCases.length > 0 &&
    selectedTestCases.every((test) =>
      executedTests.includes(test.id),
    );

  return (
    <main className="execution-screen">
      <div className="execution-container">
        <button
          className="execution-back-button"
          onClick={onBack}
        >
          ← Back to Test Plan
        </button>

        <div className="execution-header">
          <div>
            <h1>Test Execution</h1>

            <p>
              Execute each selected test case and record
              whether the application passes or fails.
            </p>
          </div>

          <div className="execution-progress">
            <strong>{executedTests.length}</strong>

            <span>
              / {selectedTestCases.length}
            </span>

            <small>Tests Executed</small>
          </div>
        </div>

        <div className="execution-tests">
          {selectedTestCases.map((test) => {
            const isExecuted =
              executedTests.includes(test.id);

            const isFailed =
              failedTests.includes(test.id);

            return (
              <div
                key={test.id}
                className={`execution-card ${
                  isFailed
                    ? "test-failed"
                    : isExecuted
                      ? "test-passed"
                      : ""
                }`}
              >
                <div className="execution-card-header">
                  <div>
                    <span className="execution-test-id">
                      {test.id}
                    </span>

                    <h2>{test.title}</h2>
                  </div>

                  <span
                    className={`priority-badge priority-${test.priority}`}
                  >
                    {test.priority.toUpperCase()}
                  </span>
                </div>

                <div className="execution-description">
                  <h3>Test Objective</h3>
                  <p>{test.description}</p>
                </div>

                <div className="result-box expected-box">
                  <h3>Expected Result</h3>
                  <p>{test.expected}</p>
                </div>

                <div className="result-box actual-box">
                  <h3>Actual Result</h3>
                  <p>
                    {test.actual ??
                      "No actual result recorded."}
                  </p>
                </div>

                {isExecuted && (
                  <div
                    className={`execution-result ${
                      isFailed
                        ? "result-failed"
                        : "result-passed"
                    }`}
                  >
                    <strong>
                      {isFailed
                        ? "TEST FAILED"
                        : "TEST PASSED"}
                    </strong>

                    <p>
                      {isFailed
                        ? "This scenario exposed a defect in the application."
                        : "This scenario behaved as expected."}
                    </p>
                  </div>
                )}

                <div className="execution-footer">
                  <button
                    className="pass-button"
                    onClick={() =>
                      onRunTest(test, "pass")
                    }
                    disabled={isExecuted}
                  >
                    Mark as Pass
                  </button>

                  <button
                    className="fail-button"
                    onClick={() =>
                      onRunTest(test, "fail")
                    }
                    disabled={isExecuted}
                  >
                    Mark as Fail
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="execution-footer">
          {!allExecuted ? (
            <p>
              Run all selected tests before continuing.
            </p>
          ) : (
            <button
              className="report-button"
              onClick={onReport}
            >
              Report Defects →
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

function App() {
  const [screen, setScreen] =
    useState<Screen>("home");

  const [websiteUrl, setWebsiteUrl] =
    useState("");

  const [selectedTests, setSelectedTests] =
    useState<string[]>([]);

  const [executedTests, setExecutedTests] =
    useState<string[]>([]);

  const [failedTests, setFailedTests] =
    useState<string[]>([]);

  const [testResults, setTestResults] =
    useState<Record<string, TestResult>>({});

  const [bugScore, setBugScore] = useState(0);

  const [automationScore, setAutomationScore] =
    useState(0);

  /*
   * START MISSION
   */
  const handleStartMission = () => {
    setScreen("website");
  };

  /*
   * WEBSITE SUBMISSION
   */
  const handleWebsiteSubmit = () => {
    try {
      const url = new URL(websiteUrl.trim());

      if (
        url.protocol !== "http:" &&
        url.protocol !== "https:"
      ) {
        throw new Error();
      }

      setWebsiteUrl(url.toString());
      setScreen("mission");
    } catch {
      alert("Please enter a valid website URL.");
    }
  };

  /*
   * TEST PLAN
   */
  const handleBeginTestPlan = () => {
    setScreen("test-plan");
  };

  /*
   * EXECUTION
   */
  const handleStartExecution = () => {
    if (selectedTests.length === 0) {
      return;
    }

    setScreen("execution");
  };

  /*
   * RUN TEST
   */
  const handleRunTest = (
    test: (typeof testCases)[number],
    result: TestResult,
  ) => {
    setExecutedTests((previous) => {
      if (previous.includes(test.id)) {
        return previous;
      }

      return [...previous, test.id];
    });

    setTestResults((previous) => ({
      ...previous,
      [test.id]: result,
    }));

    if (result === "fail") {
      setFailedTests((previous) => {
        if (previous.includes(test.id)) {
          return previous;
        }

        return [...previous, test.id];
      });
    } else {
      setFailedTests((previous) =>
        previous.filter(
          (id) => id !== test.id,
        ),
      );
    }
  };

  /*
   * BUG REPORT
   */
  const handleReport = () => {
    setScreen("report");
  };

  const handleBugReportSubmit = (
    score: number,
  ) => {
    setBugScore(score);
    setScreen("automation");
  };

  /*
   * AUTOMATION
   */
  const handleAutomationComplete = (
    score: number,
  ) => {
    setAutomationScore(score);
    setScreen("result");
  };

  /*
   * NAVIGATION
   */
  const handleBackToTestPlan = () => {
    setScreen("test-plan");
  };

  const handleBackToHome = () => {
    setScreen("home");
  };

  /*
   * SELECT ALL
   */
  const handleSelectAllTests = () => {
    if (
      selectedTests.length === testCases.length
    ) {
      setSelectedTests([]);
    } else {
      setSelectedTests(
        testCases.map((test) => test.id),
      );
    }
  };

  const handleToggleTest = (testId: string) => {
    setSelectedTests((previous) =>
      previous.includes(testId)
        ? previous.filter((id) => id !== testId)
        : [...previous, testId],
    );
  };

  /*
   * RESET
   */
  const handleReset = () => {
    setSelectedTests([]);
    setExecutedTests([]);
    setFailedTests([]);
    setTestResults({});

    setBugScore(0);
    setAutomationScore(0);

    setWebsiteUrl("");

    setScreen("home");
  };

  /*
   * HOME
   */
  if (screen === "home") {
    return (
      <HomeScreen
        onStartMission={handleStartMission}
      />
    );
  }

  /*
   * WEBSITE TARGET
   */
  if (screen === "website") {
    return (
      <main className="mission-setup-screen">
        <div className="mission-setup-container">

          <header className="mission-setup-header">
            <button
              className="mission-back-button"
              onClick={handleBackToHome}
            >
              ← Back
            </button>

            <div className="mission-step">
              <span>MISSION 001</span>
              <strong>STEP 1 OF 5</strong>
            </div>

            <div className="mission-status">
              <span className="status-dot" />
              READY
            </div>
          </header>

          <div className="mission-progress">
            <div className="mission-progress-bar">
              <div
                className="mission-progress-fill"
                style={{ width: "20%" }}
              />
            </div>

            <span>20%</span>
          </div>

          <section className="mission-setup-content">

            <div className="mission-setup-eyebrow">
              QA QUEST / MISSION SETUP
            </div>

            <h1>
              Choose your
              <span> test target.</span>
            </h1>

            <p className="mission-setup-description">
              What website are you going to investigate?
              Enter the URL of the application you want
              to test during this mission.
            </p>

            <div className="target-card">

              <div className="target-card-header">
                <div className="target-icon">
                  🌐
                </div>

                <div>
                  <h2>Test Website</h2>

                  <p>
                    Enter the application URL you want
                    to investigate.
                  </p>
                </div>
              </div>

              <label htmlFor="website-url">
                APPLICATION URL
              </label>

              <div className="target-input-wrapper">

                <span className="target-input-icon">
                  🔗
                </span>

                <input
                  id="website-url"
                  type="url"
                  value={websiteUrl}
                  onChange={(event) =>
                    setWebsiteUrl(
                      event.target.value,
                    )
                  }
                  placeholder="https://example.com"
                  autoComplete="url"
                />

              </div>

              <div className="target-example">
                <span>Example</span>

                <button
                  type="button"
                  onClick={() =>
                    setWebsiteUrl(
                      "https://www.saucedemo.com",
                    )
                  }
                >
                  https://www.saucedemo.com
                </button>
              </div>

            </div>

            <div className="mission-tip">

              <div className="mission-tip-icon">
                💡
              </div>

              <div>
                <strong>QA Tip</strong>

                <p>
                  Make sure the URL points to the
                  application you want to investigate.
                  You will use this target throughout
                  the mission.
                </p>
              </div>

            </div>

            <div className="mission-setup-actions">

              <div className="mission-validation">

                {websiteUrl.trim() ? (
                  <>
                    <span className="validation-success">
                      ✓
                    </span>

                    <span>
                      Target URL entered
                    </span>
                  </>
                ) : (
                  <>
                    <span className="validation-pending">
                      !
                    </span>

                    <span>
                      Enter a URL to continue
                    </span>
                  </>
                )}

              </div>

              <button
                className="mission-primary-button"
                onClick={handleWebsiteSubmit}
                disabled={!websiteUrl.trim()}
              >
                Launch Mission
                <span>→</span>
              </button>

            </div>

          </section>

          <footer className="mission-setup-footer">
            <span>QA Quest</span>

            <span>
              Quality Engineering Simulator
            </span>

            <span>
              Mission 001 / Broken Login
            </span>
          </footer>

        </div>
      </main>
    );
  }

  /*
   * TEST PLAN
   */
  /*
 * =====================================================
 * MISSION BRIEF
 * =====================================================
 */
if (screen === "mission") {
  return (
    <main className="mission-screen">
      <div className="mission-container">

        {/* HEADER */}
        <header className="mission-header">
          <button
            className="mission-back-button"
            onClick={() => setScreen("website")}
          >
            ← Back
          </button>

          <div className="mission-step">
            <span>MISSION 001</span>
            <strong>STEP 2 OF 5</strong>
          </div>

          <div className="mission-status">
            <span className="status-dot" />
            READY
          </div>
        </header>

        {/* PROGRESS */}
        <div className="mission-progress">
          <div className="mission-progress-bar">
            <div
              className="mission-progress-fill"
              style={{ width: "40%" }}
            />
          </div>

          <span>40%</span>
        </div>

        {/* MAIN CONTENT */}
        <section className="mission-content">

          <div className="mission-eyebrow">
            QA QUEST / MISSION BRIEF
          </div>

          <div className="mission-title-row">

            <div>
              <h1>
                Mission 001:
                <span> Broken Login</span>
              </h1>

              <p className="mission-subtitle">
                Investigate a broken authentication
                workflow and identify the defect.
              </p>
            </div>

            <div className="mission-xp">
              <strong>180</strong>
              <span>XP</span>
            </div>

          </div>

          {/* MISSION META */}
          <div className="mission-meta">

            <div className="mission-meta-card">
              <span className="meta-label">
                DIFFICULTY
              </span>

              <strong>
                🟢 Beginner
              </strong>
            </div>

            <div className="mission-meta-card">
              <span className="meta-label">
                TIME
              </span>

              <strong>
                ⏱ No time limit
              </strong>
            </div>

            <div className="mission-meta-card">
              <span className="meta-label">
                TARGET
              </span>

              <strong>
                🌐 Web Application
              </strong>
            </div>

          </div>

          {/* TARGET */}
          <div className="mission-target-card">

            <div className="mission-card-header">
              <div className="mission-card-icon">
                🌐
              </div>

              <div>
                <span className="card-eyebrow">
                  TEST TARGET
                </span>

                <h2>
                  Application under investigation
                </h2>
              </div>
            </div>

            <div className="mission-target-url">
              {websiteUrl}
            </div>

          </div>

          {/* BRIEF */}
          <div className="mission-brief-grid">

            <div className="mission-brief-card">

              <span className="card-eyebrow">
                REQUIREMENT
              </span>

              <h2>
                Registered users must be able
                to log in using valid credentials.
              </h2>

            </div>

            <div className="mission-brief-card">

              <span className="card-eyebrow">
                YOUR OBJECTIVE
              </span>

              <p>
                Design a structured test plan,
                execute the selected scenarios,
                identify failures and report
                any defects you discover.
              </p>

            </div>

          </div>

          {/* QA CHALLENGE */}
          <div className="mission-challenge">

            <div className="mission-challenge-icon">
              💡
            </div>

            <div>
              <strong>
                Think like a QA engineer
              </strong>

              <p>
                Don't only test the happy path.
                Consider invalid credentials,
                empty fields, boundary conditions
                and security-related inputs.
              </p>
            </div>

          </div>

          {/* ACTION */}
          <div className="mission-actions">

            <div className="mission-action-info">
              <span>
                NEXT STEP
              </span>

              <strong>
                Design your test plan
              </strong>
            </div>

            <button
              className="mission-primary-button"
              onClick={handleBeginTestPlan}
            >
              Design Test Plan
              <span>→</span>
            </button>

          </div>

        </section>

        {/* FOOTER */}
        <footer className="mission-footer">

          <span>
            QA Quest
          </span>

          <span>
            Quality Engineering Simulator
          </span>

          <span>
            Mission 001 / Broken Login
          </span>

        </footer>

      </div>
    </main>
  );
}

  if (screen === "test-plan") {
    return (
      <TestPlanScreen
        selectedTests={selectedTests}
        onToggle={handleToggleTest}
        onSelectAll={handleSelectAllTests}
        onExecute={handleStartExecution}
        onBack={() => setScreen("mission")}
      />
    );
  }

  /*
   * EXECUTION
   */
  if (screen === "execution") {
    return (
      <TestExecutionScreen
        selectedTests={selectedTests}
        executedTests={executedTests}
        failedTests={failedTests}
        onRunTest={handleRunTest}
        onReport={handleReport}
        onBack={handleBackToTestPlan}
      />
    );
  }

  /*
   * BUG REPORT
   */
  if (screen === "report") {
    return (
      <BugReportScreen
        failedTests={failedTests}
        onSubmit={handleBugReportSubmit}
        onBack={() =>
          setScreen("execution")
        }
      />
    );
  }

  /*
   * AUTOMATION
   */
  if (screen === "automation") {
    return (
      <AutomationScreen
        websiteUrl={websiteUrl}
        onComplete={
          handleAutomationComplete
        }
        onBack={() =>
          setScreen("report")
        }
      />
    );
  }

  /*
   * RESULT
   */
  if (screen === "result") {

    const passedCount =
      Object.values(testResults).filter(
        (result) => result === "pass",
      ).length;

    const failedCount =
      Object.values(testResults).filter(
        (result) => result === "fail",
      ).length;

    const executionXP =
      passedCount * 10;

    const totalXP =
      executionXP +
      bugScore +
      automationScore;

    return (
      <main className="execution-screen">
        <div className="execution-container">

          <section className="execution-instructions">

            <h1>Mission Complete</h1>

            <h2>
              QA Investigation Results
            </h2>

            <p>
              You completed the Broken Login
              mission.
            </p>

            <div className="result-box expected-box">
              <h3>Website Tested</h3>

              <p>
                <strong>
                  {websiteUrl}
                </strong>
              </p>
            </div>

            <div className="result-box expected-box">
              <h3>Tests Executed</h3>

              <p>
                {executedTests.length}
              </p>
            </div>

            <div className="result-box expected-box">
              <h3>Tests Passed</h3>

              <p>{passedCount}</p>
            </div>

            <div className="result-box actual-box">
              <h3>Tests Failed</h3>

              <p>{failedCount}</p>
            </div>

            <div className="result-box actual-box">
              <h3>Defects Discovered</h3>

              <p>
                {failedTests.length}
              </p>
            </div>

            <div className="result-box expected-box">
              <h3>Bug Report XP</h3>

              <p>+{bugScore} XP</p>
            </div>

            <div className="result-box expected-box">
              <h3>Execution XP</h3>

              <p>+{executionXP} XP</p>
            </div>

            <div className="result-box expected-box">
              <h3>Automation XP</h3>

              <p>
                +{automationScore} XP
              </p>
            </div>

            <div className="result-box expected-box">
              <h3>Total XP</h3>

              <p>
                <strong>
                  {totalXP} XP
                </strong>
              </p>
            </div>

            <div className="execution-result result-passed">

              <strong>
                Mission Successfully Completed
              </strong>

              <p>
                You planned tests, executed them,
                investigated defects, reported bugs
                and completed Playwright automation.
              </p>

            </div>

            <button
              className="report-button"
              onClick={handleReset}
            >
              Start New Mission
            </button>

          </section>

        </div>
      </main>
    );
  }

  return null;
}

export default App;