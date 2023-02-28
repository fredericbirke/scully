import { readPage, replaceIndexNG } from '../test-config.helper';
import { describe, expect, it } from '@jest/globals';

describe('customText plugin', () => {
  it('Check content generated form function', () => {
    const index: string = readPage('content/there');
    const cleanIndex = replaceIndexNG(index);
    expect(cleanIndex).toMatchSnapshot();
  });
});

describe('customText plugin', () => {
  it('Check contentPlugin render', () => {
    const index: string = readPage('content/two');
    const cleanIndex = replaceIndexNG(index);
    expect(cleanIndex).toMatchSnapshot();
  });
});
