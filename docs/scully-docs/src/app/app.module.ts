import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { AppRoutingModule } from './app-routing.module.js';
import { AppComponent } from './app.component.js';
import { LangSelectModule } from './components/lang-select/lang-select.module.js';
import { NavListModule } from './components/nav-list/nav-list.module.js';
import { HeaderModule } from './components/header/header.module.js';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HeaderModule,
    LangSelectModule,
    NavListModule,
    ScullyLibModule.forRoot({ useTransferState: true }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
