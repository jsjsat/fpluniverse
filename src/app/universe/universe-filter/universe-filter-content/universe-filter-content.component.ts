import { Component, OnDestroy } from "@angular/core";
import { Options } from "ng5-slider";
import { POSITIONS, TEAMS, COSTS } from "src/app/shared/translate";
import { FilterStateFacadeService } from "../../+state/filter-state-facade.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { initialState } from "../../+state/filter-state.reducer";
import { equals } from "../../+state/filter-state";
@Component({
  selector: "universe-filter-content",
  templateUrl: "./universe-filter-content.component.html",
  styleUrls: ["./universe-filter-content.component.scss"]
})
export class UniverseFilterContentComponent implements OnDestroy {
  onDestroy = new Subject();

  selectedPosition = "-1";
  selectedTeam = "-1";
  selectedCost = "" + COSTS[0];

  disableReset = true;

  priceOptions = {
    value: 0,
    highValue: 100,
    options: {
      floor: 3.8,
      ceil: 14,
      step: 0.1
    } as Options
  };

  constructor(private store: FilterStateFacadeService) {
    store.filterState$
      .pipe(takeUntil(this.onDestroy.asObservable()))
      .subscribe(filterstate => {
        this.selectedPosition = "" + filterstate.position;
        this.selectedTeam = "" + filterstate.team;
        this.selectedCost = "" + filterstate.maxPrice;
        console.log(filterstate, initialState);
        this.disableReset = equals(filterstate, initialState);
        console.log(this.disableReset);
      });
  }

  getTeams = (): string[] => TEAMS;

  getPositions = (): string[] => POSITIONS;

  getCosts = (): number[] => COSTS;

  teamChanged(event: any) {
    const selectedTeam = event.value;
    this.store.changeTeam(selectedTeam as number);
  }

  positionChanged(event: any) {
    const selectedPosition = event.value;
    this.store.changePosition(selectedPosition as number);
  }

  costChanged(event: any) {
    const selectedCost = event.value;
    this.store.changeMaxPrice(selectedCost as number);
  }

  resetFilters() {
    this.store.resetFilters();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }
}
