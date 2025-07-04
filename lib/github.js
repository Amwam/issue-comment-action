import * as github from "@actions/github";
export const getPrNumber = () => {
    const pullRequest = github.context.payload.pull_request;
    if (!pullRequest) {
        return undefined;
    }
    return pullRequest.number;
};
export const getIssueNumber = () => {
    const issue = github.context.payload.issue;
    if (!issue) {
        return undefined;
    }
    return issue.number;
};
export const getRepo = () => {
    const repo = github.context.repo;
    return repo;
};
