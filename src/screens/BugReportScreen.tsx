import { useState } from "react";
import "../styles/TestExecutionScreen.css";

import type { TestCase } from "../types/game";
import { testCases } from "../data/testCases";

interface BugReportScreenProps {
  failedTests: string[];
  onSubmit: (score: number) => void;
  onBack: () => void;
}

type Severity = "low" | "medium" | "high";

interface BugReport {
  testId: string;
  title: string;
  severity: Severity;
  description: string;
}

function BugReportScreen({
  failedTests,
  onSubmit,
  onBack,
}: BugReportScreenProps) {
  const failedTestCases = testCases.filter((test: TestCase) =>
    failedTests.includes(test.id),
  );

  const [reports, setReports] = useState<
    Record<string, BugReport>
  >({});

  const [submittedTests, setSubmittedTests] =
    useState<string[]>([]);

  /*
   * Update bug report fields.
   */
  const updateReport = (
    test: TestCase,
    field: keyof BugReport,
    value: string,
  ) => {
    setReports((current) => ({
      ...current,
      [test.id]: {
        testId: test.id,
        title:
          current[test.id]?.title ??
          `${test.id} — ${test.title}`,
        severity:
          current[test.id]?.severity ?? "medium",
        description:
          current[test.id]?.description ?? "",
        [field]: value,
      },
    }));
  };

  /*
   * Submit a single bug report.
   */
  const handleSubmitReport = (test: TestCase) => {
    const report = reports[test.id];

    if (!report) {
      alert("Complete the bug report before submitting.");
      return;
    }

    if (!report.description.trim()) {
      alert("Please describe the defect.");
      return;
    }

    setSubmittedTests((current) => {
      if (current.includes(test.id)) {
        return current;
      }

      return [...current, test.id];
    });
  };

  /*
   * Calculate XP.
   */
  const calculateScore = () => {
    let score = 0;

    submittedTests.forEach((testId) => {
      const report = reports[testId];

      if (!report) {
        return;
      }

      score += 10;

      if (report.description.trim().length >= 30) {
        score += 5;
      }

      if (report.severity === "high") {
        score += 10;
      } else if (report.severity === "medium") {
        score += 5;
      }
    });

    return score;
  };

  /*
   * Finish bug reporting.
   */
  const handleContinue = () => {
    if (
      failedTestCases.length > 0 &&
      submittedTests.length !== failedTestCases.length
    ) {
      alert(
        "Complete a bug report for every failed test before continuing.",
      );

      return;
    }

    const score = calculateScore();

    onSubmit(score);
  };

  return (
    <main className="execution-screen">
      <div className="execution-container">

        {/* BACK */}

        <button
          className="back-button"
          onClick={onBack}
        >
          ← Back to Test Execution
        </button>

        {/* HEADER */}

        <h1>Bug Report</h1>

        <p className="subtitle">
          Investigate the failed tests and document
          the defects you discovered.
        </p>

        {/* SUMMARY */}

        <div className="execution-stats">

          <div className="stat">
            <span className="stat-label">
              Failed Tests
            </span>

            <span className="stat-value">
              {failedTestCases.length}
            </span>
          </div>

          <div className="stat">
            <span className="stat-label">
              Reports Submitted
            </span>

            <span className="stat-value">
              {submittedTests.length}
            </span>
          </div>

          <div className="stat">
            <span className="stat-label">
              Bug XP
            </span>

            <span className="stat-value">
              {calculateScore()}
            </span>
          </div>

        </div>

        {/* NO BUGS */}

        {failedTestCases.length === 0 && (
          <div className="test-results">
            <div className="result-details">

              <h3>No defects discovered</h3>

              <p>
                All selected tests passed. There are
                no failed scenarios to report.
              </p>

            </div>
          </div>
        )}

        {/* BUG REPORTS */}

        {failedTestCases.map((test) => {
          const report = reports[test.id];

          const isSubmitted =
            submittedTests.includes(test.id);

          return (
            <div
              key={test.id}
              className={`test-results ${
                isSubmitted ? "passed" : ""
              }`}
              style={{ marginBottom: "25px" }}
            >

              {/* HEADER */}

              <div className="result-header">

                <div className="status-badge">
                  {isSubmitted
                    ? "REPORTED"
                    : "DEFECT"}
                </div>

                <div className="result-title">

                  <h3>
                    {test.id} — {test.title}
                  </h3>

                  <p>
                    {test.description}
                  </p>

                </div>

              </div>

              {/* FORM */}

              {!isSubmitted && (
                <div className="result-details">

                  {/* EXPECTED */}

                  <div className="expected">

                    <h4>
                      Expected Result
                    </h4>

                    <p>
                      {test.expected}
                    </p>

                  </div>

                  {/* ACTUAL */}

                  <div className="actual failed">

                    <h4>
                      Actual Result
                    </h4>

                    <p>
                      {test.actual ??
                        "The application produced an unexpected result."}
                    </p>

                  </div>

                  {/* TITLE */}

                  <div className="expected">

                    <h4>
                      Bug Title
                    </h4>

                    <input
                      type="text"
                      value={
                        report?.title ??
                        `${test.id} — ${test.title}`
                      }
                      onChange={(event) =>
                        updateReport(
                          test,
                          "title",
                          event.target.value,
                        )
                      }
                      placeholder="Describe the defect"
                      style={{
                        width: "100%",
                        padding: "12px",
                        marginTop: "8px",
                        border: "1px solid #ddd",
                        borderRadius: "6px",
                        boxSizing: "border-box",
                      }}
                    />

                  </div>

                  {/* SEVERITY */}

                  <div className="expected">

                    <h4>
                      Severity
                    </h4>

                    <select
                      value={
                        report?.severity ?? "medium"
                      }
                      onChange={(event) =>
                        updateReport(
                          test,
                          "severity",
                          event.target.value,
                        )
                      }
                      style={{
                        padding: "10px",
                        marginTop: "8px",
                        border: "1px solid #ddd",
                        borderRadius: "6px",
                      }}
                    >
                      <option value="low">
                        Low
                      </option>

                      <option value="medium">
                        Medium
                      </option>

                      <option value="high">
                        High
                      </option>
                    </select>

                  </div>

                  {/* DESCRIPTION */}

                  <div className="expected">

                    <h4>
                      Defect Description
                    </h4>

                    <textarea
                      value={
                        report?.description ?? ""
                      }
                      onChange={(event) =>
                        updateReport(
                          test,
                          "description",
                          event.target.value,
                        )
                      }
                      placeholder="Describe what happened, what was expected, and what actually happened."
                      rows={6}
                      style={{
                        width: "100%",
                        padding: "12px",
                        marginTop: "8px",
                        border: "1px solid #ddd",
                        borderRadius: "6px",
                        resize: "vertical",
                        boxSizing: "border-box",
                        fontFamily: "inherit",
                      }}
                    />

                  </div>

                  {/* SUBMIT */}

                  <button
                    className="report-button"
                    onClick={() =>
                      handleSubmitReport(test)
                    }
                  >
                    Submit Bug Report
                  </button>

                </div>
              )}

              {/* SUBMITTED */}

              {isSubmitted && (
                <div className="result-details">

                  <div className="decision-feedback passed">

                    <h4>
                      Bug Report Submitted
                    </h4>

                    <p>
                      Your defect report has been
                      recorded successfully.
                    </p>

                  </div>

                  <div className="expected">

                    <h4>
                      Severity
                    </h4>

                    <p>
                      {report?.severity.toUpperCase()}
                    </p>

                  </div>

                  <div className="expected">

                    <h4>
                      Description
                    </h4>

                    <p>
                      {report?.description}
                    </p>

                  </div>

                </div>
              )}

            </div>
          );
        })}

        {/* ACTIONS */}

        <div className="execution-actions">

          <button
            className="report-button"
            onClick={handleContinue}
            disabled={
              submittedTests.length !==
              failedTestCases.length
            }
          >
            Continue to Automation →
          </button>

          {failedTestCases.length > 0 &&
            submittedTests.length !==
              failedTestCases.length && (
              <p className="execution-hint">
                Submit a bug report for every
                failed test before continuing.
              </p>
            )}

        </div>

      </div>
    </main>
  );
}

export default BugReportScreen;