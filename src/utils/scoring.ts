import { testCases } from "../data/testCases";

export type BugSeverity =
  | "low"
  | "medium"
  | "high";

export interface BugScoreInput {
  testId: string;
  severity: BugSeverity;
  description: string;
}

/**
 * Calculate test planning score.
 *
 * Each selected test contributes its
 * predefined XP value.
 */
export function calculatePlanScore(
  selectedTests: string[],
): number {
  return selectedTests.reduce(
    (total, testId) => {
      const test = testCases.find(
        (item) => item.id === testId,
      );

      return total + (test?.xp ?? 0);
    },
    0,
  );
}

/**
 * Calculate bug report score.
 *
 * Points are awarded for:
 * - Reporting a real failed test
 * - Choosing an appropriate severity
 * - Providing a useful description
 */
export function calculateBugScore(
  bug: BugScoreInput,
): number {
  const test = testCases.find(
    (item) => item.id === bug.testId,
  );

  if (!test) {
    return 0;
  }

  // Only real bugs can receive bug-report XP.
  if (!test.hasBug) {
    return 0;
  }

  let score = 0;

  // Correctly identifying the failed test.
  score += 30;

  // Severity scoring.
  const severityScores: Record<
    BugSeverity,
    number
  > = {
    low: 10,
    medium: 20,
    high: 30,
  };

  score += severityScores[bug.severity];

  // Reward a meaningful description.
  const descriptionLength =
    bug.description.trim().length;

  if (descriptionLength >= 20) {
    score += 20;
  } else if (descriptionLength >= 10) {
    score += 10;
  }

  return score;
}

/**
 * Calculate the total score for
 * multiple bug reports.
 */
export function calculateTotalBugScore(
  bugs: BugScoreInput[],
): number {
  return bugs.reduce(
    (total, bug) =>
      total + calculateBugScore(bug),
    0,
  );
}

/**
 * Calculate automation score based
 * on test coverage.
 */
export function calculateAutomationScore(
  automatedTestCount: number,
  totalTestCount: number,
): number {
  if (totalTestCount === 0) {
    return 0;
  }

  const coverage =
    automatedTestCount / totalTestCount;

  return (
    50 +
    Math.round(coverage * 50)
  );
}

/**
 * Calculate the final QA Quest score.
 */
export function calculateFinalScore(
  planScore: number,
  bugScore: number,
  automationScore: number,
): number {
  return (
    planScore +
    bugScore +
    automationScore
  );
}