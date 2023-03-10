/**
 * Temporary file to do some quick testing, and to prevent the Scully:
 *   Project undifined is not configured for use with Scully message
 */

import {
  ContentTextRoute,
  enableSPS,
  HandledRoute,
  httpGetJson,
  logError,
  registerPlugin,
  RouteConfig,
  ScullyConfig,
  setPluginConfig,
} from '@scullyio/scully';
import { baseHrefRewrite } from '@scullyio/scully-plugin-base-href-rewrite';
import { docLink } from '@scullyio/scully-plugin-docs-link-update';
import { copyToClipboard } from '@scullyio/scully-plugin-copy-to-clipboard';
import '@scullyio/scully-plugin-extra';
import '@scullyio/scully-plugin-extra-data';
import '@scullyio/scully-plugin-remove-scripts';
import '@scullyio/scully-plugin-puppeteer';
import { removeScripts } from '@scullyio/scully-plugin-remove-scripts';
import { getFlashPreventionPlugin } from '@scullyio/scully-plugin-flash-prevention';
import { JSDOM } from 'jsdom';
import { criticalCSS } from '@scullyio/scully-plugin-critical-css';

const FlashPrevention = getFlashPreventionPlugin();

setPluginConfig('md', { enableSyntaxHighlighting: true });
setPluginConfig(baseHrefRewrite, { href: '/' });

export const config = new Promise<ScullyConfig>((resolve) => {
  const config = {
    projectName: 'sample-blog',
    proxyConfig: 'proxy.conf.cjs',
    spsModulePath: './tests/sample-blog/src/app/app.sps.module.ts',
    outDir: './dist/static/sample-blog',
    extraRoutes: new Promise((resolve) => {
      resolve(['/exclude/present', '/test/fakeBase', '/content/hello', '/content/there', '/rawRoute']);
    }),
    defaultPostRenderers: [copyToClipboard, criticalCSS, 'seoHrefOptimize'],
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
      '/content/:slug': {
        type: 'customContent',
      },
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
          resultsHandler: (raw: any[]) => raw.filter((row) => row.id < 5),
          property: 'id',
        },
        postId: {
          url: 'http://localhost:8200/posts?userId=${userId}',
          property: 'id',
        },
      },
      '/user/:userId/friend/:friendCode': {
        type: 'ignored',
        userId: {
          url: 'http://localhost:8200/users',
          resultsHandler: (raw: any[]) => raw.filter((row) => row.id < 5),
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
      '/slow': {
        type: FlashPrevention,
        postRenderers: [FlashPrevention],
      },
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
      '/test/fakeBase': {
        type: 'addFake',
      },
      '/noScript': {
        type: 'default',
        postRenderers: [removeScripts],
      },
      '/rawRoute': {
        type: 'rawTest',
        url: 'http://localhost:8200/users/1/raw',
      },
    },
    guessParserOptions: {
      excludedFiles: ['tests/sample-blog/src/app/exclude/exclude-routing.module.ts'],
    },
  } as ScullyConfig;
  enableSPS();
  return resolve(config);
});

registerPlugin('postProcessByDom', 'rawTest', async (dom: JSDOM, r: HandledRoute) => {
  const {
    window: { document },
  } = dom;
  const content = (await httpGetJson(r.config?.url, {
    headers: {
      contentType: 'text/html',
      expectedContentType: 'text/html',
    },
  })) as string;
  document.write(content);
  return dom;
});

registerPlugin('router', 'rawTest', async (route, options: RouteConfig) => {
  return [{ route, type: 'rawTest', rawRoute: options?.url ?? 'https://scully.io/', manualIdleCheck: true }];
});

/** plugin to add routes that are not on the routeconfig, to test 404 */
const fakeroutePlugin = async (): Promise<HandledRoute[]> => [
  { route: '/test/fake1', type: 'addFake' },
  { route: '/test/fake2', type: 'addFake' },
];

registerPlugin('router', 'addFake', fakeroutePlugin);

registerPlugin('router', 'customContent', async (url) => {
  return ['one', 'two', 'tree', 'four', 'five'].map((key, number, arr) => {
    const route: ContentTextRoute = {
      type: 'customContent',
      postRenderers: ['contentText'],
      route: `/content/${key}`,
      contentType: 'html',
      content: `
        <h1> Sample page ${key}</h1>
        <p> This is sample page number ${number + 1}</p>
        <p><a href='/blog/page-1'>Blog page 1</a>
        </p>
        ${addLinks()}
        `,
    };

    function addLinks() {
      return arr
        .filter((row) => row !== key)
        .map((page) => `<a href='/content/${page}'>${page}</a>&nbsp;`)
        .join('');
    }

    return route;
  });
});
