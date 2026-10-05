# Serein DJ test targets

Updated: 2026-10-04. Deliverable for SER-006; in progress, not yet accepted.

## Owner's current setup

- Pioneer DDJ-FLX4 with rekordbox.
- Laptop use confirmed by owner; operating system, rekordbox version, and controller firmware not recorded.
- Owned test audio, existing USB export workflow, and baseline flash drive not confirmed.
- Standalone CDJ/XDJ access: “Possibly, but I need to check.”

## What this setup can establish

Pioneer documents FLX4 as a controller using DJ software on a computer or supported mobile device. It is not a standalone deck for the intended USB-library test. The owner's laptop may be used to prepare an owned-file rekordbox export; this proposed baseline workflow still needs confirmation.

[Official DDJ-FLX4 product documentation](https://www.pioneerdj.com/en/product/dj-controllers/ddj-flx4/), checked 2026-10-03.

FLX4 playback cannot verify that a standalone CDJ recognizes Serein as compatible storage, browses its exported library, or loads tracks without a laptop. Making Serein run rekordbox as the FLX4's host would be a separate architecture/scope decision; it is not selected.

## First standalone test target

| Field | Current record |
| --- | --- |
| Model | Unknown; standalone CDJ or USB-reading XDJ required for this journey |
| Access | Possible; owner checking |
| Firmware | Unknown; inspect once target is identified |
| Prepared-library workflow | Proposed desktop rekordbox export of owned files; not tested |
| Baseline USB drive | Unknown; establish known-good deck playback before testing candidate storage |
| Evidence | Official documentation reviewed; no device or deck tests |

Exact supported library formats and filesystems must be checked against the chosen model's documentation. Keep Spotify listening/cache separate from the exportable owned DJ files.

## New-only test-deck recommendation

Checked 2026-10-04. The owner asked about a personal test purchase and then explicitly rejected used options. Apply a **new-only** preference to purchase recommendations (DEC-019). Subsequent Gemini preliminary-player selection is recorded below under DEC-020; this research did not execute a purchase.

The lowest-priced suitable new Pioneer/AlphaTheta standalone player confirmed in this search is the **XDJ-700 at US $829 per player**, advertised in stock by [Sweetwater](https://www.sweetwater.com/store/detail/XDJ700--pioneer-dj-xdj-700) and [B&H](https://www.bhphotovideo.com/c/product/1274176-REG/pioneer_xdj_700_rekordbox_compatible_compact.html). Final tax, delivery, local availability, and audio-monitoring accessories depend on the owner’s location/setup. Availability may change; no checkout was performed.

[Official XDJ-700 product documentation](https://www.pioneerdj.com/en/product/dj-players-turntables/xdj-700/) confirms direct rekordbox USB playback, a touchscreen with waveform/library browsing, hot cues, quantize, and Pro DJ Link. These make it a useful proposed target for single-deck USB recognition, supported audio, prepared-library metadata, and reconnect/eject tests. Actual filesystem, library format, firmware, and Serein compatibility must still be checked and physically tested.

One working player is sufficient for the initial single-deck storage/playback test; a second player/mixer is not required for that bounded test. Arrange an appropriate audio monitoring path from its RCA line output (powered speakers or an audio interface/mixer). It is a single player, not a complete two-deck mixing system. Later linked-player validation requires additional equipment access. Success here cannot establish compatibility with modern CDJ models or newer library formats.

Earlier used CDJ-350/XDJ-700 comparisons are superseded by the owner’s new-only preference. The new CDJ-350 offer found at [Samstores](https://www.samstores.com/product-pioneer-cdj350-digital-multi-player-white-multi-format-playback-21299.html) was $1,086.74 plus listed $42 shipping, so it does not improve the purchase recommendation. Search coverage is not an exhaustive guarantee of the cheapest worldwide offer.

### Cheaper new basic players across brands

The owner challenged the $829 cost and asked about very basic new options. The earlier search was limited to Pioneer/AlphaTheta; it was not the cheapest new USB player across the market.

[Gemini MDJ-500 official store/specifications](https://www.geminisound.com/products/mdj-500), checked 2026-10-04, lists a new standalone single-channel USB player at **US $229.95** with an Add to cart option. [Musician’s Friend](https://www.musiciansfriend.com/pro-audio/gemini-mdj-500-professional-usb-dj-media-player/j51130000000000) also lists it new at $229.95. Delivered price/availability are unconfirmed. Gemini documents USB-A playback, MP3/WAV/AAC/AIFF files, FAT/FAT32/HFS+/NTFS filesystems, waveform display, and RCA output; library preparation uses Gemini V-CASE. Native reading of Pioneer rekordbox databases/cues is not established by this documentation.

Engineering implication: a Gemini could support a low-cost preliminary experiment with USB-storage recognition, supported file browsing, playback, and reconnect/eject behavior on that Gemini. This does not close the CDJ test-target or Pioneer compatibility gate. Keep the CDJ requirement; identify a real CDJ/XDJ for the definitive test later. A second player/mixer is unnecessary for this bounded experiment, but an appropriate RCA audio-monitoring path is needed. No prototype, Gemini playback, or Serein storage test has occurred.

Recommendation: MDJ-500 is a cheaper new option to consider if the owner also wants a basic personal player. For spending solely to establish Pioneer compatibility, prioritize borrowed/rented access to the actual target rather than assuming a Gemini test is equivalent. Rental costs/availability are unresearched. Subsequent approval of the preliminary Gemini choice is recorded below; no purchase or rental was executed.

## Preliminary player choice accepted

On 2026-10-04 the owner replied “that works - lets go to the next step!” to the new MDJ-500 option and its limited test role. Under DEC-020, Gemini MDJ-500 is the chosen preliminary basic player and architecture planning may proceed. Ownership, purchase, access, firmware and baseline USB playback are not verified. This accepts the preliminary choice, not SER-006's actual Pioneer target/access completion criteria or compatibility. A real CDJ/XDJ remains needed before accepting that gate.

## Owner acceptance of the Pioneer target

Done means the owner confirms one standalone model and practical test access. Unknown firmware is assigned an inspection step. Then the owner independently checks this record against the available equipment before accepting SER-006.

## Single next action

Review the SER-007 two-part bench proof recommendation in prototype-architecture.md. Collect actual Gemini/Pioneer access and firmware details before physical tests; do not repeat the accepted Gemini-choice question.
