from PIL import Image
from pathlib import Path
import shutil

src_root = Path(r"d:\theunboxing\.tmp-pptx\ppt\media")
out_root = Path(r"d:\theunboxing\public\products\slides")
out_root.mkdir(parents=True, exist_ok=True)


def save(img, path: Path):
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path, optimize=True)


def trim_padding(img: Image.Image, padding: int = 12) -> Image.Image:
    w, h = img.size
    if w <= padding * 2 or h <= padding * 2:
        return img
    return img.crop((padding, padding, w - padding, h - padding))


def crop_grid(src_name: str, dest_prefix: str, labels: list[str], padding: int = 12):
    img = Image.open(src_root / src_name).convert("RGB")
    w, h = img.size
    cols, rows = 3, 2
    cw, ch = w // cols, h // rows
    for i, label in enumerate(labels):
        r, c = divmod(i, cols)
        box = (c * cw, r * ch, (c + 1) * cw, (r + 1) * ch)
        crop = trim_padding(img.crop(box), padding)
        save(crop, out_root / f"{dest_prefix}-{label}.png")


def crop_keychain_grid(src_name: str, dest_prefix: str, labels: list[str], padding: int = 12):
    """Keychain composite uses 4 panels on top row and 2 on bottom row."""
    img = Image.open(src_root / src_name).convert("RGB")
    w, h = img.size
    top_h = h // 2
    top_w = w // 4
    boxes = [
        (0, 0, top_w, top_h),
        (top_w, 0, top_w * 2, top_h),
        (top_w * 2, 0, top_w * 3, top_h),
        (top_w * 3, 0, w, top_h),
        (0, top_h, w // 2, h),
        (w // 2, top_h, w, h),
    ]
    for label, box in zip(labels, boxes):
        crop = trim_padding(img.crop(box), padding)
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
crop_keychain_grid(
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
    padding=16,
)


def crop_picture1_keychains():
    """High-res keychain grid from slide 9 (image34 / Picture1)."""
    keychains_root = out_root / "keychains"
    keychains_root.mkdir(parents=True, exist_ok=True)
    img = Image.open(src_root / "image34.png").convert("RGB")
    w, h = img.size
    cw, ch = w // 3, h // 2
    labels = [
        "qr-pillar-keychains",
        "social-icon-keychains",
        "leather-strip-keychains",
        "leather-loop-grip-keychains",
        "leather-pillar-keychains",
        "circular-logo-keychains",
    ]
    for i, label in enumerate(labels):
        r, c = divmod(i, 3)
        box = (c * cw, r * ch, (c + 1) * cw, (r + 1) * ch)
        save(trim_padding(img.crop(box), 16), keychains_root / f"{label}.png")


def crop_picture2_keychains():
    """High-res acrylic / ID keychain grid from slide 9 (image35 / Picture2)."""
    keychains_root = out_root / "keychains"
    keychains_root.mkdir(parents=True, exist_ok=True)
    img = Image.open(src_root / "image35.png").convert("RGB")
    w, h = img.size
    top_h, top_w = h // 2, w // 3
    top_boxes = {
        "cube-acrylic-keychains": (0, 0, top_w, top_h),
        "qr-acrylic-bar-keychains": (top_w, 0, top_w * 2, top_h),
        "signal-cube-acrylic-keychains": (top_w * 2, 0, w, top_h),
    }
    for label, box in top_boxes.items():
        save(trim_padding(img.crop(box), 16), keychains_root / f"{label}.png")

    # Bottom row uses uneven panels — manual boxes avoid bleed between products.
    bottom_boxes = {
        "instagram-icon-keychains": (16, 520, 488, 1008),
        "gradient-qr-id-tags": (680, 520, 1090, 1008),
        "round-metal-keychains": (1340, 560, 1515, 790),
    }
    for label, box in bottom_boxes.items():
        save(img.crop(box), keychains_root / f"{label}.png")


crop_picture1_keychains()
crop_picture2_keychains()

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
    "luxury-gifts/charcoal-executive-pen-duo.png": "image37.png",
    "luxury-gifts/burgundy-fountain-pen.png": "image38.png",
    "luxury-gifts/black-gold-fluted-fountain-pen.png": "image39.png",
    "luxury-gifts/heritage-fountain-pen.png": "image40.png",
    "luxury-gifts/notebook-fountain-pen.png": "image41.png",
    "luxury-gifts/velvet-fountain-pen.png": "image42.png",
    "luxury-gifts/carbon-fibre-fountain-pen.png": "image43.png",
}

for dest, src in copies.items():
    src_path = src_root / src
    dest_path = out_root / dest
    dest_path.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src_path, dest_path)
    print("copied", dest)

print("done")
