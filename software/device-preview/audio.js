(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.SereinAudio = api;
})(typeof globalThis === 'object' ? globalThis : this, function () {
  'use strict';
  // Original generated preview audio; no recorded music or remote assets.
  function demoWav(frequency = 220, seconds = 4) {
    const rate = 22050, count = Math.floor(seconds * rate);
    if (!(frequency > 0 && frequency < rate / 2 && seconds > 0 && seconds <= 10)) throw new Error('Invalid demo audio.');
    const bytes = new Uint8Array(44 + count * 2), view = new DataView(bytes.buffer);
    function text(offset, value) { for (let i = 0; i < value.length; i++) bytes[offset + i] = value.charCodeAt(i); }
    text(0, 'RIFF'); view.setUint32(4, bytes.length - 8, true); text(8, 'WAVE'); text(12, 'fmt ');
    view.setUint32(16, 16, true); view.setUint16(20, 1, true); view.setUint16(22, 1, true);
    view.setUint32(24, rate, true); view.setUint32(28, rate * 2, true); view.setUint16(32, 2, true);
    view.setUint16(34, 16, true); text(36, 'data'); view.setUint32(40, count * 2, true);
    for (let i = 0; i < count; i++) {
      const envelope = Math.min(1, i / (rate * .05), (count - i) / (rate * .05));
      view.setInt16(44 + i * 2, Math.sin(2 * Math.PI * frequency * i / rate) * 3500 * envelope, true);
    }
    return bytes;
  }
  return Object.freeze({ demoWav });
});
