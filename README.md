# Serein

Serein is a pocket music player that brings everyday listening and a portable DJ library into one dedicated object.

**Stage:** product definition and feasibility. No electronics have been selected or purchased, and no working device exists yet.

![Serein finish study: jet black, dark matte purple, dark matte forest green, and dark matte blue](assets/serein-finish-study.png)

*Visual concept only. Dimensions, component fit, materials, battery life, and CDJ compatibility are not verified. The screen is illustrative; the first Spotify prototype is intended to use the official Android app.*

## Start here

- [Visual project map](docs/project-map.html): five workstreams, tasks, statuses and dependencies. Download/open the HTML, or run `node docs/serve-project-map.cjs` and visit http://127.0.0.1:4178.
- [Continuation](docs/continuation.md): compact current state and exactly one next action.
- [Build plan in plain language](docs/build-plan.md): what we are building, why, where we are and how the first experiment leads to a pocket prototype.
- [USB compatibility review](docs/usb-compatibility-review.md): decision rationale, cheaper splitter candidate and ready-to-send supplier questions.
- [Task tracker](docs/task-tracker.md): tasks, dependencies, checks, and owner acceptance.
- [Decision log](docs/decision-log.md): stable approval records and open proposals.
- [Working agreement](docs/working-agreement.md): owner-approved CTO/project-management process.
- [Cloud handoff](docs/cloud-handoff.md): full copy-paste instructions and assistant update.

- [Product brief](docs/product-brief.md): purpose, scope, and collaboration.
- [Requirements and decisions](docs/decisions.md): agreed direction, provisional targets, and open questions.
- [Feasibility work](docs/feasibility.md): Spotify, CDJ storage, battery, and physical fit.
- [Cloud setup](docs/cloud-setup.md): continue from this repository in Codex Cloud.
- [Sync workflow](docs/sync-workflow.md): publish completed tasks and pick up changes across local and cloud sessions.
- [Agent instructions](AGENTS.md): how future sessions should work with the project owner.

## Current task and next action

**Current task: Android build preparation (SER-014), chosen by the owner.** The [first-build packet](software/android/README.md) contains proposed behavior, native/browser route comparison, candidate dependency pins, readiness checks and six implementation steps. The [visual map](docs/project-map.html) reflects this focus. **Next action: approve or revise the first-build scope/native route**, then prepare tools and app shell (SER-014A). No app or APK has been built yet.

The [Library/player preview](software/device-preview/README.md) is accepted (SER-011). Local songs, artwork, playlists and ordered setlists now save in this browser across reopening (SER-012, awaiting owner restart test). Eleven unit checks and Chromium interaction/persistence/map journeys passed. No uploads or original-file changes; browser/site data removal can remove saved copies. Android implementation, official Spotify launch and real USB/deck integration remain open. Decks use only the full local-file library, never Spotify downloads. Companion software stays deferred.

Hardware context:

SER-005's cloud handoff is accepted. Gemini MDJ-500 is chosen for preliminary basic testing; actual access and Pioneer compatibility remain unverified. SER-007's [USB-storage-first assessment](docs/prototype-architecture.md) now recommends a ZERO 3W one-board bench experiment for owner review. [Release-linked source evidence](docs/zero3w-usb-evidence.md) supports the kernel/storage and developer-access path; downloaded-image behavior and physical USB/deck tests remain unverified. The [display/power comparison](docs/display-power-assessment.md) retains ZERO 3W for the USB experiment and identifies CM3 as a stronger custom-pocket integration lead; screen fit and endurance remain unverified. The [concrete bench plan](docs/usb-bench-plan.md) is delivered; board/image and 5 V power checks block purchasing/execution. A powered hub is a computer-only alternative because the Gemini manual prohibits hubs. The [compatibility follow-up](docs/usb-compatibility-review.md) finds AIC8800D80 source support and prefers a new $14.95 official PiKVM splitter candidate ($54.94 board/splitter subset before separate supply/accessories/delivery). Exact sold board/binary and splitter USB-C matching remain open. Both prepared vendor inquiries were sent through the owner-designated Outlook account under DEC-027. The hardware gate remains reviewing both compatibility replies before kit approval. Evidence and decision summaries must also be shown in chat under DEC-025. Generic Spotify proof is deferred to routine candidate checks; no electronics, purchases or integrated architecture are selected. See [DJ test targets](docs/dj-test-targets.md).

The assistant handles CTO and project-management work. The human is the project owner and retains consequential decisions and final acceptance.

Budget discussion is deferred until the technical and physical direction is clearer.

## Repository scope

This repository is the shared record for research, decisions, concepts, and future hardware/software development. It contains project records, concept art, the interactive project map and a hardware-independent software preview with build scripts and automated checks. No Android build or physical device exists yet.
