# Serein continuation

Updated: 2026-10-05. Read AGENTS.md and working-agreement.md first.

## Phase and current item

Product definition and feasibility. SER-005 handoff accepted under DEC-018. **SER-007 bench plan is delivered for review; procurement/execution is blocked by exact board/image and 5 V power checks.** DEC-023 authorizes plan preparation, not hardware selection or execution. SER-006 actual Pioneer CDJ/XDJ target/access remains open; Gemini preliminary choice accepted.

The assistant is CTO and project manager. The human is project owner, approving consequential decisions and final acceptance. Follow the ten-guideline rhythm; ask one focused question at a time.

## Product and approved direction

A standalone pocket music player for phone-free listening and carrying an owned DJ library. Device first; genre/remix discovery and DJ set/transition software later. Noctis is separate.

Upright credit-card silhouette, flat front/back/sides, full-front touchscreen, side volume up/down, top power. Bluetooth primary plus 3.5 mm jack. USB-C charging and CDJ data connection; USB-C bottom-left and jack bottom-right. At least 64 GB storage target plus microSD. Solid premium feel. Jet black, very dark matte purple, forest green, and blue.

Spotify is required in the first working version; the normal official Android app is acceptable initially. Direct connection to supported CDJs in place of a flash drive is core. Keep Spotify listening and exportable owned DJ files distinct.

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

Read usb-bench-plan.md for the exact kit leads and test sequence. A direct CG-UCUSBPDB injector is advertised at $118.29; with the $39.99 board the known subtotal is $158.28 before unquoted accessories/delivery. Non-PD 5 V current, upstream isolation and hub-free passthrough need confirmation. StarTech 311UE-USB-HUB is a computer-only alternative; the Gemini-authored manual says hubs are unsupported. Current wireless variants must be matched to the older Android release. Owner country and laptop USB connectors have been requested; no supplier contacted.

No selected/purchased Serein device electronics, firmware/app, CAD, or working device. Spotify on candidate hardware, USB storage, library metadata, battery, audio, and component fit remain untested.

24-hour listening and about 86 × 54 mm footprint are targets. Roughly 12–14 mm depth is an assistant render assumption. Storage allocation/microSD placement and printer details are open. Budget remains deferred.

## Shared-workflow status

Public Serein task-completion uploads are authorized. Local Git tracks origin/main; local CLI push lacks authentication, so connected GitHub tools publish and local Git fetches/fast-forwards. No background watcher exists.

A prior cloud session verified repository/image access and a Git-proxy push dry run. Account-level cloud environment publication remains unverified: owner said they would click Save and publish; no completion confirmation is recorded. Inspect actual branch and changes in each session rather than assuming a cloud checkout's state persists.

## Single next action

**SER-007:** close the exact board/image and 5 V power/passthrough checks before finalizing the bench kit for owner approval. No purchase or flashing approved.

Current verification: primary-source and document review only; no physical tests or owner architecture acceptance. Records are published through connected GitHub tools; current local CLI fetch is blocked by the proxy connection. Preserve local files until Git history can be synchronized.
