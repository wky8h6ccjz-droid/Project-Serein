(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.SereinFlow = api;
})(typeof globalThis === 'object' ? globalThis : this, function () {
  'use strict';
  const tracks = Object.freeze([
    Object.freeze({ id: '01', title: 'After the rain', artist: 'Serein demo', detail: 'Example track · 122 BPM' }),
    Object.freeze({ id: '02', title: 'Night passage', artist: 'Serein demo', detail: 'Example track · 126 BPM' }),
    Object.freeze({ id: '03', title: 'First light', artist: 'Serein demo', detail: 'Example track · 120 BPM' })
  ]);
  function initialState() {
    return Object.freeze({ mode: 'local', run: 0, connected: false,
      selected: Object.freeze(tracks.map(t => t.id)), session: Object.freeze([]) });
  }
  function owner(state) {
    return state.mode === 'local' ? 'Serein' : state.mode === 'deck' ? 'Deck' : 'Locked';
  }
  function transition(state, event) {
    function require(condition, message) { if (!condition) throw new Error(message); }
    function completed(mode) {
      require(state.mode === mode && event.run === state.run, 'Completion does not match the current operation.');
    }
    let next = { ...state };
    switch (event.type) {
      case 'SELECT':
        require(state.mode === 'local', 'Music choices are locked until Serein has the library back.');
        require(tracks.some(t => t.id === event.id), 'Unknown track.');
        next.selected = state.selected.includes(event.id)
          ? state.selected.filter(id => id !== event.id) : [...state.selected, event.id];
        break;
      case 'PREPARE':
        require(state.mode === 'local' && state.selected.length > 0, 'Choose at least one track before preparing.');
        next = { ...next, mode: 'preparing', run: state.run + 1, session: [...state.selected] };
        break;
      case 'PREPARED': completed('preparing'); next.mode = 'ready'; break;
      case 'PREPARE_FAILED': completed('preparing'); next.mode = 'recovery'; break;
      case 'ATTACH':
        require(state.mode === 'ready', 'The library must be prepared before a deck can own it.');
        next = { ...next, mode: 'deck', connected: true };
        break;
      case 'CANCEL':
        require(['preparing', 'ready'].includes(state.mode), 'Eject on the deck before returning the library.');
        next = { ...next, mode: 'returning', run: state.run + 1 };
        break;
      case 'EJECT_ACK':
        require(state.mode === 'deck', 'No deck currently owns the library.');
        next = { ...next, mode: 'returning', connected: false, run: state.run + 1 };
        break;
      case 'RESTORED':
        completed('returning'); require(!state.connected, 'Host must release the library first.');
        next = { ...next, mode: 'local', session: [] };
        break;
      case 'RESTORE_FAILED': completed('returning'); next.mode = 'recovery'; break;
      case 'CABLE_LOST':
        require(state.mode === 'deck', 'No active deck connection to interrupt.');
        next = { ...next, mode: 'recovery', connected: false, run: state.run + 1 };
        break;
      case 'RECOVERED':
        completed('recovery'); require(!state.connected, 'Disconnect the host before recovery.');
        next = { ...next, mode: 'local', session: [] };
        break;
      default: throw new Error('Unknown event.');
    }
    next.selected = Object.freeze([...next.selected]);
    next.session = Object.freeze([...next.session]);
    return Object.freeze(next);
  }
  return Object.freeze({ tracks, initialState, owner, transition });
});
