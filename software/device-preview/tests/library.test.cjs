'use strict';
const {test} = require('node:test');
const assert = require('node:assert/strict');
const {queue, parseTags, readMetadata} = require('../library.js');
function tag(version, frames) {
  const parts = frames.map(([id, data]) => {
    const header = Buffer.alloc(10); header.write(id); header.writeUInt32BE(data.length, 4);
    if (version === 4) for (let i = 0; i < 4; i++) header[7 - i] = (data.length >>> (i * 7)) & 127;
    return Buffer.concat([header, data]);
  });
  const body = Buffer.concat(parts); const header = Buffer.from([73,68,51,version,0,0,0,0,0,0]);
  for (let i = 0; i < 4; i++) header[9 - i] = (body.length >>> (i * 7)) & 127;
  return Buffer.concat([header, body]);
}
const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jL1sAAAAASUVORK5CYII=', 'base64');
const picture = Buffer.concat([Buffer.from([3]), Buffer.from('image/png\0'), Buffer.from([3,0]), png]);
test('Play keeps every song once; Shuffle permutes the queue without changing the library', () => {
  const ids = ['a','b','c','d']; assert.deepEqual(queue(ids, 'a', false), ids);
  const shuffled = queue(ids, 'b', true, () => 0);
  assert.equal(shuffled[0], 'b'); assert.deepEqual([...shuffled].sort(), ids);
  assert.notDeepEqual(shuffled, ['b','a','c','d']); assert.deepEqual(ids, ['a','b','c','d']);
  assert.deepEqual(queue([], null, true), []);
});
test('reads title, artist, album and embedded PNG from bounded ID3v2.3 and 2.4 tags', async () => {
  for (const version of [3,4]) {
    const bytes = tag(version, [['TIT2', Buffer.from('\x03My track')], ['TPE1', Buffer.from('\x03Artist')], ['TALB', Buffer.from('\x03Album')], ['APIC',picture]]);
    const result = await readMetadata(new Blob([bytes]));
    assert.equal(result.title, 'My track'); assert.equal(result.artist, 'Artist'); assert.equal(result.album, 'Album');
    assert.equal(result.art.mime, 'image/png'); assert.deepEqual(Buffer.from(result.art.bytes), png);
    assert.deepEqual(parseTags(bytes.slice(0, -1)), {});
  }
});
test('unsupported or corrupt artwork safely falls back without accepting SVG or remote URLs', () => {
  for (const image of [Buffer.from([3,...Buffer.from('image/svg+xml\0'),3,0,...Buffer.from('<svg/>')]), Buffer.from([3,...Buffer.from('image/png\0'),3,0,1,2,3])]) {
    assert.equal(parseTags(tag(3, [['APIC', image]])).art, undefined);
  }
  const oversized = Buffer.from([73,68,51,3,0,0,127,127,127,127]);
  assert.deepEqual(parseTags(oversized), {});
});
module.exports = {tag, picture};
