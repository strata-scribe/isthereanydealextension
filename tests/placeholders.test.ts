import { describe, it, expect } from 'vitest';

describe('Placeholders', () => {
  it('should have background entry point', async () => {
    const mod = await import('../src/background/index.ts');
    expect(mod).toBeDefined();
  });

  it('should have content entry point', async () => {
    const mod = await import('../src/content/index.tsx');
    expect(mod).toBeDefined();
  });

  it('should have popup entry point', async () => {
    const mod = await import('../src/popup/index.tsx');
    expect(mod).toBeDefined();
  });
});
