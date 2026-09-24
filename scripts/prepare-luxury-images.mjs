import fs from 'node:fs/promises';
import sharp from 'sharp';
const root = 'artifacts/luxury-source/';
const slides = JSON.parse((await fs.readFile(root + 'slides.json', 'utf8')).replace(/^\uFEFF/, ''));
const tiles = [];
let i = 0;
await fs.mkdir('public/luxury-catalogue/images', { recursive: true });
for (const slide of slides) {
  console.log(slide.number, slide.images.map(p => p.file).join(', '));
  for (const p of slide.images) {
    const source = root + p.file;
    const thumb = await sharp(source).resize(190, 125, { fit: 'contain', background: '#f4f1eb' }).flatten({ background: '#f4f1eb' }).png().toBuffer();
    const label = Buffer.from(`<svg width="190" height="25"><rect width="190" height="25" fill="white"/><text x="5" y="17" font-size="12">${slide.number} / ${p.file}</text></svg>`);
    tiles.push({ input: thumb, left: (i % 6) * 190, top: Math.floor(i / 6) * 150 });
    tiles.push({ input: label, left: (i % 6) * 190, top: Math.floor(i / 6) * 150 + 125 });
    await sharp(source).rotate().resize({ width: 1600, height: 1400, fit: 'inside', withoutEnlargement: true }).flatten({ background: '#f5f1e8' }).jpeg({ quality: 87, mozjpeg: true }).toFile(`public/luxury-catalogue/images/${p.file.replace(/\.[^.]+$/, '.jpg')}`);
    i++;
  }
}
await sharp({ create: { width: 1140, height: Math.ceil(i / 6) * 150, channels: 3, background: 'white' } }).composite(tiles).jpeg().toFile(root + 'contact-sheet.jpg');
