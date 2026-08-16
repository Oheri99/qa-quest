import "../styles/MissionScreen.css";

interface MissionScreenProps {
  onStart: () => void;
  onBack: () => void;
}

const MISSIONS = [
  {
    id: "1",
    name: "Calculator App",
    description: "Test a basic calculator application",
    difficulty: "Beginner",
  },
  {
    id: "2",
    name: "Login Form",
    description: "Validate a user authentication system",
    difficulty: "Intermediate",
  },
  {
    id: "3",
    name: "E-Commerce Checkout",
    description: "Test a complex checkout workflow",
    difficulty: "Advanced",
  },
];

function MissionScreen({ onStart, onBack }: MissionScreenProps) {
  return (
    <div className="mission-screen">
      <div className="mission-container">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>

        <h1>Select a Mission</h1>
        <p className="subtitle">Choose a testing scenario to begin</p>

        <div className="missions-grid">
          {MISSIONS.map((mission) => (
            <div key={mission.id} className="mission-card">
              <div className="mission-header">
                <h2>{mission.name}</h2>
                <span className={`difficulty ${mission.difficulty.toLowerCase()}`}>
                  {mission.difficulty}
                </span>
              </div>
              <p>{mission.description}</p>
              <button className="select-button" onClick={onStart}>
                Start Mission
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MissionScreen;
