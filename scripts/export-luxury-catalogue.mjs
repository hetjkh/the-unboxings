import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import sharp from 'sharp';
const out = path.resolve('artifacts/luxury-catalogue');
await fs.mkdir(out, { recursive: true });
await fs.mkdir('public/luxury-catalogue/previews', { recursive: true });
const chrome = spawn(process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', [
  '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
  '--remote-debugging-port=0', `--user-data-dir=${path.join(out, 'browser-' + Date.now())}`, 'about:blank',
], { windowsHide: true, stdio: ['ignore', 'ignore', 'pipe'] });
let socket;
try {
  const endpoint = await new Promise((resolve, reject) => {
    let output = '';
    const timer = setTimeout(() => reject(new Error('Chrome startup timed out: ' + output.slice(-800))), 20000);
    chrome.on('error', error => { clearTimeout(timer); reject(error); });
    chrome.stderr.on('data', chunk => { output += chunk; const match = output.match(/DevTools listening on (ws:\/\/[^\s]+)/); if (match) { clearTimeout(timer); resolve(match[1]); } });
  });
  socket = new WebSocket(endpoint);
  await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject; });
  const pending = new Map(); let id = 0;
  const browserErrors = [];
  socket.onmessage = ({ data }) => { const r = JSON.parse(data); if(r.method==='Runtime.consoleAPICalled' && r.params.type==='error')browserErrors.push(r.params.args.map(a=>a.value||a.description).join(' '));if(r.method==='Runtime.exceptionThrown')browserErrors.push(r.params.exceptionDetails.text); const p = pending.get(r.id); if (p) { clearTimeout(p.timer); pending.delete(r.id); if (r.error) p.reject(new Error(JSON.stringify(r.error))); else p.resolve(r.result); } };
  const send = (method, params = {}, sessionId) => new Promise((resolve, reject) => { const current = ++id; const timer = setTimeout(() => { pending.delete(current); reject(new Error('Timeout: ' + method)); }, 60000); pending.set(current, { resolve, reject, timer }); socket.send(JSON.stringify({ id: current, method, params, ...(sessionId ? { sessionId } : {}) })); });
  const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
  const command = (method, params) => send(method, params, sessionId);
  const evaluate = async expression => { const r = await command('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true }); if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails)); return r.result.value; };
  await command('Page.enable');
  await command('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1100, deviceScaleFactor: 1, mobile: false });
  await command('Page.navigate', { url: pathToFileURL(path.resolve('public/luxury-catalogue/index.html')).href });
  await evaluate(`(async()=>{if(document.readyState!=='complete')await new Promise(r=>addEventListener('load',r,{once:true}));await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode()));return true})()`);
  const inspect = () => evaluate(`(()=>{const issues=[];for(const sheet of document.querySelectorAll('.sheet')){const bounds=sheet.getBoundingClientRect();const foot=sheet.querySelector('footer').getBoundingClientRect();for(const el of sheet.querySelectorAll('.body h1,.body h2,.body h3,.body p,.body img,.body .contact,.body article')){const r=el.getBoundingClientRect();if(r.bottom>foot.top+2||r.right>bounds.right+2||r.left<bounds.left-2)issues.push({page:sheet.id,element:el.tagName,text:el.textContent.slice(0,60),bottom:r.bottom,limit:foot.top});}}return {pages:document.querySelectorAll('.sheet').length,brokenImages:[...document.images].filter(i=>!i.complete||!i.naturalWidth).length,issues};})()`);
  const screen = await inspect();
  for (let n = 1; n <= 22; n++) {
    const rect = await evaluate(`(()=>{const r=document.querySelector('#page-${n}').getBoundingClientRect();return {x:r.x+scrollX,y:r.y+scrollY,width:r.width,height:r.height,scale:1}})()`);
    const shot = await command('Page.captureScreenshot', { format: 'jpeg', quality: 88, clip: rect, captureBeyondViewport: true });
    await fs.writeFile(`public/luxury-catalogue/previews/page-${String(n).padStart(2,'0')}.jpg`, Buffer.from(shot.data,'base64'));
  }
  await command('Emulation.setEmulatedMedia', { media: 'print' });
  const print = await inspect();
  const pdf = await command('Page.printToPDF', { printBackground: true, preferCSSPageSize: true, displayHeaderFooter: false });
  const buffer = Buffer.from(pdf.data, 'base64');
  const pdfPages = [...buffer.toString('latin1').matchAll(/\/Type\s*\/Page\b/g)].length;
  await command('Emulation.setEmulatedMedia', { media: 'screen' });
  await command('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await evaluate('new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))');
  const mobile = await evaluate('({width:innerWidth,scrollWidth:document.documentElement.scrollWidth})');
  const report = { screen, print, pdfPages, bytes: buffer.length, mobile };
  await fs.writeFile(path.join(out, 'validation.json'), JSON.stringify(report,null,2));
  console.log(JSON.stringify(report,null,2));
  if (screen.issues.length || print.issues.length || screen.brokenImages || pdfPages !== 22 || mobile.width !== 390 || mobile.scrollWidth > mobile.width) throw new Error('Catalogue validation failed; see artifacts/luxury-catalogue/validation.json');
  await fs.writeFile('public/luxury-catalogue/The-Unboxing-Luxury-Experience-2026.pdf', buffer);
  const manifestPath = 'public/luxury-catalogue/manifest.json';
  const manifest = JSON.parse(await fs.readFile(manifestPath,'utf8'));
  await fs.writeFile(manifestPath, JSON.stringify({ ...manifest, bytes: buffer.length },null,2));
  const thumbnails = await Promise.all(Array.from({ length: 22 }, async (_, i) => ({ input: await sharp(`public/luxury-catalogue/previews/page-${String(i+1).padStart(2,'0')}.jpg`).resize(384,240).toBuffer(), left: (i%3)*384, top: Math.floor(i/3)*240 })));
  await sharp({create:{width:1152,height:1920,channels:3,background:'#ded8cb'}}).composite(thumbnails).jpeg().toFile(path.join(out,'all-pages.jpg'));
  if (process.argv.includes('--check-site')) {
    const url = 'http://localhost:3000/catalogue';
    const response = await fetch(url);
    if (!response.ok) throw new Error('Catalogue page HTTP ' + response.status);
    await command('Runtime.enable');
    await command('Page.navigate', { url });
    await evaluate(`(async()=>{if(document.readyState!=='complete')await new Promise(r=>addEventListener('load',r,{once:true}));await document.fonts.ready;localStorage.setItem('tu-cookie-consent','rejected');for(const image of document.images){image.scrollIntoView({behavior:'instant'});await image.decode()}window.scrollTo({top:0,behavior:'instant'});return true})()`);
    const webChecks = [];
    for (const width of [390, 1440]) {
      await command('Emulation.setDeviceMetricsOverride', { width, height: 1000, deviceScaleFactor: 1, mobile: width===390 });
      await evaluate('new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))');
      const check = await evaluate(`({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,brokenImages:[...document.images].filter(i=>!i.naturalWidth).length,downloads:[...document.querySelectorAll('a[download]')].map(a=>a.href),title:document.title})`);
      webChecks.push(check);
      if(check.width!==width||check.scrollWidth>width||check.brokenImages||check.downloads.length!==2)throw new Error('Website layout check failed: '+JSON.stringify(check));
      const screenshot = await command('Page.captureScreenshot',{format:'jpeg',quality:85,captureBeyondViewport:true});
      await fs.writeFile(path.join(out,`website-${width}.jpg`),Buffer.from(screenshot.data,'base64'));
    }
    const download = await fetch('http://localhost:3000/luxury-catalogue/The-Unboxing-Luxury-Experience-2026.pdf');
    const downloaded = Buffer.from(await download.arrayBuffer());
    if(!download.ok||downloaded.subarray(0,5).toString()!=='%PDF-'||downloaded.length!==buffer.length)throw new Error('PDF download validation failed');
    const navigation = await evaluate(`(async()=>{const links=[...document.querySelectorAll('main a:not([download])')].filter(a=>a.pathname.includes('/luxury-catalogue/'));return await Promise.all(links.map(async a=>({href:a.href,status:(await fetch(a.href)).status})))})()`);
    if(navigation.some(r=>r.status!==200))throw new Error('Catalogue preview link failed');
    console.log('Website checks: '+JSON.stringify({webChecks,downloadBytes:downloaded.length,navigation,browserErrors},null,2));
    await fs.writeFile(path.join(out,'website-validation.json'),JSON.stringify({webChecks,downloadBytes:downloaded.length,navigation,browserErrors},null,2));
    if(browserErrors.length)throw new Error('Browser reported errors; see website-validation.json');
  }
  await send('Browser.close');
} finally { socket?.close(); chrome.kill(); }
