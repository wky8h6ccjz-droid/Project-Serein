# Serein: what we are building and why

Updated: 2026-10-05, following the owner's request for clearer, less technical context (DEC-026). This explains the recommended sequence within the existing device-first work. Future hardware, spending and test steps still need their scoped approval; this document does not select final electronics.

## The finished experience we want

One pocket music player with two everyday uses:

1. Listen to Spotify without using your phone, through Bluetooth headphones or the headphone jack.
2. Carry your own DJ music library, plug Serein directly into a supported DJ deck and play from it as you would from a USB stick.

The intended object has the upright credit-card shape and dark finishes we explored, a front touchscreen, side volume buttons, a top power button, USB-C charging/data and expandable storage. The 24-hour listening goal remains a target to measure. Spotify's downloaded tracks stay within Spotify; the deck gets your separately owned music files.

## The build sequence

| Stage | What we do | Why / what tells us we can move on |
| --- | --- | --- |
| 1. Prepare the first experiment — current stage | Confirm the proposed small Android computer, its software and the power/data accessory work together. Then present one complete parts list and delivered cost for approval | Avoid buying incompatible parts. Our research has identified candidates, but exact compatibility answers and a complete quote are still missing |
| 2. Build an open prototype on a desk | After kit/test approval, use wall power, an existing screen and a small set of owned test songs. First make a computer recognize the prototype as a music USB drive; also check normal Spotify/headphone use on that actual board | Prove the two uses can share a working system. Songs remain intact after repeated connect/eject cycles; Spotify is a routine candidate check, not a new generic feasibility project |
| 3. Test DJ playback | Compare a normal USB stick with the prototype on the preliminary Gemini player, then on an accessible Pioneer CDJ/XDJ using a prepared rekordbox library | The deck must browse, load and play reliably. Real Pioneer testing establishes model-specific library/playlists/cue support; a computer or Gemini result alone is insufficient |
| 4. Engineer the pocket version | Choose the final electronics, small touchscreen, battery/charging, headphone hardware, controls and storage arrangement using the earlier results | The parts must fit together, run reliably and reach an acceptable measured listening time. The first experiment's board may be replaced; the 24-hour goal is not established yet |
| 5. Build and refine the physical prototype | Use the owner's 3D printer for an enclosure prototype. Assemble and test carrying, listening, charging and deck use; revise as needed | The owner accepts both the feel and actual use. This is a working prototype goal; manufacturing/commercial launch is a separate future scope |

These are recommended stages, not promised dates. Existing tasks cover them: SER-007 prepares the approach, SER-008 proves listening/storage/deck use, and SER-009 covers fit and endurance. SER-010 companion discovery/DJ software remains deferred. A simple shape-only mockup can be separately approved earlier; it cannot prove electronics fit or performance.

## Why we are focusing on the DJ connection

Official Spotify on compatible Android is a known route. The more uncertain part is getting a running music player to present its owned music library in a way a deck accepts, while keeping the files intact. Success there determines which electronics are suitable. We should test that before spending on a custom pocket assembly.

The first prototype is an open desk setup, powered from the wall and using an existing screen. It lets us inspect and change parts easily. Its appearance and power arrangement are not the finished product's appearance or charging design.

## What the current parts are for

- **ZERO 3W:** the proposed small computer for the first experiment. Think of it as the prototype's brain. It would run Android and hold the music; it is not yet the selected brain of the final pocket device.
- **Power/data splitter:** the proposed accessory lets wall power feed that computer while a computer or deck reads its music through USB. We cannot assume a deck's USB port powers a whole Android system. The splitter needs confirmed compatibility and is equipment for the experiment; it is not an approved final Serein accessory requirement.
- **Memory card:** the proposed board's boot/software storage and disposable test area. Final music-storage allocation remains open.
- **Gemini MDJ-500:** the already chosen basic preliminary playback target. It helps test USB music recognition/playback; it does not establish Pioneer compatibility. Ownership/access is still unknown.

## Where we actually are

We have requirements, concept images, a proposed test setup, test criteria and source research. **No Serein hardware has been bought, assembled or demonstrated.** We have not proved direct deck playback or battery life, and no final electronics are selected.

The board and splitter listings total $54.94 before a separate power supply, memory card, cables, delivery and other needed accessories. That is an incomplete subset, not the price of Serein or a ready-to-buy prototype kit. A Gemini purchase is separate and is unnecessary for the first computer check. Total project budget is still deferred.

## Useful software work while suppliers reply

The owner requested starting software in the interim under DEC-028. SER-011 now supplies a [clickable device preview](../software/device-preview/README.md): Home, choosing owned DJ tracks, preparing for a deck, returning to local use and handling interruption. This lets the owner try the controls now and gives us tested rules for how the library changes hands. It advances the device itself; discovery/DJ companion software remains deferred.

The preview uses example tracks and simulated signals. Spotify launch, real songs, actual USB export and deck playback are future integration work. An open browser preview is the current review format, not a final software-framework decision. Proposed styling and behavior are awaiting owner acceptance. **The immediate next action is to try and review the preview's normal and interrupted paths.**

## Hardware dependency while software progresses

Resolve two practical questions using the [prepared supplier inquiries](usb-compatibility-review.md):

1. Does the exact board being sold have suitable Android software?
2. Does the exact splitter power that board correctly while letting a host read its USB data?

The owner authorized the two inquiries through their designated Outlook account under DEC-027. Both were sent and saved copies verified on 2026-10-05; supplier answers are pending. The immediate next action is to review those replies against the two questions before kit approval. Further generic research is not a substitute for the missing exact answers. Country and laptop ports remain needed for the subsequent delivered parts quote.

Once those answers are satisfactory, prepare one concrete kit recommendation, its full expected cost and what the first test will prove, for owner approval. If a candidate fails the check, revise the candidate before presenting the kit.

## How each update should read

Before component names or technical details, explain: **what we are doing, why Serein needs it, where it fits in the plan, what result counts as success, and what decision comes next.** Give the recommendation and practical tradeoff in plain language; link deeper engineering evidence for optional reading. Show this context in chat as well as GitHub.
