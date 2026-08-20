import { useState } from "react";
import "../styles/TestExecutionScreen.css";

import type { TestCase } from "../types/game";
import { testCases } from "../data/testCases";

interface TestExecutionScreenProps {
  selectedTests: string[];
  executedTests: string[];
  failedTests: string[];

  onRunTest: (
    test: TestCase,
    result: "pass" | "fail",
  ) => void;

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

  const [runningTests, setRunningTests] =
    useState<string[]>([]);

  /*
   * Only display tests selected
   * during test planning.
   */
  const testsToRun = testCases.filter((test) =>
    selectedTests.includes(test.id),
  );

  /*
   * Determine current test status.
   */
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

  /*
   * Check whether every selected test
   * has been executed.
   */
  const allTestsExecuted =
    testsToRun.length > 0 &&
    testsToRun.every((test) =>
      executedTests.includes(test.id),
    );

  /*
   * Start inspecting a test.
   */
  function handleRunTest(test: TestCase) {
    if (executedTests.includes(test.id)) {
      return;
    }

    setRunningTests((current) => {
      if (current.includes(test.id)) {
        return current;
      }

      return [...current, test.id];
    });

    setExpandedTest(test.id);
  }

  /*
   * Record player's PASS / FAIL decision.
   */
  function handleDecision(
    test: TestCase,
    result: "pass" | "fail",
  ) {
    onRunTest(test, result);

    setRunningTests((current) =>
      current.filter(
        (id) => id !== test.id,
      ),
    );

    setExpandedTest(test.id);
  }

  return (
    <div className="execution-screen">
      <div className="execution-container">

        {/* BACK */}

        <button
          className="back-button"
          onClick={onBack}
        >
          ← Back
        </button>

        {/* HEADER */}

        <h1>Test Execution</h1>

        <p className="subtitle">
          Run your test cases, inspect the results,
          and identify bugs.
        </p>

        {/* STATS */}

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
              {
                executedTests.filter((id) =>
                  selectedTests.includes(id),
                ).length
              }
            </span>
          </div>

          <div className="stat">
            <span className="stat-label">
              Failed:
            </span>

            <span className="stat-value">
              {
                failedTests.filter((id) =>
                  selectedTests.includes(id),
                ).length
              }
            </span>
          </div>

        </div>

        {/* TEST RESULTS */}

        <div className="test-results">

          {testsToRun.map((test) => {
            const status =
              getTestStatus(test.id);

            const isExecuted =
              executedTests.includes(test.id);

            const isRunning =
              runningTests.includes(test.id);

            const isExpanded =
              expandedTest === test.id;

            return (
              <div
                key={test.id}
                className={`result-item ${status}`}
              >

                {/* RESULT HEADER */}

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

                    {!isRunning &&
                      !isExecuted && (
                        <button
                          className="run-button"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleRunTest(test);
                          }}
                        >
                          Run Test
                        </button>
                      )}

                    {isRunning && (
                      <span className="running-label">
                        Inspect Result
                      </span>
                    )}

                    <span className="expand-icon">
                      {isExpanded
                        ? "▼"
                        : "▶"}
                    </span>

                  </div>

                </div>

                {/* TEST DETAILS */}

                {isExpanded && (
                  <div className="result-details">

                    {/* EXPECTED */}

                    <div className="expected">

                      <h4>
                        Expected Result:
                      </h4>

                      <p>
                        {test.expected}
                      </p>

                    </div>

                    {/* ACTUAL */}

                    {(isRunning ||
                      isExecuted) && (
                      <div
                        className={`actual ${
                          isExecuted
                            ? status
                            : ""
                        }`}
                      >

                        <h4>
                          Actual Result:
                        </h4>

                        <p>
                          {test.actual ??
                            (
                              test.hasBug
                                ? "The application produced an unexpected result."
                                : "The test passed successfully."
                            )}
                        </p>

                      </div>
                    )}

                    {/* PASS / FAIL */}

                    {isRunning &&
                      !isExecuted && (
                        <div className="test-decision">

                          <h4>
                            What is the test result?
                          </h4>

                          <p>
                            Compare the expected
                            result with the actual
                            result before making
                            your decision.
                          </p>

                          <div className="decision-buttons">

                            <button
                              className="pass-button"
                              onClick={() =>
                                handleDecision(
                                  test,
                                  "pass",
                                )
                              }
                            >
                              ✓ PASS
                            </button>

                            <button
                              className="fail-button"
                              onClick={() =>
                                handleDecision(
                                  test,
                                  "fail",
                                )
                              }
                            >
                              ✕ FAIL
                            </button>

                          </div>

                        </div>
                    )}

                    {/* DECISION FEEDBACK */}

                    {isExecuted && (
                      <div
                        className={`decision-feedback ${status}`}
                      >

                        <h4>
                          Test Result
                        </h4>

                        <p>
                          {status === "failed"
                            ? "You marked this test as FAILED."
                            : "You marked this test as PASSED."}
                        </p>

                      </div>
                    )}

                    {/* PRIORITY */}

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

        {/* ACTIONS */}

        <div className="execution-actions">

          <button
            className="report-button"
            onClick={onReport}
            disabled={!allTestsExecuted}
          >
            Review & Report Bugs
          </button>

          {!allTestsExecuted && (
            <p className="execution-hint">
              Execute all selected test cases
              before reporting bugs.
            </p>
          )}

        </div>

      </div>
    </div>
  );
}

export default TestExecutionScreen;