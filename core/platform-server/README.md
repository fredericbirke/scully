# PlatformServer

This is the helper lib to be able to use platform-server to render your SSG during deploy time.
It is roughly 10x faster as it does not need to start a browser.

But it needs some buy-in from your code-base to be able to use it.

1. ESM only, so your app needs to use ESM imports (this means, `import { something } from './bla.js';` Notice the `.js`).
2. it needs to have an app.sps.module.ts file, which is the entry point for the server side rendering.
3. There is a `ScullyPlatformServerModule` that needs to be imported in the `AppSPSModule` (see below)
4. As there is no _real_ browser, some things might not work as expected. We did replace most common things, but we are not guaranteeing that everything will work.

## Sample app SPS module:

```ts
import { enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ScullyPlatformServerModule } from '@scullyio/platform-server';
import { AppComponent } from './app.component.js';
import { AppModule } from './app.module.js';

/**
 * the platform server should be running in production mode.
 */
enableProdMode();

@NgModule({
  imports: [BrowserModule.withServerTransition({ appId: 'serverApp' }), AppModule, ScullyPlatformServerModule],
  bootstrap: [AppComponent],
})
export default class AppSPSModule {}
```

(we are going to look into making this work for standalone apps as well, but for now, this is the only way to use it.)
