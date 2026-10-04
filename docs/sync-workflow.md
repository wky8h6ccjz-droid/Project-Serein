# Local and cloud sync workflow

Approved: 2026-10-03.

The owner chose **publish completed changes after each task**. GitHub is the shared project record. The assistant performs publication as part of completing project work; there is no file-save watcher or scheduled background uploader.

## Local setup

The local Serein folder is a Git checkout of:

https://github.com/wky8h6ccjz-droid/Project-Serein

The local main branch tracks origin/main. Pulls are configured to fast-forward only so a routine pull cannot silently create a merge commit.

Command-line Git can fetch the public repository. Direct command-line push authentication was not available during setup, so the assistant uses the connected GitHub tools for publication and keeps the local checkout aligned afterward. No access token has been stored in project files or the remote URL.

## When starting work

1. Read AGENTS.md and the project context documents.
2. Check the branch and working tree.
3. Fetch GitHub's latest history. If the checkout is clean and can fast-forward, pull the published changes before editing. If local work or diverging commits exist, preserve them and reconcile the histories first.

## When finishing work

1. Record approved decisions and material findings in the relevant documents.
2. Review the task's changes and perform appropriate checks.
3. Commit only the reviewed task's files and publish within the existing Serein authorization. State publication purpose and impact. Use a pull request when review is needed; preserve pending owner acceptance in the records.
4. Confirm publication succeeded and report the result. If access or a conflict blocks publication, explain the specific blocker and preserve the work locally.

Publication permission applies to the approved public Serein project. Consequential product, visual, architecture, cost, privacy, and scope decisions require owner approval. Paid requests, deployments, invitations, private disclosure, and destructive actions need their own scoped approval. See [working-agreement.md](working-agreement.md). Owner acceptance remains a separate gate; publication of a reviewable deliverable does not close it.

## Moving between local and cloud

Local work becomes available elsewhere after publication to GitHub. Cloud work becomes available locally after it is published and pulled. A running cloud task has its own workspace and may need to fetch the new commits; uploading a local file does not overwrite that task's files or transfer local chat history.

The cloud environment's dependencies and configuration are separate from repository changes. Update and republish environment setup when those change, following the [official environment documentation](https://learn.chatgpt.com/docs/environments/cloud-environments#reuse-and-update-saved-state).

## Current evidence

- Local repository connection and branch tracking verified.
- Initial local files matched GitHub exactly after connection.
- Command-line push dry run reported missing authentication; connected GitHub publication is the available route.
- No background upload process was installed.
