#!/usr/bin/env python3
"""Install and test the shell on an already-running local emulator via ADB TCP.

Uses adb-shell 0.4.4 to avoid the native adb client's unwritable default user
folder in this managed workspace. Never starts an emulator or targets a physical
device. Requires adb-shell installed separately; it is not an app dependency.
"""
import argparse
from pathlib import Path
import re
import sys
from adb_shell.adb_device import AdbDeviceTcp


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--port', type=int, default=5555)
    parser.add_argument('--output', type=Path, required=True)
    args = parser.parse_args()
    android = Path(__file__).resolve().parents[1]
    apk = android / 'app/build/outputs/apk/debug/app-debug.apk'
    tests = android / 'app/build/outputs/apk/androidTest/debug/app-debug-androidTest.apk'
    if not apk.is_file() or not tests.is_file():
        parser.error('Build both app and instrumentation APKs first.')
    args.output.mkdir(parents=True, exist_ok=True)
    device = AdbDeviceTcp('127.0.0.1', args.port, default_transport_timeout_s=180)
    try:
        device.connect(auth_timeout_s=10)
        boot = device.shell('getprop sys.boot_completed', read_timeout_s=60).strip()
        if boot != '1':
            raise RuntimeError('Local emulator has not completed boot; no APK was installed.')
        if device.shell('getprop ro.kernel.qemu', read_timeout_s=60).strip() != '1':
            raise RuntimeError('Target is not an emulator; no APK was installed.')
        version = device.shell('getprop ro.build.version.release', read_timeout_s=60).strip()
        api = device.shell('getprop ro.build.version.sdk', read_timeout_s=60).strip()
        (args.output / 'target.txt').write_text(f'Local emulator: Android {version}, API {api}\n')
        for service in ['package', 'activity']:
            status = device.shell('service check ' + service, read_timeout_s=60).strip()
            if not status.endswith(': found'):
                raise RuntimeError('Emulator service not ready: ' + status + '; retry after startup settles.')
        print(f'Ready: Android {version}, API {api}, local emulator.', flush=True)
        # Match the Gradle connected-test configuration on this owned emulator.
        for setting in ['window_animation_scale', 'transition_animation_scale', 'animator_duration_scale']:
            device.shell('settings put global ' + setting + ' 0', read_timeout_s=120)
        for source, remote in [(apk, '/data/local/tmp/serein-shell.apk'), (tests, '/data/local/tmp/serein-shell-tests.apk')]:
            print("Uploading " + source.name, flush=True)
            device.push(str(source), remote, st_mode=0o100644, transport_timeout_s=180, read_timeout_s=180)
            print('Installing ' + source.name, flush=True)
            result = device.shell('pm install -r ' + remote, transport_timeout_s=300, read_timeout_s=300)
            if 'Success' not in result:
                raise RuntimeError('Install failed: ' + result)
            print('Installed ' + source.name, flush=True)
        device.shell('am force-stop dev.serein.player.debug', read_timeout_s=120)
        launch = device.shell('am start -W -n dev.serein.player.debug/dev.serein.player.MainActivity', read_timeout_s=120)
        (args.output / 'launch.txt').write_text(launch)
        if 'Status: ok' not in launch:
            raise RuntimeError('App launch did not report success.')
        device.shell('screencap -p /data/local/tmp/serein-home.png', read_timeout_s=60)
        device.pull('/data/local/tmp/serein-home.png', str(args.output / 'native-home.png'), read_timeout_s=120)
        print('Launched app and captured native Home screenshot.', flush=True)
        command = 'am instrument -w dev.serein.player.debug.test/androidx.test.runner.AndroidJUnitRunner'
        chunks = []
        with (args.output / 'instrumentation.txt').open('w') as log:
            for part in device.streaming_shell(command, read_timeout_s=600):
                log.write(part); log.flush(); chunks.append(part)
        result = ''.join(chunks)
        if (not re.search(r'OK \(3 tests\)', result) or 'FAILURES' in result
                or re.search(r'INSTRUMENTATION_STATUS_CODE: -(?:3|4)\b', result)):
            raise RuntimeError('Instrumentation did not pass all 3 tests; see instrumentation.txt.')
        print('Passed 3 native shell instrumentation tests.', flush=True)
    finally:
        device.close()


if __name__ == '__main__':
    try:
        main()
    except Exception as error:
        print(type(error).__name__ + ': ' + str(error), file=sys.stderr)
        raise SystemExit(1)
