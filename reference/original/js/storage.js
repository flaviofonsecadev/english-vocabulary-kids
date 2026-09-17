// DataStore: salvamento local em arquivo JSON na pasta do projeto
// Usa a File System Access API (Chrome/Edge). Se indisponível, usa localStorage como fallback.
// O "handle" da pasta escolhida fica guardado no IndexedDB para reconectar automaticamente.

const DataStore = (function () {
    const FILE_NAME = 'turmas.json';
    const LS_BACKUP_KEY = 'english-games-turmas';
    const IDB_NAME = 'english-games-kids';
    const IDB_STORE = 'settings';
    const IDB_KEY = 'dirHandle';

    let dirHandle = null;
    let dirName = null;
    let mode = 'local';
    let saveChain = Promise.resolve();

    function supportsFileSystemApi() {
        return typeof window !== 'undefined' && 'showDirectoryPicker' in window;
    }

    function idbOpen() {
        return new Promise((resolve, reject) => {
            const req = indexedDB.open(IDB_NAME, 1);
            req.onupgradeneeded = () => {
                const db = req.result;
                if (!db.objectStoreNames.contains(IDB_STORE)) {
                    db.createObjectStore(IDB_STORE);
                }
            };
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        });
    }

    function idbSet(key, value) {
        return idbOpen().then(db => new Promise((resolve, reject) => {
            const tx = db.transaction(IDB_STORE, 'readwrite');
            tx.objectStore(IDB_STORE).put(value, key);
            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error);
        }));
    }

    function idbGet(key) {
        return idbOpen().then(db => new Promise((resolve, reject) => {
            const tx = db.transaction(IDB_STORE, 'readonly');
            const req = tx.objectStore(IDB_STORE).get(key);
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        }));
    }

    async function reconnectSavedFolder() {
        if (!supportsFileSystemApi()) return false;
        try {
            const saved = await idbGet(IDB_KEY);
            if (!saved) return false;
            dirHandle = saved;
            const perm = await dirHandle.requestPermission({ mode: 'readwrite' });
            if (perm !== 'granted') return false;
            dirName = dirHandle.name;
            mode = 'file';
            return true;
        } catch (e) {
            return false;
        }
    }

    async function connectFolder() {
        if (!supportsFileSystemApi()) {
            throw new Error('Seu navegador não suporta salvar na pasta (use Chrome ou Edge).');
        }
        dirHandle = await window.showDirectoryPicker({ mode: 'readwrite' });
        await idbSet(IDB_KEY, dirHandle);
        dirName = dirHandle.name;
        mode = 'file';
        return dirName;
    }

    async function readFile() {
        if (mode !== 'file' || !dirHandle) return null;
        try {
            const fileHandle = await dirHandle.getFileHandle(FILE_NAME);
            const file = await fileHandle.getFile();
            const text = await file.text();
            return text ? JSON.parse(text) : null;
        } catch (e) {
            return null;
        }
    }

    async function writeFile(data) {
        if (mode !== 'file' || !dirHandle) return false;
        try {
            const fileHandle = await dirHandle.getFileHandle(FILE_NAME, { create: true });
            const writable = await fileHandle.createWritable();
            await writable.write(JSON.stringify(data, null, 2));
            await writable.close();
            return true;
        } catch (e) {
            return false;
        }
    }

    async function load() {
        mode = 'local';
        dirName = null;
        const connected = await reconnectSavedFolder();
        if (connected) {
            const data = await readFile();
            if (data) return { data, mode: 'file' };
        }
        const ls = localStorage.getItem(LS_BACKUP_KEY);
        if (ls) {
            try {
                return { data: JSON.parse(ls), mode: 'local' };
            } catch (e) { /* ignora JSON corrompido */ }
        }
        return { data: null, mode: 'local' };
    }

    function save(data) {
        // Espelho síncrono no localStorage (backup) + gravação async do arquivo
        try {
            localStorage.setItem(LS_BACKUP_KEY, JSON.stringify(data));
        } catch (e) { /* armazenamento cheio: ignora */ }

        if (mode !== 'file' || !dirHandle) {
            return Promise.resolve(false);
        }
        saveChain = saveChain.then(() => writeFile(data)).catch(() => false);
        return saveChain;
    }

    function status() {
        if (mode === 'file' && dirName) {
            return { mode: 'file', dirName: dirName, fileName: FILE_NAME };
        }
        return { mode: 'local' };
    }

    return {
        supportsFileSystemApi: supportsFileSystemApi,
        connectFolder: connectFolder,
        load: load,
        save: save,
        status: status
    };
})();