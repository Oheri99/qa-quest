import "../styles/HomeScreen.css";

type HomeScreenProps = {
  onStartMission: () => void;
};

function HomeScreen({
  onStartMission,
}: HomeScreenProps) {
  return (
    <main className="qa-home">
      {/* NAVIGATION */}
      <header className="qa-home-nav">
        <div className="qa-brand">
          <div className="qa-brand-mark">
            Q
          </div>

          <div className="qa-brand-text">
            <strong>QA Quest</strong>

            <span>
              Quality Engineering Simulator
            </span>
          </div>
        </div>

        <div className="qa-nav-status">
          <span className="status-dot" />
          Mission Ready
        </div>
      </header>

      {/* HERO */}
      <section className="qa-hero">
        <div className="qa-hero-content">
          <div className="qa-eyebrow">
            SOFTWARE QUALITY ENGINEERING
          </div>

          <h1>
            Think like a QA Engineer.
            <br />
            <span>
              Test like an automation engineer.
            </span>
          </h1>

          <p className="qa-hero-description">
            Investigate a real-world software
            defect, design a test strategy,
            execute tests, report bugs and
            build Playwright automation.
          </p>

          <div className="qa-hero-actions">
            <button
              className="qa-primary-button"
              onClick={onStartMission}
            >
              Start Mission
              <span>→</span>
            </button>

            <div className="qa-hero-meta">
              <span>180 XP</span>
              <span>•</span>
              <span>Beginner</span>
              <span>•</span>
              <span>~20 min</span>
            </div>
          </div>
        </div>

        {/* MISSION CARD */}
        <div className="qa-hero-panel">
          <div className="hero-panel-header">
            <span>MISSION 001</span>

            <span className="hero-live">
              <span className="status-dot" />
              READY
            </span>
          </div>

          <div className="hero-panel-body">
            <div className="mission-icon">
              QA
            </div>

            <h3>Broken Login</h3>

            <p>
              Investigate authentication
              behaviour and identify defects.
            </p>

            <div className="mission-stat">
              <span>Difficulty</span>
              <strong>Beginner</strong>
            </div>

            <div className="mission-stat">
              <span>XP Available</span>
              <strong>180 XP</strong>
            </div>

            <div className="mission-stat">
              <span>Focus</span>
              <strong>Web + Automation</strong>
            </div>
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="qa-workflow">
        <div className="qa-section-heading">
          <div>
            <span className="section-label">
              THE WORKFLOW
            </span>

            <h2>
              From defect discovery
              <br />
              to automation
            </h2>
          </div>

          <p>
            Follow the same workflow used by
            professional QA engineers.
          </p>
        </div>

        <div className="qa-workflow-grid">
          <div className="qa-workflow-card">
            <div className="workflow-number">
              01
            </div>

            <h3>Plan</h3>

            <p>
              Analyse the mission and select
              the right test scenarios.
            </p>

            <span className="workflow-tag">
              Test Strategy
            </span>
          </div>

          <div className="qa-workflow-card">
            <div className="workflow-number">
              02
            </div>

            <h3>Execute</h3>

            <p>
              Run your selected tests and
              record the actual results.
            </p>

            <span className="workflow-tag">
              Test Execution
            </span>
          </div>

          <div className="qa-workflow-card">
            <div className="workflow-number">
              03
            </div>

            <h3>Investigate</h3>

            <p>
              Analyse failures and identify
              defects in the application.
            </p>

            <span className="workflow-tag">
              Defect Analysis
            </span>
          </div>

          <div className="qa-workflow-card">
            <div className="workflow-number">
              04
            </div>

            <h3>Automate</h3>

            <p>
              Write Playwright tests and
              verify expected behaviour.
            </p>

            <span className="workflow-tag">
              Playwright
            </span>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="qa-skills">
        <div className="qa-skills-content">
          <span className="section-label">
            SKILLS YOU WILL PRACTISE
          </span>

          <h2>
            Build practical QA
            <br />
            engineering experience.
          </h2>

          <p>
            QA Quest is designed around the
            activities that modern software
            testers perform every day.
          </p>
        </div>

        <div className="qa-skill-list">
          <div className="qa-skill">
            <span>✓</span>
            Test Planning
          </div>

          <div className="qa-skill">
            <span>✓</span>
            Functional Testing
          </div>

          <div className="qa-skill">
            <span>✓</span>
            Defect Reporting
          </div>

          <div className="qa-skill">
            <span>✓</span>
            Test Analysis
          </div>

          <div className="qa-skill">
            <span>✓</span>
            Playwright
          </div>

          <div className="qa-skill">
            <span>✓</span>
            TypeScript
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="qa-final-cta">
        <div>
          <span className="section-label">
            READY TO TEST?
          </span>

          <h2>
            Your first mission starts here.
          </h2>

          <p>
            Find the defect. Prove it. Automate it.
          </p>
        </div>

        <button
          className="qa-primary-button"
          onClick={onStartMission}
        >
          Start QA Quest
          <span>→</span>
        </button>
      </section>

      {/* FOOTER */}
      <footer className="qa-home-footer">
        <span>QA Quest</span>

        <span>
          Quality Engineering Simulator
        </span>

        <span>Mission 001</span>
      </footer>
    </main>
  );
}

export default HomeScreen;