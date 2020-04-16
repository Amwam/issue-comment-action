import * as core from "@actions/core";
import { checkKeyword } from "./checkKeyword";
import { setIssueLabel } from "./setIssueLabel";
import { setIssueAssignee } from "./setIssueAssignee";
import github from "@actions/github";

async function run() {
  const comment = github.context.payload.comment;

  if (!comment) {
    core.setFailed("Action can only be run on comments");
    return;
  }

  console.log(`comment': ${comment}`);

  try {
    core.setOutput("labeled", false.toString());
    core.setOutput("assigned", false.toString());
    const keywords: string[] = JSON.parse(
      core.getInput("keywords", { required: true })
    );

    console.log(`keywords: ${keywords}`);

    const token = core.getInput("github-token");

    const hasKeyword = checkKeyword(keywords, comment.body);
    if (!hasKeyword) {
      console.log("Keyword not included in this issue comment");
      return;
    }

    const labelsInput: string = core.getInput("labels");
    const assigneesInput: string = core.getInput("assignees");
    if (!labelsInput && !assigneesInput) {
      core.setFailed(
        "labels or assignees input not found. Make sure your `.yml` file contains `labels` or `assignees`"
      );
    }

    if (labelsInput) {
      const labels: string[] = JSON.parse(labelsInput);
      console.log(labels);
      setIssueLabel(token, labels);
      core.setOutput("labeled", true.toString());
    }

    if (assigneesInput) {
      const assignees: string[] = JSON.parse(assigneesInput);
      console.log(assignees);
      setIssueAssignee(token, assignees);
      core.setOutput("assigned", true.toString());
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
