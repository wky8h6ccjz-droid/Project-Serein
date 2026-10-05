'use strict';
const assert = require('node:assert/strict');
const {demoWav} = require('../audio.js');
const {chromium} = require(process.env.SEREIN_PLAYWRIGHT_MODULE || 'playwright');
(async () => {
  const browser = await chromium.launch({executablePath: process.env.SEREIN_CHROMIUM_PATH || undefined, headless: true, args: ['--no-sandbox','--disable-dev-shm-usage']});
  try {
    const context = await browser.newContext(); let page = await context.newPage();
    const url = process.env.SEREIN_PREVIEW_URL || 'http://127.0.0.1:4177/preview.html';
    const errors = []; const trackErrors=p=>p.on('pageerror',e=>errors.push(e.message)); trackErrors(page);
    const ready=async p=>p.waitForFunction(()=>document.getElementById('open-library') && !document.getElementById('open-library').disabled);
    const upload=(name,hz=220)=>({name,mimeType:'audio/wav',buffer:Buffer.from(demoWav(hz,8))});
    await page.goto(url); await ready(page); await page.locator('#open-library').click();
    await page.locator('#audio-files').setInputFiles([upload('Owned A.wav'),upload('Owned B.wav',330)]);
    await page.locator('[data-track="file-2"]').waitFor();
    await page.locator('[data-view="setlists"]').click(); await page.locator('#new-list').click(); await page.locator('#list-name').fill('Saved set');
    for(const box of await page.locator('input[name="song"]').all()) await box.check();
    await page.getByRole('button',{name:'Save setlist',exact:true}).click(); await page.locator('.collection-title').waitFor();
    await page.locator('.order-list summary').click(); await page.getByRole('button',{name:'Move song 2 up',exact:true}).click();
    await page.waitForFunction(()=>document.querySelector('[data-track]')?.dataset.track==='file-2');
    await page.close(); page=await context.newPage(); trackErrors(page);
    await page.goto(url); await ready(page); await page.locator('#open-library').click(); assert.equal(await page.locator('[data-track]').count(),2);
    await page.locator('[data-view="setlists"]').click(); await page.locator('[data-collection="list-1"]').click();
    assert.equal(await page.locator('[data-track]').first().getAttribute('data-track'),'file-2');
    await context.setOffline(true); await page.locator('#library-play').click();
    await page.waitForFunction(()=>!document.querySelector('audio').paused && document.querySelector('audio').currentTime>.1);
    assert.equal(await page.locator('#now-title').textContent(),'Owned B'); await context.setOffline(false);
    await page.locator('#deck-tab').click(); await page.locator('#prepare').click();
    await page.getByRole('heading',{name:'Ready to connect.'}).waitFor(); await page.locator('#attach').click();
    await page.getByRole('heading',{name:'Music with the deck.'}).waitFor(); await page.reload();
    await page.getByRole('heading',{name:'Check before using.'}).waitFor(); await page.locator('#library-tab').click();
    assert.equal(await page.locator('[data-track]').first().isDisabled(),true);
    await page.locator('#deck-tab').click(); await page.locator('#recover').click(); await page.getByRole('heading',{name:'Deck connection',exact:true}).waitFor();
    const abort=await page.evaluate(async()=>{
      const store=await SereinStorage.open(); const before=await store.load();store.close();
      await new Promise((resolve,reject)=>{const req=indexedDB.open('serein-device-preview',1);req.onerror=()=>reject(req.error);req.onsuccess=()=>{const db=req.result;const tx=db.transaction('library','readwrite');tx.objectStore('library').put({...before,collections:[]},'current');tx.abort();tx.onabort=()=>{db.close();resolve();};};});
      const next=await SereinStorage.open();const after=await next.load();next.close();return {old:before.revision,new:after.revision,lists:after.collections.length};
    });assert.equal(abort.old,abort.new);assert.equal(abort.lists,1);
    // Inject a real write failure at the storage boundary; no import gets applied.
    const failed=await context.newPage();trackErrors(failed);
    await failed.route('**/storage.js',async route=>{const res=await route.fetch();await route.fulfill({response:res,body:(await res.text())+"\nconst normalOpen=SereinStorage.open;SereinStorage={...SereinStorage,open:async()=>{const db=await normalOpen();return {...db,save:async()=>{throw new DOMException('Full disk fixture','QuotaExceededError');}};}};"});});
    await failed.goto(new URL('/index.html',url).href);await ready(failed);await failed.locator('#open-library').click();
    await failed.locator('#audio-files').setInputFiles(upload('Should not save.wav'));
    await failed.locator('#storage-status').filter({hasText:'Save failed'}).waitFor();assert.equal(await failed.locator('[data-track]').count(),2);await failed.close();
    const other=await context.newPage();await other.goto(url);await ready(other);
    await page.locator('#library-tab').click();await page.locator('#audio-files').setInputFiles(upload('Owned C.wav',440));
    await page.locator('[data-track="file-3"]').waitFor();
    await other.locator('#storage-status').filter({hasText:'Changed in another tab'}).waitFor();assert.equal(await other.locator('#open-library').isDisabled(),true);await other.close();
    await page.locator('.preview-storage summary').click();await page.locator('#clear-saved').click();await page.locator('#cancel-clear').click();assert.equal(await page.locator('[data-track]').count(),3);
    await page.locator('#clear-saved').click();await page.locator('#confirm-clear').click();await ready(page);await page.reload();await ready(page);
    await page.locator('#open-library').click();assert.equal(await page.locator('[data-track="funky-house"]').count(),1);
    await page.locator('[data-view="setlists"]').click();assert.equal(await page.locator('[data-collection]').count(),0);
    assert.deepEqual(errors,[]);await context.close();
    console.log('Persistence passed: saved audio and setlist order after reopening, offline playback, handoff reload recovery, aborted transaction, write-failure rollback, cross-tab lockout and confirmed local clear.');
  } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
