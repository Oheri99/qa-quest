export type Screen =
  | "home"
  | "mission"
  | "acme-login"
  | "website"
  | "test-plan"
  | "execution"
  | "report"
  | "automation"
  | "result";

export type BugSeverity =
  | "low"
  | "medium"
  | "high";

export type TestCase = {
  id: string;
  title: string;
  description: string;
  expected: string;
  actual?: string;
  xp: number;
  priority: "high" | "medium" | "low";

  /**
   * Whether this test contains
   * a defect in the application.
   */
  hasBug?: boolean;

  /**
   * Correct severity for the defect.
   */
  expectedSeverity?: BugSeverity;

  /**
   * Reference information describing
   * the known defect.
   */
  bugTitle?: string;

  bugDescription?: string;
};

export type TestResult = {
  testId: string;
  status: "passed" | "failed";
  expected: string;
  actual: string;
};