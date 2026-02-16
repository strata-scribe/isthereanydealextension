import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Manifest', () => {
  it('should exist', () => {
    const manifestPath = path.resolve(__dirname, '../manifest.json');
    expect(fs.existsSync(manifestPath)).toBe(true);
  });

  it('should be valid JSON and have required fields', () => {
    const manifestPath = path.resolve(__dirname, '../manifest.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
    expect(manifest.manifest_version).toBe(3);
    expect(manifest.name).toBeDefined();
    expect(manifest.version).toBeDefined();
  });
});
