import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const out = path.resolve('artifacts/catalogue');
await fs.mkdir(out, { recursive: true });
const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
  '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
  '--remote-debugging-port=0', `--user-data-dir=${path.join(out, 'browser-profile-' + Date.now())}`, 'about:blank',
], { windowsHide: true, stdio: ['ignore', 'ignore', 'pipe'] });
let socket;
try {
  const endpoint = await new Promise((resolve, reject) => {
    let output = '';
    const timer = setTimeout(() => reject(new Error(`Browser startup timed out: ${output.slice(-1000)}`)), 20000);
    chrome.on('error', (error) => { clearTimeout(timer); reject(error); });
    chrome.on('exit', (code) => { clearTimeout(timer); reject(new Error(`Browser exited: ${code}; ${output.slice(-1000)}`)); });
    chrome.stderr.on('data', (chunk) => { output += chunk; const match = output.match(/DevTools listening on (ws:\/\/[^\s]+)/); if (match) { clearTimeout(timer); resolve(match[1]); } });
  });
  socket = new WebSocket(endpoint);
  await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject; });
  let nextId = 0;
  const pending = new Map();
  let onLoad;
  socket.onmessage = ({ data }) => { const result = JSON.parse(data); if(result.method === 'Page.loadEventFired') onLoad?.(); if (result.id && pending.has(result.id)) { const { resolve, reject, timer } = pending.get(result.id); clearTimeout(timer); pending.delete(result.id); if (result.error) reject(new Error(JSON.stringify(result.error))); else resolve(result.result); } };
  const send = (method, params = {}, sessionId) => new Promise((resolve, reject) => {
    const id = ++nextId;
    const timer = setTimeout(() => { pending.delete(id); reject(new Error(`Timed out: ${method}`)); }, 45000);
    pending.set(id, { resolve, reject, timer });
    socket.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
  });
  const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
  const command = (method, params) => send(method, params, sessionId);
  await command('Page.enable');
  await command('Emulation.setDeviceMetricsOverride', { width: 1100, height: 1400, deviceScaleFactor: 1, mobile: false });
  const loaded = new Promise((resolve, reject) => { const timer = setTimeout(() => reject(new Error('Page load timed out')), 45000); onLoad = () => { clearTimeout(timer); resolve(); }; });
  await command('Page.navigate', { url: pathToFileURL(path.resolve('public/catalogue.html')).href });
  await loaded;
  console.log('Catalogue loaded.');
  const evaluate = async (expression) => {
    const result = await command('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
    if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
    return result.result.value;
  };
  await evaluate(`(async()=>{if(document.readyState!=='complete')await new Promise(r=>window.addEventListener('load',r,{once:true}));await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode()));return true;})()`);
  await command('Emulation.setEmulatedMedia', { media: 'print' });
  const layout = await evaluate(`(()=>{const pages=[...document.querySelectorAll('.sheet')];return {pages:pages.length,products:document.querySelectorAll('.product').length,brokenImages:[...document.images].filter(i=>!i.complete||!i.naturalWidth).length,layout:pages.map(p=>{const footer=p.querySelector('.folio').getBoundingClientRect();const occasion=p.querySelector('.occasion');const limit=occasion?occasion.getBoundingClientRect().top:footer.top;const blocks=[...p.children].filter(e=>!e.matches('.folio,.occasion'));return {page:p.id,overflow:blocks.filter(e=>e.getBoundingClientRect().bottom>limit-4).map(e=>({class:e.className,bottom:Math.round(e.getBoundingClientRect().bottom-p.getBoundingClientRect().top),limit:Math.round(limit-p.getBoundingClientRect().top)}))};})};})()`);
  console.log(JSON.stringify(layout, null, 2));
  const overlaps = await evaluate(`(()=>{const issues=[];for(const page of document.querySelectorAll('.sheet')){const elements=[...page.querySelectorAll('h1,h2,h3,p,.product-meta,.product-photo,.kicker,.editorial-quote,.product-link,.folio,.running')];for(let a=0;a<elements.length;a++){const first=elements[a];const r=first.getBoundingClientRect();for(let b=a+1;b<elements.length;b++){const second=elements[b];if(first.contains(second)||second.contains(first))continue;const s=second.getBoundingClientRect();if(Math.min(r.right,s.right)-Math.max(r.left,s.left)>2&&Math.min(r.bottom,s.bottom)-Math.max(r.top,s.top)>2)issues.push({page:page.id,first:first.className||first.tagName,second:second.className||second.tagName});}}}return issues;})()`);
  const imageSources = await evaluate(`({count:document.querySelectorAll('img[data-source]').length,allBlob:[...document.querySelectorAll('img[data-source]')].every(i=>new URL(i.dataset.source).hostname.endsWith('.public.blob.vercel-storage.com')),allWhite:[...document.querySelectorAll('.sheet,.product-photo')].every(e=>getComputedStyle(e).backgroundColor==='rgb(255, 255, 255)')})`);
  console.log('Overlaps: ' + JSON.stringify(overlaps));
  console.log('Image sources and backgrounds: ' + JSON.stringify(imageSources));
  const pdf = await command('Page.printToPDF', { printBackground: true, preferCSSPageSize: true, displayHeaderFooter: false });
  const pdfBuffer = Buffer.from(pdf.data, 'base64');
  await fs.writeFile(path.join(out, 'catalogue-print-check.pdf'), pdfBuffer);
  const pdfPages = [...pdfBuffer.toString('latin1').matchAll(/\/Type\s*\/Page\b/g)].length;
  console.log(`Printed PDF pages: ${pdfPages}`);
  await command('Emulation.setEmulatedMedia', { media: 'screen' });
  for (const page of Array.from({length:12},(_,index)=>index+1)) {
    const rect = await evaluate(`(()=>{const r=document.getElementById('page-${page}').getBoundingClientRect();return {x:r.x+scrollX,y:r.y+scrollY,width:r.width,height:r.height,scale:1};})()`);
    const screenshot = await command('Page.captureScreenshot', { format: 'jpeg', quality: 85, clip: rect, captureBeyondViewport: true });
    await fs.writeFile(path.join(out, `page-${page}.jpg`), Buffer.from(screenshot.data, 'base64'));
  }
  await command('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await evaluate('new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))');
  const mobile = await evaluate(`({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,pageWidth:Math.round(document.querySelector('.sheet').getBoundingClientRect().width)})`);
  console.log('Mobile: ' + JSON.stringify(mobile));
  const printClicked = await evaluate(`(async()=>{window.__printed=false;window.print=()=>window.__printed=true;document.getElementById('print-button').click();await new Promise(r=>setTimeout(r,300));return {printed:window.__printed,buttonEnabled:!document.getElementById('print-button').disabled};})()`);
  console.log('Print button: ' + JSON.stringify(printClicked));
  await fs.writeFile(path.join(out, 'validation.json'), JSON.stringify({ ...layout, overlaps, imageSources, pdfPages, mobile, printClicked }, null, 2));
  if (pdfPages !== 12 || layout.brokenImages || overlaps.length || !imageSources.allBlob || !imageSources.allWhite || layout.layout.some(p => p.overflow.length) || mobile.width !== 390 || mobile.scrollWidth > mobile.width || !printClicked.printed || !printClicked.buttonEnabled) process.exitCode = 1;
  await send('Browser.close');
} finally {
  socket?.close();
  chrome.kill();
}
