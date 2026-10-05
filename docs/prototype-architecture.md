# SER-007 — Prototype architecture recommendation

Prepared: 2026-10-04. Status: Awaiting owner approval of the proposed bench approach. Research/documentation only; no Serein hardware selected, purchased, built, or tested.

## Purpose and authorized progress

Find a practical route to official Spotify listening plus a USB mass-storage DJ library, before investing in compact packaging. Owner selected the new Gemini MDJ-500 as the preliminary basic player and said “that works - lets go to the next step!” (DEC-020). This authorizes architecture planning now while real Pioneer CDJ/XDJ access remains open. It does not establish equipment ownership or accept an integrated architecture.

## Comparison

| Approach | Advantage | Main uncertainty | Recommendation |
| --- | --- | --- | --- |
| One Android device does listening and exports DJ storage | Reuses touchscreen, battery, Bluetooth and audio in one assembly | Exact model must expose USB mass storage; ordinary MTP/file transfer is insufficient. Kernel/USB controller access and software modifications may be required. Official Spotify must remain functional. | Keep as an integration candidate; no suitable model established |
| Android listening hardware plus a separate USB-storage module | Test official Spotify without depending on Android's export support; use a documented storage mechanism independently | Additional board, power, safe file handoff and communication; final combined footprint, battery and one-port routing unknown | Recommended for the first bench proof only |

These are engineering proposals, not evidence that either approach fits the final object. A Raspberry Pi running standard Linux alone is not our selected official Android Spotify-app platform.

## Recommended bench proof

Use two independently testable parts on a desk:

1. **Listening:** compatible Android hardware running the normal official Spotify app. Test installation/login, streamed and Premium-offline music, screen-off Bluetooth, and wired audio on the actual hardware. Start with an available device if suitable; any new purchase gets a separate concrete parts/price review.
2. **DJ storage:** a USB-device-capable module with dedicated owned-file storage. A Raspberry Pi Zero-family Linux mass-storage gadget is a candidate mechanism; exact board/OS/storage/cable/power selection remains open. Check the board exposes storage to a computer before connecting to a DJ player. The Pi does not run Spotify in this plan.
3. **Basic player test:** establish a known-good USB-drive baseline on the chosen Gemini MDJ-500, then test candidate storage recognition, supported-file browsing, sustained playback, eject, and reconnect. Audio files are owner-owned; no account/library exports enter Git. Gemini library metadata is not substituted for rekordbox database evidence.
4. **Pioneer gate:** repeat the relevant storage and prepared-rekordbox library tests on an identified CDJ/XDJ. Keep playlists, supported cues/grids, firmware, filesystem and exported library format in the evidence record. Gemini success cannot accept this gate.

Bench modules remain separate for these checks. Joining them into one enclosure, a shared power system, common USB-C charge/data port, and local access to the dedicated DJ library is a subsequent architecture decision. A desk prototype is temporary development equipment; the end product remains phone-free pocket listening.

## Storage and power boundaries

- Spotify-managed downloads stay in the official app's storage; the deck receives only exportable owned music.
- Prepare a small baseline from desktop rekordbox for Pioneer tests. Exact app version, deck firmware, owned tracks, export format and filesystem need recording first.
- Candidate storage has two exclusive modes: locally editable or exported to the host. Flush and unmount local access before export; prevent local/background writes until the host is safely disconnected and the export disabled.
- Read-only export can simplify an initial playback test, but it does not prove deck history/cue writes. Writable export and crash recovery need separate checks with exclusive ownership.
- Check cable data capability, USB enumeration, power consumption, host current limits, boot/reconnect behavior and power-loss integrity. Do not join independent power sources without a verified power design.
- Final USB-C at bottom-left and headphone jack at bottom-right remain the design direction; Pi bench connectors do not determine final ports.

## Requirements and limits

| Requirement | What this proof addresses | What remains open |
| --- | --- | --- |
| Official Spotify | Actual app behavior on selected Android hardware | Candidate selection, app availability, account/offline test, future update support |
| USB storage / DJ playback | Generic USB mechanism, then Gemini and Pioneer tests | No board/kernel/OS or deck is physically tested |
| Bluetooth and headphone jack | Measured listening on bench hardware | Final audio circuitry, routing and performance |
| 64 GB plus microSD | Dedicated DJ storage is a proposal; use small test data first | Internal/usable capacity allocation, microSD access, storage owner handoff |
| 24-hour listening | Record a realistic power/endurance test once hardware exists | Battery capacity, standby/module gating, charging and measured endurance |
| Approx. 86 × 54 mm footprint | Preserve target while proving electronics | No fit evidence; display, battery, both boards, ports, antenna and walls need CAD/measurements |
| Cost / privacy | No paid calls or purchases during research; private files stay out of Git | Parts quote after approach approval and equipment inventory |

The Pi Zero 2 W manufacturer specifies 65 × 30 mm, microSD, and micro-USB OTG. A board being smaller than the target footprint does not prove a full device fits: connectors, Android electronics, display, battery and structure still occupy volume. The Zero W tutorial demonstrates a USB-storage technique; it does not validate a Zero 2 W build or either DJ player. Use the kernel's exclusive-storage guidance rather than copying simultaneous network-write behavior from a tutorial.

## Evidence reviewed

Primary sources checked 2026-10-04:

- [Spotify supported devices](https://support.spotify.com/us/article/supported-devices-for-spotify/): Android OS 7.0+ listed today; use a suitably supported candidate rather than choosing solely by this minimum.
- [Spotify offline listening](https://support.spotify.com/us/article/listen-offline/): Premium for downloaded music; periodic online renewal required. This is app listening, not exportable DJ tracks.
- [Spotify Android SDK](https://developer.spotify.com/documentation/android): App Remote controls Spotify; playback/caching are handled by the Spotify app. No custom Spotify integration is needed for the bench proof.
- [AOSP USB gadget functions](https://android.googlesource.com/platform/hardware/interfaces/+/refs/heads/main/usb/gadget/1.0/types.hal): MTP is a separate declared function. This reference is not a capability certification for any donor/model.
- [Linux mass-storage gadget](https://docs.kernel.org/usb/mass-storage.html): file/block-device-backed USB storage and exclusive backing-store ownership.
- [Raspberry Pi Zero W USB-storage demonstration](https://magazine.raspberrypi.com/articles/pi-zero-w-smart-usb-flash-drive): mechanism demonstration; no DJ compatibility evidence.
- [Raspberry Pi Zero 2 W specification](https://www.raspberrypi.com/products/raspberry-pi-zero-2-w/): dimensions, microSD and OTG hardware facts only.
- [Gemini MDJ-500 official specification](https://www.geminisound.com/products/mdj-500): standalone USB playback and V-CASE preparation; exact Serein compatibility untested.

## Verification and owner decision

Assistant reviewed coverage of official Spotify, USB export, library distinction, storage ownership, power/audio, cost and physical limits. Document links and whitespace are checked; physical tests and owner architecture acceptance are pending.

**Single next action:** owner approves or revises the two-part bench proof approach. Approval covers prototype approach only; exact electronics, purchases and final integrated architecture still require review. Once approved, collect existing Android/board/storage equipment and prepare a bounded new-parts shortlist and test plan.
