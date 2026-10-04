# Feasibility work

Research snapshot: 2026-10-03. Recheck current primary documentation before selecting hardware or asserting compatibility. No device tests have been performed.

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

### Proposed first test

1. Identify an accessible CDJ and record its model and firmware.
2. Establish a baseline using a known-good flash drive and a small rekordbox export of owned files.
3. Present the same export from the candidate Serein storage architecture.
4. Check recognition, playlists, metadata, track loading, sustained playback, supported cues/grids, and any expected deck writes.
5. Check safe eject, disconnect/reconnect, reboot, battery operation, and USB power behavior.
6. Repeat with additional target deck models before broadening the compatibility claim.

While the deck owns the exported storage, Serein must not concurrently modify that filesystem. Prefer a distinct storage mode that safely hands off the DJ volume and restores local access after disconnection/eject. Decide whether deck history/cue writes are required before choosing read-only behavior.

**Selection rule:** USB-C charging, Android file transfer, and a microSD slot are not sufficient evidence of USB mass-storage support.

## Gate 2: Physical fit

Verify display active area and module dimensions, circuit boards, antennas, headphone output, USB-C connector, microSD slot, button mechanisms, battery, structural walls, and assembly/service access against the desired 86 × 54 mm footprint.

The 12–14 mm render thickness is visual guidance only. Do not place real components using image proportions as measurements.

Use the available 3D printer for a simple size/hand-feel mockup and later fit prototypes. Establish printer capabilities first.

## Gate 3: Battery and audio

Measure battery life under the intended workload: official Spotify playback, Bluetooth headphones, screen mostly off, and occasional browsing. Test offline and streaming separately. Record brightness, volume, wireless state, codec, battery capacity, and hardware/firmware versions.

Test wired playback and connector access as well. Manufacturer headline playback times are insufficient to verify the 24-hour Spotify/Bluetooth target.

## Evidence status

- Architecture: open.
- CDJ test model: awaiting project manager input.
- Spotify device test: not performed.
- USB mass-storage test: not performed.
- Library metadata test: not performed.
- Battery test: not performed.
- Mechanical fit: not performed.
- Purchases: none.
