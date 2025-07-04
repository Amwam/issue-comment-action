"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const addCommentReaction_1 = require("./addCommentReaction");
const core = __importStar(require("@actions/core"));
const checkKeyword_1 = require("./checkKeyword");
const setIssueLabel_1 = require("./setIssueLabel");
const setIssueAssignee_1 = require("./setIssueAssignee");
const github = __importStar(require("@actions/github"));
async function run() {
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
        const hasKeyword = (0, checkKeyword_1.checkKeyword)(keywords, comment.body);
        if (!hasKeyword) {
            console.log("Keyword not included in this issue comment");
            return;
        }
        (0, addCommentReaction_1.addCommentReaction)(token, comment.id);
        const labelsInput = core.getInput("labels");
        const assigneesInput = core.getInput("assignees");
        if (!labelsInput && !assigneesInput) {
            core.setFailed("labels or assignees input not found. Make sure your `.yml` file contains `labels` or `assignees`");
        }
        if (labelsInput) {
            const labels = JSON.parse(labelsInput);
            console.log(labels);
            (0, setIssueLabel_1.setIssueLabel)(token, labels);
            core.setOutput("labeled", true.toString());
        }
        if (assigneesInput) {
            const assignees = JSON.parse(assigneesInput);
            console.log(assignees);
            (0, setIssueAssignee_1.setIssueAssignee)(token, assignees);
            core.setOutput("assigned", true.toString());
        }
    }
    catch (error) {
        core.setFailed(String(error));
    }
}
run();
