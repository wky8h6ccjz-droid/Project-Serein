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

The [visual project map](project-map.html) groups the work into five workstreams and fourteen tasks. It shows the hardware dependency sequence, what is accepted, what waits for input and what we can review or prepare now. Click task cards for dependencies and deliverables. It is a standalone local file; optionally run `node docs/serve-project-map.cjs` from the repository and open http://127.0.0.1:4178.

SER-011's Library/player preview is accepted under DEC-034. It has local-song playback, Play/Shuffle, full artwork player, playlists/setlists and simulated whole-library deck handoff. SER-012 adds browser-local audio/list saving across reopening, verified offline playback, failed-write rollback and simulated handoff restart recovery; owner acceptance of this increment is pending. Browser storage is not native device storage or physical safety evidence.

The owner approved native Android implementation under DEC-039. [The Android shell](../software/android/README.md) now compiles and has clean Home, empty Library tabs and an unavailable Deck screen. This establishes the installable foundation; local music, the artwork player, saved collections and background audio are the next increments. It does not replace the hardware compatibility gate.

SER-014 has six subtasks: tools/app shell (A) → accepted screens (B) → saved local library (C) → background playback (D) → complete Spotify launch/Deck boundary (E) → full package/install/owner test (F). A source/APK is built but runtime checks are blocked by emulator system-service crashes; B–F are approved queued work.

Shape/finish review and deck access remain parallel choices; discovery/remix companion stays deferred. **Single next action: complete SER-014A installation/runtime checks on a stable emulator.**
