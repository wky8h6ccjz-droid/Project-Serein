# Requirements and decisions

Updated: 2026-10-03.

## Agreed direction

| Area | Current requirement or preference |
| --- | --- |
| Name | Serein |
| Sequence | Physical device first |
| Form | Upright, approximately credit-card footprint |
| Surfaces | Flat front and back; flat sides inspired by the iPhone 4 perimeter; softened outline corners and small edge bevels |
| Display/control | Full-front touchscreen; no front wheel or physical playback controls selected |
| Buttons | Two side buttons: volume up and down; power/lock button on top |
| Wireless audio | Bluetooth is the primary listening path |
| Wired audio | 3.5 mm headphone jack |
| USB | USB-C charging; data capability is needed for the CDJ workflow |
| Storage | At least 64 GB of usable storage is the target; allocation and advertised capacity need confirmation |
| Expansion | microSD required; externally accessible slot preferred, exact placement undecided |
| First Spotify prototype | Official Spotify app on compatible Android hardware; normal app interface is acceptable |
| DJ use | Direct connection to supported CDJs as a flash-drive replacement is a core requirement |
| Finish palette | Jet black, very dark matte purple, very dark matte forest green, very dark matte blue |
| Collaboration | Assistant is CTO; human is project manager and approves major decisions |
| Prototyping | A 3D printer is available |
| Budget | Deferred; no approved amount or purchases |

## Provisional design and performance targets

- Footprint: about 86 mm tall by 54 mm wide. This is desired object size, not a confirmed component layout.
- Thickness: the first render felt too thick. Later renders aim visually for roughly 12–14 mm; that number was proposed by the assistant and has not been validated or separately approved as a fixed mechanical dimension.
- Battery: 24 hours of listening, principally Bluetooth with the screen mostly off. This must be measured with realistic Spotify playback and occasional interaction.
- USB-C bottom-left and headphone jack bottom-right, widely separated, as viewed from the front.
- Matte colored metal appearance with very dark tones. Real material, finish process, construction, and price are undecided.

## Architecture proposals, not selections

An existing Android device as a donor, with a custom enclosure, was proposed as a fast route to official Spotify. No donor has been selected.

Direct CDJ support now makes USB mass-storage capability and safe storage handoff essential selection checks. The earlier Android donor proposal must be assessed against those checks before it can become a decision.

A dedicated DJ library on microSD, exposed through a USB storage mode, is a candidate approach. It is not an implemented or validated architecture.

## Open decisions

1. Which CDJ models and firmware versions are available for testing?
2. Which hardware can support official Spotify, USB mass storage, audio, and the desired footprint?
3. Can the 24-hour battery target fit the desired enclosure?
4. What usable internal capacity and microSD allocation will meet the storage target?
5. Where should the microSD slot be placed?
6. How should charging, battery power, and storage access behave while attached to a deck?
7. What prototype construction and finish process should be used?

CDJ compatibility must be stated per tested model; no blanket claim covering all CDJs has been approved.
