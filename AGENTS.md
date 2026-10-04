# Working on Serein

## Context

Read README.md, docs/product-brief.md, docs/decisions.md, and docs/feasibility.md before proposing architecture or implementation. These files preserve project context across local and cloud sessions.

The human is the project manager and approves major decisions. The assistant acts as the CTO and design/engineering collaborator.

## Working style

- Use plain language and ask one focused question at a time when clarification is needed.
- Continue authorized research, documentation, and reversible preparation independently.
- Make major recommendations concrete and reviewable before seeking a decision.
- Get the project manager's decision on hardware/platform selection, major scope changes, budget, purchases, or commercial commitments.
- Budget is parked. Do not reopen it unless the project manager asks or a concrete decision requires it.
- Start with the physical device. Preserve its distinctive form and premium hand feel.
- Keep confirmed preferences, provisional targets, hypotheses, and tested results distinct.
- Do not claim feasibility, compatibility, or battery performance based on concept renders or manufacturer headline figures.
- Verify changeable technical/product information against current primary sources; record source links and dates.
- Follow the user's current instructions when they change a prior preference.
- Do not launch delegated agents or separate chats unless the user asks.

## Technical boundaries

- Spotify is required in the first working version. The initial UI may be the normal official Android Spotify app.
- Direct CDJ connection in place of a flash drive is a core requirement and a platform-selection gate.
- Do not assume a generic Android device can expose USB mass storage merely because it has USB-C or file transfer.
- Keep Spotify listening separate from the exportable DJ library of owned/local audio files. Do not promise export of Spotify downloads.
- Protect storage ownership: do not let Serein and an attached deck modify the same exported filesystem concurrently.
- Do not select a donor, redesign its battery, or promise the target enclosure dimensions without fit and power evidence.
- Research and code can happen in the cloud. Real battery, connector, audio, and deck tests require local hardware evidence.
- Do not commit credentials, copyrighted music files, or account exports.

## Maintaining context

Record approved changes in docs/decisions.md and material research/test findings in docs/feasibility.md. Keep README.md's stage and immediate priorities current. Preserve the latest approved concept direction without treating it as mechanical CAD.

Run checks appropriate to the change. Documentation-only work does not require a fabricated application, package manifest, or test suite.

## Publish completed work

The project manager authorized publishing this project publicly and chose to publish completed changes after each task. Follow this workflow in local and cloud sessions:

- At the start of a task, check the current branch, working tree, and GitHub history. Fetch and fast-forward when the checkout is clean; preserve existing work when it is not.
- Before finishing a task that changes project files, update relevant context documents, review the task's diff, run appropriate checks, and commit and publish the completed work to GitHub. Routine publication within the approved project scope does not require another confirmation.
- Stage only files belonging to the completed task. Leave unrelated work, credentials, and ignored scratch files out of the commit. Use a feature branch and pull request when the change needs review; publishing a branch does not authorize merging an unapproved change.
- Use authenticated Git when available. If command-line push authentication is unavailable, use the connected GitHub tools to publish the reviewed changes and then reconcile local Git metadata with the published commit while preserving files and history.
- Preserve concurrent cloud or local changes. Never force-push over them; resolve conflicts explicitly.
- Report whether the changes were published and identify any actual blocker. Do not describe local-only work as synced.
- This is an assistant workflow at task completion. There is no background watcher uploading every file save, and open cloud tasks may need to fetch the latest GitHub changes.

See docs/sync-workflow.md for the shared workflow and current local setup.
