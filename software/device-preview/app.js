'use strict';
const flow = window.SereinFlow;
let state = flow.initialState();
let page = 'home';
let failNext = false;
let noticeTimer;
const content = document.getElementById('content');
const audio = document.getElementById('local-audio');
const picker = document.getElementById('audio-files');
const resources = new Map(flow.tracks.map(t => [t.id, window.SereinDemoUrls?.[t.id] || `music/${t.id}.ogg`]));
let currentTrack = null;
let fileSequence = 0;
let playAttempt = 0;
audio.volume = .5;
function escapeHtml(value) { return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function time(value) { const n = Number.isFinite(value) ? Math.floor(value) : 0; return `${Math.floor(n / 60)}:${String(n % 60).padStart(2, '0')}`; }
function updatePlayer() {
  const visible = currentTrack && state.mode === 'local';
  document.getElementById('player').hidden = !visible;
  const track = state.library.find(t => t.id === currentTrack);
  document.getElementById('player-title').textContent = track?.title || '';
  const toggle = document.getElementById('play-pause');
  toggle.textContent = audio.paused ? 'Play' : 'Pause';
  toggle.setAttribute('aria-label', toggle.textContent);
  toggle.disabled = !visible;
  const seek = document.getElementById('seek');
  seek.disabled = !visible || !Number.isFinite(audio.duration) || audio.duration <= 0;
  seek.max = Number.isFinite(audio.duration) ? audio.duration : 0;
  seek.value = audio.currentTime;
  document.getElementById('elapsed').textContent = time(audio.currentTime);
  document.getElementById('duration').textContent = time(audio.duration);
  for (const button of content.querySelectorAll('[data-track]')) button.classList.toggle('playing', button.dataset.track === currentTrack && !audio.paused);
}
function stopAudio() { playAttempt++; audio.pause(); audio.removeAttribute('src'); audio.load(); currentTrack = null; updatePlayer(); }
async function playTrack(id) {
  if (state.mode !== 'local' || !resources.has(id)) return;
  if (currentTrack === id && !audio.paused) { playAttempt++; audio.pause(); return; }
  if (currentTrack !== id) { currentTrack = id; audio.src = resources.get(id); }
  if (audio.ended) audio.currentTime = 0;
  const attempt = ++playAttempt;
  updatePlayer();
  try { await audio.play(); if (state.mode !== 'local') audio.pause(); }
  catch (error) { if (attempt === playAttempt && error.name !== 'AbortError') notify('This file could not play. Try an MP3 or WAV supported by your browser.'); }
  updatePlayer();
}
for (const event of ['play', 'pause', 'timeupdate', 'durationchange', 'ended', 'loadedmetadata']) audio.addEventListener(event, () => {
  if (state.mode !== 'local' && !audio.paused) audio.pause();
  updatePlayer();
});
audio.addEventListener('error', () => { if (currentTrack) notify('This file could not play. Try an MP3 or WAV supported by your browser.'); updatePlayer(); });
picker.addEventListener('change', () => {
  const files = [...picker.files]; picker.value = '';
  if (state.mode !== 'local') { notify('Return the library from the deck before adding songs.'); return; }
  const valid = files.filter(f => /\.(mp3|wav|m4a|aac|flac|ogg|opus|aiff|aif)$/i.test(f.name) || f.type.startsWith('audio/'));
  if (!valid.length) { if (files.length) notify('Choose an audio file such as MP3 or WAV.'); return; }
  const imported = valid.map(f => {
    const id = `file-${++fileSequence}`;
    resources.set(id, URL.createObjectURL(f));
    return {id, title: (f.name.replace(/\.[^.]+$/, '') || f.name).slice(0, 300), detail: 'Local file', source: 'file'};
  });
  if (state.library.some(t => t.source === 'demo')) stopAudio();
  dispatch({type: 'SET_LIBRARY', library: [...state.library.filter(t => t.source !== 'demo'), ...imported]});
  if (valid.length < files.length) notify('Audio files added. Other files were skipped.');
});
window.addEventListener('pagehide', () => { stopAudio(); for (const url of resources.values()) if (url.startsWith('blob:')) URL.revokeObjectURL(url); });
function notify(message) {
  const node = document.getElementById('notice');
  node.textContent = message;
  node.classList.add('visible');
  clearTimeout(noticeTimer);
  noticeTimer = setTimeout(() => node.classList.remove('visible'), 6500);
}
function dispatch(event) {
  try { state = flow.transition(state, event); render(); return true; }
  catch (error) { notify(error.message); return false; }
}
function simulateCompletion(success, failure) {
  const run = state.run;
  const fail = failNext && success === 'PREPARED';
  if (success === 'PREPARED') { failNext = false; render(); }
  setTimeout(() => {
    // A canceled operation cannot later complete a new operation.
    if (state.run !== run) return;
    dispatch({ type: fail ? failure : success, run });
  }, 850);
}
function prepare() {
  stopAudio();
  if (dispatch({ type: 'PREPARE' })) { page = 'deck'; render(); simulateCompletion('PREPARED', 'PREPARE_FAILED'); }
}
function ownership() { return `<p class="ownership"><span class="dot"></span>Music access: ${flow.owner(state)}${state.mode === 'local' ? ' · on this device' : ' · simulated'}</p>`; }
function home() {
  return `<button class="feature" id="spotify"><span class="symbol" aria-hidden="true">♫</span><strong>Spotify</strong><small>Open the official app</small></button>
    <button class="feature library" id="open-library"><span class="symbol" aria-hidden="true">▤</span><strong>Library</strong><small>${state.library.length} local songs</small></button>${ownership()}`;
}
function library() {
  const locked = state.mode !== 'local';
  return `<div class="library-heading"><h2 class="page-title">Library</h2><button class="add" id="add-songs" ${locked ? 'disabled' : ''}>Add songs</button></div>
    ${locked ? '<p class="page-text">Local playback is paused while the library is with the deck.</p>' : ''}
    ${state.library.map(t => `<button class="track" data-track="${escapeHtml(t.id)}" ${locked ? 'disabled' : ''}><span class="track-symbol" aria-hidden="true">▷</span><span class="track-copy"><strong>${escapeHtml(t.title)}</strong><small>${escapeHtml(t.detail)}</small></span></button>`).join('')}
    <button class="primary" id="prepare" ${locked || !state.library.length ? 'disabled' : ''}>Prepare library for deck</button>
    ${locked ? '<button class="quiet" id="show-deck">View connection</button>' : ''}${ownership()}`;
}
function deck() {
  const states = {
    local: ['⇄', 'Deck connection', 'Prepare the local library, then connect Serein to a deck.', 'Spotify downloads stay inside Spotify. Only separately saved local music files go to the deck.'],
    preparing: ['···', 'Getting ready…', 'Finishing changes and making the local library ready for a deck.', 'Local playback and library changes are temporarily locked.'],
    ready: ['↗', 'Ready to connect.', 'The music is prepared. Connect Serein to the deck when you’re ready.', 'Preview: use “Simulate deck connection” beside the device.'],
    deck: ['✓', 'Music with the deck.', 'Browse and play from the deck. Serein keeps your library unchanged while it is connected.', 'Eject Serein on the deck before returning to local use.'],
    returning: ['···', 'Bringing it back…', 'Making sure the deck has released the library before restoring access.', 'Local playback stays paused until this completes.'],
    recovery: ['!', 'Check before using.', 'The handoff did not finish normally. Keep the library locked while it is checked.', 'This demo simulates a check. A real device must verify the connection and filesystem before restoring access.']
  };
  const [icon, title, text, note] = states[state.mode];
  let actions = '';
  if (state.mode === 'local') actions = `<button class="primary" id="prepare" ${!state.library.length ? 'disabled' : ''}>Prepare library for deck</button>`;
  if (['preparing', 'ready'].includes(state.mode)) actions = '<button class="quiet" id="cancel">Return to library</button>';
  if (state.mode === 'deck') actions = '<button class="primary" id="ejected">Deck ejected — return library</button><p class="small">In this preview, tapping confirms a simulated deck eject.</p>';
  if (state.mode === 'recovery') actions = '<button class="primary" id="recover">Simulate check and restore</button>';
  return `<div class="${state.mode}"><p class="page-kicker">Deck connection / demo</p><div class="state-icon" aria-hidden="true">${icon}</div><h2 class="page-title">${title}</h2><p class="page-text">${text}</p><div class="state-note">${note}</div>${actions}${ownership()}</div>`;
}
function bind(id, action) { document.getElementById(id)?.addEventListener('click', action); }
function render() {
  content.innerHTML = page === 'home' ? home() : page === 'library' ? library() : deck();
  for (const tab of ['home', 'library', 'deck']) {
    const node = document.getElementById(`${tab}-tab`);
    node.classList.toggle('active', tab === page);
    if (tab === page) node.setAttribute('aria-current', 'page'); else node.removeAttribute('aria-current');
  }
  document.getElementById('attach').disabled = state.mode !== 'ready';
  document.getElementById('interrupt').disabled = state.mode !== 'deck';
  document.getElementById('fail').disabled = state.mode !== 'local';
  document.getElementById('failure-setting').textContent = failNext ? 'Next preparation will fail, so you can try recovery.' : 'Preparation will succeed in this demo.';
  bind('spotify', () => notify('Preview only. On the Android device, this opens the official Spotify app.'));
  bind('open-library', () => { page = 'library'; render(); });
  bind('show-deck', () => { page = 'deck'; render(); });
  bind('prepare', prepare);
  bind('add-songs', () => { if (state.mode === 'local') picker.click(); });
  bind('cancel', () => { if (dispatch({ type: 'CANCEL' })) simulateCompletion('RESTORED'); });
  bind('ejected', () => { if (dispatch({ type: 'EJECT_ACK' })) simulateCompletion('RESTORED'); });
  bind('recover', () => {
    const run = state.run;
    const button = document.getElementById('recover');
    button.disabled = true; button.textContent = 'Checking…';
    setTimeout(() => { if (state.mode === 'recovery' && state.run === run) dispatch({ type: 'RECOVERED', run }); }, 850);
  });
  for (const button of content.querySelectorAll('[data-track]')) button.addEventListener('click', () => playTrack(button.dataset.track));
  updatePlayer();
}
for (const tab of ['home', 'library', 'deck']) bind(`${tab}-tab`, () => { page = tab; render(); });
bind('play-pause', () => playTrack(currentTrack));
bind('attach', () => dispatch({ type: 'ATTACH' }));
bind('interrupt', () => dispatch({ type: 'CABLE_LOST' }));
bind('fail', () => { failNext = !failNext; render(); });
render();

document.getElementById('seek').addEventListener('input', event => { if (state.mode === 'local' && Number.isFinite(audio.duration)) audio.currentTime = Number(event.target.value); });
