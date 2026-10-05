# Serein task tracker

Updated: 2026-10-05. Assistant manages execution; owner approves consequential decisions and acceptance.

## Current phase and single next task

**Phase:** product definition and feasibility; in progress.

**Active item:** SER-007, display/power comparison delivered for review after DEC-022. Bench proposal remains unaccepted; release-source and integration research complete. Gemini MDJ-500 preliminary choice is accepted under DEC-020; SER-006 actual Pioneer CDJ/XDJ access remains open.

**Single next task/action:** prepare a concrete ZERO 3W USB bench kit, documented power/data connection and bounded test plan for owner review. Resolve shared-port power before recommending purchases or wiring; no hardware, purchase or flashing approved.

## Status rules

Proposed → Ready → In progress → Awaiting owner acceptance → Accepted.
Use Blocked for a concrete unmet dependency, Deferred for parked work, and Reopened when an owner-reported problem requires correction.

Accepted requires completion criteria, verification evidence, and owner confirmation. Historical confirmations are recorded within their actual scope. Future task descriptions are proposals, not implementation approvals.

## SER-001 — Capture the product direction

- **Purpose:** preserve the owner's preferences and prevent repeated discovery.
- **Dependencies:** owner's product and design answers.
- **Deliverable:** product-brief.md, decisions.md, and decision-log.md.
- **Status:** Accepted for the individually approved requirements; full product-definition phase remains open.
- **Completion criteria:** stated requirements trace to owner instructions; proposals and untested targets are labeled; unresolved architecture questions remain visible.
- **Verification:** assistant reviewed the conversation and documents for consistency.
- **Owner acceptance:** individual choices have explicit approvals in the decision log; no whole-device or completed-phase acceptance is inferred.

## SER-002 — Produce form and finish concepts

- **Purpose:** give the owner a concrete physical object to react to.
- **Dependencies:** SER-001's form, controls, colors, and port preferences.
- **Deliverable:** assets/serein-finish-study.png.
- **Status:** Awaiting owner acceptance of the latest render.
- **Completion criteria:** flat front/back and sides, slim upright silhouette, correct controls, separated bottom ports, and the four dark finishes match the owner's preference.
- **Verification:** assistant visually inspected image outputs; the latest image is stored in GitHub.
- **Owner test:** compare the latest image's shape, dark colors, and ports against the intended object.
- **Owner acceptance:** requested revisions were implemented; no explicit acceptance of the final jet-black render has been recorded.
- **Limit:** conceptual image only; no CAD, component fit, materials, or battery validation.

## SER-003 — Establish the shared GitHub record

- **Purpose:** make project context available outside the local chat.
- **Dependencies:** owner approval for public disclosure.
- **Deliverable:** public Project-Serein repository containing context and the latest render.
- **Status:** Accepted for repository setup.
- **Completion criteria:** files are published on main, image and links resolve, and local Git is connected.
- **Verification:** GitHub API inspection, local Git branch/history inspection, file comparison, and link checks passed.
- **Owner acceptance:** public publication approved explicitly; subsequent “okay great” acknowledged the completed setup.
- **Limit:** this does not establish that an account-level cloud environment has been published or used.

## SER-004 — Publish finished tasks across local/cloud work

- **Purpose:** keep GitHub as the shared record of completed work.
- **Dependencies:** SER-003 and the owner's sync preference.
- **Deliverable:** Git checkout tracking origin/main, sync-workflow.md, and task-completion publication instructions.
- **Status:** Accepted for the chosen workflow.
- **Completion criteria:** publish a completed change, fetch it locally, verify matching history and clean checkout, and preserve scoped upload authorization.
- **Verification:** connected GitHub tools published a real documentation commit; local fetch/fast-forward matched it. Direct CLI push dry run reported missing authentication.
- **Owner acceptance:** owner selected publication after each task and acknowledged setup.
- **Limit:** assistant-operated publication; no file-save watcher. Existing cloud workspaces may require a fetch.

## SER-005 — Adopt the owner's process and prepare cloud handoff

- **Purpose:** make the requested working rhythm and existing Serein context portable.
- **Dependencies:** SER-001, SER-003, SER-004, and the owner's ten guidelines.
- **Deliverable:** working-agreement.md, this tracker, decision-log.md, continuation.md, cloud-handoff.md, and consistent existing documents.
- **Status:** Accepted for the working agreement and cloud handoff.
- **Completion criteria:** every task has the requested fields; approvals and proposals are distinguished; one next action is identified; roles agree everywhere; copy-paste cloud instructions preserve prior work; reviewed documents are published and local/GitHub state matches.
- **Automated verification:** local document links, referenced task/decision IDs, stale-role scan, whitespace checks, and published/local Git comparison.
- **Assistant hands-on verification:** read the handoff as a new session; checked it covers the working agreement, current design, work completed, unresolved evidence, and acceptance gate.
- **Owner test:** start a cloud session using cloud-handoff.md. Ask it to read back its roles, the approved device requirements, the untested gates, and the single next action. Confirm accuracy or identify a correction.
- **Cloud-session verification (2026-10-03):** fetched and fast-forwarded the clean cloud checkout to published main; read AGENTS.md, the working agreement, continuation, tracker, decision log, handoff, requirements, product brief, feasibility, and sync/setup records; visually inspected assets/serein-finish-study.png. Documentation access and image inspection work. No device tests were performed, and account-level environment publication is unverified.
- **Owner acceptance (2026-10-03):** after reviewing the cloud readback, the owner said “okay sounds good ill click that - lets continue to project workflow now.” Recorded as acceptance of the handoff and instruction to advance to SER-006; does not accept the final render or prove environment publication.
- **Reopen trigger:** missing or inaccurate context, contradictory role/approval rules, or inability to follow the handoff.

## SER-006 — Identify the first CDJ test target

- **Purpose:** define compatibility against real accessible equipment.
- **Dependencies:** SER-005 acceptance and owner input.
- **Deliverable:** [DJ test-target record](dj-test-targets.md), listing model, firmware if known, access, prepared-library workflow, and baseline flash drive.
- **Status:** In progress for actual Pioneer target/access; Gemini preliminary choice accepted under DEC-020. Owner authorized advancing architecture planning with the Pioneer gate open.
- **Completion criteria:** owner confirms the first model and how it can be tested; unknown firmware details are assigned a check.
- **Assistant verification:** checked official DDJ-FLX4 documentation. Its software-host workflow cannot validate standalone USB-storage playback. No hardware test performed.
- **Owner input:** DDJ-FLX4 with rekordbox; owner confirmed laptop dependence and answered “Possibly, but I need to check” about standalone CDJ/XDJ access.
- **Research update (2026-10-04):** owner requested the cheapest personal test purchase and rejected used options. New-only recommendation: XDJ-700, advertised new/in stock at $829 by Sweetwater and B&H, excluding tax and any delivery/accessories. Official capabilities reviewed; no model, budget, purchase, or physical result confirmed. Earlier used comparisons are superseded. Evidence and limits in dj-test-targets.md.
- **Broader-market follow-up (2026-10-04):** owner challenged the price and asked for very basic new options. Gemini MDJ-500 is listed new at $229.95; official standalone USB/audio capability checked. It could support an early experiment, but native Pioneer library/cue support is unverified and it cannot establish CDJ compatibility. Earlier $829 research applied to Pioneer/AlphaTheta only. No test or purchase occurred.
- **Owner test/acceptance:** Gemini preliminary choice accepted on 2026-10-04 under DEC-020. Actual Pioneer target/access and physical compatibility are not accepted or verified.
- **Needed before physical tests:** actual Gemini/Pioneer access, firmware and baseline USB workflow. Do not repeat the accepted preliminary choice; single current action is SER-007 concrete USB bench/power/test plan preparation.

## SER-007 — Recommend a bounded prototype architecture

- **Purpose:** choose a credible path for official Spotify and CDJ-compatible USB storage.
- **Dependencies:** SER-006 and current primary-source research. DEC-020 permits planning while actual CDJ access is unresolved; physical Pioneer validation still requires that access.
- **Deliverable:** [USB-storage-first assessment](prototype-architecture.md), [display/power comparison](display-power-assessment.md), source-backed Android storage mechanism, compact hardware lead, evidence gaps, proposed proof and eventual owner decision.
- **Status:** In progress for concrete bench-plan preparation; display/power comparison delivered for review. ZERO 3W bench proposal remains unaccepted; physical tests absent.
- **Completion criteria:** official Spotify support, USB device/storage capability, library compatibility, power/audio, and fit are addressed; limitations are explicit; owner approves the approach before selection or purchase.
- **Verification/owner test:** owner can explain the recommendation and its main tradeoffs and approve or reject it.
- **Assistant verification (2026-10-04):** reviewed current official Spotify, AOSP, Linux USB-storage and Raspberry Pi sources; checked storage handoff, metadata, power/audio, cost and physical-fit coverage. No physical device or prototype tests.
- **Owner feedback (2026-10-04):** generic Spotify-on-Android proof adds little; prioritize USB-storage export under DEC-021. Later owner review covers a concrete capability-backed hardware recommendation. No purchase or architecture acceptance yet.
- **Research update (2026-10-05):** [pinned ZERO 3W evidence](zero3w-usb-evidence.md) traces the linked Android release to board kernel recipe, enabled mass-storage config, gadget startup and userdebug option. Build guide uses an older branch; binary correspondence/root access and live behavior are unverified. Recommend a new 2 GB board with microSD boot for the one-board storage experiment; indicative listing $39.99, not a delivered quote.
- **Verification:** reviewed source provenance, claims/limits, handoff and record consistency; no downloaded-image inspection, firmware build or hardware test.
- **Owner acceptance:** pending. Owner asked whether this is best; no approval inferred. Compared manufacturer-documented Pi Zero 2 W, M300, CM3 and ZERO 2 Pro alternatives; Orange Pi sources unavailable. ZERO 3W remains a defensible USB bench candidate, not a proven final-platform winner. Owner authorized continuing the comparison under DEC-022. Display/power assessment retains ZERO 3W for the USB bench and identifies CM3 as the stronger custom-pocket integration lead. Touchscreen fit/drivers and measured endurance are unresolved. Prepare the concrete kit/power/test plan before asking for hardware approval.
- **Open issue:** exact Android and USB-storage hardware, shared power/USB-C routing, enclosure fit and measured endurance remain unselected/unverified; no approach acceptance inferred from approval to plan; two-part architecture is a fallback.

## SER-008 — Prove the listening and DJ storage journeys

- **Purpose:** test the two central workflows before investing in the final enclosure.
- **Dependencies:** SER-007 approval, accessible equipment, owned test audio, and approval for any spending.
- **Deliverable:** reproducible Spotify/audio and CDJ/storage test results, with firmware and conditions recorded.
- **Status:** Proposed.
- **Completion criteria:** official Spotify works on the candidate; selected deck recognizes its storage and prepared library, loads and plays tracks reliably, and survives reconnect/eject tests without conflicting storage writes.
- **Verification/owner test:** assistant records bench evidence; owner independently repeats the agreed listening and deck connection tests.
- **Open issue:** no such test has occurred; exact prototype scope requires approval.

## SER-009 — Validate the physical prototype and endurance

- **Purpose:** establish hand feel, component fit, and realistic battery/audio behavior.
- **Dependencies:** approved mockup plan and printer details; component-fit/endurance work additionally depends on SER-007 and SER-008.
- **Deliverable:** printable mockup, fit evidence, and recorded endurance/audio results.
- **Status:** Proposed; break into smaller tasks before implementation.
- **Completion criteria:** owner accepts the physical feel; actual components fit; realistic battery and audio tests are documented against the 24-hour target.
- **Verification/owner test:** measured fit and endurance checks plus the owner's handling/listening test.
- **Open issue:** printer model, hardware, CAD, battery, materials, and cost remain unresolved. No result is promised by the renders.

## SER-010 — Explore the discovery and DJ companion

- **Purpose:** develop the broader genre/remix explorer and set/transition lab.
- **Dependencies:** owner approval to activate the companion workstream.
- **Deliverable:** bounded companion scope and future tasks.
- **Status:** Deferred while the device is first.
- **Completion criteria:** owner approves a narrow phase before software work begins.
- **Verification/owner test:** defined when that scope is approved.

## Unresolved items

Untested Spotify/CDJ integration, no selected hardware, unmeasured battery life, unverified size/fit, unresolved storage allocation/microSD placement, final-render acceptance pending, account-level cloud environment publication unverified, local-session CLI push authentication unavailable, and budget deferred. Cloud documentation access and image inspection are verified.
