// Render canonical component markup with the same local Plex fonts as the site.
import {chromium} from 'playwright';
import {serve} from '../tests/server.mjs';
import {catalog} from '../source/catalog.mjs';
const site=await serve(new URL('../dist',import.meta.url).pathname);
const browser=await chromium.launch();
try {
 const page=await browser.newPage({viewport:{width:1200,height:650},deviceScaleFactor:1});
 await page.goto(site.base);
 const panel=(lang,theme)=>`<section class="panel" lang="${lang}" dir="${lang==='ar'?'rtl':'ltr'}" data-theme="${theme}"><h2>${lang==='ar'?'العربية · داكن':'English · Light'}</h2>${['TextField','Checkbox','Button','StatusBadge'].map(name=>`<div class="sample">${catalog.find(c=>c.name===name).example(lang).html.replaceAll('id="','id="'+lang+'-').replaceAll('for="','for="'+lang+'-').replaceAll('aria-describedby="','aria-describedby="'+lang+'-')}</div>`).join('')}</section>`;
 await page.setContent(`<!doctype html><html lang="en"><head><meta charset="utf-8"><link rel="stylesheet" href="${site.base}/assets/fonts.css"><link rel="stylesheet" href="${site.base}/assets/tokens.css"><link rel="stylesheet" href="${site.base}/assets/core/styles.css"><style>*{box-sizing:border-box}body{margin:0;background:#f8f8f8;color:#182643;font:400 16px/1.5 var(--font-sans)}#preview{padding:36px 44px;width:1200px;height:650px}header{display:flex;align-items:center;gap:18px;margin-bottom:24px}header img{width:56px;height:56px}h1{font-size:36px;line-height:1.1;margin:0 0 6px;font-weight:600}header p{margin:0;color:#43536d}.grid{display:grid;grid-template-columns:1fr 1fr;gap:24px}.panel{padding:24px 28px;background:var(--surface);color:var(--ink);border:1px solid var(--border);border-radius:12px}.panel[lang=ar]{font-family:var(--font-ar-text)}h2{font-size:16px;font-weight:600;margin:0 0 20px;color:var(--ink-muted)}.sample{margin-top:18px}#en-result,#ar-result{margin:0}footer{margin-top:22px;font-size:14px;color:#43536d}</style></head><body><div id="preview"><header><img src="${site.base}/assets/logos/cave-symbol-color.svg" alt=""><div><h1>Cave UI</h1><p>Shared foundations. Two languages. One system.</p></div></header><div class="grid">${panel('en','light')}${panel('ar','dark')}</div><footer>IBM Plex Sans + IBM Plex Sans Arabic · Web component specimens · design.cave.technology</footer></div></body></html>`);
 await page.evaluate(()=>document.fonts.ready);
 await page.locator('#preview').screenshot({path:new URL('../docs/readme-assets/components.png',import.meta.url).pathname});
 console.log('Rendered bilingual README component specimens from canonical source.');
} finally {await browser.close();site.server.close();}
