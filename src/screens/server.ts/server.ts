import express, { type Request, type Response } from "express";
import { runLoginTest, type LoginTestResult } from "./playwrightRunner";

const app = express();

const PORT = 3001;

app.use(express.json());

app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    service: "QA Quest Playwright Runner",
  });
});

app.post("/api/run-test", async (req: Request, res: Response) => {
  const { websiteUrl } = req.body as { websiteUrl?: string };

  if (!websiteUrl) {
    return res.status(400).json({
      passed: false,
      message: "websiteUrl is required.",
    });
  }

  try {
    const url = new URL(websiteUrl);

    if (
      url.protocol !== "http:" &&
      url.protocol !== "https:"
    ) {
      return res.status(400).json({
        passed: false,
        message:
          "Only HTTP and HTTPS websites are supported.",
      });
    }
  } catch {
    return res.status(400).json({
      passed: false,
      message: "Invalid website URL.",
    });
  }

  try {
    const result = await runLoginTest(websiteUrl);

    return res.json(result as LoginTestResult);
  } catch (error) {
    return res.status(500).json({
      passed: false,
      message:
        error instanceof Error
          ? error.message
          : "Playwright execution failed.",
    });
  }
});

app.listen(PORT, () => {
  console.log(
    `🚀 QA Quest Playwright server running on http://localhost:${PORT}`,
  );
});