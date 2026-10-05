# SER-007 — Compact display and power assessment

Research date: 2026-10-05. Manufacturer documentation reviewed; no hardware, firmware, CAD or endurance tests. Owner authorized continuing the comparison under DEC-022. Recommendations below are engineering judgments, not accepted electronics or purchase decisions.

## Recommendation

Retain **Radxa ZERO 3W for the first Android USB-storage bench experiment** because its release-linked storage-function and developer-build evidence is already traced. **Radxa CM3 is the stronger integration lead for a custom pocket device among these three**: direct display interfaces and documented battery management address important packaging needs. Its custom carrier, exact Android storage support, touchscreen and endurance remain unresolved. ZERO 2 Pro provides a DSI connector but does not yet offer a verified compact screen/battery combination that displaces either recommendation.

The first experiment should answer whether Android can reliably hand an owned DJ disk to a USB host. It can use an existing HDMI monitor and input devices, if available. A purchased pocket display, battery or enclosure would add integration work before answering that question. Existing equipment access and a documented power/data arrangement must be established in the bench plan.

## Board comparison

| Board | Display route | Power and integration | Assessment |
| --- | --- | --- | --- |
| ZERO 3W, 65 × 30 mm | Micro-HDMI; documented MIPI connector is CSI for cameras, not a DSI screen connector | 5 V input through the USB 2 OTG Type-C port; manufacturer recommends a 5 V / 2 A or greater adapter. Battery charging/monitoring is not established by the reviewed board documentation. Shared power/data port needs a reviewed connection plan | Best-supported USB bench candidate of this shortlist; HDMI adapter electronics and cabling complicate a pocket screen |
| ZERO 2 Pro, 65 × 37 mm | Four-lane DSI connector plus micro-HDMI; officially documented DSI accessory is 10-inch Display 10FHD, supported under Android | 5 V Type-C supply, manufacturer recommends more than 2 A. No integrated battery charging/monitoring established here | DSI is useful but does not prove a small panel is compatible. Exact Android mass-storage/privilege path has not been traced |
| CM3, 55 × 40 mm module | MIPI DSI, with carrier routing needed | Manufacturer documents RK817-5 charging and monitoring, battery/temperature connections and reference power circuits. Requires a custom carrier; module dimensions do not establish completed device fit | Stronger custom pocket integration lead; exact firmware, carrier, cell and panel remain unselected |

Sources: [ZERO 3 overview](https://docs.radxa.com/en/zero/zero3), [ZERO 3 hardware interface](https://docs.radxa.com/en/zero/zero3/hardware-design/hardware-interface), [ZERO 2 Pro overview](https://docs.radxa.com/en/zero/zero2pro), [ZERO 2 Pro supply preparation](https://docs.radxa.com/en/zero/zero2pro/getting-started/preparation), [ZERO 2 Pro supported display](https://docs.radxa.com/en/zero/zero2pro/getting-started/accessory-usage), [CM3 product](https://radxa.com/products/cm/cm3/) and [CM3 datasheet rev. 1.2](https://dl.radxa.com/cm3/docs/radxa_cm3_datasheet.pdf), printed pages 11–18. ZERO 3 source provenance is in [the USB evidence](zero3w-usb-evidence.md). Adapter current ratings are supply recommendations, not measured listening power.

## Screen geometry: measure the complete touch assembly

Working enclosure target is approximately **54 mm wide × 86 mm tall**. It must also accommodate walls, lens retention, flex cable bends, connectors and electronics. A panel's diagonal or bare LCD dimensions alone cannot establish fit.

| Manufacturer/model lead | Published dimensions, width × height | Result against current target |
| --- | --- | --- |
| Hongjia 3.1-inch 480 × 800 listing | Bare LCD 43.48 × 74.72 mm; touch panel 52.61 × 93.42 mm | Published touch assembly is too tall. Page title HJ3100-06 differs from table HJ3100-01; exact revision requires confirmation |
| SAEF SFTO310HZ-7423A-CT, 3.1-inch 480 × 800 | Bare LCD 43.48 × 74.72 mm; touch assembly 50.04 × 88.74 mm | Published touch assembly is too tall. Page gives inconsistent touch-controller identities; exact revision requires confirmation |
| Maclight MLT030W27-1, 3.1-inch 480 × 800 | Bare module 43.68 × 77.02 mm; touchscreen optional | Bare module is a geometry lead. Full touch/lens dimensions are missing, so fit is unproven |
| Tailor Pixels TTH288XVS-01CG, 2.8-inch 480 × 640 | Product page lists module 52.2 × 72.68 × 3.01 mm and capacitive touch; specifications table also calls touch optional | Smaller-screen lead, pending confirmation that dimensions include the exact touch/lens assembly. Only 1.8 mm total width margin remains before enclosure allowances; Android panel/touch compatibility unverified |

Primary sources: [Hongjia](https://www.lcdtftlcd.com/3-1-inch-with-capacitive-touch-screen-480x800.html), [SAEF](https://www.saefdisplay.com/sale-22611641-3-1-inch-ips-tft-lcd-with-capacitive-touch-panel-480-800-mipi-dsi-display-module-st7701-driver.html), [Maclight](https://www.szmaclight.com/product/3-inch-tft-lcd-module.html), [Tailor Pixels](https://tailorpixels.com/product/2-8-inch-ips-tft-high-resolution-480x640-mipi-with-capacitive-touch/) and [its linked drawing](https://tailorpixels.com/wp-content/uploads/2026/08/TTH288XVS-01CG_2.8-inch-TFT-LCD-480x640-MIPI-optical-bonding.pdf). Tables were reviewed; drawing geometry was not visually verified. These are component leads, not approved retail parts or delivered quotes. No supplier was contacted.

Matching MIPI DSI does not make a panel plug-and-play. Verify lane count, connector/pinout, voltages, panel initialization/timings, backlight supply/control and I2C touch driver against the chosen Android image. A custom flex adapter or carrier may be needed. Neither Radxa board's existing display support establishes support for these panels. Waveshare small-HDMI product pages were inaccessible during review; no exact assembly fit or Android touch support was established for them.

## Battery and shared USB power

CM3's datasheet distinguishes +5V_INPUT, USB_5V_IN charging input and battery connections. It explicitly warns against simultaneously powering +5V_INPUT and USB_5V_IN. This restriction must be honored in a carrier design; battery management is not a turnkey single-port charging/USB solution. Review cell protection, temperature sensing, charger configuration, USB-C roles/current limits and isolation against its reference circuits. No circuit was built or electrically verified.

For ZERO 3W, do not assume a deck's USB port can power the full Android board or connect independent 5 V supplies through an improvised cable. Exact power-path/isolation behavior and an appropriate documented bench connection remain open. Computer enumeration and deck tests must record how power was provided.

No reviewed source establishes headphone drive quality. I2S or line-level audio requires a suitable output design and actual wired/Bluetooth tests. No comparative power-efficiency claim is justified for these boards.

### What 24 hours requires

Illustrative calculation only: assume a 3.7 V nominal cell and **80% usable energy** after conversion and reserve. Neither assumption is a selected/measured battery design.

| Hypothetical cell | Nominal energy | Assumed usable energy | Maximum average device power for 24 hours |
| --- | --- | --- | --- |
| 3,000 mAh | 11.1 Wh | 8.88 Wh | 0.37 W |
| 5,000 mAh | 18.5 Wh | 14.8 Wh | 0.62 W |

Calculation: nominal energy = 3.7 V × capacity in Ah; power allowance = nominal energy × 0.8 / 24 h. Capacity is not evidence that such a cell fits. At 1 W average, the same assumptions require about 8,100 mAh for 24 hours. Actual whole-device listening power must be measured before selecting a cell or claiming endurance. Measure official Spotify Bluetooth playback with screen mostly off, separately for streaming and offline, and account for display, wireless and power conversion.

## Review status and next action

Comparison complete and awaiting owner review within SER-007. ZERO 3W remains a bench proposal; CM3 is a final-device research lead. No final electronics, screen, battery, cost, purchase, flashing or architecture acceptance is inferred from permission to continue research. Gemini access and actual Pioneer CDJ/XDJ validation remain open.

The [bench plan](usb-bench-plan.md) and [compatibility review](usb-compatibility-review.md) are delivered under DEC-023/024. AIC8800D80 source support strengthens the image case; exact board/binary matching remains open. The official PiKVM splitter is now the preferred accessory candidate ($54.94 board/splitter subset before separate supply/accessories/delivery); board-specific USB-C matching needs confirmation. Injector fallback and computer-only hub remain conditional. Purchase/execution remains blocked.

**Single next action:** obtain the exact board/image and PiKVM splitter compatibility confirmations using the prepared supplier inquiries before final kit approval. No purchase or flashing approved.

Owner check: confirm the distinction between the immediate USB experiment and the future pocket hardware, and that no fit or 24-hour claim is being made.

```text
Phase/status: SER-007 compatibility review delivered; procurement/execution still blocked.
Completed: AIC source trace, cheaper splitter candidate and two supplier-inquiry drafts.
Decisions: Show evidence and recommendations in chat and GitHub; ZERO 3W/splitter remain proposals.
Open: Exact sold board/binary match, splitter USB-C behavior, delivered costs and physical tests.
Next task: Obtain the two exact compatibility confirmations before kit approval.
Needed from owner: Country/laptop ports and authorization before supplier contact; no purchase yet.
```
