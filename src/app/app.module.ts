import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SwLazyComponent } from './sw-lazy/sw-lazy.component';

@NgModule({
  declarations: [
    AppComponent,
    SwLazyComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
