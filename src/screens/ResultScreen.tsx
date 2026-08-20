import "../styles/ResultScreen.css";

interface ResultScreenProps {
  score: number;
  planScore: number;
  bugScore: number;
  automationScore: number;
  onHome: () => void;
}

interface ScoreRating {
  rating: string;
  label: string;
}

function ResultScreen({
  score,
  planScore,
  bugScore,
  automationScore,
  onHome,
}: ResultScreenProps) {
  /*
   * Determine the player's final rating.
   */
  function getScoreRating(
    currentScore: number,
  ): ScoreRating {
    if (currentScore >= 200) {
      return {
        rating: "S",
        label: "Master QA Engineer!",
      };
    }

    if (currentScore >= 150) {
      return {
        rating: "A",
        label: "Expert Tester",
      };
    }

    if (currentScore >= 100) {
      return {
        rating: "B",
        label: "Proficient Tester",
      };
    }

    if (currentScore >= 50) {
      return {
        rating: "C",
        label: "Developing Skills",
      };
    }

    return {
      rating: "D",
      label: "Keep Learning",
    };
  }

  const { rating, label } =
    getScoreRating(score);

  return (
    <div className="result-screen">
      <div className="result-container">
        <div className="result-content">

          {/* =========================
              RATING
              ========================= */}

          <div className="rating-display">
            <div className="rating-badge">
              {rating}
            </div>

            <h1>{label}</h1>

            <p>
              Mission complete! Here's your
              QA Quest performance.
            </p>
          </div>

          {/* =========================
              FINAL SCORE
              ========================= */}

          <div className="score-summary">
            <h2>Final Score</h2>

            <div className="score-circle">
              <span className="score-number">
                {score}
              </span>

              <span className="score-label">
                XP
              </span>
            </div>
          </div>

          {/* =========================
              SCORE BREAKDOWN
              ========================= */}

          <div className="score-breakdown">
            <h3>Score Breakdown</h3>

            <div className="score-breakdown-grid">

              {/* TEST PLANNING */}

              <div className="score-card">
                <span className="score-icon">
                  📋
                </span>

                <h4>Test Planning</h4>

                <strong>
                  +{planScore} XP
                </strong>

                <p>
                  Test cases selected and
                  prioritised.
                </p>
              </div>

              {/* BUG REPORTING */}

              <div className="score-card">
                <span className="score-icon">
                  🐛
                </span>

                <h4>Bug Reporting</h4>

                <strong>
                  +{bugScore} XP
                </strong>

                <p>
                  Defects identified and
                  documented.
                </p>
              </div>

              {/* AUTOMATION */}

              <div className="score-card">
                <span className="score-icon">
                  🤖
                </span>

                <h4>Automation</h4>

                <strong>
                  +{automationScore} XP
                </strong>

                <p>
                  Playwright tests created
                  and analysed.
                </p>
              </div>

            </div>
          </div>

          {/* =========================
              MISSION COMPLETE
              ========================= */}

          <div className="result-breakdown">
            <h3>
              🏆 Mission Complete!
            </h3>

            <div className="breakdown-items">

              {/* TEST PLANNING */}

              <div className="breakdown-item">
                <span className="icon">
                  📋
                </span>

                <div>
                  <h4>
                    Test Planning
                  </h4>

                  <p>
                    Selected and prioritised
                    test cases effectively.
                  </p>
                </div>
              </div>

              {/* BUG DISCOVERY */}

              <div className="breakdown-item">
                <span className="icon">
                  🐛
                </span>

                <div>
                  <h4>
                    Bug Discovery
                  </h4>

                  <p>
                    Investigated failed tests
                    and documented defects.
                  </p>
                </div>
              </div>

              {/* AUTOMATION */}

              <div className="breakdown-item">
                <span className="icon">
                  🤖
                </span>

                <div>
                  <h4>
                    Test Automation
                  </h4>

                  <p>
                    Created Playwright
                    automation for key
                    scenarios.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* =========================
              ACHIEVEMENT
              ========================= */}

          {score >= 150 && (
            <div className="achievement-box">
              <h3>
                🎖️ Achievement Unlocked!
              </h3>

              {score >= 200 ? (
                <p>
                  You've mastered the
                  complete QA lifecycle!
                </p>
              ) : (
                <p>
                  You've demonstrated
                  strong QA skills!
                </p>
              )}
            </div>
          )}

          {/* =========================
              PERFORMANCE MESSAGE
              ========================= */}

          {score < 150 && (
            <div className="tips-box">
              <h3>
                💡 Keep Improving
              </h3>

              <p>
                Every test is an opportunity
                to improve your QA skills.
              </p>

              <ul>
                <li>
                  Explore more edge cases
                  and boundary conditions.
                </li>

                <li>
                  Write clear and reproducible
                  defect reports.
                </li>

                <li>
                  Use stable, user-facing
                  Playwright locators.
                </li>

                <li>
                  Think about security,
                  performance and
                  accessibility.
                </li>
              </ul>
            </div>
          )}

          {/* =========================
              TIPS
              ========================= */}

          {score >= 150 && (
            <div className="tips-box">
              <h3>
                💡 Tips for Your Next Mission
              </h3>

              <ul>
                <li>
                  Focus on edge cases and
                  boundary conditions.
                </li>

                <li>
                  Document bugs with clear
                  reproduction steps.
                </li>

                <li>
                  Automate tests that run
                  frequently.
                </li>

                <li>
                  Consider security,
                  performance,
                  accessibility and
                  usability.
                </li>
              </ul>
            </div>
          )}

          {/* =========================
              PLAY AGAIN
              ========================= */}

          <div className="result-actions">
            <button
              className="home-button"
              onClick={onHome}
            >
              🔄 Play Again
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ResultScreen;