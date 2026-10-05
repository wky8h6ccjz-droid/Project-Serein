(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.SereinLibrary = api;
})(typeof globalThis === 'object' ? globalThis : this, function () {
  'use strict';
  function queue(ids, first, shuffle, random = Math.random) {
    const rest = ids.filter(id => id !== first);
    if (shuffle) for (let i = rest.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1)); [rest[i], rest[j]] = [rest[j], rest[i]];
    }
    return ids.includes(first) ? [first, ...rest] : rest;
  }
  const syncSize = b => b.length === 4 && b.every(n => n < 128) ? b.reduce((n, v) => n * 128 + v, 0) : -1;
  // Read only bounded ID3v2.3/2.4 tags; unsupported/malformed tags keep the fallback.
  function parseTags(bytes) {
    const result = {};
    if (bytes.length < 10 || String.fromCharCode(...bytes.slice(0, 3)) !== 'ID3' || ![3, 4].includes(bytes[3]) || bytes[5] !== 0) return result;
    const size = syncSize(bytes.slice(6, 10));
    if (size < 0 || size > 8 * 1024 * 1024 || bytes.length < size + 10) return result;
    const end = size + 10;
    for (let offset = 10; offset + 10 <= end;) {
      const id = String.fromCharCode(...bytes.slice(offset, offset + 4));
      if (!/^[A-Z0-9]{4}$/.test(id)) break;
      const length = bytes[3] === 4 ? syncSize(bytes.slice(offset + 4, offset + 8)) : new DataView(bytes.buffer, bytes.byteOffset + offset + 4, 4).getUint32(0);
      if (length <= 0 || offset + 10 + length > end) break;
      const flags = bytes[offset + 8] | bytes[offset + 9];
      const frame = bytes.slice(offset + 10, offset + 10 + length); offset += length + 10;
      if (flags) continue;
      if (['TIT2', 'TPE1', 'TALB'].includes(id) && frame.length > 1) {
        const encoding = ['latin1', 'utf-16', 'utf-16be', 'utf-8'][frame[0]];
        if (encoding) result[{TIT2: 'title', TPE1: 'artist', TALB: 'album'}[id]] = new TextDecoder(encoding).decode(frame.slice(1)).replace(/\0/g, '').trim().slice(0, 300);
      }
      if (id === 'APIC' && !result.art && frame.length > 5 && frame[0] <= 3) {
        const mimeEnd = frame.indexOf(0, 1); if (mimeEnd < 0) continue;
        const mime = new TextDecoder('latin1').decode(frame.slice(1, mimeEnd)).toLowerCase();
        if (!['image/jpeg', 'image/png'].includes(mime)) continue;
        const step = [1, 2].includes(frame[0]) ? 2 : 1;
        let start = mimeEnd + 2;
        while (start + step <= frame.length && !(frame[start] === 0 && (step === 1 || frame[start + 1] === 0))) start += step;
        start += step;
        const art = frame.slice(start);
        const valid = mime === 'image/jpeg' ? art[0] === 255 && art[1] === 216 && art[2] === 255 : [137, 80, 78, 71, 13, 10, 26, 10].every((n, i) => art[i] === n);
        if (valid && art.length <= 5 * 1024 * 1024) result.art = {mime, bytes: art};
      }
    }
    return result;
  }
  async function readMetadata(file) {
    const header = new Uint8Array(await file.slice(0, 10).arrayBuffer());
    if (header.length !== 10 || String.fromCharCode(...header.slice(0, 3)) !== 'ID3') return {};
    const size = syncSize(header.slice(6, 10));
    if (size < 0 || size > 8 * 1024 * 1024 || size + 10 > file.size) return {};
    return parseTags(new Uint8Array(await file.slice(0, size + 10).arrayBuffer()));
  }
  return Object.freeze({queue, parseTags, readMetadata});
});
