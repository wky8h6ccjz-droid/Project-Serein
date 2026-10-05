'use strict';
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const types = { '/index.html': 'text/html; charset=utf-8', '/preview.html': 'text/html; charset=utf-8', '/style.css': 'text/css', '/core.js': 'text/javascript', '/app.js': 'text/javascript' };
const port = Number(process.env.SEREIN_PREVIEW_PORT || 4173);
http.createServer((req, res) => {
  const pathname = new URL(req.url, 'http://localhost').pathname;
  const file = pathname === '/' ? '/index.html' : pathname;
  if (!(file in types)) { res.writeHead(404); res.end('Not found'); return; }
  const standalone = file === '/preview.html';
  res.writeHead(200, { 'Content-Type': types[file], 'Cache-Control': 'no-store',
    'Content-Security-Policy': `default-src 'self'; style-src 'self'${standalone ? " 'unsafe-inline'" : ''}; script-src 'self'${standalone ? " 'unsafe-inline'" : ''}; connect-src 'none'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'` });
  res.end(fs.readFileSync(path.join(__dirname, file.slice(1))));
}).listen(port, '127.0.0.1', () => console.log(`Serein preview: http://127.0.0.1:${port}`));
