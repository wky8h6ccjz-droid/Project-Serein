# Serein device software preview

SER-011, updated 2026-10-05. Clean Home, a familiar library list, full player, playlists/setlists and a simulated deck handoff. Awaiting owner review; Android implementation and real USB/deck integration remain future work.

## Try it

Open **preview.html** in a browser. This single file includes two CC0 house recordings, all code and styling. No account, installation or internet is needed. If browser policy blocks local files, use the optional loopback server below.

1. Open **Library → Songs**. Use **Play** or **Shuffle**, or tap a song. The full player shows artwork, title/artist, pause/resume, progress, next/previous and a shuffle toggle. Close it to return to the list; tap the mini-player to reopen it. Playback advances through the active library or collection, then stops at its end.
2. Open **Playlists** or **Setlists**, choose **New playlist / New setlist**, name it and pick songs. Save, then Play/Shuffle that collection. Edit changes its name or membership; **Song order** expands up/down controls. Ordered Play respects that list's order; Shuffle changes the playback queue only.
3. Optionally **Add songs** from your computer. First import replaces the bundled demos, later imports add files; collections prune references to replaced songs. Files and metadata are read locally, never uploaded or modified. Supported ID3v2.3/2.4 MP3 tags supply title, artist, album and embedded JPEG/PNG; unsupported/malformed metadata uses filenames and original preview covers. Demo covers are ours, not the artists' original album artwork. No online artwork requests are made. Codec support depends on your browser.
4. Open **Deck**, tap **Prepare library for deck**, then use **Simulate deck connection**. Local playback, importing and collection edits are locked until **Deck ejected — return library** restores access. The whole local-file inventory is prepared regardless of playlist/setlist membership. These lists are not proof of native rekordbox/deck playlist support.
5. Try unexpected unplug or failed preparation and follow recovery.

**Preview storage:** file choices, playlists, setlists and simulation state are in memory and reset on refresh. Durable device storage is future Android work. No personal file contents or artwork are included in GitHub publication.

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

core.js models full-library ownership and immutable metadata; app.js implements audio playback, local-file import, screens and simulated acknowledgments. library.js implements playback queue order and bounded local MP3 tag reading; audio.js produces synthetic WAV fixtures for tests, not the preview music. build.cjs embeds the CC0 recordings in preview.html. This browser vehicle does not select the final Android framework or activate the deferred companion.

## Verification and limits

Eleven automated tests passed: eight ownership/flow checks and three queue/metadata checks. Chromium journeys passed on standalone and source routes for Library Play/Shuffle, full player/mini-player, next/previous/automatic queue advance, actual audio/seek, playlist creation/membership edits, setlist naming/order/playback, embedded PNG/tag rendering, lockout during deck ownership, normal eject/recovery/failure/cancellation, invalid audio, escaped filenames and 360 px layout. Embedded artwork is tested with a tag-only MP3 fixture; that fixture does not claim MP3 audio decoding. No JavaScript errors or external requests. Library, player and setlist renders were inspected. Loopback HTTP verified generated standalone and source routes; direct file navigation is blocked by environment policy.

No Android APK, device filesystem scan, real Spotify launch, USB mass-storage exposure or physical deck test is implemented or verified. Simulation resets on refresh; production must persist ownership, verify flush/unmount/export/eject/remount and recovery, protect all writers, and preserve DJ metadata. A preview button cannot prove host release or disk health.

**Next action:** owner creates and plays a setlist in the revised Library. Publication is delivery, not acceptance.
