# ZERO 3W Android USB-storage evidence

Checked: 2026-10-05. SER-007 research deliverable; recommendation awaiting owner review. No hardware, firmware build, downloaded-image inspection or USB/deck test performed.

## Recommendation and boundary

Recommend a **new Radxa ZERO 3W, 2 GB RAM, microSD boot, as a USB-storage bench candidate**. Use one Android processor and a separate disposable DJ disk image, with exclusive local/USB ownership. This is a proposed experiment, not final Serein electronics or a purchase instruction. A second storage processor remains a fallback.

The candidate now has release-linked source evidence for the required kernel function, configfs startup and a developer build option. The shipping binary's effective configuration and privilege behavior remain unverified. Source inspection supports trying the board; it does not prove the downloaded image works unchanged or that a DJ deck accepts it.

## Release and source trace

[Radxa's Android download page](https://docs.radxa.com/en/zero/zero3/other-os/android/download) points to [release radxa-zero3-we-android11-rkr12-20240111](https://github.com/radxa/manifests/releases/tag/radxa-zero3-we-android11-rkr12-20240111), with image filename `Radxa-Zero3WE-20231130-gpt.zip`. The binary has not been downloaded or inspected; no checksum or source/binary equivalence is established.

At that release tag, [rockchip-r-release.xml](https://github.com/radxa/manifests/blob/radxa-zero3-we-android11-rkr12-20240111/rockchip-r-release.xml) includes [Android11_Radxa_rk12_customization.xml](https://github.com/radxa/manifests/blob/radxa-zero3-we-android11-rkr12-20240111/Android11_Radxa_rk12_customization.xml). The customization pins these relevant repositories:

| Component | Repository under gitlab.com/rockchip_android_r | Revision |
| --- | --- | --- |
| Kernel | rk/kernel | c689a7aadeaaba59ebf2cb0de093ea3c918c00ba |
| Kernel fragments | kernel/configs | b0c04524601828b880b48f61b187a1a0134334bf |
| Board/product | rk/device/rockchip/rk3566 | 0242d97cd5463d8c3f0e41aaf3d2e2ab23612822 |
| Common Android device/startup | rk/device/rockchip/rksdk | 2ebbf673598716e4903a0be148003694cf551eef |

Radxa's [build guide](https://docs.radxa.com/en/zero/zero3/other-os/android/lowlevel-development) points to `Android11_Radxa_rk11`, whereas the linked download uses the rk12 release. We therefore inspected the release-tag manifest and its pinned files rather than assuming the older guide matches the binary.

## What the pinned files establish

| Requirement | Source evidence | Remaining live check |
| --- | --- | --- |
| Board's Android kernel recipe | [ZERO 3 BoardConfig](https://gitlab.com/rockchip_android_r/rk/device/rockchip/rk3566/-/raw/0242d97cd5463d8c3f0e41aaf3d2e2ab23612822/rk356x_radxa_zero3/BoardConfig.mk) selects rockchip_defconfig, android-11.config and rock3_zero_w.config; DTS rk3566-radxa-zero3 | Record running build, actual kernel config and controller |
| USB storage gadget | [Pinned rockchip_defconfig](https://gitlab.com/rockchip_android_r/rk/kernel/-/raw/c689a7aadeaaba59ebf2cb0de093ea3c918c00ba/arch/arm64/configs/rockchip_defconfig) enables USB_GADGET, USB_CONFIGFS and USB_CONFIGFS_MASS_STORAGE, plus IKCONFIG_PROC | Verify effective CONFIG_USB_CONFIGFS_MASS_STORAGE=y; inspect /proc/config.gz if available |
| Fragment overrides | [android-11.config](https://gitlab.com/rockchip_android_r/kernel/configs/-/raw/b0c04524601828b880b48f61b187a1a0134334bf/rockchip/android-11.config) enables gadget/configfs and does not explicitly disable mass storage; [board fragment](https://gitlab.com/rockchip_android_r/kernel/configs/-/raw/b0c04524601828b880b48f61b187a1a0134334bf/rockchip/rock3_zero_w.config) concerns regulator/camera/Wi-Fi | Source inputs are not a generated .config or compiled-kernel test |
| Android gadget interface | [Common USB init](https://gitlab.com/rockchip_android_r/rk/device/rockchip/rksdk/-/raw/2ebbf673598716e4903a0be148003694cf551eef/init.rk30board.usb.rc) mounts configfs and creates /config/usb_gadget/g1; sets sys.usb.configfs=1 | Check actual startup, permissions, UDC and interaction with Android USB services |
| Startup inclusion | [Product file](https://gitlab.com/rockchip_android_r/rk/device/rockchip/rk3566/-/raw/0242d97cd5463d8c3f0e41aaf3d2e2ab23612822/rk356x_radxa_zero3/rk356x_radxa_zero3.mk) inherits common/device.mk; [common device.mk](https://gitlab.com/rockchip_android_r/rk/device/rockchip/rksdk/-/raw/2ebbf673598716e4903a0be148003694cf551eef/device.mk) copies the hardware USB init; [common BoardConfig](https://gitlab.com/rockchip_android_r/rk/device/rockchip/rksdk/-/raw/2ebbf673598716e4903a0be148003694cf551eef/BoardConfig.mk) defaults hardware to rk30board | Inspect the installed files and actual build overrides |
| Developer privilege route | [AndroidProducts](https://gitlab.com/rockchip_android_r/rk/device/rockchip/rk3566/-/raw/0242d97cd5463d8c3f0e41aaf3d2e2ab23612822/AndroidProducts.mk) offers ZERO 3 userdebug and user builds; Radxa guide chooses userdebug. [AOSP explains root ADB](https://android.googlesource.com/platform/packages/modules/adb/+/HEAD/docs/dev/root.md) for developer builds | Downloaded build type/root access unknown; verify uid and policy. Root ADB alone does not install or authorize the MSD app |

The inspected USB startup files do not supply a ready-made mass-storage switch. A controlled privileged implementation must configure the storage function and coordinate with Android's USB management. [MSD](https://github.com/chenxiaolong/MSD) supplies an existing Android 11+ disk-image mechanism but requires its own privileged installation. No Magisk/KernelSU installation, custom build or service has been attempted. Prefer first assessing developer ADB control on the disposable bench board; separately review any image changes needed. This is an engineering recommendation, not a verified MSD-on-Radxa recipe.

## Bench proposal and pass criteria

1. Record the exact image checksum, board revision, build fingerprint/type, kernel version/config, gadget path and device controller. Verify developer access. If the stock image fails, record the failure and review a recoverable source-build plan before changes.
2. Prepare a small disposable FAT32 whole-disk image containing owned test audio. Export only this image, never the Android OS or Spotify-managed storage. Start with computer enumeration: it must appear as USB mass storage, with matching file hashes.
3. Enforce handoff: finish and flush local writes, unmount/release the image, export it, prevent local modification while exported, then host-eject and disable export before restoring local access. [Kernel storage documentation](https://docs.kernel.org/usb/mass-storage.html) requires exclusive ownership. Repeat reconnect/eject cycles; record writable-host behavior separately from read-only playback.
4. Establish a normal flash-drive baseline on the Gemini MDJ-500, then test candidate recognition, file browsing and sustained audio. Gemini success is preliminary only.
5. On an accessible Pioneer CDJ/XDJ, compare the same desktop rekordbox export with the baseline: playlists, loading, waveforms/cues/grids supported by that model, and expected deck writes. Record firmware, library type and reconnect behavior. Pioneer access remains unresolved.

Power must be resolved before wiring a powered bench board to a deck. The board shares OTG data/power; do not assume a deck powers the complete Android system or use an improvised dual-source cable. Select a documented power/data arrangement in the bench plan. No hardware purchase or flashing is authorized by this document.

## Cost and integration limits

[Arace's product page](https://arace.tech/products/radxa-zero-3w), opened 2026-10-05, displayed $39.99 and in stock, SKU RS107-D2E0H1W15. This is an indicative new-board listing, not a locked variant/cart or delivered quote. Older indexed $20 snippets were not used. MicroSD, data/power equipment, HDMI/monitor access and any audio/accessories add cost; the Gemini is separate. Confirm the chosen variant and delivery costs in the proposed parts list before spending.

[Manufacturer hardware documentation](https://docs.radxa.com/en/zero/zero3) lists a 65 × 30 mm board, USB OTG, microSD/eMMC and HDMI. It does not establish full-device fit, compact touchscreen integration, battery charging, a 3.5 mm output or 24-hour listening. Recommend this board for the storage experiment only. Final display, battery, audio, thermal behavior, port placement and storage allocation remain open. No final architecture or hardware acceptance is inferred.

## Is this the best option? Owner follow-up, 2026-10-05

The owner asked whether ZERO 3W is the best option. This is not acceptance. The recommendation is **a defensible first USB-storage bench candidate among the options reviewed**, not a proven market winner or the best finished Serein platform. Manufacturer source/document comparison found:

| Option | Relevant advantage | Why it does not displace the bench recommendation yet |
| --- | --- | --- |
| ZERO 3W | Compact Android board; release-linked storage-function/startup and developer-build evidence already traced | Live support unknown; documented display connection is HDMI, not a DSI panel connector. Battery, headphone output and final packaging need additional hardware |
| Raspberry Pi Zero 2 W | Manufacturer advertises $15, 65 × 30 mm, USB OTG; useful Linux storage-test option | Only 512 MB RAM; reviewed manufacturer OS documentation supplies Raspberry Pi OS, not an established official-Android/Spotify path. Could be storage-only fallback; not a verified integrated replacement |
| HiBy M300 Android player | Integrated touchscreen, Android 13/Play Store, headphone output, microSD and charging | Manufacturer guide documents file transfer and USB audio, not the required disk-export/kernel/root mechanism. Do not infer inability, bootloader lock or CDJ support; those remain unverified |
| Radxa CM3 | 55 × 40 mm RK3566 module with Android, USB OTG, MIPI DSI and I2S; candidate for placing ports/display on a custom carrier | Requires a carrier board; exact Android export, compact screen, carrier fit, full cost and battery still unverified. Shared processor is not shared firmware proof |
| Radxa ZERO 2 Pro | 65 × 37 mm, Android documentation, USB OTG and a DSI connector | Exact Android storage/privilege support not traced here; documented supported screen is a 10-inch Display 10FHD, not evidence for a pocket panel. Screen, thermal and endurance checks remain needed |

Sources opened 2026-10-05: [ZERO 3 specs](https://docs.radxa.com/en/zero/zero3); [Pi Zero 2 W specs/advertised price](https://www.raspberrypi.com/products/raspberry-pi-zero-2-w/) and [manufacturer OS downloads](https://www.raspberrypi.com/software/operating-systems/); [M300 manufacturer guide](https://track.hiby.com/Manual/Find?l=en&p=M300); [CM3 manufacturer specifications and carrier-board resources](https://radxa.com/products/cm/cm3/); [ZERO 2 Pro specs](https://docs.radxa.com/en/zero/zero2pro), [Android docs](https://docs.radxa.com/en/zero/zero2pro/other-os/android) and [supported DSI accessory](https://docs.radxa.com/en/zero/zero2pro/getting-started/accessory-usage).

Orange Pi Zero 2W was also investigated, but its manufacturer product/wiki pages timed out or returned a gateway error. Its exact Android kernel/privilege path was not established. It remains an unranked alternative, not a rejected product. This is a bounded shortlist review, not an exhaustive market comparison. No measurements support comparative battery-life claims.

Engineering judgment: retain ZERO 3W for the initial USB experiment, while checking practical display/power integration on the Radxa shortlist before recommending a purchase. CM3's direct display and custom-carrier interfaces may suit a final device better, but no final-platform ranking is justified yet. An SBC board price alone is not the complete prototype cost.

## Owner review and next action

Single next action: compare compact touchscreen and power integration for ZERO 3W, ZERO 2 Pro and CM3 before advancing the hardware recommendation. The ZERO 3W bench proposal remains unaccepted; no buying, formatting or flashing authorized. Owner check: the recommendation should be understandable as one Android board handing an owned DJ disk to a host, with physical compatibility and final-device engineering still open.

Copy-paste update:

```text
Phase/status: Feasibility; SER-007 integration comparison in progress; bench proposal unaccepted.
Completed: ZERO 3W release-source trace and bounded alternative comparison; records checked and published.
Decisions: Existing new-only, Gemini preliminary choice and USB-first priorities retained; ZERO 3W bench approach proposed, not accepted or purchased.
Open: Downloaded-image/root behavior, live disk export, power routing, deck compatibility, final fit and endurance untested.
Next task: Compare compact screen and power integration on the Radxa shortlist before a purchase recommendation.
Needed from owner: Nothing further for this research; hardware/architecture approval remains pending.
```
