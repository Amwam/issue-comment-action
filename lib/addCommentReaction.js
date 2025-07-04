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
import { getRepo } from "./github";
export const addCommentReaction = (token, commentID) => __awaiter(void 0, void 0, void 0, function* () {
    const octokit = github.getOctokit(token);
    yield octokit.rest.reactions.createForIssueComment(Object.assign(Object.assign({}, getRepo()), { comment_id: commentID, content: "+1" }));
});
