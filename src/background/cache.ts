export interface CacheEntry<T> {
  value: T;
  timestamp: number;
  lastAccessed: number;
}

export class LRUCache<T> {
  private storageKey: string;
  private maxItems: number;
  private ttl: number;
  private lock: Promise<void> = Promise.resolve();

  constructor(storageKey: string = 'lru_cache', maxItems: number = 100, ttl: number = 15 * 60 * 1000) {
    this.storageKey = storageKey;
    this.maxItems = maxItems;
    this.ttl = ttl;
  }

  private async getCacheData(): Promise<Record<string, CacheEntry<T>>> {
    return new Promise((resolve) => {
      chrome.storage.local.get([this.storageKey], (result) => {
        resolve(result[this.storageKey] || {});
      });
    });
  }

  private async setCacheData(data: Record<string, CacheEntry<T>>): Promise<void> {
    return new Promise((resolve) => {
      chrome.storage.local.set({ [this.storageKey]: data }, () => resolve());
    });
  }

  private async withLock<R>(fn: () => Promise<R>): Promise<R> {
    const previousLock = this.lock;
    let resolveLock: () => void;
    this.lock = new Promise((resolve) => {
      resolveLock = resolve;
    });

    await previousLock;
    try {
      return await fn();
    } finally {
      resolveLock!();
    }
  }

  async get(key: string): Promise<T | null> {
    return this.withLock(async () => {
      const data = await this.getCacheData();
      const entry = data[key];

      if (!entry) {
        return null;
      }

      const now = Date.now();
      if (now - entry.timestamp > this.ttl) {
        delete data[key];
        await this.setCacheData(data);
        return null;
      }

      entry.lastAccessed = now;
      data[key] = entry;
      await this.setCacheData(data);

      return entry.value;
    });
  }

  async set(key: string, value: T): Promise<void> {
    return this.withLock(async () => {
      const data = await this.getCacheData();
      const now = Date.now();

      data[key] = {
        value,
        timestamp: now,
        lastAccessed: now
      };

      const keys = Object.keys(data);
      for (const k of keys) {
        if (now - data[k].timestamp > this.ttl) {
          delete data[k];
        }
      }

      const remainingKeys = Object.keys(data);
      if (remainingKeys.length > this.maxItems) {
        remainingKeys.sort((a, b) => data[a].lastAccessed - data[b].lastAccessed);
        const keysToRemove = remainingKeys.slice(0, remainingKeys.length - this.maxItems);
        for (const k of keysToRemove) {
          delete data[k];
        }
      }

      await this.setCacheData(data);
    });
  }

  async clear(): Promise<void> {
    return this.withLock(async () => {
      await this.setCacheData({});
    });
  }
}
