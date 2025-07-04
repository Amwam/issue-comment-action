var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as github from "@actions/github";
import { getRepo, getIssueNumber } from "./github";
export const setIssueAssignee = (token, assignees) => __awaiter(void 0, void 0, void 0, function* () {
    const octokit = github.getOctokit(token);
    const issue_number = getIssueNumber();
    if (issue_number == null) {
        throw new Error("No Issue Provided");
    }
    yield octokit.rest.issues.addAssignees(Object.assign(Object.assign({}, getRepo()), { issue_number,
        assignees }));
});
