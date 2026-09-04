import { vi } from 'vitest';

const chromeMock = {
  runtime: {
    onInstalled: {
      addListener: vi.fn(),
    },
    onMessage: {
      addListener: vi.fn(),
    },
  },
  alarms: {
    create: vi.fn(),
    onAlarm: {
      addListener: vi.fn(),
    },
  },
  storage: {
    local: {
      set: vi.fn().mockImplementation((data, callback) => callback && callback()),
      get: vi.fn().mockImplementation((keys, callback) => callback && callback({})),
    },
  },
};

(global as any).chrome = chromeMock;
