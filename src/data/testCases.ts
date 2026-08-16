import type { TestCase } from "../types/game";

export const testCases: TestCase[] = [
  {
    id: "TC001",
    title: "Valid email + valid password",
    description:
      "Verify a registered user can successfully log in.",
    expected:
      "User should be authenticated and redirected to the Dashboard.",
    actual:
      "Login fails and the user remains on the login page.",
    xp: 20,
    priority: "high",
    hasBug: true,
  },

  {
    id: "TC002",
    title: "Valid email + invalid password",
    description:
      "Verify invalid credentials are rejected.",
    expected:
      "User should receive an appropriate error message.",
    xp: 10,
    priority: "medium",
    hasBug: false,
  },

  {
    id: "TC003",
    title: "Invalid email + valid password",
    description:
      "Verify an invalid email cannot log in.",
    expected:
      "User should be prevented from logging in.",
    xp: 10,
    priority: "medium",
    hasBug: false,
  },

  {
    id: "TC004",
    title: "Empty email",
    description:
      "Verify the email field is required.",
    expected:
      "A validation message should tell the user that email is required.",
    xp: 10,
    priority: "high",
    hasBug: false,
  },

  {
    id: "TC005",
    title: "Empty password",
    description:
      "Verify the password field is required.",
    expected:
      "A validation message should tell the user that password is required.",
    xp: 10,
    priority: "high",
    hasBug: false,
  },

  {
    id: "TC006",
    title: "Both fields empty",
    description:
      "Verify the form handles missing credentials.",
    expected:
      "The form should prevent submission and display validation messages.",
    xp: 10,
    priority: "medium",
    hasBug: false,
  },

  {
    id: "TC007",
    title: "Very long password",
    description:
      "Verify the application handles long input safely.",
    expected:
      "The application should handle the input without crashing.",
    xp: 5,
    priority: "low",
    hasBug: false,
  },

  {
    id: "TC008",
    title: "Security input",
    description:
      "Verify malicious input is handled safely.",
    expected:
      "The application should safely reject malicious input.",
    xp: 5,
    priority: "high",
    hasBug: false,
  },
];