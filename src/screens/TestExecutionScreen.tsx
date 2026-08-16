import { useState } from "react";
import "../styles/TestExecutionScreen.css";
import type { TestCase } from "../types/game";

const SAMPLE_TESTS: TestCase[] = [
  {
    id: "test-1",
    name: "Valid Login",
    description: "User logs in with correct credentials",
    steps: [
      "Navigate to login page",
      "Enter username",
      "Enter password",
      "Click login",
    ],
    expectedResult: "User is redirected to dashboard",
    hasBug: false,
  },
  {
    id: "test-2",
    name: "Invalid Password",
    description: "User attempts login with wrong password",
    steps: [
      "Navigate to login page",
      "Enter correct username",
      "Enter incorrect password",
      "Click login",
    ],
    expectedResult: "Error message displayed",
    hasBug: true,
    severity: "high",
  },
  {
    id: "test-3",
    name: "Empty Username",
    description: "User attempts login with empty username",
    steps: [
      "Navigate to login page",
      "Leave username empty",
      "Enter password",
      "Click login",
    ],
    expectedResult: "Validation error shown",
    hasBug: false,
  },
  {
    id: "test-4",
    name: "Session Timeout",
    description: "Verify session handling after timeout",
    steps: [
      "Log in successfully",
      "Wait for session timeout",
      "Attempt action",
    ],
    expectedResult: "User redirected to login",
    hasBug: true,
    severity: "medium",
  },
  {
    id: "test-5",
    name: "SQL Injection Prevention",
    description: "Test SQL injection protection",
    steps: [
      "Navigate to login",
      "Enter SQL injection payload",
      "Attempt login",
    ],
    expectedResult: "Attack blocked, normal error shown",
    hasBug: false,
  },
];

interface TestExecutionScreenProps {
  selectedTests: string[];
  executedTests: string[];
  failedTests: string[];
  onRunTest: (test: TestCase) => void;
  onReport: () => void;
  onBack: () => void;
}

function TestExecutionScreen({
  selectedTests,
  executedTests,
  failedTests,
  onRunTest,
  onReport,
  onBack,
}: TestExecutionScreenProps) {
  const [expandedTest, setExpandedTest] = useState<string | null>(null);

  const testsToRun = SAMPLE_TESTS.filter((t) =>
    selectedTests.includes(t.id),
  );

  const getTestStatus = (testId: string) => {
    if (!executedTests.includes(testId)) return "pending";
    return failedTests.includes(testId) ? "failed" : "passed";
  };

  return (
    <div className="execution-screen">
      <div className="execution-container">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>

        <h1>Test Execution</h1>
        <p className="subtitle">Run your test cases and identify bugs</p>

        <div className="execution-stats">
          <div className="stat">
            <span className="stat-label">Total:</span>
            <span className="stat-value">{testsToRun.length}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Executed:</span>
            <span className="stat-value">{executedTests.length}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Failed:</span>
            <span className="stat-value" style={{ color: "var(--error)" }}>
              {failedTests.length}
            </span>
          </div>
        </div>

        <div className="test-results">
          {testsToRun.map((test) => {
            const status = getTestStatus(test.id);
            return (
              <div key={test.id} className={`result-item ${status}`}>
                <div
                  className="result-header"
                  onClick={() =>
                    setExpandedTest(
                      expandedTest === test.id ? null : test.id,
                    )
                  }
                >
                  <div className="status-badge">{status.toUpperCase()}</div>
                  <div className="result-title">
                    <h3>{test.name}</h3>
                    <p>{test.description}</p>
                  </div>
                  <div className="result-actions">
                    {!executedTests.includes(test.id) && (
                      <button
                        className="run-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRunTest(test);
                        }}
                      >
                        Run Test
                      </button>
                    )}
                    <span className="expand-icon">
                      {expandedTest === test.id ? "▼" : "▶"}
                    </span>
                  </div>
                </div>

                {expandedTest === test.id && (
                  <div className="result-details">
                    <div className="steps">
                      <h4>Test Steps:</h4>
                      <ol>
                        {test.steps.map((step, idx) => (
                          <li key={idx}>{step}</li>
                        ))}
                      </ol>
                    </div>
                    <div className="expected">
                      <h4>Expected Result:</h4>
                      <p>{test.expectedResult}</p>
                    </div>
                    {executedTests.includes(test.id) && (
                      <div className={`actual ${status}`}>
                        <h4>Actual Result:</h4>
                        <p>
                          {status === "failed"
                            ? "❌ Test failed - bug detected!"
                            : "✅ Test passed - no issues found"}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="execution-actions">
          <button
            className="report-button"
            onClick={onReport}
            disabled={executedTests.length === 0}
          >
            Review & Report Bugs
          </button>
        </div>
      </div>
    </div>
  );
}

export default TestExecutionScreen;
