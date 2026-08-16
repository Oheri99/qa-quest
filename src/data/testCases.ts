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
    xp: 30,
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
    actual:
      "Invalid credentials error is displayed.",
    xp: 20,
    priority: "high",
  },

  {
    id: "TC003",
    title: "Invalid email + valid password",
    description:
      "Verify an invalid email cannot log in.",
    expected:
      "User should be prevented from logging in.",
    actual:
      "User remains on the login page.",
    xp: 20,
    priority: "high",
  },

  {
    id: "TC004",
    title: "Empty email",
    description:
      "Verify the email field is required.",
    expected:
      "A validation message should tell the user that email is required.",
    actual:
      "Email required validation is displayed.",
    xp: 10,
    priority: "medium",
  },

  {
    id: "TC005",
    title: "Empty password",
    description:
      "Verify the password field is required.",
    expected:
      "A validation message should tell the user that password is required.",
    actual:
      "Password required validation is displayed.",
    xp: 10,
    priority: "medium",
  },

  {
    id: "TC006",
    title: "Both fields empty",
    description:
      "Verify the form handles missing credentials.",
    expected:
      "The form should prevent submission and display validation messages.",
    actual:
      "Validation messages are displayed.",
    xp: 10,
    priority: "medium",
  },

  {
    id: "TC007",
    title: "Very long password",
    description:
      "Verify the application handles long input safely.",
    expected:
      "The application should handle the input without crashing.",
    actual:
      "Application handles the input without crashing.",
    xp: 5,
    priority: "low",
  },

  {
    id: "TC008",
    title: "Security input",
    description:
      "Verify malicious input is handled safely.",
    expected:
      "The application should safely reject malicious input.",
    actual:
      "Malicious input is safely rejected.",
    xp: 10,
    priority: "high",
  },
];