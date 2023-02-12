import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavItemComponent } from './navitem.js';

@NgModule({
  declarations: [NavItemComponent],
  exports: [NavItemComponent],
  imports: [CommonModule, RouterModule],
})
export class NavListModule {}
