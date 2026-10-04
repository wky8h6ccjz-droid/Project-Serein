# Serein task tracker

Updated: 2026-10-03. Assistant manages execution; owner approves consequential decisions and acceptance.

## Current phase and single next task

**Phase:** product definition and feasibility; in progress.

**Active item:** SER-005, working agreement and cloud handoff. Implementation and verification are complete; owner acceptance is pending.

**Single next task/action:** review the cloud-session readback for SER-005 and accept or report a discrepancy. The cloud session has read the project records and inspected the finish study. SER-006 becomes active only after owner acceptance.

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
- **Status:** Awaiting owner acceptance.
- **Completion criteria:** every task has the requested fields; approvals and proposals are distinguished; one next action is identified; roles agree everywhere; copy-paste cloud instructions preserve prior work; reviewed documents are published and local/GitHub state matches.
- **Automated verification:** local document links, referenced task/decision IDs, stale-role scan, whitespace checks, and published/local Git comparison.
- **Assistant hands-on verification:** read the handoff as a new session; checked it covers the working agreement, current design, work completed, unresolved evidence, and acceptance gate.
- **Owner test:** start a cloud session using cloud-handoff.md. Ask it to read back its roles, the approved device requirements, the untested gates, and the single next action. Confirm accuracy or identify a correction.
- **Cloud-session verification (2026-10-03):** fetched and fast-forwarded the clean cloud checkout to published main; read AGENTS.md, the working agreement, continuation, tracker, decision log, handoff, requirements, product brief, feasibility, and sync/setup records; visually inspected assets/serein-finish-study.png. Documentation access and image inspection work. No device tests were performed, and account-level environment publication is unverified.
- **Owner acceptance:** pending; owner review of the cloud readback is the remaining gate.
- **Reopen trigger:** missing or inaccurate context, contradictory role/approval rules, or inability to follow the handoff.

## SER-006 — Identify the first CDJ test target

- **Purpose:** define compatibility against real accessible equipment.
- **Dependencies:** SER-005 acceptance and owner input.
- **Deliverable:** a short test-target record listing model, firmware if known, access, prepared-library workflow, and baseline flash drive.
- **Status:** Proposed; queued after SER-005 acceptance.
- **Completion criteria:** owner confirms the first model and how it can be tested; unknown firmware details are assigned a check.
- **Verification/owner test:** compare the record with the deck the owner can access.
- **Needed from owner:** which CDJ models they use or can borrow/test.
- **First question once active:** “Which CDJ models do you use or have access to for testing?”

## SER-007 — Recommend a bounded prototype architecture

- **Purpose:** choose a credible path for official Spotify and CDJ-compatible USB storage.
- **Dependencies:** SER-006 and current primary-source research.
- **Deliverable:** a small comparison of candidate approaches, evidence, uncertainties, a recommended proof plan, and owner decision.
- **Status:** Proposed.
- **Completion criteria:** official Spotify support, USB device/storage capability, library compatibility, power/audio, and fit are addressed; limitations are explicit; owner approves the approach before selection or purchase.
- **Verification/owner test:** owner can explain the recommendation and its main tradeoffs and approve or reject it.
- **Open issue:** an Android donor was proposed, but no architecture or hardware was selected.

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
