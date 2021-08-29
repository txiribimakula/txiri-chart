import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TxiriChartModule } from 'txiri-chart';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TxiriChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
