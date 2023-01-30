/**
 * Temporary file to do some quick testing, and to prevent the Scully:
 *   Project undifined is not configured for use with Scully message
 */

import { ScullyConfig } from '@scullyio/scully';
import { baseHrefRewrite } from '@scullyio/scully-plugin-base-href-rewrite';
import { docLink } from '@scullyio/scully-plugin-docs-link-update';
import { copyToClipboard } from '@scullyio/scully-plugin-copy-to-clipboard';
import '@scullyio/scully-plugin-extra';
import '@scullyio/scully-plugin-extra-data';
import '@scullyio/scully-plugin-remove-scripts';
import '@scullyio/scully-plugin-puppeteer';
import { removeScripts } from '@scullyio/scully-plugin-remove-scripts';

export const config = {
  projectName: 'sample-blog',
  proxyConfig: 'proxy.conf.cjs',
  outDir: './dist/static/sample-blog',
  defaultPostRenderers: [copyToClipboard],
  routes: {
    '/demo/:id': {
      type: 'extra',
      numberOfPages: 5,
    },
    '/home/:topLevel': {
      type: 'extraData',
      data: [
        { title: 'All routes in application', data: 'all' },
        { title: 'Unpublished routes in application', data: 'unpublished' },
        { title: 'Toplevel routes in application', data: '' },
      ],
    },
    '/user/:userId': {
      // Type is mandatory
      type: 'json',
      /**
       * Every parameter in the route must exist here
       */
      userId: {
        url: 'http://localhost:8200/users',
        resultsHandler: (raw: any[]) => raw.filter((row) => row.id < 5),
        property: 'id',
      },
    },
    // '/content/:slug': {
    //   type: 'customContent'
    // },
    '/content/hello': {
      type: 'default',
      postRenderers: ['contentText'],
      contentType: 'html',
      content: '<h3>Hello!</h3>',
    },
    '/content/there': {
      type: 'default',
      postRenderers: ['contentText'],
      contentType: 'md',
      // content: '# blah'
      content: () => {
        return '<h2>Content generated from function</h2>';
      },
    },
    '/user/:userId/post/:postId': {
      // Type is mandatory
      type: 'json',
      /**
       * Every parameter in the route must exist here
       */
      userId: {
        url: 'http://localhost:8200/users',
        resultsHandler: (raw: any[]) => raw.filter((row) => row.id < 3),
        property: 'id',
      },
      postId: {
        url: 'http://localhost:8200/posts?userId=${userId}',
        property: 'id',
      },
    },
    '/user/:userId/friend/:friendCode': {
      type: 'ignored',
      // type:'json',
      userId: {
        url: 'http://localhost:8200/users',
        resultsHandler: (raw: any[]) => raw.filter((row) => row.id < 3),
        property: 'id',
      },
      friendCode: {
        url: 'http://localhost:8200/users?userId=${userId}',
        property: 'id',
      },
    },
    '/blog/:slug': {
      type: 'contentFolder',
      postRenderers: [docLink],
      slug: {
        folder: './tests/assets/blog-files',
      },
    },
    // '/slow': {
    //   type: FlashPrevention,
    //   postRenderers: [FlashPrevention]
    // },
    '/manualIdle': {
      type: 'default',
      manualIdleCheck: true,
    },
    '/someRoute': {
      type: 'ignored',
    },
    '/basehref': {
      type: 'default',
      postRenderers: [baseHrefRewrite],
      baseHref: '/basehref/',
    },
    '/basehref/rewritten': {
      type: 'default',
      postRenderers: [baseHrefRewrite],
      baseHref: '/basehref/rewritten/',
    },
    '/basehref/removed': {
      type: 'default',
      postRenderers: [baseHrefRewrite],
      baseHref: '/basehref/removed/',
    },
    // '/test/fakeBase': {
    //   type: 'addFake'
    // },
    '/noScript': {
      type: 'default',
      postRenderers: [removeScripts],
    },
    // '/rawRoute': {
    //   type: 'rawTest',
    //   url: 'http://localhost:8200/users/1/raw'
    // }
  },
} as ScullyConfig;
