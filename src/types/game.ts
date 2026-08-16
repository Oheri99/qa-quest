export type Screen =
  | "home"
  | "mission"
  | "test-plan"
  | "execution"
  | "report"
  | "automation"
  | "result";

export type TestCase = {
  id: string;
  title: string;
  description: string;
  expected: string;
  actual?: string;
  xp: number;
  priority: "high" | "medium" | "low";
  hasBug?: boolean;
};

export type TestResult = {
  testId: string;
  status: "passed" | "failed";
  expected: string;
  actual: string;
};