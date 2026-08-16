import { testCases } from "../data/testCases";

export function calculatePlanScore(
  selectedTests: string[],
): number {
  return selectedTests.reduce((total, testId) => {
    const test = testCases.find(
      (item) => item.id === testId,
    );

    return total + (test?.xp ?? 0);
  }, 0);
}

/**
 * Calculate bug report score based on severity and correctness
 */
export function calculateBugScore(
  severity: "low" | "medium" | "high",
): number {
  const scores = {
    low: 5,
    medium: 15,
    high: 25,
  };
  return scores[severity];
}

/**
 * Calculate automation score based on test coverage
 */
export function calculateAutomationScore(
  automatedTestCount: number,
  totalTestCount: number,
): number {
  if (totalTestCount === 0) return 0;
  const coverage = automatedTestCount / totalTestCount;
  // Base 50 points + up to 50 based on coverage
  return 50 + Math.round(coverage * 50);
}

/**
 * Calculate final score with multipliers
 */
export function calculateFinalScore(
  planScore: number,
  bugScore: number,
  automationScore: number,
): number {
  return planScore + bugScore + automationScore;
}