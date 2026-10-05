'use strict';
const flow = window.SereinFlow;
let state = flow.initialState();
let page = 'home';
let failNext = false;
let noticeTimer;
const content = document.getElementById('content');
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
  if (dispatch({ type: 'PREPARE' })) { page = 'deck'; render(); simulateCompletion('PREPARED', 'PREPARE_FAILED'); }
}
function ownership() { return `<p class="ownership"><span class="dot"></span>Music access: ${flow.owner(state)}${state.mode === 'local' ? ' · on this device' : ' · simulated'}</p>`; }
function home() {
  const busy = state.mode !== 'local';
  return `<p class="page-kicker">A little space for music</p><h2 class="page-title">Make it yours.</h2>
    <p class="page-text">Listen for yourself.<br>Bring your music to the decks.</p>
    <button class="feature" id="spotify"><span class="symbol" aria-hidden="true">♫</span><strong>Spotify</strong><small>Open the official app</small></button>
    <button class="feature library" id="open-library"><span class="symbol" aria-hidden="true">▤</span><strong>Your DJ library</strong><small>${flow.tracks.length} example tracks${busy ? ' · choices locked' : ' · ready to choose'}</small></button>
    ${ownership()}`;
}
function library() {
  const locked = state.mode !== 'local';
  return `<p class="page-kicker">Your owned music</p><h2 class="page-title">DJ library</h2>
    <p class="page-text">${locked ? 'Your choices stay locked until the library is safely back on Serein.' : 'Choose the tracks you want to carry. These are examples for this preview.'}</p>
    ${flow.tracks.map(t => `<label class="track"><input type="checkbox" data-track="${t.id}" ${state.selected.includes(t.id) ? 'checked' : ''} ${locked ? 'disabled' : ''}><span class="track-copy"><strong>${t.title}</strong><small>${t.detail}</small></span></label>`).join('')}
    <button class="primary" id="prepare" ${locked || !state.selected.length ? 'disabled' : ''}>Prepare ${state.selected.length} track${state.selected.length === 1 ? '' : 's'} for deck</button>
    ${locked ? '<button class="quiet" id="show-deck">View connection</button>' : ''}
    ${ownership()}`;
}
function deck() {
  const states = {
    local: ['⇄', 'Bring your music.', 'Prepare your selected tracks, then connect Serein to a deck.', 'Spotify downloads stay inside Spotify. Your DJ library uses separately owned music files.'],
    preparing: ['···', 'Getting ready…', 'Finishing changes and making the selected music ready for a deck.', 'Your music choices are temporarily locked.'],
    ready: ['↗', 'Ready to connect.', 'The music is prepared. Connect Serein to the deck when you’re ready.', 'Preview: use “Simulate deck connection” beside the device.'],
    deck: ['✓', 'Music with the deck.', 'Browse and play from the deck. Serein keeps your library unchanged while it is connected.', 'Eject Serein on the deck before returning to local use.'],
    returning: ['···', 'Bringing it back…', 'Making sure the deck has released the library before restoring access.', 'Music choices stay locked until this completes.'],
    recovery: ['!', 'Check before using.', 'The handoff did not finish normally. Keep the library locked while it is checked.', 'This demo simulates a check. A real device must verify the connection and filesystem before restoring access.']
  };
  const [icon, title, text, note] = states[state.mode];
  let actions = '';
  if (state.mode === 'local') actions = `<button class="primary" id="prepare" ${!state.selected.length ? 'disabled' : ''}>Prepare ${state.selected.length} track${state.selected.length === 1 ? '' : 's'}</button>`;
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
  bind('cancel', () => { if (dispatch({ type: 'CANCEL' })) simulateCompletion('RESTORED'); });
  bind('ejected', () => { if (dispatch({ type: 'EJECT_ACK' })) simulateCompletion('RESTORED'); });
  bind('recover', () => {
    const run = state.run;
    const button = document.getElementById('recover');
    button.disabled = true; button.textContent = 'Checking…';
    setTimeout(() => { if (state.mode === 'recovery' && state.run === run) dispatch({ type: 'RECOVERED', run }); }, 850);
  });
  for (const checkbox of content.querySelectorAll('[data-track]')) checkbox.addEventListener('change', () => dispatch({ type: 'SELECT', id: checkbox.dataset.track }));
}
for (const tab of ['home', 'library', 'deck']) bind(`${tab}-tab`, () => { page = tab; render(); });
bind('attach', () => dispatch({ type: 'ATTACH' }));
bind('interrupt', () => dispatch({ type: 'CABLE_LOST' }));
bind('fail', () => { failNext = !failNext; render(); });
render();
