import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FooterModule } from '../../components/footer/footer.module.js';
import { LandingRoutingModule } from './landing-routing.module.js';

import { LandingFeaturesComponent } from './components/features/features.component.js';
import { LandingIntroComponent } from './components/intro/intro.component.js';
import { LandingQuoteComponent } from './components/quote/quote.component.js';
import { LandingResourcesComponent } from './components/resources/resources.component.js';
import { LandingPageComponent } from './page/landing.component.js';

@NgModule({
  declarations: [
    LandingFeaturesComponent,
    LandingIntroComponent,
    LandingPageComponent,
    LandingQuoteComponent,
    LandingResourcesComponent,
  ],
  imports: [CommonModule, FooterModule, LandingRoutingModule],
})
export class LandingModule {}
