import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManualIdleRoutingModule } from './manual-idle-routing.module.js';
import { ManualIdleComponent } from './manual-idle.component.js';

@NgModule({
  declarations: [ManualIdleComponent],
  imports: [CommonModule, ManualIdleRoutingModule],
})
export class ManualIdleModule {}
