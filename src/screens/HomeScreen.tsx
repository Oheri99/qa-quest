import "../styles/HomeScreen.css";

interface HomeScreenProps {
  score: number;
  onStart: () => void;
}

function HomeScreen({ score, onStart }: HomeScreenProps) {
  return (
    <div className="home-screen">
      <div className="home-container">
        <h1>QA Quest</h1>
        <p className="tagline">Master the Art of Software Testing</p>

        <div className="score-display">
          <p className="score-label">Your Best Score</p>
          <p className="score-value">{score}</p>
        </div>

        <div className="instructions">
          <h2>Welcome to QA Quest!</h2>
          <p>
            Become a QA expert by testing software, finding bugs, and automating
            test cases. Each mission presents real-world testing scenarios where
            you'll plan tests, execute them, report bugs, and automate
            validation.
          </p>

          <div className="how-to-play">
            <h3>How to Play</h3>
            <ol>
              <li>
                <strong>Plan:</strong> Select which test cases to run
              </li>
              <li>
                <strong>Execute:</strong> Run your test plan and find bugs
              </li>
              <li>
                <strong>Report:</strong> Document bugs you discover
              </li>
              <li>
                <strong>Automate:</strong> Create automated tests for validation
              </li>
            </ol>
          </div>
        </div>

        <button className="start-button" onClick={onStart}>
          Start Playing
        </button>
      </div>
    </div>
  );
}

export default HomeScreen;
