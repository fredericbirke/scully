import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScullyLibModule } from '@scullyio/ng-lib';

import { FooterModule } from '../../components/footer/footer.module.js';
import { DocsRoutingModule } from './docs-routing.module.js';

import { DocsPageComponent } from './page/docs.page.component.js';

@NgModule({
  declarations: [DocsPageComponent],
  imports: [CommonModule, ScullyLibModule, FooterModule, DocsRoutingModule],
})
export class DocsModule {}
