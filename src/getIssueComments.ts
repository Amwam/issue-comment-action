import * as github from "@actions/github";
import { getRepo, getIssueNumber } from "./github";

export const getIssueComments = async (token: string) => {
  const octokit = new github.GitHub(token);

  const issue_number = getIssueNumber();

  if (issue_number == null) {
    throw new Error("No Issue Provided");
  }

  const { data } = await octokit.issues.listComments({
    ...getRepo(),
    issue_number,
  });
  return data.map((c) => c.body);
};

/*

listComments({
  owner,
  repo,
  issue_number,
});

*/
