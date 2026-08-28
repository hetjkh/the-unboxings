from PIL import Image
from pathlib import Path
import shutil

src_root = Path(r"d:\theunboxing\.tmp-pptx\ppt\media")
out_root = Path(r"d:\theunboxing\public\products\slides")
out_root.mkdir(parents=True, exist_ok=True)


def save(img, path: Path):
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path, optimize=True)


def crop_grid(src_name: str, dest_prefix: str, labels: list[str]):
    img = Image.open(src_root / src_name).convert("RGB")
    w, h = img.size
    cols, rows = 3, 2
    cw, ch = w // cols, h // rows
    for i, label in enumerate(labels):
        r, c = divmod(i, cols)
        box = (c * cw, r * ch, (c + 1) * cw, (r + 1) * ch)
        crop = img.crop(box)
        save(crop, out_root / f"{dest_prefix}-{label}.png")


crop_grid(
    "image30.png",
    "staff-id",
    [
        "premium-portrait-badge",
        "gold-staff-card",
        "vertical-staff-cards",
        "green-led-badge",
        "blue-led-badge",
        "pink-led-badge",
    ],
)
crop_grid(
    "image31.png",
    "staff-id",
    [
        "green-acrylic-keychain",
        "blue-lanyard-badge",
        "green-keychain",
        "green-standing-badge",
        "blue-keyboard-badge",
        "pink-standing-badge",
    ],
)
crop_grid(
    "image32.png",
    "staff-id",
    [
        "stone-lanyard-badge",
        "marble-qr-badges",
        "cord-lanyard-badge",
        "black-lanyard-badge",
        "photo-lanyard-badge",
        "pattern-lanyard-group",
    ],
)
crop_grid(
    "image13.png",
    "kitchen-apron",
    ["black", "white", "navy", "charcoal", "grey", "red"],
)
crop_grid(
    "image33.png",
    "keychain",
    [
        "bottle-opener-duo",
        "teardrop-tag",
        "leather-round-tags",
        "qr-acrylic-key",
        "jersey-tags",
        "leather-loop-set",
    ],
)

copies = {
    "office-essentials/executive-wood-desk-organizer-set.png": "image12.png",
    "packaging/red-exploding-gift-box.png": "image2.png",
    "packaging/wood-lattice-reveal-box.png": "image3.png",
    "packaging/navy-marble-compartment-box.png": "image4.png",
    "packaging/geometric-gemstone-box.png": "image5.png",
    "packaging/wooden-bottle-presentation-box.png": "image6.png",
    "packaging/fountain-pen-gift-box.png": "image1.png",
    "kitchen-apron/premium-cotton-bib-apron.png": "image17.png",
    "kitchen-apron/promotional-bib-apron-front.png": "image14.png",
    "kitchen-apron/heavy-canvas-apron.png": "image21.png",
    "kitchen-apron/denim-barista-apron.png": "image24.png",
    "kitchen-apron/cross-back-canvas-apron.png": "image27.png",
    "luxury-gifts/premium-writing-collection-green.png": "image36.png",
    "luxury-gifts/fountain-pen-leather.png": "image44.png",
    "luxury-gifts/executive-pen-set.png": "image45.png",
    "luxury-gifts/gold-trim-pen.png": "image46.png",
    "luxury-gifts/matte-black-pen.png": "image47.png",
}

for dest, src in copies.items():
    src_path = src_root / src
    dest_path = out_root / dest
    dest_path.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src_path, dest_path)
    print("copied", dest)

print("done")
