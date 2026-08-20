import "../styles/TestPlanScreen.css";
import { testCases } from "../data/testCases";
import type { TestCase } from "../types/game";

interface TestPlanScreenProps {
  selectedTests: string[];
  onToggle: (testId: string) => void;
  onSelectAll: () => void;
  onExecute: () => void;
  onBack: () => void;
}

function TestPlanScreen({
  selectedTests,
  onToggle,
  onSelectAll,
  onExecute,
  onBack,
}: TestPlanScreenProps) {
  const bugCount = testCases.filter(
    (test: TestCase) => test.hasBug,
  ).length;

  const selectedXp = testCases
    .filter((test: TestCase) =>
      selectedTests.includes(test.id),
    )
    .reduce(
      (total: number, test: TestCase) =>
        total + test.xp,
      0,
    );

  return (
    <div className="test-plan-screen">
      <div className="test-plan-container">

        <button
          type="button"
          className="back-button"
          onClick={onBack}
        >
          ← Back
        </button>

        <h1>Create Your Test Plan</h1>

        <p className="subtitle">
          Select the scenarios you believe
          should be tested before release.
        </p>

        <button
          type="button"
          className="select-all-button"
          onClick={onSelectAll}
        >
          {selectedTests.length === testCases.length
            ? "Deselect All Tests"
            : "Select All Tests"}
        </button>

        <div className="plan-info">

          <div className="info-box">
            <span>
              Total Tests: {testCases.length}
            </span>
          </div>

          <div className="info-box">
            <span>
              Tests with Bugs: {bugCount}
            </span>
          </div>

          <div className="info-box">
            <span>
              Selected: {selectedTests.length}
            </span>
          </div>

          <div className="info-box">
            <span>
              Potential XP: {selectedXp}
            </span>
          </div>

        </div>

        <div className="tests-list">

          {testCases.map((test: TestCase) => {

            const selected =
              selectedTests.includes(test.id);

            return (
              <div
                key={test.id}
                className={`test-item ${
                  selected ? "selected" : ""
                }`}
              >

                <input
                  type="checkbox"
                  id={test.id}
                  checked={selected}
                  onChange={() =>
                    onToggle(test.id)
                  }
                />

                <label htmlFor={test.id}>

                  <div className="test-name">
                    {test.id} — {test.title}
                  </div>

                  <div className="test-description">
                    {test.description}
                  </div>

                  <div className="test-meta">

                    <span className="severity">
                      {test.priority.toUpperCase()}
                      {" "}PRIORITY
                    </span>

                    <span>
                      +{test.xp} XP
                    </span>

                    {test.hasBug && (
                      <span className="bug-indicator">
                        🐛 Defect
                      </span>
                    )}

                  </div>

                </label>

              </div>
            );
          })}

        </div>

        <div className="plan-actions">

          <button
            type="button"
            className="execute-button"
            onClick={onExecute}
            disabled={
              selectedTests.length === 0
            }
          >
            Execute Test Plan (
            {selectedTests.length}
            )
          </button>

        </div>

      </div>
    </div>
  );
}

export default TestPlanScreen;