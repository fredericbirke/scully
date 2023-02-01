import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { BlogListComponent } from './blog-list/blog-list.component.js';
import { BlogRoutingModule } from './blog-routing.module.js';
import { BlogComponent } from './blog.component.js';
import { BlogHolderComponent } from './blog-holder.component.js';

@NgModule({
  declarations: [BlogComponent, BlogListComponent, BlogHolderComponent],
  imports: [CommonModule, BlogRoutingModule, ScullyLibModule],
})
export class BlogModule {}
