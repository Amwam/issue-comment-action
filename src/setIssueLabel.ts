import * as github from "@actions/github";
import { getRepo, getIssueNumber } from "./github";

export const setIssueLabel = async (token: string, labels: string[]) => {
  const octokit = github.getOctokit(token);

  const issue_number = getIssueNumber();

  if (issue_number == null) {
    throw new Error("No Issue Provided");
  }

  await octokit.rest.issues.addLabels({
    ...getRepo(),
    issue_number,
    labels: labels
  });
};
