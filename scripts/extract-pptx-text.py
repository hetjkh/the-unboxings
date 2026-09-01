import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

ns = {"a": "http://schemas.openxmlformats.org/drawingml/2006/main"}
root = Path("d:/theunboxing/.tmp-pptx-sept/ppt/slides")
out = Path("d:/theunboxing/.tmp-pptx-sept-text.txt")

lines: list[str] = []
for slide in sorted(root.glob("slide*.xml"), key=lambda p: int(re.search(r"slide(\d+)", p.name).group(1))):
    tree = ET.parse(slide)
    texts = []
    for node in tree.findall(".//a:t", ns):
        if node.text and node.text.strip():
            texts.append(node.text.strip())
    lines.append(f"=== SLIDE {slide.stem.replace('slide', '')} ===")
    lines.extend(texts)
    lines.append("")

out.write_text("\n".join(lines), encoding="utf-8")
print(f"Wrote {out}")
