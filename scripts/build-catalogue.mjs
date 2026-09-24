import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import QRCode from 'qrcode';
import { blobImage } from './catalogue-source.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const snapshot = JSON.parse(await fs.readFile(path.join(root, 'data/catalogue-products.json'), 'utf8'));
const site = 'https://theunboxing.ae';
const escape = (value) => String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const products = new Map(snapshot.products.map((p) => [p.name.toLowerCase(), p]));
const images = new Map();
const used = new Map();
const categories = {
  'tech-electronics': 'Tech & electronics', 'office-essentials': 'Office essentials',
  'executive-gifts': 'Executive gifts', 'luxury-writing': 'Luxury writing', drinkware: 'Drinkware',
  'eco-collection': 'Eco collection', 'health-wellness': 'Health & wellness',
  'apparel-uniforms': 'Apparel & uniforms', aprons: 'Aprons', 'staff-id': 'Staff ID', keychains: 'Keychains',
  'awards-recognition': 'Awards & recognition', 'luxury-gifts': 'Luxury gifts',
  'travel-collection': 'Travel collection', 'packaging-solutions': 'Packaging solutions',
};
function product(name) {
  const record = products.get(name.toLowerCase());
  if (!record) throw new Error(`Missing live product: ${name}`);
  used.set(record.id, record);
  return record;
}
async function imageFor(record) {
  if (!images.has(record.image)) images.set(record.image, blobImage(record.image).then(buffer => `data:image/webp;base64,${buffer.toString('base64')}`));
  return images.get(record.image);
}
async function photo(name) {
  const record = product(name);
  return `<a class="product-photo" href="${site}/products/${escape(record.category)}" aria-label="Explore ${escape(record.name)}"><img src="${await imageFor(record)}" data-source="${escape(record.image)}" alt="${escape(record.name)}" decoding="sync"></a>`;
}
async function item(name, caption, reference, extraClass = '') {
  const record = product(name);
  return `<article class="product ${extraClass}">${await photo(name)}<div class="product-copy"><div class="product-meta"><span>${escape(categories[record.category] ?? 'Events & activations')}</span><span>${escape(reference)}</span></div><h3>${escape(record.name)}</h3><p>${escape(caption)}</p><a class="product-link" href="${site}/products/${escape(record.category)}">Explore collection ↗</a></div></article>`;
}
const logoData = `data:image/svg+xml;base64,${(await fs.readFile(path.join(root, 'public/The-Unboxing.svg'))).toString('base64')}`;
const logo = `<img class="logo" src="${logoData}" alt="The Unboxing">`;
const pages = [];
const pageLabels = [];
function page(number, label, body, className = '', runningLabel = 'The selected collections') {
  pageLabels.push(label);
  pages.push(`<div class="page-shell"><section class="sheet ${className}" id="page-${number}" aria-label="Page ${number}: ${escape(label)}"><div class="running">${logo}<span>${escape(runningLabel)}</span></div><div class="page-body">${body}</div><footer class="folio"><span>The Unboxing</span><span>${escape(label)}</span><span>${String(number).padStart(2, '0')} / 12</span></footer></section></div>`);
}
function heading(kicker, title, description = '') {
  return `<header class="page-heading"><span class="kicker">${escape(kicker)}</span><h2>${title}</h2>${description ? `<p>${escape(description)}</p>` : ''}</header>`;
}

page(1, 'The art of giving', `
  <div class="cover-heading"><span class="kicker">Corporate gifts · Branded merchandise · Experiences</span><h1>Make it<em>memorable.</em></h1></div>
  <div class="cover-art"><span class="cover-aside">Considered objects. Lasting impressions.</span>${await photo('The Architectural Chess Set')}</div>
  <div class="cover-bottom"><p>A collection of thoughtful gifts,<br>designed around your brand.</p><p class="cover-caption"><b>The Architectural Chess Set</b>Marble, brushed brass and a different perspective.</p></div>
`, 'cover', 'Product catalogue / Selected edition');

page(2, 'Events & experiences', `
  ${heading('01 / Beyond the object', 'The gift is only<br><em>the beginning.</em>')}
  <div class="composition events-composition">
    <div class="event-story"><div class="event-intro"><p class="editorial-quote">We start with<br>your story.</p><p>From corporate gifts to experiences people take part in, The Unboxing brings together concept, design, customization and presentation.</p><p style="margin-top:5mm">Create a moment that feels personal. Give people a story to take home.</p></div>${await item('Gift Selection Bar', 'A curated gifting experience where guests choose the products that speak to them.', '02.01')}</div>
    <div class="supporting">${await item('Live Personalization Counter', 'On-the-spot engraving and personalization turn a gift into their gift.', '02.02')}${await item('Fragrance Bar', 'A sensory encounter with curated fragrances and personalized selections.', '02.03')}</div>
  </div>
`, 'events');

page(3, 'Executive gifts & writing', `
  ${heading('02 / Executive gifts & luxury writing', 'For the people<br><em>who move you forward.</em>')}
  <div class="composition spotlight">
    ${await item('The Boardroom Box', 'A notebook, signature pen, card holder and presentation accessories, brought together for the room where decisions happen.', '03.01', 'feature')}
    <div class="supporting">${await item('Fountain Pen and Ink Presentation', 'A fountain pen, ink and plaque in a gatefold box. Writing, made ceremonial.', '03.02')}${await item('Leather Journal Gift Set', 'A taupe leather journal, matching pen and gold tassel. Quietly considered.', '03.03')}</div>
  </div>
`);

page(4, 'Tech & office essentials', `
  ${heading('03 / Tech & office essentials', 'A better way<br><em>to work.</em>', 'Useful technology. Considered desk objects. A place for every idea.')}
  <div class="composition gallery"><div class="gallery-products">
    ${await item('Wireless Charging Valet Tray', 'Leather organization meets wireless charging for a phone, watch and everyday essentials.', '04.01')}
    ${await item('The Focus Light', 'A rechargeable desk light with touch controls and adjustable brightness.', '04.02')}
    ${await item('The Meeting Companion', 'Notebook, magnetic pen, phone stand and card holder, together in one desk system.', '04.03')}
  </div><div class="editorial-note"><span class="editorial-quote">Everything<br>in its place.</span><p>Build a welcome collection around the objects your people reach for every day.</p></div></div>
`);

page(5, 'Drinkware', `
  ${heading('04 / Drinkware', 'Good design.<br><em>On repeat.</em>', 'The everyday ritual is an opportunity to make your brand part of the day.')}
  <div class="composition portrait">
    ${await item('The Monolith', 'An insulated bottle with bold geometry and a matte finish. A functional object with a sculptural presence.', '05.01')}
    <div class="portrait-side">${await item('The Nomad', 'A leather-sleeved travel flask with carrying loop and concealed tea infuser.', '05.02')}${await item('The Morning Set', 'A travel tumbler, reusable filter and selected coffee for a considered morning ritual.', '05.03')}</div>
  </div>
`);

page(6, 'Eco & wellness', `
  ${heading('05 / Eco collection & health and wellness', 'A thoughtful start.<br><em>A little more balance.</em>')}
  <div class="composition spotlight reverse">
    ${await item('The Eco Welcome Box', 'A recycled notebook, reusable bottle, tech pouch and plantable welcome card. An onboarding collection with a considered material story.', '06.01', 'feature')}
    <div class="supporting">${await item('Active Lifestyle Kit', 'Bottle, towel, cap, tee and accessories in an energising black-and-lime edit.', '06.02')}${await item('Branded Yoga Mat Duo', 'Rolled yoga mats in forest green and charcoal, with discreet branding.', '06.03')}</div>
  </div>
`);

page(7, 'Apparel & aprons', `
  ${heading('06 / Apparel, uniforms & aprons', 'Your people.<br><em>Your presence.</em>', 'A shared identity, expressed in the details your team wears every day.')}
  <div class="composition fashion">
    ${await item('Hospitality Collection', 'Coordinated front-of-house and service uniforms for hotels, dining and guest teams.', '07.01')}
    <div class="product"><p class="editorial-quote">Made to represent.</p>${await photo('Denim Barista Apron')}<div class="product-copy"><div class="product-meta"><span>Aprons</span><span>07.02</span></div><h3>Denim Barista Apron</h3><p>Adjustable cross-back straps, brass-tone hardware and functional pockets, with customizable branding for cafés and hospitality teams.</p><a class="product-link" href="${site}/products/aprons">Explore collection ↗</a></div></div>
  </div>
`);

page(8, 'Staff ID & keychains', `
  ${heading('07 / Staff ID & keychains', 'Identity is<br><em>in the details.</em>')}
  <div class="composition portrait identity">
    ${await item('Premium Portrait Staff Badge', 'Gold trim, a premium lanyard and considered brand detailing for the people who make the first impression.', '08.01')}
    <div class="portrait-side">${await item('Leather Loop Keychain Set', 'Black leather loops, metal hardware and gold brand plaques.', '08.02')}${await item('Round Metal Logo Keychains', 'Brushed silver key tags with logo engraving and braided cord attachments.', '08.03')}</div>
  </div>
`);

page(9, 'Awards & luxury gifts', `
  ${heading('08 / Awards, recognition & luxury gifts', 'Give achievement<br><em>a form.</em>')}
  <div class="composition spotlight">
    ${await item('The Orbit', 'Natural wood and polished gold in sculptural balance. A recognition piece that speaks of possibility, momentum and growth.', '09.01', 'feature')}
    <div class="supporting">${await item('The Edge-Lit Falcon', 'Engraved acrylic and concealed lighting bring an abstract falcon into focus.', '09.02')}${await item('The Architectural Bakhoor Sculpture', 'A fragrance ritual reimagined in a contemporary architectural form.', '09.03')}</div>
  </div>
`);

page(10, 'Travel collection', `
  ${heading('09 / Travel collection', 'Go further.<br><em>Carry your story.</em>', 'Considered companions for the next departure, arrival and everything between.')}
  <div class="composition portrait">
    ${await item('Voyager Weekender Duffel', 'A leather overnight bag with trolley sleeve, document pocket and organized interior. Ready for the next journey.', '10.01')}
    <div class="portrait-side">${await item('Leather Passport Wallet', 'A slim black passport and card wallet with gold corner detail and branding.', '10.02')}${await item('The Long-Haul Box', 'Pillow, blanket, bottle, power bank, eye mask and pouch, presented as one journey kit.', '10.03')}</div>
  </div>
`);

page(11, 'Packaging solutions', `
  ${heading('10 / Packaging solutions', 'Build anticipation.<br><em>Reveal something special.</em>')}
  <div class="composition spotlight packaging">
    ${await item('Kinetic Gear Reveal Box', 'Doors open. Gears move. The product is revealed. A mechanical opening sequence that makes the packaging part of the experience.', '11.01', 'feature')}
    <div class="supporting">${await item('Illuminated Museum Display Box', 'A lit showcase that turns a single object into an exhibit.', '11.02')}${await item('Wood Lattice Reveal Box', 'A laser-cut lattice lid and suede-lined compartments in dark wood.', '11.03')}</div>
  </div>
`);

const qr = await QRCode.toDataURL(`${site}/request-a-quote`, { width: 320, margin: 1, color: { dark: '#181818ff', light: '#ffffffff' } });
page(12, 'Let’s create together', `
  ${heading('Your next unboxing starts here', 'Your story.<br><em>Our next creation.</em>', 'Tell us who it’s for, what the occasion means and how you want people to feel. We’ll build the experience around it.')}
  <div class="brief"><div><span>01 / THE PEOPLE</span><h3>Who is it for?</h3><p>New team members, valued clients or the people celebrating a milestone.</p></div><div><span>02 / THE IDEA</span><h3>What stays with them?</h3><p>Your preferred pieces, the brand story and the opening experience.</p></div><div><span>03 / THE DETAILS</span><h3>Let’s make it happen.</h3><p>Share your quantity, budget, delivery location and target date.</p></div></div>
  <div class="contact-details"><div class="contact-links"><a class="email" href="mailto:hello@theunboxing.ae">hello@theunboxing.ae</a><a href="tel:+971506023071">+971 50 602 3071</a><a href="https://wa.me/971506023071">Start a conversation on WhatsApp ↗</a><a href="${site}">theunboxing.ae</a><span class="location">United Arab Emirates</span></div><a class="qr-link" href="${site}/request-a-quote"><img src="${qr}" alt="Scan to request a quote from The Unboxing"><span>Let’s start your project</span></a></div>
  <div class="closing-brand">${logo}<p class="fineprint">A curated selection from The Unboxing. Contact us to confirm pricing, specifications, customization, availability and delivery for your project. The small reference numbers identify pieces within this catalogue.</p></div>
`, 'contact', 'Begin a conversation');

if (pages.length !== 12) throw new Error('Expected exactly 12 catalogue pages.');
const fonts = await Promise.all(['Book', 'Light', 'Medium'].map(async (weight) => (await fs.readFile(path.join(root, `public/fonts/GucciSansPro-${weight}.woff2`))).toString('base64')));
const fontCSS = fonts.map((font, i) => `@font-face{font-family:Catalogue;src:url(data:font/woff2;base64,${font}) format('woff2');font-weight:${[400, 300, 500][i]};font-display:block}`).join('\n');
const css = await fs.readFile(path.join(root, 'scripts/catalogue.css'), 'utf8');
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="The Unboxing: an editorial collection of corporate gifts, branded merchandise and experiences. 12 pages, ready to save as PDF."><title>The Unboxing — The Art of Giving</title><style>${fontCSS}\n${css}</style></head><body>
<header class="toolbar"><div><strong>The Unboxing / The Art of Giving</strong><p>12 pages · ${used.size} selected products & experiences · A4 portrait</p></div><div class="toolbar-controls"><label for="page-picker">Jump to catalogue page</label><select id="page-picker">${pageLabels.map((label, i) => `<option value="${i + 1}">${String(i + 1).padStart(2, '0')} — ${escape(label)}</option>`).join('')}</select><button type="button" id="print-button">Save as PDF / Print</button></div></header>
<p class="print-tip" id="print-status" role="status">To export: Save as PDF · A4 portrait · 100% scale · No margins · Background graphics on · Headers and footers off</p>
<main class="pages">${pages.join('\n')}</main>
<script>
function fitPages(){const width=document.documentElement.clientWidth;const space=width-(width<=600?20:32);document.documentElement.style.setProperty('--scale',Math.min(1,space/(210*96/25.4)));}
fitPages();window.addEventListener('resize',fitPages);
document.getElementById('page-picker').addEventListener('change',function(){document.getElementById('page-'+this.value).scrollIntoView({behavior:'smooth',block:'start'});});
document.getElementById('print-button').addEventListener('click',async function(){this.disabled=true;this.textContent='Preparing pages…';try{await document.fonts.ready;await Promise.all([...document.images].map(img=>img.decode()));window.print();}catch{document.getElementById('print-status').textContent='An image could not load. Please reopen the catalogue before exporting.';}finally{this.disabled=false;this.textContent='Save as PDF / Print';}});
</script></body></html>`;
await fs.writeFile(path.join(root, 'public/catalogue.html'), html, 'utf8');
console.log(`Created 12 editorial pages, ${used.size} products and experiences, ${new Set([...used.values()].map(p => p.category)).size} categories. All ${images.size} product images sourced from Vercel Blob. ${(Buffer.byteLength(html) / 1024 / 1024).toFixed(1)} MB.`);
