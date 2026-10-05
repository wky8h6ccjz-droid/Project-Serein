'use strict';
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const types = { '/index.html': 'text/html; charset=utf-8', '/preview.html': 'text/html; charset=utf-8', '/style.css': 'text/css', '/core.js': 'text/javascript', '/audio.js': 'text/javascript', '/library.js': 'text/javascript', '/app.js': 'text/javascript', '/music/funky-house.ogg': 'audio/ogg', '/music/synthwave-house-loop.ogg': 'audio/ogg' };
const port = Number(process.env.SEREIN_PREVIEW_PORT || 4173);
http.createServer((req, res) => {
  const pathname = new URL(req.url, 'http://localhost').pathname;
  const file = pathname === '/' ? '/index.html' : pathname;
  if (!(file in types)) { res.writeHead(404); res.end('Not found'); return; }
  const standalone = file === '/preview.html';
  const bytes = fs.readFileSync(path.join(__dirname, file.slice(1)));
  const headers = { 'Content-Type': types[file], 'Cache-Control': 'no-store',
    'Content-Security-Policy': `default-src 'self'; img-src 'self' blob: data:; media-src 'self' blob: data:; style-src 'self'${standalone ? " 'unsafe-inline'" : ''}; script-src 'self'${standalone ? " 'unsafe-inline'" : ''}; connect-src 'none'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'`, 'Accept-Ranges': 'bytes' };
  const range = req.headers.range;
  if (range) {
    const match = /^bytes=(\d*)-(\d*)$/.exec(range);
    const start = match && match[1] ? Number(match[1]) : match && match[2] ? Math.max(0, bytes.length - Number(match[2])) : NaN;
    const end = match && match[1] && match[2] ? Math.min(Number(match[2]), bytes.length - 1) : bytes.length - 1;
    if (!Number.isSafeInteger(start) || start > end || start >= bytes.length) {
      res.writeHead(416, {...headers, 'Content-Range': `bytes */${bytes.length}`}); res.end(); return;
    }
    res.writeHead(206, {...headers, 'Content-Range': `bytes ${start}-${end}/${bytes.length}`, 'Content-Length': end - start + 1});
    res.end(req.method === 'HEAD' ? undefined : bytes.subarray(start, end + 1)); return;
  }
  res.writeHead(200, {...headers, 'Content-Length': bytes.length});
  res.end(req.method === 'HEAD' ? undefined : bytes);
}).listen(port, '127.0.0.1', () => console.log(`Serein preview: http://127.0.0.1:${port}`));
