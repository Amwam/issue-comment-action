import * as github from "@actions/github";
import { getRepo, getIssueNumber } from "./github";

export const addCommentReaction = async (token: string, commentID: number) => {
  const octokit = new github.GitHub(token);

  await octokit.reactions.createForIssueComment({
    ...getRepo(),
    comment_id: commentID,
    content: "+1",
  });
};
