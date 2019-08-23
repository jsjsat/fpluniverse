import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PlayerDetailComponent } from './playerdetail/player-detail.component';
import { UniverseChartComponent } from './universe-chart/universe-chart.component';
import { UniverseFilterContentComponent } from './universe-filter/universe-filter-content/universe-filter-content.component';
import { UniverseFilterComponent } from './universe-filter/universe-filter.component';
import { UniverseRouting } from './universe.routing';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Ng5SliderModule } from 'ng5-slider';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { UniverseComponent } from './component/universe.component';

@NgModule({
  imports: [
    CommonModule,
    UniverseRouting,
    MatSelectModule,
    MatButtonModule,
    Ng5SliderModule,
    HttpClientModule,
    SharedModule,
  ],
  declarations: [
    UniverseComponent,
    UniverseChartComponent,
    UniverseFilterComponent,
    UniverseFilterContentComponent,
    PlayerDetailComponent]
})
export class UniverseModule { }
