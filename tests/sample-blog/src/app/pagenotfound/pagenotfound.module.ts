import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagenotfoundRoutingModule } from './pagenotfound-routing.module.js';
import { PagenotfoundComponent } from './pagenotfound.component.js';

@NgModule({
  declarations: [PagenotfoundComponent],
  imports: [CommonModule, PagenotfoundRoutingModule],
})
export class PagenotfoundModule {}
