import * as github from "@actions/github";
import { getRepo, getIssueNumber } from "./github";

export const addCommentReaction = async (token: string, commentID: number) => {
  const octokit = github.getOctokit(token);

  await octokit.rest.reactions.createForIssueComment({
    ...getRepo(),
    comment_id: commentID,
    content: "+1",
  });
};
