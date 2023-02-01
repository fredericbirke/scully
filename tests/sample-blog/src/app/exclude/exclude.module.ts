import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExcludeRoutingModule } from './exclude-routing.module.js';
import { ExcludeComponent } from './exclude.component.js';

@NgModule({
  declarations: [ExcludeComponent],
  imports: [CommonModule, ExcludeRoutingModule],
})
export class ExcludeModule {}
