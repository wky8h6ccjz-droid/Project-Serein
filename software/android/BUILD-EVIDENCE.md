# SER-014A native shell evidence

Recorded 2026-10-06. Native test-app implementation is approved under DEC-039. **Final shell installed, launched and all three native tests passed on Android8/API26. Owner acceptance is pending.** This is the navigation foundation; music features are queued.

## Final source/build result

After fixing system-bar contrast, `lintDebug assembleDebug assembleDebugAndroidTest` completed successfully in1m41s (75 tasks:16 executed,59 up-to-date). Lint: **No issues found**. A separate source-only copy, with no build directory, .gradle or local.properties, also built offline from cached dependencies: `assembleDebug`,1m41s, all37 tasks executed. This verifies a fresh project build, not a fresh machine or an independent dependency download.

- JDK: Temurin17.0.20.1+1, runtime/compiler.
- Gradle8.13; Android Gradle Plugin8.13.2; Kotlin/Compose compiler2.2.21.
- SDK compile/target36, minimum26; Build Tools36.0.0; platform-tools37.0.1.
- Compose BOM2025.10.01, activity-compose1.11.0; AndroidX junit1.3.0/runner1.7.0.
- Gradle distribution SHA256: `20f1b1176237254a6fc204d8434196fa11a4cfb387567519c61556e8710aed78`.
- Wrapper JAR SHA256: `81a82aaea5abcc8ff68b3dfcb58b3c3c429378efd98e7433460610fecd7ae45f`.
- App version locks: app/gradle.lockfile; shell SHA256 values: gradle/verification-metadata.xml. Initial hashes recorded from TLS-verified official repositories; metadata verified, independent signatures not verified. Media3/Room/KSP remain queued and are not in the shell graph.

All six read-only build prerequisites pass. Nonblocking compiler deprecations: Kotlin `jvmTarget` DSL and Compose `TabRow`. Android tooling also cannot write its default host metrics directory; compilation succeeds. SDK, caches, debug key and APK stay outside Git. No standalone unit suite is claimed; the meaningful shell journeys run as instrumentation.

## Final APK receipt

| Field | Value |
| --- | --- |
| Package | `dev.serein.player.debug` |
| Version | code1 / name`0.1.0-shell` |
| Local artifact | `work/android-artifacts/serein-app-shell-0.1.0.apk` |
| Bytes | 11624149 |
| SHA256 | `e6268592ee07233348a4f294486d5a1bb4fef75e19f256095d38d607e387864a` |
| Signature | `apksigner verify --verbose`: verified; APK v2 signature |

This local debug APK is not a GitHub release or Play Store app. Debug signing is for testing. Its manifest has no INTERNET/broad-storage/playback-service permission; scoped Spotify visibility; backup disabled with exclusions. Runtime backup/transfer behavior remains independently untested.

## Final runtime receipt

- Owned local emulator: **Android8.0.0/API26/default/x86_64 revision1**.
- Emulator37.2.12-16428233; Pixel2-derived540×960/dpi240 profile; one virtual CPU,2GB RAM, SwiftShader; software CPU mode, no KVM.
- Emulator boot:235639ms. Animation scales set to0, matching the Gradle connected-test configuration.
- App and test APKs installed successfully. MainActivity launch: `Status: ok`.
- **Final instrumentation: `OK (3 tests)` in65.548s.** No skipped/assumed tests counted as a complete pass.
- Journeys: Home/Library/Setlists/Deck navigation; Activity recreation retains selected Library/Playlists; absent Spotify message dismisses correctly. Recreation verifies page/tab state, not song/list persistence or a device reboot.
- Native screens captured and inspected. Status/navigation icons explicitly use the app's dark appearance; the first screenshot exposed a contrast issue now fixed.

Raw final [instrumentation receipt](evidence/instrumentation.txt), [launch receipt](evidence/launch.txt) and [target](evidence/target.txt) are included. Full build/install logs remain in the ignored workspace tool directory. Native Home, Library and Deck screenshots accompany this receipt.

## Failures and limits retained

Android11/API30/default/x86_64 revision11 booted but SystemServer crashed with `IllegalStateException: Lost network stack`; installation returned `Can't find service: package`. A smaller one-CPU profile also failed to install. These are Android system failures before the app ran; **no API30 or API36 runtime success is claimed**.

Android8's first cold attempts had installer timeouts and a System UI timeout. The transfer file was complete and the package later appeared installed; the shell runner now uses longer transport/install timeouts and prints separate upload/install phases. One earlier navigation run also overlapped an assistant diagnostic launch and failed; it was rerun in isolation. Isolated pre-contrast tests passed, then the contrast fix was rebuilt and the final three tests passed again. This history does not establish reliable performance on real hardware or every software-emulator startup.

Native adb37 cannot create its default user directory on this read-only host. A separately installed adb-shell0.4.4 client communicates with the owned emulator over local ADB TCP; no authentication or network-policy change. The committed fallback checks emulator identity/service readiness, disables test animations, installs, captures launch/screens and fails on incomplete test results.

## Implemented scope and owner check

Home, empty Songs/Playlists/Setlists, absent-Spotify messaging and unavailable Deck are implemented. Add songs is disabled. No import, saved library/collections, audio service, music playback or actual Spotify-present listening yet. Physical audio/USB/deck, battery and enclosure evidence remain separate.

**Next action:** owner reviews native Home/Library screenshots or installs the debug APK and checks Home → Library tabs → Deck → Home, plus absent-Spotify dismissal. Report corrections before SER-014B ports the accepted Library/player experience. Full-app acceptance at F still requires import/setlist/background/offline playback.

## Primary tool sources

- [Temurin17 releases](https://github.com/adoptium/temurin17-binaries/releases): JDK archive checked against official release SHA256.
- [Gradle checksums](https://gradle.org/release-checksums/): distribution and wrapper checked.
- [Google SDK repository](https://dl.google.com/android/repository/repository2-1.xml): command-line tools23.0 archive length181052239 and SHA1`e025545c62a8e64c7559119566a569fb1dec5f60` checked against official metadata. SDK images installed from Google's repository using Android CLI with metrics disabled; no remote-device service/login.
- [AGP compatibility](https://developer.android.com/build/releases/agp-8-13-0-release-notes); initial library artifact URLs/date in build-spec.json.
