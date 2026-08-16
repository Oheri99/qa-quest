import { useState } from "react";
import "../styles/BugReportScreen.css";
import { calculateBugScore } from "../utils/scoring";

interface BugReportScreenProps {
  onSubmit: (bugScore: number) => void;
  onBack: () => void;
}

interface BugReport {
  description: string;
  severity: "low" | "medium" | "high";
}

function BugReportScreen({ onSubmit, onBack }: BugReportScreenProps) {
  const [bugs, setBugs] = useState<BugReport[]>([]);
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState<"low" | "medium" | "high">("medium");

  const addBug = () => {
    if (description.trim()) {
      setBugs([...bugs, { description, severity }]);
      setDescription("");
      setSeverity("medium");
    }
  };

  const removeBug = (index: number) => {
    setBugs(bugs.filter((_, i) => i !== index));
  };

  const calculateTotalScore = () => {
    return bugs.reduce((total, bug) => total + calculateBugScore(bug.severity), 0);
  };

  const handleSubmit = () => {
    const totalScore = calculateTotalScore();
    onSubmit(totalScore);
  };

  return (
    <div className="bug-report-screen">
      <div className="bug-report-container">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>

        <h1>Bug Report</h1>
        <p className="subtitle">Document the bugs you found during testing</p>

        <div className="bug-form">
          <div className="form-group">
            <label htmlFor="description">Bug Description</label>
            <textarea
              id="description"
              placeholder="Describe the bug you found..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          <div className="form-group">
            <label htmlFor="severity">Severity Level</label>
            <select
              id="severity"
              value={severity}
              onChange={(e) =>
                setSeverity(e.target.value as "low" | "medium" | "high")
              }
            >
              <option value="low">🟢 Low - Minor issue</option>
              <option value="medium">🟡 Medium - Moderate issue</option>
              <option value="high">🔴 High - Critical issue</option>
            </select>
          </div>

          <button className="add-bug-button" onClick={addBug}>
            Add Bug Report
          </button>
        </div>

        {bugs.length > 0 && (
          <div className="bugs-list">
            <h2>Reported Bugs ({bugs.length})</h2>
            <div className="score-display">
              <p>Points Earned: <span className="points">{calculateTotalScore()}</span></p>
            </div>

            {bugs.map((bug, index) => (
              <div key={index} className={`bug-item severity-${bug.severity}`}>
                <div className="bug-header">
                  <span className="severity-badge">{bug.severity.toUpperCase()}</span>
                  <button
                    className="remove-button"
                    onClick={() => removeBug(index)}
                  >
                    ✕
                  </button>
                </div>
                <p className="bug-description">{bug.description}</p>
                <div className="bug-score">
                  +{calculateBugScore(bug.severity)} points
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="report-actions">
          <button
            className="submit-button"
            onClick={handleSubmit}
            disabled={bugs.length === 0}
          >
            Submit Bug Report & Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default BugReportScreen;
