# Serein decision log

Captured from the project conversation on 2026-10-03. IDs are stable; capture date is not a claim that every earlier decision happened on that exact date.

**Approved direction** describes an owner choice. **Target** describes the requested outcome awaiting engineering evidence. **Proposal** is not an approval.

| ID | Decision and status | Owner evidence and scope |
| --- | --- | --- |
| DEC-001 | Serein name — approved | “lets just go with Serein”; Noctis remains a separate project. |
| DEC-002 | Physical device first — approved | Owner prefers starting with the device because it is more fun; companion work remains later. |
| DEC-003 | Upright credit-card footprint, flat front/back/sides — approved direction | Owner selected “slim and upright,” “credit card sounds good,” iPhone 4-like flat edges, and flatter front/back. Exact dimensions remain targets. |
| DEC-004 | Front touchscreen, side volume up/down, top power — approved | Direct owner instructions; no extra physical playback button approved. |
| DEC-005 | Bluetooth primary plus headphone jack; solid premium feel — approved | Battery and hand feel outrank extreme thinness; 3.5 mm jack retained. |
| DEC-006 | 24-hour listening — owner target | “24 hours of listening”; no endurance measurement or proof exists. |
| DEC-007 | Spotify in first working version; normal official app acceptable initially — approved prototype direction | Spotify explicitly required; official Android app approach accepted for the initial version. Specific platform/donor remains open. |
| DEC-008 | USB-C charging, at least 64 GB storage target, microSD expansion — owner direction | Owner requested USB-C, “ideally at least 64gb,” then microSD. Usable/internal allocation remains unresolved; earlier assistant wording about 64 GB usable is not a separately approved capacity allocation. |
| DEC-009 | USB-C bottom-left, headphone jack bottom-right — approved layout direction | Owner requested USB-C on the left end of the bottom, separated from the jack. Physical routing remains unverified. |
| DEC-010 | Jet black and much darker matte purple/forest green/blue — approved creative direction | Owner revised the lighter palette toward dark iPhone Pro-like tones and space gray toward jet black. Latest whole-render acceptance is pending. |
| DEC-011 | Direct CDJ connection replacing a flash drive — core owner requirement | Owner explicitly called this one of the main features. Compatibility is model-specific and untested. |
| DEC-012 | Use the owner's 3D printer for prototyping — available capability | Owner has a printer; model, material, and tolerance are not known. |
| DEC-013 | Defer budget — approved sequencing constraint | “lets decide more details ... before ... a budget”; no budget or purchase approval. |
| DEC-014 | Public GitHub publication — approved external action | Owner twice said “you can make it public” after the destination and payload were explained. Covers Serein project records/render in Project-Serein; no unrelated disclosure or deployment. |
| DEC-015 | Publish completed changes after each task — approved workflow | Owner selected that option over file-edit background uploading. Assistant may routinely publish approved Serein work within scope. |
| DEC-016 | Assistant is CTO and project manager; human is owner/approver — approved current role split | Latest owner instructions explicitly request both roles and retain consequential decisions and final product acceptance. Supersedes the earlier role assignment. |
| DEC-017 | Ten-guideline working rhythm and owner acceptance gate — approved process | Latest owner instructions; authoritative text is working-agreement.md. Task completion must distinguish checks, assistant verification, and owner confirmation. |
| DEC-018 | Cloud handoff accepted; advance to SER-006 — accepted task scope | Following the cloud readback, owner said “okay sounds good ill click that - lets continue to project workflow now.” Acceptance covers the handoff and continuation only; environment publication, final render, hardware, and whole-phase acceptance remain unverified or pending. |
| DEC-019 | New-only test-player purchasing preference — approved | Owner said “i dont like used options”; no used/open-box recommendation unless preference changes. |
| DEC-020 | Gemini MDJ-500 chosen for preliminary basic testing; proceed to architecture planning — approved scope | After the $229.95 new option and its Pioneer-validation limits were explained, owner said “that works - lets go to the next step!” on 2026-10-04. Selection covers the basic player and planning continuation; no purchase performed or equipment access verified. Pioneer CDJ compatibility remains required. SER-007 planning may proceed with SER-006's actual CDJ/access criterion open. |
| DEC-021 | Prioritize the USB-storage uncertainty; defer generic Spotify proof — owner feedback | Owner said “Well we know the android with Spotify will work… that’s not exactly hard” on 2026-10-04. Refocus SER-007 on compact Android USB disk export, privilege/kernel support and safe storage handoff. Routine Spotify/audio checks remain later on actual selected hardware. Prior two-part recommendation is unaccepted and revised; no hardware or architecture selection inferred. |
| DEC-022 | Continue compact display/power comparison — approved research scope | On 2026-10-05, after the best-option follow-up, owner said “okay greaat sounds good - lets go next”. Proceed with the shortlisted-board integration comparison. This authorizes research continuation, not final board selection, purchase, battery wiring, flashing or completed-device acceptance. |
| DEC-023 | Prepare concrete ZERO 3W bench kit/power/test plan — approved planning scope | On 2026-10-05, owner said “okay lets go next” after the comparison and proposed bench-plan step. Proceed with that planning deliverable. No purchase, wiring, formatting, flashing, final electronics selection or whole-device acceptance inferred. |

## Open proposals

- Owner follow-up (2026-10-05): “is that the best option?” is a request for comparative justification, not approval. Bounded alternatives review is in zero3w-usb-evidence.md. ZERO 3W remains a USB bench proposal; final-platform superiority is unproven. The comparison is now delivered in display-power-assessment.md under DEC-022. ZERO 3W remains the USB bench proposal; CM3 is the stronger custom-pocket integration research lead of these three. Screen fit/drivers and endurance remain unverified; no purchase authorization.

- SER-007 (2026-10-05): recommend a new 2 GB Radxa ZERO 3W with microSD boot for a one-board Android USB-storage bench experiment. Release-linked kernel, fragments, startup and developer-build source reviewed in zero3w-usb-evidence.md; binary/live behavior and deck tests remain unverified. Indicative new-board listing $39.99 excludes parts/delivery and is not a locked quote. Exact kit/power/test plan is now delivered in usb-bench-plan.md under DEC-023. CG-UCUSBPDB is a direct injector lead ($118.29; $158.28 subtotal with board), not electrically verified. Gemini manual prohibits hubs, so the powered-hub alternative is computer-only. Board/image matching and 5 V/current, upstream isolation and hub-free passthrough remain blockers before final kit approval. No selected final electronics or architecture acceptance. Separate storage hardware remains a fallback under DEC-021.

- SER-006 broader-market follow-up (2026-10-04): owner challenged the $829 price and asked about very basic new players. Gemini MDJ-500 ($229.95 advertised new) was proposed for preliminary USB/audio testing and then selected under DEC-020; the Pioneer/CDJ requirement remains unchanged. Ownership/access and purchase execution are unconfirmed; integrated architecture and total budget remain open. Native Pioneer library/cue support is unverified; details in dj-test-targets.md.

- SER-006 ownership research (2026-10-04): owner asked for the cheapest personal test purchase, then explicitly rejected used options. **New-only purchase preference is authoritative.** Proposed new XDJ-700 at $829 advertised US price; supporting retailer/official sources in dj-test-targets.md. Earlier used recommendations are superseded. Subsequent Gemini selection is recorded under DEC-020; XDJ-700 remains unselected. DEC-013 still applies to the overall device budget.

- Approximately 86 × 54 mm footprint translates the credit-card preference; fit is unverified.
- Roughly 12–14 mm thickness was an assistant rendering target, not a fixed approved mechanical dimension.
- Existing Android donor plus custom enclosure was proposed; no donor or architecture selected.
- Dedicated DJ storage on microSD and USB mass-storage mode were proposed; implementation and deck evidence absent.
- External microSD access was recommended by the assistant; slot construction and location have not been approved.
- Desktop rekordbox export is a proposed initial DJ workflow; preserve files/library metadata and validate against accessible decks before committing.
- Final material, finish process, battery, storage allocation, enclosure construction, and prototype cost remain open.

## Acceptance versus publication

SER-003/SER-004 setup was acknowledged by the owner. SER-005 handoff is accepted under DEC-018. SER-002 latest-render acceptance remains pending. Neither an approved aesthetic preference nor a GitHub upload proves an engineered device or accepts a whole phase.

Cloud continuation evidence (2026-10-03): the cloud assistant read the published records and inspected the finish-study image. Owner subsequently accepted the handoff under DEC-018. Documentation/image access is verified; account-level environment publication remains unverified.

SER-006 equipment observation (2026-10-03): owner uses a Pioneer DDJ-FLX4 with rekordbox on a laptop. Standalone CDJ/XDJ access is “Possibly, but I need to check.” This records available equipment, not a platform choice. See dj-test-targets.md. Hosting rekordbox on Serein to operate the FLX4 would be a separate scope/architecture proposal and is not approved.
