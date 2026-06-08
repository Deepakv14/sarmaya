export type DiaryEntry = {
  id: string;
  userMessage: string;
  reply: {
    message: string;
    poetry: {
      included: boolean;
      type: "recommendation" | "quote" | null;
      poet: string | null;
      title: string | null;
      reason: string | null;
    };
  } | null;
  timestamp: number;
};

const DB_NAME = "SarmayaDiary";
const STORE_NAME = "entries";
const LOCAL_STORAGE_KEY = "sarmaya_entries";

let db: IDBDatabase | null = null;

async function initDB(): Promise<IDBDatabase> {
  if (db) return db;

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const database = (event.target as IDBOpenDBRequest).result;
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        const store = database.createObjectStore(STORE_NAME, {
          keyPath: "id",
        });
        store.createIndex("timestamp", "timestamp", { unique: false });
      }
    };
  });
}

export async function saveEntry(entry: DiaryEntry): Promise<void> {
  try {
    const database = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = database.transaction([STORE_NAME], "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(entry);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        saveToLocalStorage(entry);
        resolve();
      };
    });
  } catch (err) {
    console.warn("IndexedDB save failed, falling back to localStorage:", err);
    saveToLocalStorage(entry);
  }
}

export async function getRecentEntries(limit: number = 50): Promise<DiaryEntry[]> {
  try {
    const database = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = database.transaction([STORE_NAME], "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const index = store.index("timestamp");
      const range = IDBKeyRange.upperBound(Date.now());
      const request = index.getAll(range);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const results = (request.result as DiaryEntry[])
          .sort((a, b) => b.timestamp - a.timestamp)
          .slice(0, limit);
        resolve(results);
      };
    });
  } catch (err) {
    console.warn("IndexedDB read failed, falling back to localStorage:", err);
    return getFromLocalStorage(limit);
  }
}

export async function getAllEntries(): Promise<DiaryEntry[]> {
  try {
    const database = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = database.transaction([STORE_NAME], "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const results = (request.result as DiaryEntry[]).sort(
          (a, b) => b.timestamp - a.timestamp
        );
        resolve(results);
      };
    });
  } catch (err) {
    console.warn("IndexedDB read failed, falling back to localStorage:", err);
    return getFromLocalStorage();
  }
}

export async function deleteEntry(id: string): Promise<void> {
  try {
    const database = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = database.transaction([STORE_NAME], "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(id);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        deleteFromLocalStorage(id);
        resolve();
      };
    });
  } catch (err) {
    console.warn("IndexedDB delete failed, falling back to localStorage:", err);
    deleteFromLocalStorage(id);
  }
}

function saveToLocalStorage(entry: DiaryEntry): void {
  try {
    const entries = getFromLocalStorage();
    const filtered = entries.filter((e) => e.id !== entry.id);
    const updated = [entry, ...filtered].slice(0, 50);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn("localStorage save failed:", err);
  }
}

function getFromLocalStorage(limit?: number): DiaryEntry[] {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!stored) return [];
    const entries = JSON.parse(stored) as DiaryEntry[];
    return limit ? entries.slice(0, limit) : entries;
  } catch (err) {
    console.warn("localStorage read failed:", err);
    return [];
  }
}

function deleteFromLocalStorage(id: string): void {
  try {
    const entries = getFromLocalStorage();
    const filtered = entries.filter((e) => e.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
  } catch (err) {
    console.warn("localStorage delete failed:", err);
  }
}

export function generateId(): string {
  return `entry_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
