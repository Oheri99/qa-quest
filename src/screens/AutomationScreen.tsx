import { useState } from "react";
import "../styles/AutomationScreen.css";
import { calculateAutomationScore } from "../utils/scoring";

interface AutomationScreenProps {
  onComplete: (automationScore: number) => void;
  onBack: () => void;
}

interface AutomationTest {
  id: string;
  name: string;
  automated: boolean;
}

const TESTS_TO_AUTOMATE: AutomationTest[] = [
  {
    id: "test-1",
    name: "Valid Login",
    automated: false,
  },
  {
    id: "test-2",
    name: "Invalid Password",
    automated: false,
  },
  {
    id: "test-3",
    name: "Empty Username",
    automated: false,
  },
  {
    id: "test-4",
    name: "Session Timeout",
    automated: false,
  },
  {
    id: "test-5",
    name: "SQL Injection Prevention",
    automated: false,
  },
];

function AutomationScreen({ onComplete, onBack }: AutomationScreenProps) {
  const [automatedTests, setAutomatedTests] = useState<AutomationTest[]>(
    TESTS_TO_AUTOMATE,
  );

  const toggleAutomation = (testId: string) => {
    setAutomatedTests(
      automatedTests.map((test) =>
        test.id === testId ? { ...test, automated: !test.automated } : test,
      ),
    );
  };

  const automatedCount = automatedTests.filter((t) => t.automated).length;
  const totalCount = automatedTests.length;
  const automationScore = calculateAutomationScore(automatedCount, totalCount);

  const handleComplete = () => {
    onComplete(automationScore);
  };

  return (
    <div className="automation-screen">
      <div className="automation-container">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>

        <h1>Test Automation</h1>
        <p className="subtitle">Select test cases to automate for future runs</p>

        <div className="automation-info">
          <div className="info-card">
            <h3>Coverage</h3>
            <div className="coverage-bar">
              <div
                className="coverage-fill"
                style={{
                  width: `${(automatedCount / totalCount) * 100}%`,
                }}
              />
            </div>
            <p className="coverage-text">
              {automatedCount} of {totalCount} tests automated
            </p>
          </div>

          <div className="info-card">
            <h3>Points</h3>
            <p className="score-value">{automationScore}</p>
          </div>
        </div>

        <div className="automation-list">
          <h2>Select Tests to Automate</h2>
          <p className="list-description">
            Automating tests saves time on future runs and improves reliability
          </p>

          {automatedTests.map((test) => (
            <div
              key={test.id}
              className={`automation-item ${test.automated ? "automated" : ""}`}
            >
              <input
                type="checkbox"
                id={test.id}
                checked={test.automated}
                onChange={() => toggleAutomation(test.id)}
              />
              <label htmlFor={test.id}>
                <div className="test-info">
                  <span className="test-name">{test.name}</span>
                  {test.automated && (
                    <span className="automation-badge">✓ Automated</span>
                  )}
                </div>
              </label>
            </div>
          ))}
        </div>

        <div className="automation-benefits">
          <h3>Benefits of Test Automation</h3>
          <ul>
            <li>🚀 Faster test execution</li>
            <li>💪 Consistent results</li>
            <li>🔄 Continuous integration support</li>
            <li>📊 Better coverage tracking</li>
          </ul>
        </div>

        <div className="automation-actions">
          <button className="complete-button" onClick={handleComplete}>
            Finish & View Results
          </button>
        </div>
      </div>
    </div>
  );
}

export default AutomationScreen;
