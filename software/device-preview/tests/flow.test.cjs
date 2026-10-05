'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { initialState, transition: go, owner } = require('../core.js');
function ready() { const s = go(initialState(), { type: 'PREPARE' }); return go(s, { type: 'PREPARED', run: s.run }); }
test('normal handoff locks local choices until deck eject and restore acknowledgment', () => {
  let s = initialState();
  s = go(s, { type: 'SELECT', id: '03' });
  s = go(s, { type: 'PREPARE' });
  assert.equal(owner(s), 'Locked'); assert.deepEqual(s.session, ['01', '02']);
  for (const mode of ['preparing', 'ready', 'deck', 'returning']) {
    assert.equal(s.mode, mode);
    assert.throws(() => go(s, { type: 'SELECT', id: '01' }), /locked/);
    if (mode === 'preparing') s = go(s, { type: 'PREPARED', run: s.run });
    else if (mode === 'ready') s = go(s, { type: 'ATTACH' });
    else if (mode === 'deck') { assert.equal(owner(s), 'Deck'); s = go(s, { type: 'EJECT_ACK' }); }
    else s = go(s, { type: 'RESTORED', run: s.run });
  }
  assert.equal(owner(s), 'Serein'); assert.deepEqual(s.session, []);
  assert.deepEqual(s.selected, ['01', '02']);
});
test('empty library selection cannot prepare or attach', () => {
  let s = initialState(); for (const id of s.selected) s = go(s, { type: 'SELECT', id });
  assert.throws(() => go(s, { type: 'PREPARE' }), /Choose/);
  assert.throws(() => go(s, { type: 'ATTACH' }), /prepared/);
});
test('cancellation keeps choices locked; a late preparation cannot complete it', () => {
  let s = go(initialState(), { type: 'PREPARE' }); const canceledRun = s.run;
  s = go(s, { type: 'CANCEL' });
  assert.equal(owner(s), 'Locked');
  assert.throws(() => go(s, { type: 'PREPARED', run: canceledRun }), /current operation/);
  s = go(s, { type: 'RESTORED', run: s.run });
  s = go(s, { type: 'PREPARE' });
  assert.throws(() => go(s, { type: 'PREPARED', run: canceledRun }), /current operation/);
});
test('unexpected unplug fails closed and needs explicit successful recovery', () => {
  let s = go(ready(), { type: 'ATTACH' });
  assert.throws(() => go(s, { type: 'CANCEL' }), /Eject/);
  assert.throws(() => go(s, { type: 'RESTORED', run: s.run }), /current operation/);
  s = go(s, { type: 'CABLE_LOST' });
  assert.equal(s.mode, 'recovery'); assert.equal(owner(s), 'Locked');
  assert.throws(() => go(s, { type: 'SELECT', id: '01' }), /locked/);
  s = go(s, { type: 'RECOVERED', run: s.run }); assert.equal(owner(s), 'Serein');
});
test('preparation and restoration failures never unlock the volume', () => {
  let s = go(initialState(), { type: 'PREPARE' });
  s = go(s, { type: 'PREPARE_FAILED', run: s.run }); assert.equal(owner(s), 'Locked');
  s = go(s, { type: 'RECOVERED', run: s.run });
  s = go(s, { type: 'PREPARE' }); s = go(s, { type: 'CANCEL' });
  s = go(s, { type: 'RESTORE_FAILED', run: s.run }); assert.equal(owner(s), 'Locked');
});
test('snapshots are immutable and invalid events leave the previous state unchanged', () => {
  const s = ready(); const snapshot = [...s.session];
  assert.throws(() => s.session.push('99'), TypeError);
  assert.throws(() => go(s, { type: 'SELECT', id: '01' }), /locked/);
  assert.deepEqual(s.session, snapshot);
  assert.throws(() => go(initialState(), { type: 'SELECT', id: '99' }), /Unknown track/);
});
test('bounded event sequences never allow local edits while deck ownership is active', () => {
  const types = ['PREPARE', 'PREPARED', 'PREPARE_FAILED', 'ATTACH', 'CANCEL', 'EJECT_ACK', 'RESTORED', 'RESTORE_FAILED', 'CABLE_LOST', 'RECOVERED'];
  let frontier = [initialState()];
  for (let depth = 0; depth < 7; depth++) {
    const next = new Map();
    for (const s of frontier) {
      if (s.mode !== 'local') assert.throws(() => go(s, { type: 'SELECT', id: '01' }));
      if (s.connected) { assert.equal(s.mode, 'deck'); assert.equal(owner(s), 'Deck'); }
      for (const type of types) {
        try { const t = go(s, { type, run: s.run }); next.set(JSON.stringify(t), t); } catch { /* Invalid sequences must be rejected. */ }
      }
    }
    frontier = [...next.values()];
  }
});
