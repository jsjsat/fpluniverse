import { Component, OnDestroy, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { FilterState } from "../+state/filter-state";
import { FilterStateFacadeService } from "../+state/filter-state-facade.service";
import { TEAMS, MODES, POSITIONS, COSTS } from "src/app/shared/translate";
import { stringify } from "querystring";
import { values } from "d3";

@Component({
  selector: "app-universe",
  templateUrl: "./universe.component.html",
  styleUrls: ["./universe.component.css"]
})
export class UniverseComponent implements OnInit, OnDestroy {
  onDestroy = new Subject();

  public constructor(
    private activatedRoute: ActivatedRoute,
    private store: FilterStateFacadeService,
    private location: Location
  ) {
    this.putInitialStateIntoStore();
    this.putStateIntoUrlWhenStoreChanges();
  }

  ngOnInit(): void {}
  putInitialStateIntoStore() {
    let queryParams = this.activatedRoute.snapshot.queryParamMap;
    console.log(queryParams);
    let team = queryParams.get("team");
    let position = queryParams.get("position");
    let maxprice = queryParams.get("maxprice");
    let mode = queryParams.get("mode");

    let teamIdx = -1;
    let posIdx = -1;
    let maxPrice = COSTS[0];
    let modeX = MODES[0];

    if (team) {
      COSTS.indexOf((maxprice as unknown) as number);
    }
  }

  putStateIntoUrlWhenStoreChanges() {
    this.store.filterState$
      .pipe(takeUntil(this.onDestroy))
      .subscribe(filterState => {
        this.addToUrl(filterState);
      });
  }
  addToUrl(filterState: FilterState) {
    let params: Map<string, string> = new Map<string, string>();

    let mode = filterState.mode;
    if (mode != MODES[0]) {
      params.set("mode", mode);
    }

    let teamId = filterState.team;
    if (teamId != -1) {
      let team = TEAMS[teamId];
      params.set("team", team);
    }

    let posId = filterState.position;
    if (posId != -1) {
      let position = POSITIONS[posId];
      params.set("position", position);
    }

    let maxPrice = filterState.maxPrice;
    if (maxPrice != COSTS[0]) {
      params.set("maxprice", "" + maxPrice);
    }

    let paramStr = "";

    params.forEach((value, key) => {
      if (paramStr == "") {
        paramStr += "?";
      } else {
        paramStr += "&";
      }
      paramStr += key + "=" + value;
    });

    this.location.replaceState("/universe" + paramStr);
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
