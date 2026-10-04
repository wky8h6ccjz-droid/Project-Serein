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

> Continue Project Serein as my CTO. I am the project manager and approve major decisions. Read AGENTS.md, README.md, docs/product-brief.md, docs/decisions.md, and docs/feasibility.md first, and inspect assets/serein-finish-study.png. We are defining the physical device before choosing hardware. Spotify and direct CDJ connection as a flash-drive replacement are core requirements. Budget is deferred. Ask one focused question at a time and begin by establishing which CDJ models we can test.

## Access and workflow

- Configure internet access for current technical research if needed. Allowed network destinations and service credentials are separate settings.
- No Spotify credentials or OpenAI API keys are needed to read these project documents. Do not add credentials to Git.
- Store meaningful decisions and findings in the repository and commit them; new chats should not depend on unsaved chat history.
- Cloud work can cover research, documentation, software, and supported design-file generation. Physical fit, battery, audio, and real CDJ tests need local hardware.
- Local personal skills are not automatically synced to cloud tasks. Check available cloud capabilities before assuming image generation, CAD tools, or any other local tool is available.

[Cloud environment configuration and current limitations](https://learn.chatgpt.com/docs/environments/cloud-environments)

## Setup status

The repository bootstrap is separate from account-level cloud setup. A cloud environment has not been verified or published by this repository change.
