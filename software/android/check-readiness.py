#!/usr/bin/env python3
"""Read-only Android build prerequisite report; never installs or contacts a device."""
import argparse
import json
import os
from pathlib import Path
import re
import shutil
import subprocess


def tool_version(executable):
    if not executable:
        return None
    try:
        run = subprocess.run([executable, '-version'], capture_output=True, text=True, timeout=10)
        if run.returncode:
            return None
        match = re.search(r'(?:version\s+"|javac\s+)(\d+)', run.stdout + run.stderr)
        return int(match.group(1)) if match else None
    except (OSError, subprocess.TimeoutExpired):
        return None


def report():
    here = Path(__file__).resolve().parent
    spec = json.loads((here / 'build-spec.json').read_text())
    sdk_value = os.environ.get('ANDROID_HOME') or os.environ.get('ANDROID_SDK_ROOT')
    sdk = Path(sdk_value).expanduser() if sdk_value else None
    jdk_value = os.environ.get('JAVA_HOME')
    java = str(Path(jdk_value) / 'bin/java') if jdk_value else shutil.which('java')
    javac = str(Path(jdk_value) / 'bin/javac') if jdk_value else shutil.which('javac')
    platform = f"platforms/android-{spec['android']['compile_sdk']}/android.jar"
    tools = f"build-tools/{spec['android']['build_tools']}"
    checks = {
        'jdk_runtime_17': tool_version(java) == spec['toolchain']['jdk_major'],
        'jdk_compiler_17': tool_version(javac) == spec['toolchain']['jdk_major'],
        'sdk_root': bool(sdk and sdk.is_dir()),
        'android_platform': bool(sdk and (sdk / platform).is_file()),
        'build_tools': bool(sdk and all((sdk / tools / name).is_file() and os.access(sdk / tools / name, os.X_OK) for name in ['aapt2', 'd8', 'apksigner'])),
        'platform_tools': bool(sdk and (sdk / 'platform-tools/adb').is_file() and os.access(sdk / 'platform-tools/adb', os.X_OK)),
    }
    advisory = {
        'emulator_installed': bool(sdk and (sdk / 'emulator/emulator').is_file()),
        'linux_kvm_usable': os.access('/dev/kvm', os.R_OK | os.W_OK),
        'gradle_wrapper_present': (here / 'gradlew').is_file() and (here / 'gradle/wrapper/gradle-wrapper.jar').is_file(),
        'app_project_present': (here / 'app/build.gradle.kts').is_file(),
        'device_or_emulator_running': 'not inspected',
    }
    return {'task': 'SER-014A', 'build_prerequisites_ready': all(checks.values()), 'checks': checks, 'advisory': advisory,
            'notes': ['Read-only; no network, installs, license acceptance or device commands.',
                      'Tool presence is not dependency resolution, compilation or a working app.']}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--json', action='store_true')
    args = parser.parse_args()
    result = report()
    if args.json:
        print(json.dumps(result, indent=2))
    else:
        print('Serein Android prerequisites: ' + ('present' if result['build_prerequisites_ready'] else 'missing'))
        for name, passed in result['checks'].items():
            print(f"{'OK' if passed else 'MISSING'}  {name}")
        print('Advisory: ' + json.dumps(result['advisory']))
        print('No app build or installation was attempted.')
    return 0 if result['build_prerequisites_ready'] else 1


if __name__ == '__main__':
    raise SystemExit(main())
