# Cloud handoff for Serein

Prepared: 2026-10-06. This handoff carries project records, not the full local chat transcript.

## Paste into the cloud session

```text
Continue Project Serein from:
https://github.com/wky8h6ccjz-droid/Project-Serein

Act as both my CTO and project manager. I am the project owner: I approve consequential product, creative, architecture, cost, privacy, and scope decisions, and I accept or reopen finished work.

SER-011 Library/player preview is accepted under DEC-034 (“works great - lets go next”). SER-012 now saves imported audio, locally read artwork and named/ordered playlists/setlists in this browser only; no uploads or original-file changes. Eleven existing unit checks and Chromium interaction/persistence journeys passed, including offline playback after reopening, save-failure rollback, cross-tab conflict lockout and simulated handoff restart recovery. Browser/site data removal or private-mode policy can remove/prevent saving; this is not native Android storage or proof of physical USB safety. SER-012 awaits the owner’s restart test. SER-013 supplies the requested interactive project map: five workstreams, fourteen stable tasks, status filters and expandable dependencies/deliverables. SER-014 native first-build implementation is approved under DEC-039; the app-shell increment is underway. SER-007 independently waits for supplier replies; the two targeted sender/date searches on 2026-10-05 returned no matching messages, which does not establish absence of replies elsewhere. No purchases, flashing, wiring or real deck tests have occurred.

Under DEC-039, the owner approved native Kotlin/Compose + Media3/Room for the first Android test app and emulator-first testing. SER-014A now has a full JDK17/SDK, checksum-checked Gradle wrapper, dependency verification/locks, and a compiled native navigation shell. Debug app and instrumentation APKs build; lint reports no issues. Emulators run here in software mode without KVM. The shell installs/launches on Android8/API26; all three final shell tests pass with animations off. API30 software images had Android system-service crashes; no API30/36 runtime success is claimed. See software/android/BUILD-EVIDENCE.md for receipts and native screenshots. The shell has Home, empty Songs/Playlists/Setlists, absent-Spotify messaging and an unavailable Deck screen. It does not yet import, save or play music. SER-014B–F remain approved queued implementation increments, subject to the owner acceptance gates. No final electronics, physical USB/deck support or battery result is established. No new supplier search/outreach occurred.

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

Spotify is required in the first working version; the normal official Android app is acceptable. Direct CDJ connection as a flash-drive replacement is core. No final hardware architecture has been selected; the first test app uses the approved native Android route. The 24-hour battery and size targets are unverified. The owner has a 3D printer. Budget is deferred.

Completed work includes naming, requirements, iterative renders, initial technical research, public GitHub setup, local Git connection, task-completion publication workflow, and these source-of-truth documents. Do not repeat that work or present research as a hardware test.

Public Serein repository publication and uploads after completed tasks are explicitly authorized within that scope. Announce publication, run appropriate checks, publish reviewed work, and report the result. Paid requests, deployment, unrelated disclosure, invitations, and destructive actions need their own approval. Publishing a deliverable does not close owner acceptance.

Begin with a short readback of current state. SER-005 handoff is accepted under DEC-018. New-only purchase preference is recorded under DEC-019. Gemini MDJ-500 preliminary basic player choice and continuing architecture planning are approved under DEC-020; no purchase/access or physical compatibility is verified. Actual Pioneer CDJ/XDJ access remains open and its compatibility gate still applies. Owner feedback under DEC-021 challenged the standalone Spotify proof. SER-007 now prioritizes compact Android USB disk export: read docs/prototype-architecture.md and docs/dj-test-targets.md. Read docs/zero3w-usb-evidence.md: release-linked ZERO 3W sources enable the kernel storage function, create configfs gadget startup and offer a userdebug build route. Recommend a new 2 GB board with microSD boot for a bounded one-board storage bench; downloaded-image/live privilege/export and deck behavior remain untested. Owner then asked whether this is the best option, without approving it. Bounded alternatives review is recorded in zero3w-usb-evidence.md; no final-platform winner is proven. Owner authorized continuing comparison under DEC-022. Read docs/display-power-assessment.md: the completed comparison retains ZERO 3W for the USB bench and identifies CM3 as a stronger custom-pocket integration lead among these three; touch fit/drivers and endurance remain unverified. Owner authorized concrete bench-plan preparation under DEC-023. Read docs/usb-bench-plan.md and docs/usb-compatibility-review.md. DEC-024 authorizes the compatibility follow-up: pinned source enables AIC8800 and includes AIC8800D80 support; exact sold board/binary matching remains unverified. Prefer the official PiKVM splitter candidate (new $14.95, board/splitter subset $54.94 before separate supply/accessories/delivery). Manufacturer documents separated 5 V power/direct data; exact ZERO 3W CC/VBUS/OTG match needs confirmation. CG-UCUSBPDB remains a fallback with power/isolation gaps. Gemini manual prohibits hubs; hub alternative is computer-only. Both prepared supplier inquiries were sent under DEC-027; answers are pending. No broader outreach or purchase approval exists. Hardware dependency: review Arace and PiShop replies before final kit approval; current next action is owner review of the verified SER-014A native shell. Do not repeat generic research or infer failure from image age. No purchase or flashing approval exists. Do not repeat the accepted Gemini choice, generic Spotify proof, or approval question for the superseded two-part plan. Exact hardware, costs, integrated enclosure/power/USB-C routing and battery results remain open. Preserve acceptance states, update records and give a copy-paste assistant update at closeout.
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
Phase/status: Android first-build implementation; SER-014A verified, awaiting owner review.
Completed: JDK/SDK/wrapper, native shell source, dependency locks/checksums, app/test APK build, fresh source-only compile, clean lint, API26 install/launch and3 passed native tests.
Decisions: DEC-039 approves native Kotlin/Compose + Media3/Room test app; emulator-first.
Open: API30 emulator unreliable; native music features and hardware replies remain open.
Next task: Review native shell before SER-014B Library/player port.
Needed from owner: Native screen/APK review or corrections; no repeat framework decision.
```
