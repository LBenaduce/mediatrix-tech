#!/usr/bin/env python3
"""Create metadata-free WebP derivatives for approved Digital Junk Drawer images."""

from pathlib import Path
from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "src" / "assets" / "mediatrix-archives-originals"
OUTPUT = ROOT / "public" / "mediatrix-archive"
MAX_DIMENSION = 1600

APPROVED_IMAGES = {
    "WhatsApp Image 2026-07-20 at 23.02.21.jpeg": "family-crest.webp",
    "WhatsApp Image 2026-07-20 at 23.02.58.jpeg": "sleeping-dog-and-case.webp",
    "WhatsApp Image 2026-07-20 at 23.06.00.jpeg": "laptop-and-phone.webp",
    "WhatsApp Image 2026-07-20 at 23.08.49.jpeg": "racing-trophy.webp",
    "WhatsApp Image 2026-07-20 at 23.09.20.jpeg": "mysterious-plumbing-hose.webp",
    "WhatsApp Image 2026-07-20 at 23.10.30.jpeg": "robertos-cup.webp",
    "WhatsApp Image 2026-07-20 at 23.17.23 (3).jpeg": "last-metroid-screen.webp",
}


def optimize(source_name: str, output_name: str) -> None:
    source_path = SOURCE / source_name
    output_path = OUTPUT / output_name

    with Image.open(source_path) as original:
        image = ImageOps.exif_transpose(original).convert("RGB")
        image.thumbnail((MAX_DIMENSION, MAX_DIMENSION), Image.Resampling.LANCZOS)
        image.save(output_path, "WEBP", quality=84, method=6, exif=b"")
        print(f"{source_name} -> {output_name} ({image.width}x{image.height})")


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    for source_name, output_name in APPROVED_IMAGES.items():
        optimize(source_name, output_name)


if __name__ == "__main__":
    main()
