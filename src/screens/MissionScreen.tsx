import "../styles/MissionScreen.css";

interface MissionScreenProps {
  websiteUrl: string;
  onStart: () => void;
  onBack: () => void;
}

function MissionScreen({
  websiteUrl,
  onStart,
  onBack,
}: MissionScreenProps) {
  return (
    <main className="mission-screen">
      <div className="mission-container">

        {/* HEADER */}

        <header className="mission-header">
          <button
            className="mission-back"
            onClick={onBack}
          >
            ← Back
          </button>

          <div className="mission-header-status">
            <span className="mission-status-dot" />
            Mission 001
          </div>
        </header>

        {/* MISSION INTRO */}

        <section className="mission-hero">

          <div className="mission-hero-content">

            <span className="mission-eyebrow">
              SOFTWARE QUALITY ENGINEERING
            </span>

            <div className="mission-title-row">
              <span className="mission-number">
                001
              </span>

              <div>
                <h1>Broken Login</h1>

                <p>
                  Investigate authentication behaviour
                  and identify defects.
                </p>
              </div>
            </div>

            <div className="mission-tags">
              <span className="mission-tag">
                Beginner
              </span>

              <span className="mission-tag">
                180 XP
              </span>

              <span className="mission-tag">
                Web + Automation
              </span>
            </div>

          </div>

          {/* MISSION STATUS CARD */}

          <div className="mission-status-card">

            <div className="status-card-header">
              <span>MISSION STATUS</span>

              <strong>READY</strong>
            </div>

            <div className="status-card-line">
              <span>Difficulty</span>
              <strong>Beginner</strong>
            </div>

            <div className="status-card-line">
              <span>XP Available</span>
              <strong>180 XP</strong>
            </div>

            <div className="status-card-line">
              <span>Estimated Time</span>
              <strong>~20 min</strong>
            </div>

          </div>

        </section>

        {/* TARGET */}

        <section className="mission-section">

          <div className="section-label">
            TEST TARGET
          </div>

          <div className="target-card">

            <div className="target-icon">
              🌐
            </div>

            <div className="target-content">
              <span>Website under investigation</span>

              <strong>
                {websiteUrl}
              </strong>
            </div>

            <span className="target-status">
              TARGET
            </span>

          </div>

        </section>

        {/* MISSION BRIEF */}

        <section className="mission-section">

          <div className="section-label">
            MISSION BRIEF
          </div>

          <div className="brief-card">

            <h2>
              Can you find the defect?
            </h2>

            <p>
              Registered users should be able to
              authenticate successfully using valid
              credentials.
            </p>

            <p>
              Your job is to investigate the login
              functionality, identify incorrect
              behaviour and provide evidence of
              any defects you discover.
            </p>

          </div>

        </section>

        {/* OBJECTIVES */}

        <section className="mission-section">

          <div className="section-label">
            YOUR OBJECTIVE
          </div>

          <div className="objective-grid">

            <div className="objective-card">

              <span className="objective-number">
                01
              </span>

              <div className="objective-icon">
                📋
              </div>

              <h3>
                Design a Test Plan
              </h3>

              <p>
                Select meaningful test scenarios
                covering positive and negative
                login behaviour.
              </p>

            </div>

            <div className="objective-card">

              <span className="objective-number">
                02
              </span>

              <div className="objective-icon">
                🧪
              </div>

              <h3>
                Execute Tests
              </h3>

              <p>
                Execute your selected tests and
                compare actual behaviour against
                expected results.
              </p>

            </div>

            <div className="objective-card">

              <span className="objective-number">
                03
              </span>

              <div className="objective-icon">
                🐛
              </div>

              <h3>
                Report Defects
              </h3>

              <p>
                Analyse failed scenarios and
                create a clear defect report.
              </p>

            </div>

            <div className="objective-card">

              <span className="objective-number">
                04
              </span>

              <div className="objective-icon">
                &lt;/&gt;
              </div>

              <h3>
                Build Automation
              </h3>

              <p>
                Convert your investigation into
                reliable Playwright automation.
              </p>

            </div>

          </div>

        </section>

        {/* WORKFLOW */}

        <section className="mission-section">

          <div className="section-label">
            QA WORKFLOW
          </div>

          <div className="workflow">

            <div className="workflow-step active">

              <span>01</span>

              <div>
                <strong>
                  Test Planning
                </strong>

                <small>
                  Select scenarios
                </small>
              </div>

            </div>

            <div className="workflow-line" />

            <div className="workflow-step">

              <span>02</span>

              <div>
                <strong>
                  Test Execution
                </strong>

                <small>
                  Run tests
                </small>
              </div>

            </div>

            <div className="workflow-line" />

            <div className="workflow-step">

              <span>03</span>

              <div>
                <strong>
                  Defect Analysis
                </strong>

                <small>
                  Investigate failures
                </small>
              </div>

            </div>

            <div className="workflow-line" />

            <div className="workflow-step">

              <span>04</span>

              <div>
                <strong>
                  Automation
                </strong>

                <small>
                  Write Playwright
                </small>
              </div>

            </div>

          </div>

        </section>

        {/* ACTION */}

        <section className="mission-action">

          <div>

            <span>
              MISSION 001
            </span>

            <h2>
              Ready to investigate?
            </h2>

            <p>
              Start by designing your test plan.
            </p>

          </div>

          <button
            className="mission-start-button"
            onClick={onStart}
          >
            Design Test Plan
            <span>→</span>
          </button>

        </section>

        {/* FOOTER */}

        <footer className="mission-footer">
          <strong>QA Quest</strong>

          <span>
            Quality Engineering Simulator
          </span>

          <span>
            Mission 001
          </span>
        </footer>

      </div>
    </main>
  );
}

export default MissionScreen;