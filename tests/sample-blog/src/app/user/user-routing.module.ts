import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component.js';
import { UsersComponent } from './users/users.component.js';
import { PostsComponent } from './posts/posts.component.js';
import { PostComponent } from './post/post.component.js';

const routes: Routes = [
  { path: '', component: UsersComponent },
  {
    path: ':userId',
    component: UserComponent,
    children: [
      { path: '', component: PostsComponent, pathMatch: 'full' },
      { path: 'friend/:friendCode', component: UserComponent },
      { path: 'post/:postId', component: PostComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
