import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { StoreModule } from '@ngrx/store';
import { Ng5SliderModule } from 'ng5-slider';
import { SharedModule } from '../shared/shared.module';
import { FILTER_STATE_STORE_TOKEN } from './+state/filter-state';
import { filterStateReducer } from './+state/filter-state.reducer';
import { UniverseComponent } from './component/universe.component';
import { PlayerDetailComponent } from './playerdetail/player-detail.component';
import { UniverseChartComponent } from './universe-chart/universe-chart.component';
import { UniverseFilterContentComponent } from './universe-filter/universe-filter-content/universe-filter-content.component';
import { UniverseFilterComponent } from './universe-filter/universe-filter.component';
import { UniverseRouting } from './universe.routing';

@NgModule({
  imports: [
    CommonModule,
    UniverseRouting,
    MatSelectModule,
    MatButtonModule,
    Ng5SliderModule,
    HttpClientModule,
    SharedModule,
    StoreModule.forFeature(FILTER_STATE_STORE_TOKEN, filterStateReducer),
  ],
  declarations: [
    UniverseComponent,
    UniverseChartComponent,
    UniverseFilterComponent,
    UniverseFilterContentComponent,
    PlayerDetailComponent],
})
export class UniverseModule { }
