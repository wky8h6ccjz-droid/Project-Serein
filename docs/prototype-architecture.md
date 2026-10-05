# SER-007 — USB-storage-first architecture assessment

Updated: 2026-10-05. Status: Concrete bench plan delivered; procurement/execution blocked by board/image and power checks; architecture unaccepted. Research only; no Serein electronics selected, purchased or tested.

## Current focus

Owner selected the new Gemini MDJ-500 for preliminary basic testing (DEC-020), then challenged the value of a separate Android/Spotify proof: “Well we know the android with Spotify will work… that’s not exactly hard”. Treat official Spotify on compatible Android as an established capability. Candidate-specific installation/audio/offline checks remain routine integration checks later, not a standalone feasibility task now.

The hard question is whether a compact Android platform can safely expose owned DJ storage as a USB mass-storage device. Prioritize that question before proposing an additional storage processor. The earlier two-part bench recommendation was not accepted and is superseded as the default next step. Separate storage hardware remains a fallback if a credible single-device route cannot be established.

## Architecture routes

| Route | Benefit | Evidence / unresolved condition | Current position |
| --- | --- | --- | --- |
| Android platform with USB mass-storage gadget | One processor for listening and DJ storage; potentially simpler packaging/power | Android USB disk emulation has a source-backed implementation, but privileges, configfs, kernel storage function and safe handoff depend on exact hardware/image | Investigate first |
| Android plus separate USB-storage hardware | Avoids dependence on Android's gadget configuration | Extra board, communication, power/USB-C routing and volume; whole-device integration still unknown | Fallback, not approved selection |

USB host support (reading a flash drive), ordinary Android file transfer, flashing/recovery storage and a Linux-only demonstration do not establish live USB disk export while the intended Android system is running.

## Source-backed software mechanism

[MSD original project](https://github.com/chenxiaolong/MSD), checked 2026-10-04, implements USB disk/CD-ROM emulation on Android 11+. Its documented requirements include Magisk/KernelSU system privileges, USB gadget configfs, and a kernel with `CONFIG_USB_CONFIGFS_MASS_STORAGE=y`. It exports local disk-image files. This provides a concrete mechanism to investigate, not compatibility evidence for any candidate board or DJ player. No installation or rooting was performed, and bootloader/firmware changes require a separate reviewed hardware-specific plan.

[Linux mass-storage gadget documentation](https://docs.kernel.org/usb/mass-storage.html) explains file/block-device-backed export and exclusive ownership. The local system must flush and release the DJ volume before export and prevent background modifications while the host owns it. Read-only initial playback would not prove deck history/cue writes; writable export and power-loss recovery need later tests.

## Recommended bench candidate: Radxa ZERO 3W

Primary documentation checked 2026-10-04:

- [ZERO 3 hardware](https://docs.radxa.com/en/zero/zero3): 65 × 30 mm, USB 2.0 Type-C OTG, eMMC options plus microSD, Wi-Fi/Bluetooth. Power and data share the OTG/power port. HDMI output does not establish a compact touchscreen design.
- [Android resources](https://docs.radxa.com/en/zero/zero3/other-os/android/download): manufacturer links an Android 11 image.
- [Android installation](https://docs.radxa.com/en/zero/zero3/other-os/android/install-os): documents Android boot and OTG connection for flashing; flashing is not evidence of runtime mass-storage support.

Release-linked source review completed 2026-10-05: the ZERO 3 board recipe selects a kernel defconfig with mass storage enabled, relevant fragments do not explicitly disable it, Android startup creates the expected configfs gadget, and a userdebug build is offered. Recommend a new 2 GB ZERO 3W with microSD boot for a one-board USB-storage bench experiment. See [pinned evidence, cost indication and bounded test proposal](zero3w-usb-evidence.md). The downloaded binary, effective kernel configuration, live privilege/export behavior and deck compatibility remain untested. This is a bench recommendation awaiting owner review, not final hardware selection or purchase authorization. Manufacturer mass-storage instructions for [E25 running Radxa OS](https://docs.radxa.com/en/rock3/e25/radxa-os/ums) apply to a different model/OS; do not transfer that result to ZERO 3W Android.

## Display and power comparison

The [compact integration assessment](display-power-assessment.md) compares ZERO 3W, ZERO 2 Pro and CM3. Retain ZERO 3W for the source-backed USB bench experiment; CM3 is the stronger custom-pocket integration lead among these three because its manufacturer documents battery charging/monitoring and direct display interfaces. Neither is selected. Two reviewed 3.1-inch touch assemblies exceed the height target; smaller display leads still need complete dimensions and Android drivers. No endurance is measured. Owner authorized continuing this research under DEC-022.

## Concrete kit and connection plan

The [bench plan](usb-bench-plan.md), prepared under DEC-023, names board/card/accessory leads and staged pass criteria. CG-UCUSBPDB is a direct power/data injector lead; board plus injector is advertised at $158.28 before unquoted accessories/delivery. Its 5 V supply behavior for this board, upstream isolation and hub-free passthrough require confirmation. A powered hub is an alternative for computer tests only; the Gemini-authored manual prohibits hubs. Exact shipped wireless variant must match the reviewed Android image. These are blockers, not permission to buy or flash.

## Required evidence before selection

1. Identify exact board/image/build and trace its kernel/configuration to the actual shipped Android image. Confirm USB device controller, configfs, storage function and a supported way to control the gadget. If unavailable, record the gap; do not treat a generic Linux config or app README as proof.
2. Define a recoverable, approved hardware-specific test before flashing/rooting. Do not operate on the owner's everyday phone as an assumed disposable test device.
3. On approved test hardware, expose a small disposable owned-file disk image to a computer while Android is running. Confirm actual USB mass-storage enumeration, file hashes and reliable local/exported mode handoff. Keep the OS partition and Spotify-managed storage separate.
4. Establish a known-good flash-drive baseline on the chosen Gemini, then check storage recognition, supported-file browsing, sustained playback, safe eject and reconnect with the candidate.
5. Repeat on an accessible Pioneer CDJ/XDJ with the correct desktop rekordbox library export, firmware and filesystem. Gemini success does not close Pioneer metadata/cue compatibility.

This is a proposed test sequence, not authorization to buy, root, format or flash hardware. Exact parts and costs are reviewed once there is a credible capability path and relevant equipment access.

## Integration checks retained for later

Official Spotify app installation, streamed/Premium-offline listening, Bluetooth and wired audio still need routine checks on selected hardware. No custom Spotify SDK/app integration is proposed. Spotify-managed downloads are not the DJ files.

Battery endurance, touchscreen fit, 64 GB capacity allocation, microSD access, headphone output, enclosure, premium finish and common USB-C charge/data routing remain unresolved. A bare 65 × 30 mm board does not establish that the full device fits the approximately 86 × 54 mm target or reaches 24 hours. The board's documented power supply is not measured listening consumption.

Sources for established app behavior: [Spotify supported devices](https://support.spotify.com/us/article/supported-devices-for-spotify/), [offline listening](https://support.spotify.com/us/article/listen-offline/), [Android SDK/app separation](https://developer.spotify.com/documentation/android). These do not certify a specific custom Android image.

## Verification and single next task

Release-tag source trace and recommendation are complete; downloaded-image inspection, generated kernel configuration, live enumeration and physical tests are not. The build guide/download branch mismatch and exact pinned sources are recorded in zero3w-usb-evidence.md.

**Single next action:** close the exact board/image and 5 V power/passthrough checks before finalizing the bench kit for owner approval. No purchase or flashing approved.
