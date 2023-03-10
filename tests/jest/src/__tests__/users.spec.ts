import { readPage, replaceIndexNG } from '../test-config.helper';
import { describe, expect, it } from '@jest/globals';

describe('JsonPlugin: test user List', () => {
  it('Check clean blog index by scully', () => {
    const index: string = readPage('/user');
    const cleanIndex = replaceIndexNG(index);
    expect(cleanIndex).toMatchSnapshot();
  });
});
