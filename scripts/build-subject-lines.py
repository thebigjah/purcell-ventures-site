"""
Builds dist/subject-line-library.zip from dist/subject-line-library/.

Same pattern as build-cold-email-pack.py.

Usage:
    python scripts/build-subject-lines.py
"""

import os
import sys
import zipfile

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SOURCE_DIR = os.path.join(REPO_ROOT, "dist", "subject-line-library")
OUTPUT_ZIP = os.path.join(REPO_ROOT, "dist", "subject-line-library.zip")


def build():
    if not os.path.isdir(SOURCE_DIR):
        print(f"[ERROR] Source directory not found: {SOURCE_DIR}")
        sys.exit(1)

    if os.path.exists(OUTPUT_ZIP):
        os.remove(OUTPUT_ZIP)

    file_count = 0
    total_bytes = 0

    with zipfile.ZipFile(OUTPUT_ZIP, "w", zipfile.ZIP_DEFLATED) as z:
        for root, dirs, files in os.walk(SOURCE_DIR):
            for fname in files:
                full = os.path.join(root, fname)
                arc = os.path.relpath(full, os.path.join(REPO_ROOT, "dist"))
                z.write(full, arc)
                file_count += 1
                total_bytes += os.path.getsize(full)

    print(f"[OK] Built {OUTPUT_ZIP}")
    print(f"     Files: {file_count}, Output: {os.path.getsize(OUTPUT_ZIP):,} bytes")


if __name__ == "__main__":
    build()
