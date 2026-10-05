# SER-007 — Board/image and direct USB power review

Checked: 2026-10-05 under DEC-024. Source review and supplier-inquiry drafts, delivered for owner discussion. No purchase, supplier contact, image download/build, wiring or physical test occurred.

## Recommendation and reasons

Retain the **new 2 GB ZERO 3W, microSD boot** bench proposal. Make the **official PiKVM USB Power/Data Splitter, PiShop SKU 1106-2**, the preferred power-accessory candidate for confirmation. This changes the research recommendation, not an approved hardware selection.

| Question | Evidence | Decision implication / remaining uncertainty |
| --- | --- | --- |
| Is the older Android release missing all AIC8800 support? | Release-pinned board fragment enables AIC WLAN; kernel includes AIC8800D80 code and firmware-selection branches | No. Age alone is insufficient to reject it. Match the actual sold chip/revision to an identified binary and verify live Wi-Fi/Bluetooth later |
| Can a cheaper accessory separate board power from deck power? | PiKVM documents 5 V supply input up to 3 A, host-power separation and one USB data interface; PiShop lists it new at $14.95 | Stronger documented candidate than the expensive injector. Exact ZERO 3W USB-C role and VBUS-detection compatibility still need confirmation |
| Should we buy CG-UCUSBPDB now? | $118.29 in stock; USB 2 host support and PD profiles documented. Non-PD current and upstream isolation not established; package supply descriptions conflict | Hold as fallback. Its price and headline power do not resolve the missing answers |
| Would a powered hub simplify deck testing? | Gemini-authored manual prohibits USB hubs | Keep the hub alternative computer-only. A computer result does not prove direct deck compatibility |

Known board/splitter listing subset: **$39.99 + $14.95 = $54.94 USD**, versus **$158.28** for board/CG-UCUSBPDB. Difference: **$103.34**. The splitter requires a separate suitable 5 V supply; the injector listing includes a supply, so this difference is not a complete-kit saving. Card, reader, cables, supply, tax/delivery and deck are excluded from the new subset. No delivered quote or budget approval exists.

## Android evidence: stronger source support, binary still unverified

[Radxa's Android download page](https://docs.radxa.com/en/zero/zero3/other-os/android/download) links the [rk12 release](https://github.com/radxa/manifests/releases/tag/radxa-zero3-we-android11-rkr12-20240111). Its [customization manifest](https://github.com/radxa/manifests/blob/radxa-zero3-we-android11-rkr12-20240111/Android11_Radxa_rk12_customization.xml) pins the files reviewed below. See [the complete USB evidence trace](zero3w-usb-evidence.md).

- The [board kernel fragment](https://gitlab.com/rockchip_android_r/kernel/configs/-/raw/b0c04524601828b880b48f61b187a1a0134334bf/rockchip/rock3_zero_w.config) sets `CONFIG_AIC_WLAN_SUPPORT=y`, `CONFIG_AIC8800_WLAN_SUPPORT=m` and `/vendor/etc/firmware` as the firmware path. The pinned board recipe selects this fragment.
- The pinned [AIC Makefile](https://gitlab.com/rockchip_android_r/rk/kernel/-/raw/c689a7aadeaaba59ebf2cb0de093ea3c918c00ba/drivers/net/wireless/rockchip_wlan/aic8800/Makefile) names WLAN, board-support and Bluetooth low-power modules. The [driver](https://gitlab.com/rockchip_android_r/rk/kernel/-/raw/c689a7aadeaaba59ebf2cb0de093ea3c918c00ba/drivers/net/wireless/rockchip_wlan/aic8800/aic8800_bsp/aic_bsp_driver.c) includes AIC8800D80 Wi-Fi initialization and U01/U02/U03 firmware-selection branches.
- The manifest pins vendor/common to `3d1f3da434d7ed54caab413f588ef60eaea1d81a`. Its [Wi-Fi packaging recipe](https://gitlab.com/rockchip_android_r/rk/platform/vendor/rockchip/common/-/raw/3d1f3da434d7ed54caab413f588ef60eaea1d81a/wifi/wifi.mk) gathers generated WLAN modules and copies firmware into the vendor partition. This is packaging intent; the firmware inventory and actual image contents were not verified.

These findings correct the earlier emphasis on the image predating a newer schematic. Source support exists. They do not prove every AIC8800 variant is supported, all modules/firmware were packaged, Bluetooth works, the seller ships that variant, or the linked binary matches the source. An exact seller/manufacturer image recommendation and later boot verification are still required; generic Spotify feasibility remains deferred under DEC-021.

## Power evidence and limits

The [official PiKVM product explanation](https://pikvm.org/new/) identifies separate external 5 V power and host data paths, with shared ground. It describes preventing power returning to the host, a supply up to 3 A and a single USB interface. The [manufacturer handbook](https://docs.pikvm.org/v2/) specifies a USB-C device cable, USB-A-to-C host cable and official Raspberry Pi Type-C supply for its Raspberry Pi arrangement. The [linked PiShop listing](https://www.pishop.us/product/pikvm-usb-power-data-splitter/) shows SKU 1106-2, new, $14.95 and in stock on the check date.

This addresses the intended voltage/current class, backpower separation and direct data path in documentation. It is not measured electrical validation or a ZERO 3W wiring instruction. [Radxa specifies](https://docs.radxa.com/en/zero/zero3/hardware-design/hardware-interface) USB-C 1 OTG/power, 5 V only and a supply of at least 2 A. The exact splitter's CC role/current advertisement, downstream VBUS behavior and the board's host-attachment detection must work together. Obtain a pinout/confirmation for this exact commercial module and a named 5 V supply before kit approval. Do not substitute a generic Y cable or send higher voltage to the board.

A separate BLIKVM splitter has a published pin table, but it is **not this PiKVM SKU**. Do not transfer its circuit or resistor values to the proposed product.

The [Coolgear product page](https://www.coolgear.com/product/usb-c-usb-b-power-delivery-adapter-wmounting-kit) now establishes price/stock, but lists different supply ratings across its description/package information (65 W versus 19 V × 2.64 A). It lists a C-to-C cable; an upstream A-to-B cable is not listed. Its [matching manual](https://www.coolgear.com/wp-content/uploads/2017/08/CG-UCUSBPDB-Product-Manual.pdf) and [technical sheet](https://www.coolgear.com/wp-content/uploads/CG-UCUSBPDB_Technical-Data-Sheet-06-241115.pdf) do not close the non-PD current/isolation questions. These gaps are not evidence that the product is faulty. Retain as fallback; do not order both alternatives.

## Copy-paste supplier inquiries — prepared, not sent

### Arace / Radxa: exact board and Android image

Subject: ZERO 3W RS107-D2E0H1W15 — shipped revision and Android image

```text
I am considering one new Radxa ZERO 3W, 2 GB, no eMMC, with soldered header, SKU RS107-D2E0H1W15, booting from microSD.

Please confirm the exact board revision and Wi-Fi/Bluetooth chip in current stock. Which Radxa Android image has been verified on that exact variant, including both Wi-Fi and Bluetooth? Please provide its download link, filename and checksum, and note any required fixes.

Radxa currently links release radxa-zero3-we-android11-rkr12-20240111 / Radxa-Zero3WE-20231130-gpt.zip. Is that binary suitable for the board you will ship? Its pinned sources include AIC8800/AIC8800D80 support, but I have not verified the binary.

For a USB storage gadget experiment through USB-C 1, is the image userdebug with supported root ADB access, and does it retain CONFIG_USB_CONFIGFS_MASS_STORAGE? If not verified, please say so. I understand this does not establish DJ-player compatibility.
```

### PiShop / PiKVM: exact splitter and 5 V supply

Subject: PiKVM splitter SKU 1106-2 — ZERO 3W USB gadget/power compatibility

```text
I am considering one new PiKVM USB Power/Data Splitter, PiShop SKU 1106-2, for a Radxa ZERO 3W. Its USB-C 1 combines USB 2 OTG data and 5 V-only power; Radxa recommends at least 2 A.

Proposed arrangement: USB-A host -> splitter data input; named external fixed 5 V / 3 A USB-C supply -> splitter power input; splitter output -> ZERO 3W USB-C 1 through a short C-to-C data cable. There must be no enumerating hub, and supply power must not feed the host's VBUS.

Can you confirm suitability for that board, or provide the exact module's pinout/schematic for checking CC roles/current advertisement and VBUS/host-attachment detection? Does the output support at least 2 A continuously at 5 V without PD negotiation, and remain strictly 5 V with the recommended supply? Please identify the supply and cable specifications you recommend.

Please confirm host VBUS isolation and a direct USB 2 D+/D- path, whether any power-off/hot-plug limitation applies, and which cables/supply are included. If ZERO 3W compatibility is untested, please distinguish that from the electrical specifications.
```

## What would change the recommendation / next action

Retain the candidate if the exact board has a supported Android image and the exact splitter/power pairing satisfies the USB-C/5 V/direct-data conditions. A missing image/privilege route calls for a specifically scoped recoverable firmware plan or another board; an incompatible splitter calls for another documented accessory. Do not equate a supplier's generic “works with USB-C” answer with either condition.

**Single next action:** obtain the two exact compatibility confirmations using these prepared inquiries before final kit approval. The drafts are ready to send; no supplier contact is authorized or performed. Country and laptop ports remain needed for the eventual delivered quote. The owner can challenge the preferred accessory or any assumption here; physical proof follows only after a separately approved kit/test scope.
