import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoRoutingModule } from './demo-routing.module.js';
import { DemoComponent } from './demo.component.js';

@NgModule({
  declarations: [DemoComponent],
  imports: [CommonModule, DemoRoutingModule],
})
export class DemoModule {}
