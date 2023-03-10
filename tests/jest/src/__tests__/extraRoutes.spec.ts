import { readPage } from '../test-config.helper';
import { describe, expect, it } from '@jest/globals';

describe('extraRoutes', () => {
  it('should add extraRoutes into the routes to be rendered', () => {
    let fileExists = false;

    // The route /excluded/present was removed in the scully.sample-blog.config.guessParserOptions.excludedFiles
    // but then was added back in via the scully.sample-blog.config.extraRoutes. Since it is a valid route,
    // Angular can render it which means it should render
    try {
      readPage('exclude/present');
      fileExists = true;
    } catch ({ message, code, path }) {
      if ((message as string).includes('" not found at location "')) {
        fileExists = false;
      }
    }
    expect(fileExists).toBe(true);
  });
});
