import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UniverseComponent } from './universe/universe.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UniverseChartComponent } from './universe/universe-chart/universe-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    UniverseComponent,
    UniverseChartComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
