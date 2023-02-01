import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'about',
    loadChildren: () => import('./about/about.module.js').then((m) => m.AboutModule),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./static/static.module.js').then((m) => m.StaticModule),
  },
  {
    path: 'blog',
    loadChildren: () => import('./blog/blog.module.js').then((m) => m.BlogModule),
  },
  {
    path: 'content',
    loadChildren: () => import('./content/content.module.js').then((m) => m.ContentModule),
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module.js').then((m) => m.UserModule),
  },
  {
    path: 'demo',
    loadChildren: () => import('./demo/demo.module.js').then((m) => m.DemoModule),
  },
  {
    path: 'exclude',
    loadChildren: () => import('./exclude/exclude.module.js').then((m) => m.ExcludeModule),
  },
  {
    path: 'slow',
    loadChildren: () => import('./slow/slow.module.js').then((m) => m.SlowModule),
  },
  {
    path: 'basehref',
    loadChildren: () => import('./basehref/basehref.module.js').then((m) => m.BaseHrefModule),
  },
  {
    path: 'manualIdle',
    loadChildren: () => import('./manual-idle/manual-idle.module.js').then((m) => m.ManualIdleModule),
  },
  {
    path: 'noScript',
    loadChildren: () => import('./noscript/noscript.module.js').then((m) => m.NoScriptModule),
  },
  {
    path: 'tssr',
    loadChildren: () => import('./tss-resolver/tss-resolver.module.js').then((m) => m.TssResolverModule),
  },
  {
    path: '**',
    loadChildren: () => import('./pagenotfound/pagenotfound.module.js').then((m) => m.PagenotfoundModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
