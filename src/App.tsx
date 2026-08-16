import { useState } from "react";
import "./App.css";

import type {
  Screen,
  TestCase,
} from "./types/game";

import { calculatePlanScore } from "./utils/scoring";

import HomeScreen from "./screens/HomeScreen";
import MissionScreen from "./screens/MissionScreen";
import TestPlanScreen from "./screens/TestPlanScreen";
import TestExecutionScreen from "./screens/TestExecutionScreen";
import BugReportScreen from "./screens/BugReportScreen";
import AutomationScreen from "./screens/AutomationScreen";
import ResultScreen from "./screens/ResultScreen";

function App() {
  const [screen, setScreen] =
    useState<Screen>("home");

  const [score, setScore] =
    useState(0);

  const [selectedTests, setSelectedTests] =
    useState<string[]>([]);

  const [executedTests, setExecutedTests] =
    useState<string[]>([]);

  const [failedTests, setFailedTests] =
    useState<string[]>([]);

  function toggleTest(testId: string) {
    setSelectedTests((current) =>
      current.includes(testId)
        ? current.filter(
            (id) => id !== testId,
          )
        : [...current, testId],
    );
  }

  function executeTest(test: TestCase) {
    if (executedTests.includes(test.id)) {
      return;
    }

    setExecutedTests((current) => [
      ...current,
      test.id,
    ]);

    if (test.hasBug) {
      setFailedTests((current) => [
        ...current,
        test.id,
      ]);
    }
  }

  function startExecution() {
    if (selectedTests.length === 0) {
      return;
    }

    const planScore =
      calculatePlanScore(selectedTests);

    setScore(planScore);
    setExecutedTests([]);
    setFailedTests([]);
    setScreen("execution");
  }

  function resetGame() {
    setScreen("home");
    setScore(0);
    setSelectedTests([]);
    setExecutedTests([]);
    setFailedTests([]);
  }

  return (
    <div className="app">
      {screen === "home" && (
        <HomeScreen
          score={score}
          onStart={() =>
            setScreen("mission")
          }
        />
      )}

      {screen === "mission" && (
        <MissionScreen
          onStart={() =>
            setScreen("test-plan")
          }
          onBack={() =>
            setScreen("home")
          }
        />
      )}

      {screen === "test-plan" && (
        <TestPlanScreen
          selectedTests={selectedTests}
          onToggle={toggleTest}
          onExecute={startExecution}
          onBack={() =>
            setScreen("mission")
          }
        />
      )}

      {screen === "execution" && (
        <TestExecutionScreen
          selectedTests={selectedTests}
          executedTests={executedTests}
          failedTests={failedTests}
          onRunTest={executeTest}
          onReport={() =>
            setScreen("report")
          }
          onBack={() =>
            setScreen("test-plan")
          }
        />
      )}

      {screen === "report" && (
        <BugReportScreen
          failedTests={failedTests}
          onSubmit={(bugScore) => {
            setScore(
              (current) =>
                current + bugScore,
            );

            setScreen("automation");
          }}
          onBack={() =>
            setScreen("execution")
          }
        />
      )}

      {screen === "automation" && (
        <AutomationScreen
          onComplete={(automationScore) => {
            setScore(
              (current) =>
                current + automationScore,
            );

            setScreen("result");
          }}
          onBack={() =>
            setScreen("report")
          }
        />
      )}

      {screen === "result" && (
        <ResultScreen
          score={score}
          onHome={resetGame}
        />
      )}
    </div>
  );
}

export default App;