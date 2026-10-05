'use strict';
const fs = require('node:fs');
const path = require('node:path');
const read = name => fs.readFileSync(path.join(__dirname, name), 'utf8');
const demoUrls = Object.fromEntries(['funky-house', 'synthwave-house-loop'].map(id => [id, 'data:audio/ogg;base64,' + fs.readFileSync(path.join(__dirname, 'music', id + '.ogg')).toString('base64')]));
const html = read('index.html')
  .replace('<link rel="stylesheet" href="style.css">', () => `<style>\n${read('style.css')}\n</style>`)
  .replace('<script src="core.js" defer></script>', '')
  .replace('<script src="audio.js" defer></script>', '')
  .replace('<script src="library.js" defer></script>', '')
  .replace('<script src="storage.js" defer></script>', '')
  .replace('<script src="app.js" defer></script>', '')
  .replace('</body>', () => `<script>\nwindow.SereinDemoUrls = ${JSON.stringify(demoUrls)};\n${read('core.js')}\n${read('audio.js')}\n${read('library.js')}\n${read('storage.js')}\n${read('app.js')}\n</script>\n</body>`);
fs.writeFileSync(path.join(__dirname, 'preview.html'), html.split('\n').map(line => line.trimEnd()).join('\n'));
console.log('Built preview.html. Open it directly in a browser; no server needed.');
