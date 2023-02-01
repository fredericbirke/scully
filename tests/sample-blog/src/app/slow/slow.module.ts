import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SlowRoutingModule } from './slow-routing.module.js';
import { SlowComponent } from './slow.component.js';

@NgModule({
  declarations: [SlowComponent],
  imports: [CommonModule, SlowRoutingModule],
})
export class SlowModule {}
