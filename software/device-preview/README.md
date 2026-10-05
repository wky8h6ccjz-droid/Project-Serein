# Serein device software preview

First software increment, SER-011, 2026-10-05. Owner requested useful device-software work while board/splitter supplier replies are pending. Visual design and interaction acceptance remain open.

## Try it

Open **preview.html** in a browser. It is one self-contained file: no installation, server, accounts or internet are needed. The file uses JavaScript; if a managed browser blocks local files, use the optional local server below.

1. Open **Your DJ library** and change the example track selection.
2. Tap **Prepare … for deck**. Use **Simulate deck connection** beside the device.
3. Visit Library: choices are locked while the simulated deck owns the music.
4. Return to Deck and confirm **Deck ejected — return library**. Choices unlock after restoration.
5. Try **Simulate unexpected unplug** or **Fail next preparation**, then follow recovery.

Spotify's button demonstrates where the official Android app would open. It does not launch Spotify, access an account or play audio here. The example titles/BPMs are fictional metadata, not included music files. The demo imports/exports no files, creates no USB device and changes no disk or firmware. Refresh resets the simulation.

## Why this is useful now

It makes the actual device controls reviewable while hardware is unresolved. It also implements and tests the software rule that Serein must not alter a DJ library while a host owns it. The simulated interface does not establish actual storage safety, deck compatibility or a working Android app.

The flow and rules can inform the eventual Android implementation; JavaScript/browser technology is a preview choice, not an approved final-device software framework. The first Android build still needs a supported development setup and exact hardware/image access. Official Spotify remains the listening app; the deferred discovery/DJ companion is not started.

## Develop and check

Node.js 20+; no npm dependencies required for the build or flow tests.

```sh
npm test
npm run build
npm start
```

The optional server binds only to 127.0.0.1:4173 and serves an explicit file allowlist. Set SEREIN_PREVIEW_PORT to change the port. Stop it with Ctrl-C. Browser testing additionally needs Playwright and Chromium in the development environment; no runtime dependency is downloaded by the app.

```sh
SEREIN_PREVIEW_URL=http://127.0.0.1:4173/preview.html node tests/browser.cjs
```

For an existing installation, SEREIN_PLAYWRIGHT_MODULE and SEREIN_CHROMIUM_PATH can point to it. SEREIN_SCREENSHOT_DIR optionally saves browser screenshots. Screenshots made during development are held in the ignored work directory, not private owner data in the repository.

Files: core.js holds the ownership/transition model; app.js presents the simulator and screens; index.html/style.css define the proposed interface; build.cjs generates the single-file preview. Hardware logic is deliberately absent from the controller. Future integration must replace simulated completions with verified backend acknowledgments.

## Verification and limits

- Seven flow tests passed, covering exclusive ownership, empty selection, canceled/stale operations, unexpected unplug, failed preparation/restoration, immutable selection snapshots and bounded event sequences.
- Chromium journeys passed: track selection, normal handoff/eject, lockout during deck ownership, interrupted connection/recovery, preparation failure/recovery, cancellation, empty selection and 360 px layout. No JavaScript errors or external requests occurred. The generated standalone file was served locally for this check because this environment's browser policy blocks file URLs.
- Assistant inspected the rendered home screen; browser screenshots also captured deck and narrow-layout states. No Android build, Spotify installation, USB mass-storage exposure, music playback, filesystem check or physical deck test occurred.
- This model runs in memory. It is not production storage protection: a real service must detect persisted host ownership at boot, verify flush/unmount/export/eject/remount, recover after crashes, preserve rekordbox metadata and prevent every other local writer. A button press alone cannot prove host release or filesystem health.

**Owner review is the next action:** try the normal and interrupted paths, then say what feels unclear or what controls should change. Publication is delivery, not owner acceptance.
