import fs from 'node:fs/promises';
import { pages, chapters } from './luxury-content.mjs';
const out = 'public/luxury-catalogue';
await fs.mkdir(out, { recursive: true });
const esc = (s = '') => s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const lines = s => esc(s).replaceAll('\n','<br>');
const photo = (n, alt, cls = '') => `<img class="${cls}" src="images/image${n}.jpg" alt="${esc(alt)}">`;
const header = () => '<header><a class="wordmark" href="https://www.theunboxing.ae">THE UNBOXING<span>GIFTING, CONSIDERED.</span></a><span class="edition">THE COLLECTION / 2026</span></header>';
const heading = p => `<div class="heading"><p class="eyebrow">${esc(p.kicker)}</p><h2>${lines(p.title)}</h2>${p.copy ? `<p class="intro">${esc(p.copy)}</p>` : ''}</div>`;
const notes = p => `${p.note ? `<p class="note">${lines(p.note)}</p>` : ''}${p.tags ? `<p class="tags">${lines(p.tags)}</p>` : ''}`;
const cards = (p, cls) => `<div class="${cls}">${p.items.map(([title,copy],i)=>`<article>${photo(p.images[i],title)}<div class="card-label"><span>${String(i+1).padStart(2,'0')}</span><div><h3>${esc(title)}</h3>${copy ? `<p>${esc(copy)}</p>` : ''}</div></div></article>`).join('')}</div>`;
function body(p) {
  switch(p.type) {
    case 'cover': return `<div class="cover-copy"><p class="eyebrow">${esc(p.kicker)}</p><h1>Not just given.<br><em>Remembered.</em></h1><p class="cover-sub">${esc(p.copy)}</p><p class="note">${lines(p.note)}</p><div class="cover-bottom">UAE-BASED<span>WORLDWIDE DELIVERY</span></div></div><div class="cover-photo">${photo(2,'A bespoke illuminated presentation box')}<span class="vertical">THE ART OF A LASTING IMPRESSION</span></div>`;
    case 'split': return `<div class="split-copy">${heading(p)}${notes(p)}</div><div class="split-photo">${photo(p.images[0],p.title.replaceAll('\n',' '))}</div>`;
    case 'approach': return `${heading(p)}<div class="approach-steps">${p.items.map(([t,c],i)=>`<article><span class="large-number">0${i+1}</span><h3>${t}</h3><p>${c}</p></article>`).join('')}</div><p class="approach-signature">One idea. <em>Considered in every detail.</em></p>`;
    case 'solutions': case 'recognition': case 'materials': case 'projects': case 'process': return `${heading(p)}${cards(p,'cards '+p.type+'-grid')}`;
    case 'panorama': return `<div class="panorama-photo">${photo(p.images[0],p.title.replaceAll('\n',' '))}</div><div class="panorama-copy">${heading(p)}${notes(p)}</div>`;
    case 'craft': return `<div class="craft-copy">${heading(p)}<p class="eyebrow craft-label">From sketch to object</p><p class="note">${esc(p.note)}</p></div><div class="craft-photos">${photo(14,'Architectural crystal concept and sketch')}${photo(15,'Personalised engraving and metalwork')}</div>`;
    case 'brief': return `${heading(p)}<div class="brief-grid">${p.items.map(([t,c],i)=>`<article><span>0${i+1}</span><h3>${t}</h3><p>${c}</p></article>`).join('')}</div><div class="brief-bottom"><p>${esc(p.note)}</p><a href="https://www.theunboxing.ae/request-a-quote">START YOUR BRIEF ↗</a></div>`;
    case 'closing': return `<div class="closing-copy"><p class="eyebrow">${esc(p.kicker)}</p><h2>${lines(p.title)}</h2><div class="contact"><a href="mailto:hello@theunboxing.ae">hello@theunboxing.ae</a><a href="tel:+971506023071">+971 50 602 3071</a><a href="https://www.theunboxing.ae">www.theunboxing.ae</a></div><p class="tags">UAE-based · Worldwide delivery</p></div><div class="closing-photo">${photo(37,'A silver chess king in a bespoke presentation case')}</div>`;
  }
}
const css = await fs.readFile('scripts/luxury-catalogue.css','utf8');
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>The Unboxing — Luxury Experience Catalogue 2026</title><meta name="description" content="Discover 22 pages of considered corporate gifting, bespoke experiences and craftsmanship."><style>${css}</style></head><body><nav class="toolbar" aria-label="Catalogue controls"><a href="/catalogue">← Catalogue</a><label for="chapter">Explore the collection</label><select id="chapter"><option value="1">The collection / 2026</option>${chapters.map(c=>`<option value="${c.page}">${c.title}</option>`).join('')}</select><a class="download" href="The-Unboxing-Luxury-Experience-2026.pdf" download>Download PDF ↓</a></nav><main>${pages.map((p,i)=>`<div class="page-wrap"><section id="page-${i+1}" class="sheet ${p.type}${p.reverse?' reverse':''}" aria-label="Page ${i+1}: ${esc(p.kicker)}">${header()}<div class="body">${body(p)}</div><footer><span>THE UNBOXING</span><span>${i===0||i===21?'UAE-BASED · WORLDWIDE DELIVERY':esc(p.kicker)}</span><span>${String(i+1).padStart(2,'0')} / 22</span></footer></section></div>`).join('')}</main><script>function resize(){document.documentElement.style.setProperty('--scale',Math.min(1,(document.documentElement.clientWidth-32)/1280))}resize();addEventListener('resize',resize);document.querySelector('#chapter').addEventListener('change',e=>document.querySelector('#page-'+e.target.value).scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'}));</script></body></html>`;
await fs.writeFile(`${out}/index.html`,html);
await fs.writeFile(`${out}/manifest.json`,JSON.stringify({ title: 'Luxury Experience Catalogue', year: 2026, pages: pages.length, chapters },null,2));
console.log(`Built ${pages.length}-page luxury catalogue.`);
