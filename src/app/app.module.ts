import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { Ng5SliderModule } from 'ng5-slider';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { PlayerDetailComponent } from './universe/playerdetail/player-detail.component';
import { UniverseChartComponent } from './universe/universe-chart/universe-chart.component';
import { UniverseFilterContentComponent } from './universe/universe-filter/universe-filter-content/universe-filter-content.component';
import { UniverseFilterComponent } from './universe/universe-filter/universe-filter.component';
import { UniverseComponent } from './universe/universe.component';

const routes: Routes = [
  {
    path: 'summary',
    component: UniverseComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    UniverseComponent,
    UniverseChartComponent,
    UniverseFilterComponent,
    UniverseFilterContentComponent,
    PlayerDetailComponent
  ],
  imports: [
    MatSelectModule,
    MatButtonModule,
    Ng5SliderModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forRoot(routes)
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule {}
