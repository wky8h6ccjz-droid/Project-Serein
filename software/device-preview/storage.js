(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.SereinStorage = api;
})(typeof globalThis === 'object' ? globalThis : this, function () {
  'use strict';
  function validate(value) {
    if (!value || value.version !== 1 || !Number.isSafeInteger(value.revision) || value.revision < 0
      || !Array.isArray(value.tracks) || !Array.isArray(value.collections)
      || !['local','preparing','ready','deck','returning','recovery'].includes(value.mode)) throw new Error('Saved library needs a newer app or is damaged.');
    const ids = new Set(), listIds = new Set();
    for (const t of value.tracks) {
      if (!t || typeof t.id !== 'string' || !t.id || ids.has(t.id) || typeof t.title !== 'string' || !t.title || t.title.length > 300
        || typeof t.detail !== 'string' || !['demo','file'].includes(t.source)
        || (t.source === 'file' && !(t.file instanceof Blob))
        || (t.art && (!(t.art instanceof Blob) || !['image/png','image/jpeg'].includes(t.art.type)))) throw new Error('Saved song is incomplete.');
      for (const key of ['artist','album']) if (t[key] !== undefined && (typeof t[key] !== 'string' || t[key].length > 300)) throw new Error('Invalid song details.');
      ids.add(t.id);
    }
    for (const c of value.collections) {
      if (!c || typeof c.id !== 'string' || !c.id || listIds.has(c.id) || !['playlist','setlist'].includes(c.kind)
        || typeof c.name !== 'string' || !c.name.trim() || c.name.length > 80 || !Array.isArray(c.tracks)
        || c.tracks.some(id => !ids.has(id)) || new Set(c.tracks).size !== c.tracks.length) throw new Error('Saved list is incomplete.');
      listIds.add(c.id);
    }
    if (![value.fileSequence, value.collectionSequence].every(n => Number.isSafeInteger(n) && n >= 0)) throw new Error('Invalid library identifiers.');
    return value;
  }
  async function open(indexed = globalThis.indexedDB) {
    if (!indexed) throw new Error('Browser storage unavailable.');
    const db = await new Promise((resolve, reject) => {
      const req = indexed.open('serein-device-preview', 1);
      req.onupgradeneeded = () => req.result.createObjectStore('library');
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
      req.onblocked = () => reject(new Error('Close other preview tabs to enable saving.'));
    });
    db.onversionchange = () => db.close();
    return {
      load: () => new Promise((resolve, reject) => {
        const tx = db.transaction('library', 'readonly'), req = tx.objectStore('library').get('current');
        req.onsuccess = () => { try { resolve(req.result ? validate(req.result) : null); } catch (error) { reject(error); } };
        req.onerror = () => reject(req.error);
      }),
      save: (snapshot, revision) => new Promise((resolve, reject) => {
        const checked = validate({...snapshot, version: 1, revision: revision + 1});
        const tx = db.transaction('library', 'readwrite'), store = tx.objectStore('library');
        const req = store.get('current'); let conflict = false;
        req.onsuccess = () => {
          if ((req.result?.revision || 0) !== revision) { conflict = true; tx.abort(); return; }
          store.put(checked, 'current');
        };
        tx.oncomplete = () => resolve(revision + 1);
        tx.onabort = () => { const error = conflict ? new Error('Another preview tab changed the library. Reload to continue.') : tx.error || new Error('Library could not be saved.'); if (conflict) error.name = 'LibraryConflict'; reject(error); };
        tx.onerror = () => { /* onabort reports the failure; the old snapshot stays intact. */ };
      }),
      close: () => db.close()
    };
  }
  return Object.freeze({open, validate});
});
