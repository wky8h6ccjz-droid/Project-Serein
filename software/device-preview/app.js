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
let importAttempt = 0;
let playbackQueue = [];
let shuffle = false;
let libraryView = 'songs';
let collections = [];
let collectionSequence = 0;
let collectionId = null;
let editingId = null;
let playbackScope = [];
let playerReturn = 'library';
let orderExpanded = false;
function selectedCollection() { return collections.find(c => c.id === collectionId); }
function visibleIds() { return page === 'collection' ? selectedCollection()?.tracks || [] : state.library.map(t => t.id); }
const metadata = new Map(flow.tracks.map(t => [t.id, {artist: t.id === 'funky-house' ? 'Of Far Different Nature' : 'Fupi', album: 'Local library'}]));
function icon(name) {
  const paths = {
    play: '<path d="M8 5l12 7-12 7z" fill="currentColor" stroke="none"/>',
    pause: '<path d="M8 5v14M16 5v14" stroke-width="4"/>',
    previous: '<path d="M5 5v14M19 5L8 12l11 7z"/>',
    next: '<path d="M19 5v14M5 5l11 7-11 7z"/>',
    shuffle: '<path d="M3 6h3c5 0 7 12 12 12h3M18 15l3 3-3 3M3 18h3c5 0 7-12 12-12h3M18 3l3 3-3 3"/>',
    down: '<path d="M6 9l6 6 6-6"/>'
  };
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]}</svg>`;
}
function cover(id) {
  if (metadata.get(id)?.art) return metadata.get(id).art;
  const palette = id === 'funky-house' ? ['#324d36', '#f6b775'] : ['#35294f', '#bea0ef'];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="400" height="400" fill="${palette[0]}"/><circle cx="200" cy="200" r="139" fill="none" stroke="${palette[1]}" stroke-width="2"/><circle cx="200" cy="200" r="108" fill="none" stroke="${palette[1]}" stroke-width="22" opacity=".45"/><circle cx="200" cy="200" r="73" fill="none" stroke="${palette[1]}" stroke-width="2"/><circle cx="200" cy="200" r="35" fill="${palette[1]}"/><circle cx="200" cy="200" r="8" fill="${palette[0]}"/><path d="M0 310L400 85" stroke="${palette[1]}" stroke-width="65" opacity=".08"/></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
function artwork(id, className = '') { return `<img class="cover ${className}" data-art-track="${escapeHtml(id)}" src="${escapeHtml(cover(id))}" alt="${metadata.get(id)?.art ? 'Album artwork' : 'Preview cover'}">`; }
function setQueue(id) { playbackQueue = window.SereinLibrary.queue(playbackScope, id, shuffle); }
function openTrack(id) { if (state.mode !== 'local') return; playbackScope = visibleIds(); playerReturn = page === 'collection' ? 'collection' : 'library'; setQueue(id); playTrack(id); page = 'now-playing'; render(); }
function startLibrary(mixed) {
  const ids = visibleIds();
  if (state.mode !== 'local' || !ids.length) return;
  shuffle = mixed;
  openTrack(ids[mixed ? Math.floor(Math.random() * ids.length) : 0]);
}
function stepTrack(direction, automatic = false) {
  if (state.mode !== 'local' || !currentTrack) return;
  if (direction < 0 && audio.currentTime > 3) { audio.currentTime = 0; return; }
  const index = playbackQueue.indexOf(currentTrack) + direction;
  if (index < 0 || index >= playbackQueue.length) { if (!automatic) notify(direction > 0 ? 'End of library.' : 'First song in the library.'); return; }
  playTrack(playbackQueue[index]);
}
audio.volume = .5;
function escapeHtml(value) { return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function time(value) { const n = Number.isFinite(value) ? Math.floor(value) : 0; return `${Math.floor(n / 60)}:${String(n % 60).padStart(2, '0')}`; }
function updatePlayer() {
  const visible = currentTrack && state.mode === 'local';
  document.getElementById('player').hidden = !visible || page === 'now-playing';
  const track = state.library.find(t => t.id === currentTrack);
  const info = metadata.get(currentTrack);
  document.getElementById('player-title').textContent = track?.title || '';
  document.getElementById('player-artist').textContent = info?.artist || 'Local file';
  const miniArt = document.getElementById('mini-art');
  miniArt.dataset.artTrack = currentTrack || '';
  if (visible) miniArt.src = cover(currentTrack); else miniArt.removeAttribute('src');
  const fullTitle = document.getElementById('now-title');
  if (fullTitle) {
    fullTitle.textContent = track?.title || 'Choose a song';
    document.getElementById('now-artist').textContent = info?.artist || 'Local file';
    document.querySelector('.now-heading span').textContent = info?.album || 'PLAYING FROM LIBRARY';
    const art = document.getElementById('now-art');
    art.dataset.artTrack = currentTrack; art.src = cover(currentTrack); art.alt = info?.art ? 'Album artwork' : 'Preview cover';
  }
  for (const id of ['play-pause', 'now-toggle']) {
    const toggle = document.getElementById(id); if (!toggle) continue;
    toggle.setAttribute('aria-label', audio.paused ? 'Play' : 'Pause');
    toggle.innerHTML = icon(audio.paused ? 'play' : 'pause'); toggle.disabled = !visible;
  }
  const seek = document.getElementById('seek');
  if (seek) {
    seek.disabled = !visible || !Number.isFinite(audio.duration) || audio.duration <= 0;
    seek.max = Number.isFinite(audio.duration) ? audio.duration : 0;
    seek.value = audio.currentTime;
    document.getElementById('elapsed').textContent = time(audio.currentTime);
    document.getElementById('duration').textContent = time(audio.duration);
  }
  const shuffled = document.getElementById('now-shuffle');
  if (shuffled) { shuffled.setAttribute('aria-pressed', String(shuffle)); shuffled.classList.toggle('enabled', shuffle); }
  for (const button of content.querySelectorAll('[data-track]')) button.classList.toggle('playing', button.dataset.track === currentTrack);
}
function stopAudio() { playAttempt++; audio.pause(); audio.removeAttribute('src'); audio.load(); currentTrack = null; playbackQueue = []; updatePlayer(); }
async function playTrack(id) {
  if (state.mode !== 'local' || !resources.has(id)) return;
  if (currentTrack !== id) { currentTrack = id; audio.src = resources.get(id); }
  if (audio.ended) audio.currentTime = 0;
  const attempt = ++playAttempt;
  updatePlayer();
  try { await audio.play(); if (state.mode !== 'local') audio.pause(); }
  catch (error) { if (attempt === playAttempt && error.name !== 'AbortError') notify('This file could not play. Try an MP3 or WAV supported by your browser.'); }
  updatePlayer();
}
function togglePlayback() {
  if (state.mode !== 'local' || !currentTrack) return;
  if (!audio.paused) { playAttempt++; audio.pause(); } else playTrack(currentTrack);
}
for (const event of ['play', 'pause', 'timeupdate', 'durationchange', 'ended', 'loadedmetadata']) audio.addEventListener(event, () => {
  if (state.mode !== 'local' && !audio.paused) audio.pause();
  updatePlayer();
});
audio.addEventListener('ended', () => stepTrack(1, true));
audio.addEventListener('error', () => { audio.pause(); if (currentTrack) notify('This file could not play. Try an MP3 or WAV supported by your browser.'); updatePlayer(); });
picker.addEventListener('change', async () => {
  const files = [...picker.files]; picker.value = '';
  if (state.mode !== 'local') { notify('Return the library from the deck before adding songs.'); return; }
  const valid = files.filter(f => /\.(mp3|wav|m4a|aac|flac|ogg|opus|aiff|aif)$/i.test(f.name) || f.type.startsWith('audio/'));
  if (!valid.length) { if (files.length) notify('Choose an audio file such as MP3 or WAV.'); return; }
  const attempt = ++importAttempt;
  const prepared = await Promise.all(valid.map(async f => {
    try { return {file: f, info: await window.SereinLibrary.readMetadata(f)}; }
    catch { return {file: f, info: {}}; }
  }));
  // File-reading completion must not change a library now owned by a deck.
  if (attempt !== importAttempt || state.mode !== 'local') return;
  const imported = prepared.map(({file: f, info}) => {
    const id = `file-${++fileSequence}`;
    resources.set(id, URL.createObjectURL(f));
    if (info.art) info.art = URL.createObjectURL(new Blob([info.art.bytes], {type: info.art.mime}));
    metadata.set(id, info);
    return {id, title: info.title || (f.name.replace(/\.[^.]+$/, '') || f.name).slice(0, 300), detail: info.artist || 'Local file', source: 'file'};
  });
  if (state.library.some(t => t.source === 'demo')) { stopAudio(); if (page === 'now-playing') page = 'library'; }
  dispatch({type: 'SET_LIBRARY', library: [...state.library.filter(t => t.source !== 'demo'), ...imported]});
  const ids = new Set(state.library.map(t => t.id));
  collections = collections.map(c => ({...c, tracks: c.tracks.filter(id => ids.has(id))}));
  if (currentTrack) { playbackScope = playbackScope.filter(id => ids.has(id)); setQueue(currentTrack); }
  if (valid.length < files.length) notify('Audio files added. Other files were skipped.');
});
document.addEventListener('error', event => {
  const id = event.target?.dataset?.artTrack;
  const info = metadata.get(id);
  if (!info?.art) return;
  URL.revokeObjectURL(info.art); delete info.art;
  for (const img of document.querySelectorAll('[data-art-track]')) if (img.dataset.artTrack === id) { img.src = cover(id); img.alt = 'Preview cover'; }
}, true);
window.addEventListener('pagehide', () => { stopAudio(); for (const url of [...resources.values(), ...[...metadata.values()].map(t => t.art).filter(Boolean)]) if (url.startsWith('blob:')) URL.revokeObjectURL(url); });
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
  importAttempt++; stopAudio();
  if (dispatch({ type: 'PREPARE' })) { page = 'deck'; render(); simulateCompletion('PREPARED', 'PREPARE_FAILED'); }
}
function ownership() { return `<p class="ownership"><span class="dot"></span>Music access: ${flow.owner(state)}${state.mode === 'local' ? ' · on this device' : ' · simulated'}</p>`; }
function home() {
  return `<button class="feature" id="spotify"><span class="symbol" aria-hidden="true">♫</span><strong>Spotify</strong><small>Open the official app</small></button>
    <button class="feature library" id="open-library"><span class="symbol" aria-hidden="true">▤</span><strong>Library</strong><small>${state.library.length} local songs</small></button>${ownership()}`;
}
function songRows(ids) {
  const locked = state.mode !== 'local';
  return `<div class="song-list">${ids.map(id => state.library.find(t => t.id === id)).filter(Boolean).map(t => `<button class="track" data-track="${escapeHtml(t.id)}" ${locked ? 'disabled' : ''}>${artwork(t.id)}<span class="track-copy"><strong>${escapeHtml(t.title)}</strong><small>${escapeHtml(metadata.get(t.id)?.artist || t.detail)}</small></span><span class="track-more" aria-hidden="true">♫</span></button>`).join('')}</div>`;
}
function listControls(ids) {
  const disabled = state.mode !== 'local' || !ids.length;
  return `<div class="library-actions"><button id="library-play" class="library-play" ${disabled ? 'disabled' : ''}><span aria-hidden="true">${icon('play')}</span> Play</button><button id="library-shuffle" class="library-shuffle" ${disabled ? 'disabled' : ''}><span aria-hidden="true">${icon('shuffle')}</span> Shuffle</button></div>`;
}
function library() {
  const locked = state.mode !== 'local';
  const kind = libraryView === 'playlists' ? 'playlist' : 'setlist';
  const lists = collections.filter(c => c.kind === kind);
  return `<div class="library-heading"><h2 class="page-title">Library</h2><button class="add" id="add-songs" ${locked ? 'disabled' : ''}>Add songs</button></div>
    <div class="library-views" aria-label="Library views">${['songs','playlists','setlists'].map(v => `<button data-view="${v}" aria-pressed="${v === libraryView}">${v[0].toUpperCase()+v.slice(1)}</button>`).join('')}</div>
    ${locked ? '<p class="page-text">Local playback is paused while the library is with the deck.</p>' : ''}
    ${libraryView === 'songs' ? `<p class="library-count">${state.library.length} songs · On this device</p>${listControls(state.library.map(t => t.id))}${songRows(state.library.map(t => t.id))}` : `<button id="new-list" class="quiet" ${locked ? 'disabled' : ''}>New ${kind}</button>${lists.length ? lists.map(c => `<button class="track collection-row" data-collection="${c.id}">${artwork(c.tracks[0])}<span class="track-copy"><strong>${escapeHtml(c.name)}</strong><small>${c.tracks.length} songs</small></span><span aria-hidden="true">›</span></button>`).join('') : `<p class="empty-list">No ${libraryView} yet.</p>`}`}
    ${locked ? '<button class="quiet" id="show-deck">View connection</button>' : ''}`;
}
function collection() {
  const c = selectedCollection(); if (!c) return library();
  const locked = state.mode !== 'local';
  return `<button class="back-link" id="back-library">‹ Library</button><div class="library-heading"><h2 class="page-title collection-title">${escapeHtml(c.name)}</h2><button class="add" id="edit-list" ${locked ? 'disabled' : ''}>Edit</button></div>
    <p class="library-count">${c.kind === 'setlist' ? 'Setlist' : 'Playlist'} · ${c.tracks.length} songs</p>${listControls(c.tracks)}
    ${songRows(c.tracks)}${c.tracks.length && !locked ? `<details class="order-list" ${orderExpanded ? 'open' : ''}><summary>Song order</summary>${c.tracks.map((id, i) => `<div class="order-row"><span>${i+1}. ${escapeHtml(state.library.find(t => t.id === id)?.title || '')}</span><button class="order-button" data-move="${i}" data-direction="-1" aria-label="Move song ${i+1} up" ${i === 0 ? 'disabled' : ''}>↑</button><button class="order-button" data-move="${i}" data-direction="1" aria-label="Move song ${i+1} down" ${i === c.tracks.length-1 ? 'disabled' : ''}>↓</button></div>`).join('')}</details>` : ''}`;
}
function editCollection() {
  const existing = collections.find(c => c.id === editingId);
  const kind = existing?.kind || (libraryView === 'playlists' ? 'playlist' : 'setlist');
  const locked = state.mode !== 'local';
  return `<button class="back-link" id="cancel-list">‹ Back</button><h2 class="page-title">${existing ? 'Edit' : 'New'} ${kind}</h2><form id="collection-form"><label class="name-label" for="list-name">Name</label><input class="list-name" id="list-name" name="name" required maxlength="80" value="${escapeHtml(existing?.name || '')}" ${locked ? 'disabled' : ''}>
    <p class="small">Choose songs</p>${state.library.map(t => `<label class="song-choice"><input type="checkbox" name="song" value="${escapeHtml(t.id)}" ${existing?.tracks.includes(t.id) ? 'checked' : ''} ${locked ? 'disabled' : ''}>${artwork(t.id)}<span>${escapeHtml(t.title)}</span></label>`).join('')}
    <button class="primary" type="submit" ${locked ? 'disabled' : ''}>Save ${kind}</button></form>`;
}
function nowPlaying() {
  return `<section class="now-playing" aria-label="Now playing"><div class="now-heading"><button id="close-player" class="icon-button" aria-label="Back to Library">${icon('down')}</button><span>PLAYING FROM LIBRARY</span></div>
    <img id="now-art" class="now-art" alt="Preview cover"><h2 id="now-title" class="now-title"></h2><p id="now-artist" class="now-artist"></p>
    <input id="seek" type="range" min="0" max="0" value="0" step="0.1" aria-label="Playback position" disabled>
    <div class="time"><span id="elapsed">0:00</span><span id="duration">0:00</span></div>
    <div class="transport"><button id="now-shuffle" class="icon-button" aria-label="Shuffle" aria-pressed="false">${icon('shuffle')}</button><button id="previous" class="icon-button" aria-label="Previous song">${icon('previous')}</button><button id="now-toggle" class="now-toggle" aria-label="Pause">Ⅱ</button><button id="next" class="icon-button" aria-label="Next song">${icon('next')}</button></div></section>`;
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
  if (page === 'now-playing' && (!currentTrack || state.mode !== 'local')) page = 'library';
  content.innerHTML = page === 'home' ? home() : page === 'library' ? library() : page === 'now-playing' ? nowPlaying() : page === 'collection' ? collection() : page === 'edit-collection' ? editCollection() : deck();
  for (const tab of ['home', 'library', 'deck']) {
    const node = document.getElementById(`${tab}-tab`);
    node.classList.toggle('active', tab === (['now-playing', 'collection', 'edit-collection'].includes(page) ? 'library' : page));
    if (tab === (['now-playing', 'collection', 'edit-collection'].includes(page) ? 'library' : page)) node.setAttribute('aria-current', 'page'); else node.removeAttribute('aria-current');
  }
  document.getElementById('attach').disabled = state.mode !== 'ready';
  document.getElementById('interrupt').disabled = state.mode !== 'deck';
  document.getElementById('fail').disabled = state.mode !== 'local';
  document.getElementById('failure-setting').textContent = failNext ? 'Next preparation will fail, so you can try recovery.' : 'Preparation will succeed in this demo.';
  bind('spotify', () => notify('Preview only. On the Android device, this opens the official Spotify app.'));
  bind('open-library', () => { page = 'library'; render(); });
  bind('show-deck', () => { page = 'deck'; render(); });
  bind('prepare', prepare);
  bind('library-play', () => startLibrary(false));
  bind('library-shuffle', () => startLibrary(true));
  bind('close-player', () => { page = playerReturn; render(); });
  bind('now-toggle', togglePlayback);
  bind('previous', () => stepTrack(-1));
  bind('next', () => stepTrack(1));
  bind('now-shuffle', () => { shuffle = !shuffle; setQueue(currentTrack); updatePlayer(); });
  document.getElementById('seek')?.addEventListener('input', event => { if (state.mode === 'local' && Number.isFinite(audio.duration)) audio.currentTime = Number(event.target.value); });
  bind('add-songs', () => { if (state.mode === 'local') picker.click(); });
  for (const button of content.querySelectorAll('[data-view]')) button.addEventListener('click', () => { libraryView = button.dataset.view; render(); });
  for (const button of content.querySelectorAll('[data-collection]')) button.addEventListener('click', () => { collectionId = button.dataset.collection; orderExpanded = false; page = 'collection'; render(); });
  bind('new-list', () => { if (state.mode !== 'local') return; editingId = null; page = 'edit-collection'; render(); document.getElementById('list-name').focus(); });
  content.querySelector('.order-list')?.addEventListener('toggle', event => { orderExpanded = event.target.open; });
  bind('edit-list', () => { if (state.mode !== 'local') return; editingId = collectionId; page = 'edit-collection'; render(); });
  bind('cancel-list', () => { page = editingId ? 'collection' : 'library'; render(); });
  bind('back-library', () => { page = 'library'; render(); });
  document.getElementById('collection-form')?.addEventListener('submit', event => {
    event.preventDefault(); if (state.mode !== 'local') return;
    const name = document.getElementById('list-name').value.trim(); if (!name) { document.getElementById('list-name').focus(); return; }
    const chosen = [...content.querySelectorAll('input[name="song"]:checked')].map(n => n.value);
    const existing = collections.find(c => c.id === editingId);
    const old = existing?.tracks || [];
    const tracks = [...old.filter(id => chosen.includes(id)), ...chosen.filter(id => !old.includes(id))];
    const saved = {id: existing?.id || `list-${++collectionSequence}`, name, kind: existing?.kind || (libraryView === 'playlists' ? 'playlist' : 'setlist'), tracks};
    collections = [...collections.filter(c => c.id !== saved.id), saved];
    collectionId = saved.id; page = 'collection'; render();
  });
  for (const button of content.querySelectorAll('[data-move]')) button.addEventListener('click', () => {
    if (state.mode !== 'local') return;
    const c = selectedCollection(); const i = Number(button.dataset.move); const target = i + Number(button.dataset.direction);
    if (!c || target < 0 || target >= c.tracks.length) return;
    const tracks = [...c.tracks]; [tracks[i], tracks[target]] = [tracks[target], tracks[i]];
    collections = collections.map(list => list.id === c.id ? {...list, tracks} : list); render();
  });
  bind('cancel', () => { if (dispatch({ type: 'CANCEL' })) simulateCompletion('RESTORED'); });
  bind('ejected', () => { if (dispatch({ type: 'EJECT_ACK' })) simulateCompletion('RESTORED'); });
  bind('recover', () => {
    const run = state.run;
    const button = document.getElementById('recover');
    button.disabled = true; button.textContent = 'Checking…';
    setTimeout(() => { if (state.mode === 'recovery' && state.run === run) dispatch({ type: 'RECOVERED', run }); }, 850);
  });
  for (const button of content.querySelectorAll('[data-track]')) button.addEventListener('click', () => openTrack(button.dataset.track));
  updatePlayer();
}
for (const tab of ['home', 'library', 'deck']) bind(`${tab}-tab`, () => { page = tab; render(); });
bind('play-pause', togglePlayback);
bind('open-player', () => { if (currentTrack && state.mode === 'local') { page = 'now-playing'; render(); } });
bind('attach', () => dispatch({ type: 'ATTACH' }));
bind('interrupt', () => dispatch({ type: 'CABLE_LOST' }));
bind('fail', () => { failNext = !failNext; render(); });
render();

