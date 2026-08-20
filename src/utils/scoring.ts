import { testCases } from "../data/testCases";

export type BugSeverity =
  | "low"
  | "medium"
  | "high";

export interface BugScoreInput {
  testId: string;
  title?: string;
  severity: BugSeverity;
  description: string;
  steps?: string;
  expected?: string;
  actual?: string;
}

/*
 * Calculate test planning score.
 *
 * Each selected test contributes
 * its predefined XP value.
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

/*
 * Calculate bug report score.
 *
 * Maximum: 100 points per bug.
 *
 * Points:
 *
 * Correct bug identified: 30
 * Appropriate severity:   20
 * Useful bug title:        10
 * Useful description:      10
 * Reproduction steps:      10
 * Expected result:         10
 * Actual result:           10
 */
export function calculateBugScore(
  bug: BugScoreInput,
): number {
  const test = testCases.find(
    (item) => item.id === bug.testId,
  );

  /*
   * Unknown test IDs receive no score.
   */
  if (!test) {
    return 0;
  }

  /*
   * Only real bugs can receive
   * bug-report XP.
   */
  if (!test.hasBug) {
    return 0;
  }

  let score = 0;

  /*
   * Correctly identifying a real bug.
   */
  score += 30;

  /*
   * Severity.
   *
   * The maximum severity score is 20.
   */
  const severityScores: Record<
    BugSeverity,
    number
  > = {
    low: 5,
    medium: 10,
    high: 20,
  };

  score += severityScores[bug.severity];

  /*
   * Useful bug title.
   */
  const titleLength =
    bug.title?.trim().length ?? 0;

  if (titleLength >= 15) {
    score += 10;
  } else if (titleLength >= 5) {
    score += 5;
  }

  /*
   * Useful bug description.
   */
  const descriptionLength =
    bug.description.trim().length;

  if (descriptionLength >= 40) {
    score += 10;
  } else if (descriptionLength >= 20) {
    score += 5;
  }

  /*
   * Reproduction steps.
   */
  const stepsLength =
    bug.steps?.trim().length ?? 0;

  if (stepsLength >= 40) {
    score += 10;
  } else if (stepsLength >= 20) {
    score += 5;
  }

  /*
   * Expected result.
   */
  const expectedLength =
    bug.expected?.trim().length ?? 0;

  if (expectedLength >= 15) {
    score += 10;
  } else if (expectedLength >= 5) {
    score += 5;
  }

  /*
   * Actual result.
   */
  const actualLength =
    bug.actual?.trim().length ?? 0;

  if (actualLength >= 15) {
    score += 10;
  } else if (actualLength >= 5) {
    score += 5;
  }

  return Math.min(score, 100);
}

/*
 * Calculate total bug-report score.
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

/*
 * Calculate automation score.
 *
 * Base score: 50
 * Coverage bonus: up to 50
 * Maximum: 100
 */
export function calculateAutomationScore(
  automatedTestCount: number,
  totalTestCount: number,
): number {
  if (totalTestCount <= 0) {
    return 0;
  }

  const safeAutomatedCount = Math.max(
    0,
    Math.min(
      automatedTestCount,
      totalTestCount,
    ),
  );

  const coverage =
    safeAutomatedCount / totalTestCount;

  return (
    50 +
    Math.round(coverage * 50)
  );
}

/*
 * Calculate final QA Quest score.
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