# Continue Serein in Codex Cloud

Setup guidance checked: 2026-10-03.

Repository: https://github.com/wky8h6ccjz-droid/Project-Serein

This repository preserves the project brief, decisions, feasibility work, agent instructions, and latest concept render. Cloud access to the repository does not automatically transfer the full local chat or local-only files.

## Create the cloud environment

Following the [official Codex Cloud setup documentation](https://learn.chatgpt.com/docs/cloud):

1. On the web or desktop app, choose **Work in → Cloud → Select environment → Create environment**. The alternative route is **Settings → Codex Cloud → Environments → Create environment**.
2. Select **wky8h6ccjz-droid/Project-Serein**. Connect GitHub or grant repository access if prompted.
3. Select **Get started** and let Codex inspect the repository. It currently has no application dependencies; a documentation workspace is sufficient.
4. Review the setup report and configuration, save, and select **Publish**.
5. Wait for **Environment published** before starting project work.

Account availability and repository authorization must be verified in your own environment picker. Committing these files does not itself create or publish a cloud environment.

## First continuation prompt

Use the full copy-paste prompt in [cloud-handoff.md](cloud-handoff.md). It covers the current CTO/project-manager role, owner approvals and acceptance, prior work, requirements, open issues, and the single next action. Read [continuation.md](continuation.md) for the compact current state.

## Access and workflow

- Configure internet access for current technical research if needed. Allowed network destinations and service credentials are separate settings.
- No Spotify credentials or OpenAI API keys are needed to read these project documents. Do not add credentials to Git.
- Store meaningful decisions and findings in the repository and commit them; new chats should not depend on unsaved chat history.
- The approved [sync workflow](sync-workflow.md) publishes completed project changes after each task. Existing cloud tasks keep their own workspace; fetch the latest GitHub changes before continuing when appropriate.
- Cloud work can cover research, documentation, software, and supported design-file generation. Physical fit, battery, audio, and real CDJ tests need local hardware.
- Local personal skills are not automatically synced to cloud tasks. Check available cloud capabilities before assuming image generation, CAD tools, or any other local tool is available.

[Cloud environment configuration and current limitations](https://learn.chatgpt.com/docs/environments/cloud-environments)

## Setup status

The repository bootstrap is separate from account-level cloud setup. The cloud continuation on 2026-10-03 verified repository/document access and finish-study image inspection. Account-level environment publication has not been verified; repository changes do not themselves publish an environment.
