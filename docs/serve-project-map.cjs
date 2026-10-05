'use strict';
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const page = fs.readFileSync(path.join(__dirname, 'project-map.html'));
http.createServer((req, res) => {
  if (!['/', '/project-map.html'].includes(new URL(req.url, 'http://localhost').pathname)) {res.writeHead(404);res.end('Not found');return;}
  res.writeHead(200, {'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store','Content-Security-Policy':"default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; base-uri 'none'; frame-ancestors 'none'"});res.end(page);
}).listen(Number(process.env.SEREIN_MAP_PORT || 4178), '127.0.0.1', () => console.log('Serein project map ready on loopback.'));
