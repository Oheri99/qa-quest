import "../styles/ResultScreen.css";

interface ResultScreenProps {
  score: number;
  onHome: () => void;
}

function ResultScreen({ score, onHome }: ResultScreenProps) {
  const getScoreRating = (score: number) => {
    if (score >= 200) return { rating: "S", label: "Master QA Engineer!" };
    if (score >= 150) return { rating: "A", label: "Expert Tester" };
    if (score >= 100) return { rating: "B", label: "Proficient Tester" };
    if (score >= 50) return { rating: "C", label: "Developing Skills" };
    return { rating: "D", label: "Keep Learning" };
  };

  const { rating, label } = getScoreRating(score);

  return (
    <div className="result-screen">
      <div className="result-container">
        <div className="result-content">
          <div className="rating-display">
            <div className="rating-badge">{rating}</div>
            <h1>{label}</h1>
          </div>

          <div className="score-summary">
            <h2>Final Score</h2>
            <div className="score-circle">
              <span className="score-number">{score}</span>
            </div>
          </div>

          <div className="result-breakdown">
            <h3>Mission Complete!</h3>
            <div className="breakdown-items">
              <div className="breakdown-item">
                <span className="icon">📋</span>
                <div>
                  <h4>Test Planning</h4>
                  <p>Selected and prioritized test cases effectively</p>
                </div>
              </div>
              <div className="breakdown-item">
                <span className="icon">🐛</span>
                <div>
                  <h4>Bug Discovery</h4>
                  <p>Identified and reported critical defects</p>
                </div>
              </div>
              <div className="breakdown-item">
                <span className="icon">🤖</span>
                <div>
                  <h4>Test Automation</h4>
                  <p>Created automated validation for future runs</p>
                </div>
              </div>
            </div>
          </div>

          {score >= 150 && (
            <div className="achievement-box">
              <h3>🎖️ Achievement Unlocked!</h3>
              <p>
                {score >= 200
                  ? "You've mastered the complete QA lifecycle!"
                  : "You've demonstrated strong QA skills!"}
              </p>
            </div>
          )}

          <div className="tips-box">
            <h3>Tips for Next Time</h3>
            <ul>
              <li>
                Focus on edge cases and boundary conditions in test planning
              </li>
              <li>Document all bugs with clear reproduction steps</li>
              <li>Automate tests that run frequently for maximum ROI</li>
              <li>Consider security, performance, and usability testing</li>
            </ul>
          </div>

          <div className="result-actions">
            <button className="home-button" onClick={onHome}>
              Play Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultScreen;
