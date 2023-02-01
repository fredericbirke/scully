import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PostComponent } from './post/post.component.js';
import { PostsComponent } from './posts/posts.component.js';
import { UserRoutingModule } from './user-routing.module.js';
import { UserComponent } from './user.component.js';
import { UsersComponent } from './users/users.component.js';

@NgModule({
  declarations: [UserComponent, UsersComponent, PostsComponent, PostComponent],
  imports: [CommonModule, UserRoutingModule],
})
export class UserModule {}
