var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { addCommentReaction } from "./addCommentReaction";
import core from "@actions/core";
import { checkKeyword } from "./checkKeyword";
import { setIssueLabel } from "./setIssueLabel";
import { setIssueAssignee } from "./setIssueAssignee";
import * as github from "@actions/github";
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const comment = github.context.payload.comment;
        if (!comment) {
            core.setFailed("Action can only be run on comments");
            return;
        }
        console.log(`comment': ${comment.body}`);
        try {
            core.setOutput("labeled", false.toString());
            core.setOutput("assigned", false.toString());
            const keywords = JSON.parse(core.getInput("keywords", { required: true }));
            console.log(`keywords: ${keywords}`);
            const token = core.getInput("github-token");
            const hasKeyword = checkKeyword(keywords, comment.body);
            if (!hasKeyword) {
                console.log("Keyword not included in this issue comment");
                return;
            }
            addCommentReaction(token, comment.id);
            const labelsInput = core.getInput("labels");
            const assigneesInput = core.getInput("assignees");
            if (!labelsInput && !assigneesInput) {
                core.setFailed("labels or assignees input not found. Make sure your `.yml` file contains `labels` or `assignees`");
            }
            if (labelsInput) {
                const labels = JSON.parse(labelsInput);
                console.log(labels);
                setIssueLabel(token, labels);
                core.setOutput("labeled", true.toString());
            }
            if (assigneesInput) {
                const assignees = JSON.parse(assigneesInput);
                console.log(assignees);
                setIssueAssignee(token, assignees);
                core.setOutput("assigned", true.toString());
            }
        }
        catch (error) {
            core.setFailed(String(error));
        }
    });
}
run();
