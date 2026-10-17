/**
 * @fileoverview CLI script for recording canonical workflow histories using
 * a real time-skipping Temporal test environment.
 *
 * Usage:
 *   npm run temporal:record-histories -w @space/worker
 */
import process from "node:process";
import {
  defaultHistoryFixturesDir,
  writeWorkflowHistoryFixtures
} from "./workflow-sandbox-harness.js";

/**
 * Main entry point for recording workflow execution histories.
 *
 * @param targetDir - Optional custom directory path to write JSON history fixtures.
 * @returns Resolves when recording and serialization complete.
 */
export async function recordWorkflowHistoriesCli(targetDir?: string): Promise<void> {
  const outputDir = targetDir || process.argv[2] || defaultHistoryFixturesDir;
  const fixtures = await writeWorkflowHistoryFixtures(outputDir);
  process.stdout.write(
    `${JSON.stringify(
      {
        ok: true,
        outputDir,
        count: fixtures.length,
        files: fixtures.map((f) => ({
          fileName: f.fileName,
          workflowType: f.workflowType,
          branch: f.branch ?? "current",
          events: f.history.events?.length ?? 0
        }))
      },
      null,
      2
    )}\n`
  );
}

await recordWorkflowHistoriesCli();

