# Serein continuation

Updated: 2026-10-05. Read AGENTS.md and working-agreement.md first.

## Phase and current item

Product definition and feasibility. SER-005 handoff accepted under DEC-018. **SER-014 Android preparation delivered; native route/first-build scope awaits owner approval. SER-011 preview accepted; SER-012 owner restart test and SER-013 whole-map acceptance remain open. SER-007 awaits replies.** DEC-023/024 authorize bench planning and compatibility research, not hardware selection or execution. DEC-027 separately authorizes the two initial supplier inquiries; both have been sent. SER-006 actual Pioneer CDJ/XDJ target/access remains open; Gemini preliminary choice accepted.

The assistant is CTO and project manager. The human is project owner, approving consequential decisions and final acceptance. Follow the ten-guideline rhythm; ask one focused question at a time. Under DEC-025, show concise evidence, assumptions, tradeoffs, recommendation and what would change it in this chat as well as GitHub, so the owner can challenge proposals.

## Product and approved direction

Owner feedback under DEC-026: updates have been too technical and lacked context. Read [build-plan.md](build-plan.md) and explain the plan in chat: prepare a compatible kit → open desk prototype → real deck proof → pocket electronics → physical prototype. We are preparing the first experiment, not assembling the finished product. Start each step with its purpose, success condition and next decision; technical details are optional. No hardware purchased or working prototype demonstrated. Under DEC-027, the owner-designated Outlook account was verified privately and both initial supplier inquiries were sent; saved copies verified. Await their answers. Keep private sender/mailbox identifiers out of the public repo.

A standalone pocket music player for phone-free listening and carrying an owned DJ library. Device first; genre/remix discovery and DJ set/transition software later. Noctis is separate.

Upright credit-card silhouette, flat front/back/sides, full-front touchscreen, side volume up/down, top power. Bluetooth primary plus 3.5 mm jack. USB-C charging and CDJ data connection; USB-C bottom-left and jack bottom-right. At least 64 GB storage target plus microSD. Solid premium feel. Jet black, very dark matte purple, forest green, and blue.

Spotify is required in the first working version; the normal official Android app is acceptable initially. Direct connection to supported CDJs in place of a flash drive is core. Keep Spotify listening and exportable owned DJ files distinct.

## Interim device software

SER-011 Library/player preview is accepted under DEC-034 (“works great - lets go next”). SER-012 now saves imported audio, locally read artwork and named/ordered playlists/setlists in this browser only; no uploads or original-file changes. Eleven existing unit checks and Chromium interaction/persistence journeys passed, including offline playback after reopening, save-failure rollback, cross-tab conflict lockout and simulated handoff restart recovery. Browser/site data removal or private-mode policy can remove/prevent saving; this is not native Android storage or proof of physical USB safety. SER-012 awaits the owner’s restart test. SER-013 supplies the requested interactive project map: five workstreams, fourteen stable tasks, status filters and expandable dependencies/deliverables. SER-014 preparation is now authorized under DEC-037; read the new section below for its current approval gate. SER-007 independently waits for supplier replies; the two targeted sender/date searches on 2026-10-05 returned no matching messages, which does not establish absence of replies elsewhere. No purchases, flashing, wiring or real deck tests have occurred.

The preview retains clean Home, real local-song playback, Play/Shuffle, artwork player, playlists/setlists and full-local-library-only simulated deck handoff (DEC-028–033). Spotify downloads stay in Spotify. The browser is a review vehicle; no Android APK, native file scan, Spotify launch or real USB export is implemented. Read [project-map.html](project-map.html) and software/device-preview/README.md.

## Android build preparation

Under DEC-037 the owner chose preparing the Android build as the next focus. SER-014 preparation is delivered in software/android/README.md, build-spec.json and check-readiness.py. Proposed first-build scope: accepted clean UI, real local-file playback/import, saved playlists/setlists, screen-off playback/media controls and launch of the official Spotify app; Deck stays unavailable until physical backend proof. Recommend native Kotlin/Compose + Media3/Room under DEC-038; this framework/scope proposal awaits owner approval, not implementation acceptance. Top-level dependency artifacts and Gradle checksum were verified; full graph resolution/build/install are unperformed. The workspace has Java runtime 21 but no compiler/Android SDK/Gradle/emulator, and no KVM. The read-only readiness report correctly fails with missing prerequisites. No Android tools installed, licenses accepted, app sources/APK created or device accessed. Owner chose emulator-first testing; actual emulator host/image is not set up yet. Git fetch now works with task network permission; preserve local working files and align history safely. No new supplier search/outreach occurred this increment.

## Work already done

- Naming and requirements; iterative form, ports, thickness, and dark-finish renders.
- Latest concept: assets/serein-finish-study.png; final whole-render acceptance remains pending.
- Initial official-source Spotify/CDJ/reckordbox storage research in feasibility.md.
- Public GitHub repository, local Git connection, and verified publication/fetch workflow.
- Working agreement, tracker, decision log, continuation, and cloud handoff.
- Cloud session read the records and inspected the finish study; owner accepted the handoff and instructed continuation.
- Recorded current setup and verified its role from official documentation: DDJ-FLX4 with laptop rekordbox, not a standalone storage playback test target.

## Current test access and unresolved work

Owner says standalone CDJ/XDJ access is “Possibly, but I need to check.” Model and access are unconfirmed. See dj-test-targets.md. The laptop may prepare a baseline library; no export or deck test has occurred. Do not expand scope into Serein hosting rekordbox for the FLX4.

Owner requires new-only purchase recommendations (DEC-019). After the new Gemini MDJ-500 ($229.95 advertised US price) and its limits were explained, owner said “that works - lets go to the next step!” (DEC-020). The Gemini is selected for preliminary basic testing; ownership, purchase/access, firmware and playback are unverified. Gemini's V-CASE workflow does not establish Pioneer rekordbox/CDJ compatibility. Do not repeat the preliminary-player selection question.

Owner challenged the separate Spotify proof (DEC-021): official Spotify on compatible Android is established; actual candidate checks are routine later. SER-007 now investigates USB disk export on compact Android hardware before choosing a separate storage processor. MSD source supplies a concrete privileged Android/configfs/kernel-dependent mechanism. Radxa ZERO 3W release-linked sources now establish an enabled kernel storage function, configfs startup and a userdebug build route. The downloaded image and live root/export/deck behavior remain unverified. Recommend a new 2 GB board with microSD boot for a bounded one-board storage bench experiment; final-device fit is unverified. Read prototype-architecture.md, zero3w-usb-evidence.md and display-power-assessment.md. The integration comparison retains ZERO 3W for the initial USB bench and favors CM3 as a custom-pocket research lead because of documented battery management/display interfaces. Touch assembly fit/drivers and listening power remain unverified. Earlier two-part proposal was unaccepted and is superseded as the default next step; separate storage remains a fallback.

Read usb-bench-plan.md and usb-compatibility-review.md. DEC-024 research found release-pinned AIC8800/AIC8800D80 support; image age alone is not incompatibility evidence. Exact sold board/binary matching remains open. Prefer the official PiKVM USB Power/Data Splitter (new $14.95, SKU 1106-2) as the accessory candidate: manufacturer documents 5 V up to 3 A, separated host power and one data interface. Exact ZERO 3W CC/VBUS/OTG behavior and named supply pairing need confirmation. Board/splitter subset is $54.94 before separate supply/accessories/delivery. CG-UCUSBPDB ($118.29; old $158.28 subset) remains a fallback with power/isolation gaps and conflicting included-supply descriptions. StarTech hub remains computer-only; Gemini manual prohibits hubs. Both prepared supplier inquiries were sent under DEC-027 on 2026-10-05, with saved-copy verification. Answers are pending; do not resend. Country and laptop ports were requested and remain unanswered. Do not repeat generic research: obtain exact confirmations, then prepare the concrete kit for owner approval.

No selected/purchased Serein electronics, device-installed firmware/app, CAD or working physical device. A hardware-independent browser software preview now exists under SER-011. Spotify on candidate hardware, USB storage, library metadata, battery, physical audio hardware, and component fit remain untested.

24-hour listening and about 86 × 54 mm footprint are targets. Roughly 12–14 mm depth is an assistant render assumption. Storage allocation/microSD placement and printer details are open. Budget remains deferred.

## Shared-workflow status

Public Serein task-completion uploads are authorized. Local Git tracks origin/main; local CLI push lacks authentication, so connected GitHub tools publish and local Git fetches/fast-forwards. No background watcher exists.

A prior cloud session verified repository/image access and a Git-proxy push dry run. Account-level cloud environment publication remains unverified: owner said they would click Save and publish; no completion confirmation is recorded. Inspect actual branch and changes in each session rather than assuming a cloud checkout's state persists.

## Single next action

**SER-014:** owner approves or revises the prepared first-build scope/native route in [software/android/README.md](../software/android/README.md). Then execute SER-014A: tools, wrapper and app shell. No repeat of the next-focus choice is needed.

Verification includes prior browser checks plus current primary-source/tool readiness/record alignment. No APK or Android runtime tests. Public task-completion publication is authorized. Git fetch succeeded with task network permission this increment; preserve all working files while synchronizing local history. Hardware replies remain independent; no new purchases/outreach.
