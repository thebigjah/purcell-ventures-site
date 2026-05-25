"""
Builds dist/cold-email-pack.zip from the source files in dist/cold-email-pack/.

Run after adding/editing pack content. Output is the same ZIP that's delivered via
Stripe Checkout to buyers.

Usage:
    python scripts/build-cold-email-pack.py
"""

import os
import sys
import zipfile

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SOURCE_DIR = os.path.join(REPO_ROOT, "dist", "cold-email-pack")
OUTPUT_ZIP = os.path.join(REPO_ROOT, "dist", "cold-email-pack.zip")


def build():
    if not os.path.isdir(SOURCE_DIR):
        print(f"[ERROR] Source directory not found: {SOURCE_DIR}")
        sys.exit(1)

    if os.path.exists(OUTPUT_ZIP):
        os.remove(OUTPUT_ZIP)
        print(f"[OK] Removed old {OUTPUT_ZIP}")

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

    output_size = os.path.getsize(OUTPUT_ZIP)
    print(f"[OK] Built {OUTPUT_ZIP}")
    print(f"     Files included: {file_count}")
    print(f"     Source bytes:   {total_bytes:,}")
    print(f"     Output bytes:   {output_size:,}")
    print(f"     Compression:    {(1 - output_size / total_bytes) * 100:.1f}%")


if __name__ == "__main__":
    build()
