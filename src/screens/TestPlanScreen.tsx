import "../styles/TestPlanScreen.css";
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

interface TestPlanScreenProps {
  selectedTests: string[];
  onToggle: (testId: string) => void;
  onExecute: () => void;
  onBack: () => void;
}

function TestPlanScreen({
  selectedTests,
  onToggle,
  onExecute,
  onBack,
}: TestPlanScreenProps) {
  const bugCount = SAMPLE_TESTS.filter((t) => t.hasBug).length;

  return (
    <div className="test-plan-screen">
      <div className="test-plan-container">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>

        <h1>Create Your Test Plan</h1>
        <p className="subtitle">Select which tests to run</p>

        <div className="plan-info">
          <div className="info-box">
            <span>Total Tests: {SAMPLE_TESTS.length}</span>
          </div>
          <div className="info-box">
            <span>Tests with Bugs: {bugCount}</span>
          </div>
          <div className="info-box">
            <span>Selected: {selectedTests.length}</span>
          </div>
        </div>

        <div className="tests-list">
          {SAMPLE_TESTS.map((test) => (
            <div
              key={test.id}
              className={`test-item ${selectedTests.includes(test.id) ? "selected" : ""}`}
            >
              <input
                type="checkbox"
                id={test.id}
                checked={selectedTests.includes(test.id)}
                onChange={() => onToggle(test.id)}
              />
              <label htmlFor={test.id}>
                <div className="test-name">{test.name}</div>
                <div className="test-description">{test.description}</div>
                <div className="test-meta">
                  {test.hasBug && (
                    <span className="bug-indicator">⚠️ Contains Bug</span>
                  )}
                  {test.severity && (
                    <span className={`severity ${test.severity}`}>
                      {test.severity.toUpperCase()}
                    </span>
                  )}
                </div>
              </label>
            </div>
          ))}
        </div>

        <div className="plan-actions">
          <button
            className="execute-button"
            onClick={onExecute}
            disabled={selectedTests.length === 0}
          >
            Execute Test Plan ({selectedTests.length})
          </button>
        </div>
      </div>
    </div>
  );
}

export default TestPlanScreen;
