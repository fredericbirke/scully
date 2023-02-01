import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogListComponent } from './blog-list/blog-list.component.js';
import { BlogComponent } from './blog.component.js';
import { BlogHolderComponent } from './blog-holder.component.js';

const routes: Routes = [
  { path: '', component: BlogListComponent, pathMatch: 'full' },
  {
    path: '',
    component: BlogHolderComponent,
    children: [
      {
        path: ':slug',
        component: BlogComponent,
      },
      {
        path: '**',
        component: BlogComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
