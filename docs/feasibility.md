# Feasibility work

Research snapshot: 2026-10-05. Recheck current primary documentation before selecting hardware or asserting compatibility. No device tests have been performed.

## Gate 1: Spotify and CDJ storage on one architecture

**Goal:** identify an architecture that can run the official Spotify app and present the owned DJ library as compatible USB storage through the external USB-C port.

Spotify's Android SDK controls playback in the installed Spotify app; the app handles playback and caching. This supports the proposed listening workflow but does not establish an exportable DJ audio-file workflow.

Sources:
- [Spotify Android SDK](https://developer.spotify.com/documentation/android)
- [Spotify offline listening](https://support.spotify.com/us/article/listen-offline/)
- [Spotify supported devices](https://support.spotify.com/tv/article/supported-devices-for-spotify/)

For a literal flash-drive replacement, the deck must recognize Serein as a supported storage device. The CDJ-3000X manual describes USB mass-storage-class devices; library and filesystem support must be checked separately for each target model.

Sources:
- [CDJ-3000X manual](https://www.pioneerdj.com/support/manuals/player/cdj-3000x/en/pdf.pdf)
- [CDJ-3000 supported storage formatting](https://pioneer-support.zendesk.com/hc/en-us/articles/4406135001625-The-unit-doesn-t-recognize-some-USB-storage-devices-such-as-USB-flash-drives-and-HDDs-Why-not)
- [rekordbox OneLibrary export guide](https://cdn.rekordbox.com/files/20260318114024/OneLibrary-Compatible-USB-Device-Export_en.pdf)

The guide distinguishes newer OneLibrary players and legacy Device Library players and describes preparing both library formats. The correct exported databases matter for prepared-library browsing; having audio files alone does not prove the intended playlist/cue workflow.

Linux has a USB mass-storage gadget implementation that can expose a file or block device as a disk. This demonstrates a possible technical mechanism, not compatibility of any particular Android donor. Kernel support, USB device controller capability, privileges, firmware access, and storage routing all need checking.

[Linux mass-storage gadget documentation](https://docs.kernel.org/usb/mass-storage.html)

### Current equipment and test access

The owner reports DDJ-FLX4 with rekordbox on a laptop. Pioneer documents FLX4 as a controller connected to DJ software on a PC/Mac or supported mobile device. It does not provide the standalone USB-library playback needed for the proposed flash-drive replacement test. The conclusion for Serein is that FLX4 playback cannot establish CDJ storage compatibility. The laptop's rekordbox installation may help prepare a baseline export, subject to its version and owned-file availability.

[Official DDJ-FLX4 product documentation](https://www.pioneerdj.com/en/product/dj-controllers/ddj-flx4/), checked 2026-10-03. Standalone deck access is possible but unconfirmed. See [DJ test targets](dj-test-targets.md). No equipment tests have been run.

### Proposed first test

New-only test-deck ownership research checked 2026-10-04 is recorded in [DJ test targets](dj-test-targets.md). Owner rejected used options. Proposed XDJ-700 ($829 new advertised US price) covers standalone USB/library and supported cue/waveform testing. The XDJ-700 remains unselected and untested; success on this model cannot establish compatibility with other generations or library formats.

Broader-market follow-up found Gemini MDJ-500 advertised new at $229.95. Official USB playback/file/filesystem specifications support considering a preliminary storage experiment on that model; its library workflow uses V-CASE and native Pioneer rekordbox metadata support is unverified. It cannot establish CDJ compatibility or close the Pioneer test gate. Gemini preliminary-player selection and continuation are subsequently approved under DEC-020; purchase/access and prototype architecture are unverified. Sources and practical limits are in dj-test-targets.md.

1. Identify an accessible CDJ and record its model and firmware.
2. Establish a baseline using a known-good flash drive and a small rekordbox export of owned files.
3. Present the same export from the candidate Serein storage architecture.
4. Check recognition, playlists, metadata, track loading, sustained playback, supported cues/grids, and any expected deck writes.
5. Check safe eject, disconnect/reconnect, reboot, battery operation, and USB power behavior.
6. Repeat with additional target deck models before broadening the compatibility claim.

While the deck owns the exported storage, Serein must not concurrently modify that filesystem. Prefer a distinct storage mode that safely hands off the DJ volume and restores local access after disconnection/eject. Decide whether deck history/cue writes are required before choosing read-only behavior.

**Selection rule:** USB-C charging, Android file transfer, and a microSD slot are not sufficient evidence of USB mass-storage support.

## SER-007 architecture recommendation

Owner approved the preliminary Gemini choice and continuing planning under DEC-020, then challenged the separate Spotify proof under DEC-021. The [revised assessment](prototype-architecture.md) prioritizes Android USB disk export. MSD supplies a source-backed privileged/configfs/kernel-dependent mechanism. On 2026-10-05, [ZERO 3W release-linked source review](zero3w-usb-evidence.md) established the board kernel recipe, enabled mass-storage function, configfs startup and developer build option. Recommend a new 2 GB board with microSD boot for a bounded USB-storage bench experiment, awaiting owner review. Downloaded-image equivalence, live privilege/export and deck behavior are unverified; no ready-made stock mass-storage switch is established. Separate USB-storage hardware is a fallback; battery, enclosure and power/port routing are unresolved. No firmware, USB enumeration or deck test occurred.

Owner best-option follow-up (2026-10-05): bounded manufacturer-source comparison of Pi Zero 2 W, HiBy M300, CM3 and ZERO 2 Pro retained ZERO 3W as a defensible USB bench candidate, not a proven best final platform. Orange Pi primary pages were unavailable. Owner subsequently authorized continuing the comparison under DEC-022. The [display/power assessment](display-power-assessment.md) retains ZERO 3W for the USB bench and identifies CM3 as the stronger custom-pocket integration lead among these three. Two reviewed 3.1-inch touch assemblies exceed the target height; smaller-screen leads need complete touch dimensions and driver verification. Battery management documentation does not prove runtime or completed fit. No hardware selection or purchase approved. The [concrete bench plan](usb-bench-plan.md) is now delivered under DEC-023. Direct injector and computer-only hub leads, exact parts and test criteria are recorded; board/image and 5 V/isolation/passthrough evidence remain blockers before final kit approval. No physical tests. See zero3w-usb-evidence.md.

### Bench connection evidence

The [compatibility review](usb-compatibility-review.md) now prefers the official PiKVM power/data splitter: manufacturer documents separate 5 V power, prevention of backpower and a single data interface. Exact ZERO 3W CC/VBUS/OTG and supply matching remain checks; Raspberry Pi compatibility is insufficient. CG-UCUSBPDB remains a fallback; a PD profile does not establish non-PD current. StarTech hub remains computer-only because Gemini manual page 14 prohibits hubs. Pinned Android source enables AIC8800 and includes AIC8800D80 support; match exact sold board/binary rather than infer incompatibility from image age. No binary inspection or hardware test. Both prepared supplier inquiries were sent under DEC-027; replies are pending; sources and cost limits are in the review/bench plan.

## Gate 2: Physical fit

Verify display active area and module dimensions, circuit boards, antennas, headphone output, USB-C connector, microSD slot, button mechanisms, battery, structural walls, and assembly/service access against the desired 86 × 54 mm footprint.

The 12–14 mm render thickness is visual guidance only. Do not place real components using image proportions as measurements.

Use the available 3D printer for a simple size/hand-feel mockup and later fit prototypes. Establish printer capabilities first.

## Gate 3: Battery and audio

Measure battery life under the intended workload: official Spotify playback, Bluetooth headphones, screen mostly off, and occasional browsing. Test offline and streaming separately. Record brightness, volume, wireless state, codec, battery capacity, and hardware/firmware versions.

Test wired playback and connector access as well. Manufacturer headline playback times are insufficient to verify the 24-hour Spotify/Bluetooth target.

## Evidence status

- Architecture: ZERO 3W one-board USB-storage bench recommendation awaiting owner review after DEC-021; release-linked sources checked, binary/live support unverified, final electronics unselected, two-part route a fallback.
- Current setup: DDJ-FLX4 and laptop rekordbox; software-host controller, not a standalone storage test target.
- Preliminary player: Gemini MDJ-500 chosen under DEC-020; purchase/access and tests unverified.
- Pioneer CDJ/XDJ test model/access: still unconfirmed.
- Spotify device test: not performed.
- USB mass-storage test: not performed; recoverable protocol and pass criteria in usb-bench-plan.md.
- Library metadata test: not performed.
- Battery test: not performed; illustrative energy calculations in display-power-assessment.md are assumptions, not measurements.
- Mechanical fit: not performed.
- Purchases: none.
