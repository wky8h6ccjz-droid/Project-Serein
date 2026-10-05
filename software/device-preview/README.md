# Serein device software preview

SER-011, updated 2026-10-05. Clean Home, local music playback and a simulated deck handoff. Awaiting owner review; Android implementation and real USB/deck integration remain future work.

## Try it

Open **preview.html** in a browser. This single file includes two CC0 house recordings, all code and styling. No account, installation or internet is needed. If browser policy blocks local files, use the optional loopback server below.

1. Open **Library**, then tap **Funky House** or **Synthwave House Loop**. Try Pause/Play and the progress slider.
2. Optionally choose **Add songs** and select your own audio files. The first import replaces the bundled demo library; later imports add songs. Files are read locally, never uploaded or modified. Refresh forgets these selections. Codec support depends on the browser; MP3/WAV are useful starting points.
3. Tap **Prepare library for deck**. Local playback stops. The entire local-file library is prepared; there are no per-track export checkboxes.
4. Use **Simulate deck connection** beside the device. Library playback and additions stay locked until **Deck ejected — return library** restores local access.
5. Try unexpected unplug or failed preparation and follow the recovery screen.

The Home screen has functional Spotify and Library tiles, without slogans. Spotify is a launch placeholder here; on Android it will open the official app. Spotify-managed downloads always stay inside Spotify and never enter the deck library.

Music credits and verified CC0 provenance are in [music/CREDITS.md](music/CREDITS.md) and linked in the preview. This is actual browser audio playback; deck ownership/eject/recovery are simulated. No disk, USB device, firmware or account is changed.

## Develop and check

Node.js 20+; build/flow tests need no npm dependencies.

```sh
npm test
npm run build
npm start
```

Server binds only to 127.0.0.1:4173 with an explicit file allowlist. Set SEREIN_PREVIEW_PORT to change it; Ctrl-C stops it. Browser journeys need Playwright and Chromium:

```sh
SEREIN_PREVIEW_URL=http://127.0.0.1:4173/preview.html node tests/browser.cjs
```

SEREIN_PLAYWRIGHT_MODULE and SEREIN_CHROMIUM_PATH can select installed tools; SEREIN_SCREENSHOT_DIR optionally captures images. Development screenshots are in ignored work/.

core.js models full-library ownership and immutable metadata; app.js implements audio playback, local-file import, screens and simulated acknowledgments. audio.js produces synthetic WAV fixtures for tests, not the preview music. build.cjs embeds the CC0 recordings in preview.html. This browser vehicle does not select the final Android framework or activate the deferred companion.

## Verification and limits

Eight flow tests passed: full-library preparation, immutable metadata, empty library, stale callbacks, cancellation, exclusive ownership and failure/recovery. Chromium journeys passed for both included recordings, real selected-file playback, pause/resume/seek, deck lockout/eject, interruption/recovery, failed preparation, cancellation, escaped filenames, invalid audio, Spotify placeholder and narrow layout. No JavaScript errors or external requests. Both generated standalone and source routes were tested over loopback HTTP; direct file navigation is blocked by this environment's browser policy. Clean Home and Library/player renders were inspected.

No Android APK, device filesystem scan, real Spotify launch, USB mass-storage exposure or physical deck test is implemented or verified. Simulation resets on refresh; production must persist ownership, verify flush/unmount/export/eject/remount and recovery, protect all writers, and preserve DJ metadata. A preview button cannot prove host release or disk health.

**Next action:** owner tries Library playback and reviews the cleaned interface. Publication is delivery, not acceptance.
