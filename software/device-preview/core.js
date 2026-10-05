(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.SereinFlow = api;
})(typeof globalThis === 'object' ? globalThis : this, function () {
  'use strict';
  const tracks = Object.freeze([
    Object.freeze({ id: 'funky-house', title: 'Funky House', detail: 'Of Far Different Nature · CC0', source: 'demo' }),
    Object.freeze({ id: 'synthwave-house-loop', title: 'Synthwave House Loop', detail: 'Fupi · CC0', source: 'demo' })
  ]);
  function freezeLibrary(library) {
    if (!Array.isArray(library)) throw new Error('Invalid library.');
    const ids = new Set();
    return Object.freeze(library.map(track => {
      if (!track || typeof track.id !== 'string' || !track.id || ids.has(track.id)
        || typeof track.title !== 'string' || !track.title || track.title.length > 300
        || typeof track.detail !== 'string' || typeof track.source !== 'string') throw new Error('Invalid track metadata.');
      ids.add(track.id);
      return Object.freeze({ id: track.id, title: track.title, detail: track.detail, source: track.source });
    }));
  }
  function initialState(library = tracks) {
    return Object.freeze({ mode: 'local', run: 0, connected: false,
      library: freezeLibrary(library), session: Object.freeze([]) });
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
      case 'SET_LIBRARY':
        require(state.mode === 'local', 'The library is locked until Serein has it back.');
        next.library = freezeLibrary(event.library);
        break;
      case 'PREPARE':
        require(state.mode === 'local' && state.library.length > 0, 'Add music before preparing the library.');
        next = { ...next, mode: 'preparing', run: state.run + 1, session: state.library.map(track => track.id) };
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
    next.session = Object.freeze([...next.session]);
    return Object.freeze(next);
  }
  return Object.freeze({ tracks, initialState, owner, transition });
});
