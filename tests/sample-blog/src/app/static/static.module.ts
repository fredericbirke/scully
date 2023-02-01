import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaticRoutingModule } from './static-routing.module.js';
import { StaticComponent } from './static.component.js';

@NgModule({
  declarations: [StaticComponent],
  imports: [CommonModule, StaticRoutingModule],
})
export class StaticModule {}
