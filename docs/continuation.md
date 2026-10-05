# Serein continuation

Updated: 2026-10-05. Read AGENTS.md and working-agreement.md first.

## Phase and current item

Product definition and feasibility. SER-005 handoff accepted under DEC-018. **SER-011 device-software preview is implemented and awaiting owner review. SER-007 awaits supplier replies; hardware procurement/execution remains blocked.** DEC-023/024 authorize bench planning and compatibility research, not hardware selection or execution. DEC-027 separately authorizes the two initial supplier inquiries; both have been sent. SER-006 actual Pioneer CDJ/XDJ target/access remains open; Gemini preliminary choice accepted.

The assistant is CTO and project manager. The human is project owner, approving consequential decisions and final acceptance. Follow the ten-guideline rhythm; ask one focused question at a time. Under DEC-025, show concise evidence, assumptions, tradeoffs, recommendation and what would change it in this chat as well as GitHub, so the owner can challenge proposals.

## Product and approved direction

Owner feedback under DEC-026: updates have been too technical and lacked context. Read [build-plan.md](build-plan.md) and explain the plan in chat: prepare a compatible kit → open desk prototype → real deck proof → pocket electronics → physical prototype. We are preparing the first experiment, not assembling the finished product. Start each step with its purpose, success condition and next decision; technical details are optional. No hardware purchased or working prototype demonstrated. Under DEC-027, the owner-designated Outlook account was verified privately and both initial supplier inquiries were sent; saved copies verified. Await their answers. Keep private sender/mailbox identifiers out of the public repo.

A standalone pocket music player for phone-free listening and carrying an owned DJ library. Device first; genre/remix discovery and DJ set/transition software later. Noctis is separate.

Upright credit-card silhouette, flat front/back/sides, full-front touchscreen, side volume up/down, top power. Bluetooth primary plus 3.5 mm jack. USB-C charging and CDJ data connection; USB-C bottom-left and jack bottom-right. At least 64 GB storage target plus microSD. Solid premium feel. Jet black, very dark matte purple, forest green, and blue.

Spotify is required in the first working version; the normal official Android app is acceptable initially. Direct connection to supported CDJs in place of a flash drive is core. Keep Spotify listening and exportable owned DJ files distinct.

## Interim device software

Under DEC-028 the owner asked to start useful software while awaiting supplier replies. Read software/device-preview/README.md. First increment: interactive Home, DJ Library and Deck flow, fictional example tracks, Spotify-launch placeholder and simulated exclusive-library handoff/recovery. Open preview.html directly in a browser, or use the loopback-only local server. Seven flow tests and Chromium journeys passed; home render inspected. Real Android app, filesystem/USB backend and physical deck behavior are not implemented or verified. Browser/JavaScript is a review vehicle, not a final framework selection. No account connection, audio or owner file access. Ask for review of the concrete interaction and proposed style; the companion remains deferred. Do not claim that simulated eject/recovery establishes actual disk safety.

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

No selected/purchased Serein electronics, device-installed firmware/app, CAD or working physical device. A hardware-independent browser software preview now exists under SER-011. Spotify on candidate hardware, USB storage, library metadata, battery, audio, and component fit remain untested.

24-hour listening and about 86 × 54 mm footprint are targets. Roughly 12–14 mm depth is an assistant render assumption. Storage allocation/microSD placement and printer details are open. Budget remains deferred.

## Shared-workflow status

Public Serein task-completion uploads are authorized. Local Git tracks origin/main; local CLI push lacks authentication, so connected GitHub tools publish and local Git fetches/fast-forwards. No background watcher exists.

A prior cloud session verified repository/image access and a Git-proxy push dry run. Account-level cloud environment publication remains unverified: owner said they would click Save and publish; no completion confirmation is recorded. Inspect actual branch and changes in each session rather than assuming a cloud checkout's state persists.

## Single next action

**SER-011:** owner tries the first preview and reviews the Home → Library → Deck → return flow, including unexpected-unplug recovery. Arace/PiShop replies remain the independent SER-007 hardware dependency; no purchase or flashing approved.

Current verification: source/document review, seven software-flow tests, browser journeys and home-render inspection; no Android build, physical tests or owner interaction/architecture acceptance. Records are published through connected GitHub tools; current local CLI fetch is blocked by the proxy connection. Preserve local files until Git history can be synchronized.
