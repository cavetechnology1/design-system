import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {chromium,firefox,webkit} from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import {serve} from './server.mjs';
const site=await serve(new URL('../dist',import.meta.url).pathname);
await mkdir(new URL('../.artifacts/navigation/',import.meta.url),{recursive:true});
const results=[];
try {
 for(const engine of (process.env.CAVE_BROWSERS||'chromium,firefox,webkit').split(',')) {
  const browser=await ({chromium,firefox,webkit}[engine]).launch();
  try {
   const context=await browser.newContext();
   const page=await context.newPage();
   const errors=[];page.on('pageerror',error=>errors.push(error.message));
   page.on('requestfailed',request=>{if(!/ERR_ABORTED|NS_BINDING_ABORTED|cancelled|canceled/i.test(request.failure()?.errorText||''))errors.push({url:request.url(),error:request.failure()?.errorText});});
   page.on('response',response=>{if(response.status()>=400)errors.push({url:response.url(),status:response.status()});});
   for(const lang of ['en','ar'])for(const width of [320,390,768,1024,1025,1440])for(const theme of ['light','dark']) {
    await page.setViewportSize({width,height:900});
    await page.goto(`${site.base}/${lang==='ar'?'ar/':''}components/button`);
    await page.locator('html[data-ready="true"]').waitFor();
    const compact=width<=1024,button=page.locator('#menu-btn');
    assert.equal(await button.isVisible(),compact);
    if(compact) {
     assert.equal(await page.locator('#side').isVisible(),false);
     assert.equal(await page.locator('.top').evaluate(el=>el.offsetHeight),65);
     await button.focus();await page.keyboard.press('Enter');
     assert.equal(await button.getAttribute('aria-expanded'),'true');
     await page.keyboard.press('Tab');assert.equal(await page.locator('#platform-select').evaluate(el=>el===document.activeElement),true);
    }
    await page.locator('#theme-select').selectOption(theme);
    if(compact)assert.match(await page.locator('#side').evaluate(el=>getComputedStyle(el).backgroundColor),/^rgb\(/,'the floating panel must have an opaque background');
    await page.evaluate(async()=>{await Promise.all(['Cave UI Latin','Cave UI Arabic'].map(f=>document.fonts.load(`400 16px "${f}"`)));await document.fonts.ready;});
    assert.match(await page.locator('body').evaluate(el=>getComputedStyle(el).fontFamily),lang==='ar'?/Cave UI Arabic/:/Cave UI Latin/);
    assert.equal(await page.evaluate(()=>document.fonts.check('400 16px "Cave UI Latin"')&&document.fonts.check('400 16px "Cave UI Arabic"')),true);
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${engine} ${lang} ${width} overflow`);
    const audit=await new AxeBuilder({page}).include('.top').include('#side').withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
    assert.deepEqual(audit.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[],`${engine} ${lang} ${width} ${theme}`);
    if(compact) {
     await page.keyboard.press('Escape');
     assert.equal(await button.getAttribute('aria-expanded'),'false');
     assert.equal(await button.evaluate(el=>el===document.activeElement),true);
     assert.equal(await page.locator('#platform-select').isVisible(),false);
     await button.click();await page.mouse.click(1,1);
     assert.equal(await button.getAttribute('aria-expanded'),'false');
     await button.click();await page.locator('#main').focus();
     assert.equal(await button.getAttribute('aria-expanded'),'false');
     await button.click();await page.locator('#side a[href*="foundations/typography"]').click();
     await page.locator('html[data-ready="true"]').waitFor();
     assert.equal(await button.getAttribute('aria-expanded'),'false');
     await button.click();await page.locator('#platform-select').focus();
     await page.setViewportSize({width:1440,height:900});
     await page.waitForFunction(()=>document.documentElement.dataset.navigation==='closed');
     assert.equal(await page.locator('#side').isVisible(),true);
     await page.setViewportSize({width,height:900});
     await page.waitForFunction(()=>document.activeElement===document.getElementById('menu-btn'));
     assert.equal(await button.getAttribute('aria-expanded'),'false');
     assert.equal(await button.evaluate(el=>el===document.activeElement),true);
    }
    results.push({engine,lang,width,theme,violations:audit.violations.length});
   }
   for(const lang of ['en','ar']) {
    await page.setViewportSize({width:320,height:320});
    await page.goto(`${site.base}/${lang==='ar'?'ar/':''}components/button`);
    await page.locator('html[data-ready="true"]').waitFor();await page.locator('#menu-btn').click();
    await page.locator('#theme-select').selectOption('black');
    await page.locator('#side a[href*="downloads"]').scrollIntoViewIfNeeded();
    const box=await page.locator('#side a[href*="downloads"]').boundingBox();
    assert.ok(box.y>=0&&box.y+box.height<=320,'short screen menu scrolls fully');
    await page.screenshot({path:new URL(`../.artifacts/navigation/${engine}-${lang}-black-menu.png`,import.meta.url).pathname});
    const fallback=await browser.newContext({javaScriptEnabled:false,viewport:{width:320,height:900}});
    const nojs=await fallback.newPage();await nojs.goto(`${site.base}/${lang==='ar'?'ar/':''}`);
    assert.equal(await nojs.locator('#side').isVisible(),true);
    assert.equal(await nojs.locator('a.lang').isVisible(),true);
    await nojs.locator('#side a[href*="foundations/typography"]').click();
    assert.match(await nojs.locator('h1').textContent(),lang==='ar'?/الخطوط/:/Typography/);
    assert.ok(await nojs.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
    await fallback.close();
   }
   assert.deepEqual(errors,[]);
   console.log(`PASS ${engine}: 24 responsive menu cases, Black short-screen scrolling, two no-script cases.`);
  } finally {await browser.close();}
 }
 await writeFile(new URL('../.artifacts/navigation/results.json',import.meta.url),JSON.stringify(results,null,2));
} finally {site.server.close();}
