import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { RouterModule, Routes } from "@angular/router";
import { UniverseChartComponent } from "./universe/universe-chart/universe-chart.component";
import { UniverseFilterComponent } from "./universe/universe-filter/universe-filter.component";
import { UniverseComponent } from "./universe/universe.component";
import { PlayerDetailComponent } from "./universe/playerdetail/player-detail.component";
import { SharedModule } from "./shared/shared.module";
import { MatSelectModule } from "@angular/material/select";
import { UniverseFilterContentComponent } from "./universe/universe-filter/universe-filter-content/universe-filter-content.component";

const routes: Routes = [
  {
    path: "summary",
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
    BrowserModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forRoot(routes)
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule {}
