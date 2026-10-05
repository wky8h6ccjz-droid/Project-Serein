# Cloud handoff for Serein

Prepared: 2026-10-05. This handoff carries project records, not the full local chat transcript.

## Paste into the cloud session

```text
Continue Project Serein from:
https://github.com/wky8h6ccjz-droid/Project-Serein

Act as both my CTO and project manager. I am the project owner: I approve consequential product, creative, architecture, cost, privacy, and scope decisions, and I accept or reopen finished work.

Under DEC-028 the owner requested useful device software while hardware replies are pending. DEC-029 removes slogans and keeps functional labels. DEC-030 clarifies that Serein plays saved local files or Spotify, while deck use exposes only the full separately saved local-file library, never Spotify-managed downloads. DEC-031 authorizes sourcing preview house music. Read software/device-preview/README.md: clean Home, Library with two bundled CC0 house recordings, actual tap-to-play/pause/seek, optional owner-selected local files (no upload), and simulated exclusive-library deck handoff/recovery. Eleven automated tests and Chromium journeys passed for audio, artwork, collections and handoff; Library/player/setlist renders inspected. Browser JavaScript remains a review vehicle, not the final Android framework. Android storage scanning, official Spotify launch and real USB/deck behavior remain unimplemented/unverified. Simulation does not establish physical storage safety. Owner liked the earlier appearance but requested these revisions; revised interaction/visual acceptance remains pending. DEC-032 adds the owner-requested familiar song list with top Play/Shuffle, thumbnail artwork, full now-playing view, mini-player, next/previous and queue advance. Supported embedded MP3 tags are read locally; demo/missing-art covers are original placeholders, not claimed original album art. DEC-033 adds named playlists and ordered setlists with membership edits and reordering; playing/shuffling a collection stays within it. Lists and owner file choices reset on browser refresh; persistence is future Android work. Whole-library deck export is unchanged, and deck/rekordbox playlist compatibility remains unverified.

Owner feedback under DEC-026: prior updates were too technical and lacked context. Read docs/build-plan.md. Before technical details, explain what this step does for Serein, why it matters, where it fits, success and the next decision. We are preparing an open desk experiment, not assembling the final pocket device. Under DEC-027 the two prepared supplier inquiries were sent through the owner-designated Outlook account on 2026-10-05. Account and saved copies were verified; answers are pending. Do not resend or publish personal sender/mailbox identifiers.

Read these files in order:
1. AGENTS.md
2. docs/working-agreement.md
3. docs/continuation.md
4. docs/task-tracker.md
5. docs/decision-log.md and docs/decisions.md
6. docs/product-brief.md, docs/feasibility.md, and docs/sync-workflow.md
Inspect assets/serein-finish-study.png if your environment supports images; disclose if it does not.

Use our rhythm: recommend → discuss → approve → implement → verify → owner tests → accept or reopen → update records → next task. Maintain stable task IDs, dependencies, deliverables, completion criteria, verification evidence, acceptance status, and exactly one next task. Work in small explained steps and ask one focused question at a time. Under DEC-025 show concise evidence, assumptions, tradeoffs, recommendation and what would change it in this chat as well as GitHub, so I can challenge proposals.

Serein is a physical pocket music player first, with later music discovery and DJ set/transition software. Its current direction is an upright credit-card silhouette with flat front/back/sides, front touchscreen, side volume buttons, top power, Bluetooth, headphone jack, USB-C bottom-left, headphone jack bottom-right, 64 GB storage target, and microSD. Finishes are jet black and very dark matte purple, forest green, and blue.

Spotify is required in the first working version; the normal official Android app is acceptable. Direct CDJ connection as a flash-drive replacement is core. No hardware or architecture has been selected. The 24-hour battery and size targets are unverified. The owner has a 3D printer. Budget is deferred.

Completed work includes naming, requirements, iterative renders, initial technical research, public GitHub setup, local Git connection, task-completion publication workflow, and these source-of-truth documents. Do not repeat that work or present research as a hardware test.

Public Serein repository publication and uploads after completed tasks are explicitly authorized within that scope. Announce publication, run appropriate checks, publish reviewed work, and report the result. Paid requests, deployment, unrelated disclosure, invitations, and destructive actions need their own approval. Publishing a deliverable does not close owner acceptance.

Begin with a short readback of current state. SER-005 handoff is accepted under DEC-018. New-only purchase preference is recorded under DEC-019. Gemini MDJ-500 preliminary basic player choice and continuing architecture planning are approved under DEC-020; no purchase/access or physical compatibility is verified. Actual Pioneer CDJ/XDJ access remains open and its compatibility gate still applies. Owner feedback under DEC-021 challenged the standalone Spotify proof. SER-007 now prioritizes compact Android USB disk export: read docs/prototype-architecture.md and docs/dj-test-targets.md. Read docs/zero3w-usb-evidence.md: release-linked ZERO 3W sources enable the kernel storage function, create configfs gadget startup and offer a userdebug build route. Recommend a new 2 GB board with microSD boot for a bounded one-board storage bench; downloaded-image/live privilege/export and deck behavior remain untested. Owner then asked whether this is the best option, without approving it. Bounded alternatives review is recorded in zero3w-usb-evidence.md; no final-platform winner is proven. Owner authorized continuing comparison under DEC-022. Read docs/display-power-assessment.md: the completed comparison retains ZERO 3W for the USB bench and identifies CM3 as a stronger custom-pocket integration lead among these three; touch fit/drivers and endurance remain unverified. Owner authorized concrete bench-plan preparation under DEC-023. Read docs/usb-bench-plan.md and docs/usb-compatibility-review.md. DEC-024 authorizes the compatibility follow-up: pinned source enables AIC8800 and includes AIC8800D80 support; exact sold board/binary matching remains unverified. Prefer the official PiKVM splitter candidate (new $14.95, board/splitter subset $54.94 before separate supply/accessories/delivery). Manufacturer documents separated 5 V power/direct data; exact ZERO 3W CC/VBUS/OTG match needs confirmation. CG-UCUSBPDB remains a fallback with power/isolation gaps. Gemini manual prohibits hubs; hub alternative is computer-only. Both prepared supplier inquiries were sent under DEC-027; answers are pending. No broader outreach or purchase approval exists. Hardware dependency: review Arace and PiShop replies before final kit approval; current next owner action is the SER-011 preview review. Do not repeat generic research or infer failure from image age. No purchase or flashing approval exists. Do not repeat the accepted Gemini choice, generic Spotify proof, or approval question for the superseded two-part plan. Exact hardware, costs, integrated enclosure/power/USB-C routing and battery results remain open. Preserve acceptance states, update records and give a copy-paste assistant update at closeout.
```

## Independent owner check for SER-005

The cloud readback should correctly identify:
- Assistant as CTO and project manager; human as owner and final approver.
- The physical device, Spotify, and direct CDJ use as the current focus.
- The agreed shape, controls, ports, storage, and dark finish direction.
- Battery, fit, architecture, and real CDJ compatibility as untested.
- Budget deferred; hardware unselected; no completed physical prototype.
- SER-005 accepted; Gemini preliminary choice accepted; SER-007 bench plan delivered, purchase/execution blocked by compatibility checks; ZERO 3W bench proposal unaccepted; actual Pioneer access and tests unverified.

This owner check was completed and accepted under DEC-018. Reopen if context is missing or inaccurate. SER-002's separate render acceptance remains pending.

## Cloud continuation evidence

On 2026-10-03 the cloud session fetched current main, read the requested records, and inspected the finish study. Documentation and image access work; the owner subsequently accepted the readback and instructed continuation under DEC-018. Account-level environment publication and physical-device feasibility remain unverified.

## Copy-paste update for the owner's assistant

```text
Phase/status: First device-software preview awaiting owner review; hardware awaits replies.
Completed: Clickable screens, handoff rules, seven flow tests and browser journeys.
Decisions: Start device software in the interim; final framework/design remain open.
Open: Android/USB integration, hardware validation and supplier answers.
Next task: Create and play a setlist in the revised Library.
Needed from owner: Feedback on controls/style; no purchases needed for preview.
```
