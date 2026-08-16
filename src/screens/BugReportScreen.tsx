import { useState } from "react";
import "../styles/BugReportScreen.css";

import {
  calculateBugScore,
} from "../utils/scoring";

import { testCases } from "../data/testCases";

import type { TestCase } from "../types/game";

interface BugReportScreenProps {
  failedTests: string[];
  onSubmit: (bugScore: number) => void;
  onBack: () => void;
}

interface BugReport {
  testId: string;
  description: string;
  severity: "low" | "medium" | "high";
}

function BugReportScreen({
  failedTests,
  onSubmit,
  onBack,
}: BugReportScreenProps) {
  const [bugs, setBugs] =
    useState<BugReport[]>([]);

  const [selectedTestId, setSelectedTestId] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [severity, setSeverity] =
    useState<"low" | "medium" | "high">(
      "medium",
    );

  /*
   * Get the actual TestCase objects
   * for the tests that failed during
   * execution.
   */
  const failedTestCases: TestCase[] =
    testCases.filter((test) =>
      failedTests.includes(test.id),
    );

  /*
   * Prevent the player from reporting
   * the same failed test more than once.
   */
  const reportedTestIds = bugs.map(
    (bug) => bug.testId,
  );

  const availableTests =
    failedTestCases.filter(
      (test) =>
        !reportedTestIds.includes(test.id),
    );

  /*
   * Add a new bug report.
   */
  const addBug = () => {
    if (
      !selectedTestId ||
      !description.trim()
    ) {
      return;
    }

    const newBug: BugReport = {
      testId: selectedTestId,
      description: description.trim(),
      severity,
    };

    setBugs((current) => [
      ...current,
      newBug,
    ]);

    setSelectedTestId("");
    setDescription("");
    setSeverity("medium");
  };

  /*
   * Remove a previously added bug.
   */
  const removeBug = (index: number) => {
    setBugs((current) =>
      current.filter(
        (_, i) => i !== index,
      ),
    );
  };

  /*
   * Calculate the score for all
   * submitted bug reports.
   */
  const calculateTotalScore = () => {
    return bugs.reduce(
      (total, bug) =>
        total +
        calculateBugScore({
          testId: bug.testId,
          severity: bug.severity,
          description: bug.description,
        }),
      0,
    );
  };

  /*
   * Submit the bug reports and
   * send the total XP back to App.tsx.
   */
  const handleSubmit = () => {
    const totalScore =
      calculateTotalScore();

    onSubmit(totalScore);
  };

  /*
   * Find a test case using its ID.
   */
  function getTestById(
    testId: string,
  ): TestCase | undefined {
    return testCases.find(
      (test) => test.id === testId,
    );
  }

  return (
    <div className="bug-report-screen">
      <div className="bug-report-container">

        {/* Back */}
        <button
          className="back-button"
          onClick={onBack}
        >
          ← Back
        </button>

        {/* Header */}
        <h1>Bug Report</h1>

        <p className="subtitle">
          Document the bugs you discovered
          during test execution.
        </p>

        {/* No bugs */}
        {failedTestCases.length === 0 ? (
          <div className="no-bugs-message">
            <h2>
              🎉 No Bugs Detected
            </h2>

            <p>
              None of the tests you selected
              failed.
            </p>

            <button
              className="submit-button"
              onClick={() =>
                onSubmit(0)
              }
            >
              Continue to Automation
            </button>
          </div>
        ) : (
          <>
            {/* =========================
                DETECTED BUGS
            ========================= */}

            <div className="detected-bugs">
              <h2>
                🐛 Bugs Detected
              </h2>

              <p>
                You discovered{" "}
                <strong>
                  {failedTestCases.length}
                </strong>{" "}
                failed test
                {failedTestCases.length !== 1
                  ? "s"
                  : ""}.
              </p>

              <div className="failed-test-list">
                {failedTestCases.map(
                  (test) => (
                    <div
                      key={test.id}
                      className="failed-test"
                    >
                      <span className="failed-test-id">
                        {test.id}
                      </span>

                      <div>
                        <strong>
                          {test.title}
                        </strong>

                        <p>
                          {test.description}
                        </p>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* =========================
                BUG FORM
            ========================= */}

            <div className="bug-form">
              <h2>
                Report a Bug
              </h2>

              {/* Failed test */}
              <div className="form-group">
                <label htmlFor="test">
                  Failed Test
                </label>

                <select
                  id="test"
                  value={selectedTestId}
                  onChange={(event) =>
                    setSelectedTestId(
                      event.target.value,
                    )
                  }
                >
                  <option value="">
                    Select a failed test...
                  </option>

                  {availableTests.map(
                    (test) => (
                      <option
                        key={test.id}
                        value={test.id}
                      >
                        {test.id} —{" "}
                        {test.title}
                      </option>
                    ),
                  )}
                </select>
              </div>

              {/* Test context */}
              {selectedTestId && (
                <div className="test-context">
                  {(() => {
                    const test =
                      getTestById(
                        selectedTestId,
                      );

                    if (!test) {
                      return null;
                    }

                    return (
                      <>
                        <div>
                          <strong>
                            Expected Result
                          </strong>

                          <p>
                            {test.expected}
                          </p>
                        </div>

                        <div>
                          <strong>
                            Actual Result
                          </strong>

                          <p>
                            {test.actual ??
                              "The observed result did not match the expected result."}
                          </p>
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}

              {/* Description */}
              <div className="form-group">
                <label htmlFor="description">
                  Bug Description
                </label>

                <textarea
                  id="description"
                  placeholder="Describe what went wrong..."
                  value={description}
                  onChange={(event) =>
                    setDescription(
                      event.target.value,
                    )
                  }
                  rows={5}
                />
              </div>

              {/* Severity */}
              <div className="form-group">
                <label htmlFor="severity">
                  Severity
                </label>

                <select
                  id="severity"
                  value={severity}
                  onChange={(event) =>
                    setSeverity(
                      event.target.value as
                        | "low"
                        | "medium"
                        | "high",
                    )
                  }
                >
                  <option value="low">
                    🟢 Low — Minor issue
                  </option>

                  <option value="medium">
                    🟡 Medium — Moderate issue
                  </option>

                  <option value="high">
                    🔴 High — Major issue
                  </option>
                </select>
              </div>

              {/* Add bug */}
              <button
                className="add-bug-button"
                onClick={addBug}
                disabled={
                  !selectedTestId ||
                  !description.trim()
                }
              >
                Add Bug Report
              </button>
            </div>

            {/* =========================
                REPORTED BUGS
            ========================= */}

            {bugs.length > 0 && (
              <div className="bugs-list">
                <h2>
                  Reported Bugs (
                  {bugs.length})
                </h2>

                <div className="score-display">
                  <p>
                    Points Earned:{" "}
                    <span className="points">
                      {calculateTotalScore()}
                    </span>
                  </p>
                </div>

                {bugs.map(
                  (bug, index) => {
                    const test =
                      getTestById(
                        bug.testId,
                      );

                    const bugScore =
                      calculateBugScore({
                        testId:
                          bug.testId,
                        severity:
                          bug.severity,
                        description:
                          bug.description,
                      });

                    return (
                      <div
                        key={`${bug.testId}-${index}`}
                        className={`bug-item severity-${bug.severity}`}
                      >
                        <div className="bug-header">
                          <div>
                            <span className="severity-badge">
                              {bug.severity.toUpperCase()}
                            </span>

                            <span className="bug-test-id">
                              {bug.testId}
                            </span>
                          </div>

                          <button
                            className="remove-button"
                            onClick={() =>
                              removeBug(index)
                            }
                          >
                            ✕
                          </button>
                        </div>

                        {test && (
                          <h3>
                            {test.title}
                          </h3>
                        )}

                        <p className="bug-description">
                          {bug.description}
                        </p>

                        <div className="bug-score">
                          +{bugScore} points
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
            )}

            {/* =========================
                SUBMIT
            ========================= */}

            <div className="report-actions">
              <button
                className="submit-button"
                onClick={handleSubmit}
                disabled={
                  bugs.length === 0
                }
              >
                Submit Bug Report & Continue
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default BugReportScreen;