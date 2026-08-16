import { useState } from "react";
import "../styles/TestExecutionScreen.css";

import type { TestCase } from "../types/game";
import { testCases } from "../data/testCases";

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
  const [expandedTest, setExpandedTest] =
    useState<string | null>(null);

  /*
   * Only show the tests selected
   * during test planning.
   */
  const testsToRun = testCases.filter((test) =>
    selectedTests.includes(test.id),
  );

  function getTestStatus(
    testId: string,
  ): "pending" | "failed" | "passed" {
    if (!executedTests.includes(testId)) {
      return "pending";
    }

    return failedTests.includes(testId)
      ? "failed"
      : "passed";
  }

  const allTestsExecuted =
    testsToRun.length > 0 &&
    testsToRun.every((test) =>
      executedTests.includes(test.id),
    );

  return (
    <div className="execution-screen">
      <div className="execution-container">

        <button
          className="back-button"
          onClick={onBack}
        >
          ← Back
        </button>

        <h1>Test Execution</h1>

        <p className="subtitle">
          Run your test cases and identify bugs
        </p>

        {/* =========================
            EXECUTION STATS
        ========================= */}

        <div className="execution-stats">

          <div className="stat">
            <span className="stat-label">
              Total:
            </span>

            <span className="stat-value">
              {testsToRun.length}
            </span>
          </div>

          <div className="stat">
            <span className="stat-label">
              Executed:
            </span>

            <span className="stat-value">
              {executedTests.length}
            </span>
          </div>

          <div className="stat">
            <span className="stat-label">
              Failed:
            </span>

            <span className="stat-value">
              {failedTests.length}
            </span>
          </div>

        </div>

        {/* =========================
            TEST RESULTS
        ========================= */}

        <div className="test-results">

          {testsToRun.map((test) => {

            const status =
              getTestStatus(test.id);

            const isExecuted =
              executedTests.includes(
                test.id,
              );

            const isExpanded =
              expandedTest === test.id;

            return (
              <div
                key={test.id}
                className={`result-item ${status}`}
              >

                {/* =========================
                    RESULT HEADER
                ========================= */}

                <div
                  className="result-header"
                  onClick={() =>
                    setExpandedTest(
                      isExpanded
                        ? null
                        : test.id,
                    )
                  }
                >

                  <div className="status-badge">
                    {status.toUpperCase()}
                  </div>

                  <div className="result-title">

                    <h3>
                      {test.id} — {test.title}
                    </h3>

                    <p>
                      {test.description}
                    </p>

                  </div>

                  <div className="result-actions">

                    {!isExecuted && (
                      <button
                        className="run-button"
                        onClick={(event) => {
                          event.stopPropagation();
                          onRunTest(test);
                        }}
                      >
                        Run Test
                      </button>
                    )}

                    <span className="expand-icon">
                      {isExpanded
                        ? "▼"
                        : "▶"}
                    </span>

                  </div>

                </div>

                {/* =========================
                    TEST DETAILS
                ========================= */}

                {isExpanded && (
                  <div className="result-details">

                    {/* Expected */}

                    <div className="expected">

                      <h4>
                        Expected Result:
                      </h4>

                      <p>
                        {test.expected}
                      </p>

                    </div>

                    {/* Actual */}

                    {isExecuted && (
                      <div
                        className={`actual ${status}`}
                      >

                        <h4>
                          Actual Result:
                        </h4>

                        <p>
                          {test.actual ??
                            (status ===
                            "failed"
                              ? "Login failed and the user remained on the login page."
                              : "Test passed successfully.")}
                        </p>

                      </div>
                    )}

                    {/* Priority */}

                    <div className="expected">

                      <h4>
                        Priority:
                      </h4>

                      <p>
                        {test.priority.toUpperCase()}
                      </p>

                    </div>

                  </div>
                )}

              </div>
            );
          })}

        </div>

        {/* =========================
            ACTIONS
        ========================= */}

        <div className="execution-actions">

          <button
            className="report-button"
            onClick={onReport}
            disabled={
              !allTestsExecuted
            }
          >
            Review & Report Bugs
          </button>

        </div>

      </div>
    </div>
  );
}

export default TestExecutionScreen;