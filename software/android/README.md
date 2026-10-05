# First Serein Android build — preparation

SER-014 · prepared 2026-10-05 · scope/framework proposal awaiting owner approval. No Android app sources or APK exist yet.

The next useful result is an app we can install and use to listen to local songs, keep playlists/setlists, and open official Spotify. It carries the accepted preview onto Android while hardware inquiries are pending. This preparation contains the build specification, dependency pins, readiness check and acceptance plan; it does not select the final pocket electronics.

## What the first build will do

| Area | Proposed first-build behavior | How we know it works |
| --- | --- | --- |
| Home and Library | Keep the clean Home, Songs/Playlists/Setlists, top Play/Shuffle and artwork player already accepted | Repeat the accepted preview journeys on Android, including narrow layout and large text |
| Local music | Add songs using Android's file picker; copy completed imports onto the device for reliable offline use | Import, remove access to the source, switch offline, reopen and play the copied song |
| Playback | Play/pause/seek, previous/next, shuffle and automatic queue advance within the selected library/list | Recorded playback journey; keep music playing with screen locked; headset disconnect and competing audio handled |
| Saved collections | Name, edit membership and reorder playlists/setlists; restore after app/process/device restart | Kill/reopen and reboot checks preserve songs and exact list order; failed imports do not damage existing library |
| Spotify | Spotify tile pauses Serein's local playback and opens the installed official app; missing app gives a clear message | Test both installed and absent cases; real Spotify listening checked on a compatible target with owner login inside Spotify |
| Deck | Keep a simple unavailable state until the storage backend and physical compatibility are proven | App never claims a deck is connected or storage is exported; simulation remains in the browser preview |

Start with the existing two CC0 demo recordings and their provenance. Owner-selected music and artwork remain local and out of GitHub. The first owner test is simple: install, import a song, make a setlist, lock the screen, then reopen offline and find/play that setlist.

## Recommended route and the tradeoff

**Recommendation: Kotlin + Jetpack Compose for the app, Android Media3 for playback, Room for saved metadata.** Kotlin is the app language; Compose builds the screens; Media3 runs playback and Android media controls; Room keeps song/list records across reopening.

| Route | Benefit | Cost / limitation | Recommendation |
| --- | --- | --- | --- |
| Wrap the browser preview in an Android WebView | Reuses the current screen code quickly | Durable file import, foreground playback and media controls still need native bridges; browser lifecycle/storage adds another layer | Retain as a temporary UI reference |
| Native Android | Direct platform file access, playback service and media controls; good fit for an Android-only device | Rebuild screens and port queue/library rules; verify parity rather than assuming the browser tests prove Android behavior | Use for this first test app |
| Cross-platform framework | Useful if a second mobile platform is required | Extra runtime/tooling and platform integration without an approved iOS target | Reconsider if platform scope changes |

This is engineering judgment based on Serein's Android-only listening requirement and background/offline use. It would change if the owner prioritizes a rapid visual-only install over functional audio, or requests another platform. Approval would cover this first Android test app, not permanent hardware/platform selection or a completed-device claim.

## Proposed implementation boundaries

- One Android app module; keep UI, library repository, playback service and Spotify launch separate inside it. No server, account system, analytics or OpenAI/API credentials are needed.
- Use the system audio-file picker, with read access only. Copy bytes to an app-managed library, then commit metadata; originals remain untouched. A picker provider may fetch a cloud-hosted source on the user's instruction; offline availability starts only after the local copy finishes. Don't assume a provider URI is a hard-downloaded file.
- Store UUID song IDs, display title/artist/album, local audio/art paths, collection kind/name and ordered membership in Room. Display names never determine filesystem paths. Imported files remain byte-for-byte unchanged; bounded embedded-art handling falls back safely on malformed images/tags.
- Stage imports to temporary files, close/sync and rename completed copies, then commit metadata transactionally. File copies and database transactions are not one atomic transaction: on startup remove abandoned temporary/orphan copies, retain prior valid records and show missing-file errors. Partial/failed import must not replace the existing library. Do not use destructive database migration.
- Playback lives in a MediaSessionService, with the screen using its controller. Handle audio focus and unplugged headphones. Reopen restores saved library/list data without automatically starting audio after a reboot.
- The Spotify tile uses an explicit launch intent; catch the missing-activity case and scope package visibility only if needed. No Spotify SDK/OAuth is required merely to open its official app. Spotify caching/offline rights stay inside Spotify.
- Proposed manifest has playback foreground-service permissions; no broad file-management permission and no Serein network permission for this local-player/launch scope. Disable app backup and exclude imported music/metadata from cloud/device-transfer backup under supported Android controls; verify on the test target before claiming no automatic OS backup. Uninstall/clear-app-data removes app copies; originals stay intact.
- App-managed storage is for this test build. It is not the later deck-exportable volume. A library repository boundary must permit migration to approved storage hardware without mixing Spotify data or claiming USB support.
- Do not silently migrate the browser's IndexedDB collection. Owner imports through Android; a separate future migration/export feature needs a bounded plan.

## Build steps and acceptance

| Subtask | Proposed work | Depends on | Completion evidence |
| --- | --- | --- | --- |
| SER-014A | Prepare full JDK, SDK and checked Gradle wrapper; create app shell | Owner approves route/scope; tools reachable | Readiness report passes; clean checkout compiles a debug APK and recorded dependency set |
| SER-014B | Port accepted Home/Library/player screens and queue rules | A | List and full-player interactions match the preview; narrow layout and accessibility check |
| SER-014C | Native import, metadata, saved audio and collections | A/B | Local copies play offline after process restart/reboot; exact collection order; failed-copy/DB rollback checks |
| SER-014D | Background player and Android controls | B/C | Real decoding/seek/advance; lock-screen/media controls; audio focus/headset tests on recorded target |
| SER-014E | Official Spotify launch and unavailable Deck state | B/D | Absent/present launch journeys, local playback pauses, no fake export/connection result |
| SER-014F | Package, install, owner test and evidence | A–E | APK SHA-256, build log, target OS/model, passed/failed test list and owner acceptance |

Implement in these small increments after approval. Build artifacts stay out of source Git; arrange an authorized project artifact location when the APK exists. Never call compilation alone an installed/working app. Reopen reported failures and retain the separate real-deck gate.

## Candidate dependency pins

See [build-spec.json](build-spec.json). These are a bounded supported baseline, **not a claim to be the latest releases**. Artifact existence was checked on 2026-10-05; the full dependency graph has not been resolved, compiled or runtime-tested. Add remaining UI/test support versions, dependency verification/locks and wrapper JAR/checksum during A, then verify the entire graph.

| Tool / library | Candidate pin |
| --- | --- |
| Full Java Development Kit | 17 (runtime and compiler; Java runtime alone is insufficient) |
| Gradle / Android Gradle Plugin | 8.13 / 8.13.2 |
| Kotlin / Compose compiler plugin | 2.2.21 / 2.2.21 |
| Compose BOM | 2025.10.01 |
| Media3 | 1.8.0, same version across playback/session modules |
| Room / KSP | 2.8.5 / 2.2.21-2.0.4 |
| Android SDK | minimum 26; compile/target 36; Build Tools 36.0.0 |

Minimum Android 8/API 26 is a test-app compatibility proposal; it covers the proposed Android 11 bench image without proving that image's services/drivers. Compile/target API 36 is a pinned development baseline. Recheck actual device OS and current distribution rules before shipping; no Play Store release is part of this work.

## Current workspace readiness

The read-only check on 2026-10-05 found Java runtime 21, no `javac`, Gradle, Android SDK, `sdkmanager`, `adb` or emulator. `/dev/kvm` is absent, so accelerated emulator tests are unavailable here. No tools were installed or license acceptance performed by this preparation.

Direct repository access was verified through the configured proxy with task network permission: Google Android repository and all pinned Maven POMs returned valid content; Gradle's published SHA-256 was read. Git fetch also succeeded with that permission; local dirty files were preserved.

Run the repeatable local readiness report:

```sh
python3 software/android/check-readiness.py
python3 software/android/check-readiness.py --json
```

Exit code 1 means missing build prerequisites; it does not mean an app build was attempted. The checker performs no installs, network requests, destructive operations or device access. Emulator availability is advisory and never establishes a running target.

During A, install a full JDK 17 and Android command-line tools into a writable tool directory, preserve the environment's proxy/CA settings, and follow official SDK license/install steps. Install `platforms;android-36`, `build-tools;36.0.0` and `platform-tools`. Create the Gradle wrapper with the version/checksum in the spec, then run the readiness check. Android Studio's bundled JDK/SDK on an existing workstation is an alternative if this environment cannot provide a test target.

After the app project exists, intended commands from `software/android` are:

```sh
./gradlew --no-daemon testDebugUnitTest lintDebug assembleDebug
# Only with an explicitly authorized, connected test target:
adb install -r app/build/outputs/apk/debug/app-debug.apk
# Select a target with -s when several are connected.
./gradlew connectedDebugAndroidTest
```

These commands have **not** been run; `gradlew` and `app` do not exist yet. Owner chose emulator-first testing on 2026-10-05. No emulator is currently installed/running; this workspace lacks KVM, so choose an actual runnable host/image during A and record it. Emulator tests can cover import/persistence/UI and local playback. Bluetooth/headphone behavior, actual Spotify listening and final hardware/USB/power behavior require appropriate real equipment. No generic repeat of “Spotify works on Android” is planned.

## First-build test checklist

1. Compile/test/lint in a clean environment and record exact tools, dependencies, APK hash and warnings.
2. Install/launch on recorded Android targets, initially API 30 and 36 where available; exercise the minimum API 26 target before claiming minimum-version support.
3. Play both CC0 demos and real MP3/WAV/Ogg fixtures with artwork/fallback, seeking, next/previous, queue advance and shuffle; log actual codec results. Unsupported codecs must fail clearly without claiming universal playback.
4. Import local audio, create/edit/reorder both collection types, kill/reopen/reboot and play offline from saved copies; remove access to the original provider to verify true local availability.
5. Inject canceled/failed imports, insufficient space and invalid audio/art; verify previous songs/lists remain and incomplete files are cleaned on startup.
6. Lock/unlock the screen, use notification/media controls, switch to competing audio/Spotify and disconnect a headset; record service/focus behavior. Physical audio checks remain open if only an emulator is available.
7. Check Spotify-present/absent cases, clean UI at narrow width/large text, backup configuration, local-only storage and no Serein network calls. Do not put private music, account details or logs exposing them in public records.
8. Confirm Deck is unavailable and cannot claim export. Keep the browser ownership-model checks as future backend rules, not evidence of native storage safety.

## Primary sources and verified evidence

Checked 2026-10-05:

- [Compose](https://developer.android.com/compose): Android's native UI toolkit; supports the proposed screen implementation.
- [Media3 ExoPlayer](https://developer.android.com/media/media3/exoplayer) and [background playback](https://developer.android.com/media/media3/session/background-playback): local playback/controller/service mechanism and required playback permissions.
- [Audio focus](https://developer.android.com/media/optimize/audio-focus): focus eligibility and competing-player behavior need implementation/testing.
- [System file picker](https://developer.android.com/training/data-storage/shared/documents-files): user-selected document access includes cloud providers; persisted grants alone do not prove local bytes.
- [Backup controls](https://developer.android.com/identity/data/autobackup): app storage participates in OS backup by default; Android 12+ needs data-extraction rules as well as the manifest flag.
- [Package visibility use cases](https://developer.android.com/training/package-visibility/use-cases): launching another app must handle unavailable activities; package queries need only cover the chosen detection path.
- [AGP 8.13 compatibility](https://developer.android.com/build/releases/agp-8-13-0-release-notes): Gradle 8.13/JDK 17 and API 36 compatibility baseline. API 36.0 is within the supported maximum; Build Tools 36.0.0 is an explicit candidate pin rather than the documented default 35.0.0.
- [Room releases](https://developer.android.com/jetpack/androidx/releases/room): 2.8.5 patch and Kotlin KSP guidance; [Compose BOM mapping](https://developer.android.com/develop/ui/compose/bom/bom-mapping).
- Official POM/repository/checksum URLs and observed versions are listed in build-spec.json. Receipt proves availability, not complete dependency compatibility or a successful build.

**Single next action:** owner reviews and approves or revises this first-build scope/native route. Then execute SER-014A. Preparation is delivered; framework selection and implementation are not yet accepted.
