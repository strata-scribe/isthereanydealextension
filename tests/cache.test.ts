import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { LRUCache } from '../src/background/cache';

describe('LRUCache', () => {
  let cache: LRUCache<string>;
  let storage: Record<string, any> = {};

  beforeEach(() => {
    storage = {};
    const getMock = vi.fn().mockImplementation((keys, callback) => {
      if (Array.isArray(keys)) {
        const result: Record<string, any> = {};
        keys.forEach(key => {
          if (storage[key] !== undefined) {
            result[key] = storage[key];
          }
        });
        callback(result);
      } else {
        callback({});
      }
    });

    const setMock = vi.fn().mockImplementation((items, callback) => {
      Object.assign(storage, items);
      if (callback) callback();
    });

    vi.stubGlobal('chrome', {
      storage: {
        local: {
          get: getMock,
          set: setMock,
        }
      }
    });

    vi.useFakeTimers();
    cache = new LRUCache<string>('test_cache', 3, 1000); // Max 3 items, 1 second TTL
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('should store and retrieve values', async () => {
    await cache.set('key1', 'value1');
    const val = await cache.get('key1');
    expect(val).toBe('value1');
  });

  it('should return null for non-existent keys', async () => {
    const val = await cache.get('nonexistent');
    expect(val).toBeNull();
  });

  it('should expire items based on TTL', async () => {
    await cache.set('key1', 'value1');

    vi.advanceTimersByTime(500);
    let val = await cache.get('key1');
    expect(val).toBe('value1');

    vi.advanceTimersByTime(600);
    val = await cache.get('key1');
    expect(val).toBeNull();
  });

  it('should evict least recently used items when max items reached', async () => {
    await cache.set('key1', 'value1');
    vi.advanceTimersByTime(10);
    await cache.set('key2', 'value2');
    vi.advanceTimersByTime(10);
    await cache.set('key3', 'value3');

    // Access key1 to make it most recently used
    vi.advanceTimersByTime(10);
    await cache.get('key1');

    vi.advanceTimersByTime(10);
    await cache.set('key4', 'value4'); // Should evict key2, which is now LRU

    const val1 = await cache.get('key1');
    const val2 = await cache.get('key2');
    const val3 = await cache.get('key3');
    const val4 = await cache.get('key4');

    expect(val1).toBe('value1');
    expect(val2).toBeNull();
    expect(val3).toBe('value3');
    expect(val4).toBe('value4');
  });

  it('should clear the cache', async () => {
    await cache.set('key1', 'value1');
    await cache.clear();
    const val = await cache.get('key1');
    expect(val).toBeNull();
  });
});
