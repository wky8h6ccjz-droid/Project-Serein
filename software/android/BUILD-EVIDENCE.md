# SER-014A native shell evidence

Recorded 2026-10-06. DEC-039 approves the first native test app; this receipt is assistant verification, not owner acceptance.

## Build result

`lintDebug assembleDebug assembleDebugAndroidTest --write-locks` completed successfully in 2m33s (75 tasks). Lint: **No issues found**. Nonblocking compiler warnings: deprecated Kotlin `jvmTarget` DSL and Compose `TabRow`. No standalone unit suite is claimed; shell journeys are instrumentation tests.

- JDK: Temurin17.0.20.1+1 (runtime/compiler).
- Gradle8.13; Android Gradle Plugin8.13.2; Kotlin/Compose compiler2.2.21.
- SDK compile/target36, minimum26; Build Tools36.0.0; platform-tools37.0.1.
- Compose BOM2025.10.01, activity-compose1.11.0; AndroidX junit1.3.0/runner1.7.0.
- Gradle distribution SHA256: `20f1b1176237254a6fc204d8434196fa11a4cfb387567519c61556e8710aed78`.
- Wrapper JAR SHA256: `81a82aaea5abcc8ff68b3dfcb58b3c3c429378efd98e7433460610fecd7ae45f`.
- App version locks: app/gradle.lockfile; shell dependency SHA256 values: gradle/verification-metadata.xml. Initial hashes recorded from TLS-verified official repositories; metadata verified, independent signatures not verified. Media3/Room/KSP are queued, not yet built.

All six read-only build prerequisites pass with the ignored workspace tool environment. A separate copy containing source only (no build directory, .gradle or local.properties) also compiled offline from cached dependencies: `assembleDebug`, 2m7s, all37 tasks executed. This verifies a fresh project build, not a fresh machine or independent dependency download. Debug key, SDK, caches and artifacts remain outside Git.

## APK receipt

- Package: `dev.serein.player.debug`; versionCode1 / versionName`0.1.0-shell`.
- File: `work/android-artifacts/serein-app-shell-0.1.0.apk` (local workspace artifact, not a GitHub release).
- Bytes: 11624149.
- SHA256: `b25ac3772eec14a27737968744630b178a8f547e8562f1438b984f8895bef59c`.
- `apksigner verify --verbose`: verified, APK signature v2.
- Manifest: no INTERNET/broad storage/playback-service permissions; scoped Spotify visibility; backup disabled with exclusions. Runtime backup/transfer behavior is not independently tested.

## Runtime result

Target: local Android11/API30/default/x86_64 revision11, emulator37.2.12-16428233, Pixel2 profile1080×1920/dpi420. Software mode; `/dev/kvm` absent. Boot completed after639630ms.

Native adb37 cannot create its default user directory on this read-only host. A separately installed adb-shell0.4.4 client successfully connects to the owned emulator over local ADB TCP. No authentication or network policy was changed.

Two installation attempts failed with `cmd: Can't find service: package` even though `sys.boot_completed` was1. Guest crash logs show Android SystemServer `IllegalStateException: Lost network stack`, followed by system app deaths. A bounded reduced-profile retry uses one CPU,540×960/dpi240 and SwiftShader; installation, launch, three instrumentation results and native screenshots are **not yet verified**. The test runner fails clearly rather than recording a pass. Source tests cover navigation, Activity recreation and absent Spotify; recreation is not process/device persistence.

## Scope and owner check

Home, empty Library tabs, unavailable Deck and absent-Spotify messaging are implemented. Add songs is disabled; no music import/playback, saved library, collections or audio service yet. Actual Spotify-present listening, API26/36 runtime, physical audio/USB/deck behavior and battery/fit remain open.

Owner acceptance is pending. Once runtime evidence is available, independently inspect the screens or install the test APK and check Home → Library tabs → Deck → Home and absent-Spotify dismissal. SER-014B follows shell acceptance.

## Primary tool sources

- [Temurin17 official releases](https://github.com/adoptium/temurin17-binaries/releases): downloaded JDK archive checked against the release SHA256.
- [Gradle release checksums](https://gradle.org/release-checksums/): distribution and wrapper SHA256 checked.
- [Google SDK repository](https://dl.google.com/android/repository/repository2-1.xml): command-line tools23.0 archive length181052239 and SHA1`e025545c62a8e64c7559119566a569fb1dec5f60` checked against official package metadata. New Android CLI installs SDK packages; no cloud device service/login was used.
- [AGP compatibility](https://developer.android.com/build/releases/agp-8-13-0-release-notes) and initial library artifact URLs in build-spec.json.
