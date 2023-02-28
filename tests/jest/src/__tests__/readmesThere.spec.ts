import { readdirSync } from 'fs';
import { join } from 'path';
import { describe, expect, it } from '@jest/globals';

const startPath = join(__dirname, '../../../../docs');

describe('Check there are an overview.md in every folder', () => {
  const folders = [startPath, ...getFolders(startPath)];

  it('should have a readme file', () => {
    const mainFileName = 'overview.md';

    for (const folder of folders) {
      const entries = readdirSync(folder);
      const readmeFiles = entries.filter((file) => file === mainFileName);
      expect(readmeFiles).toContain(mainFileName);
    }
  });
});

export function getFolders(path: string): string[] {
  const entries = readdirSync(path, { withFileTypes: true });
  return entries.filter((folder) => folder.isDirectory()).map((folder) => `${path}/${folder.name}`);
}
