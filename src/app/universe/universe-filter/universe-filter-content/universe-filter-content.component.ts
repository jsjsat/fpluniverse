import { Component, OnDestroy } from '@angular/core';
import { Options } from 'ng5-slider';
import { POSITIONS, TEAMS, COSTS, MODES } from 'src/app/shared/translate';
import { FilterStateFacadeService } from '../../+state/filter-state-facade.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { initialState } from '../../+state/filter-state.reducer';
import { equals } from '../../+state/filter-state';
@Component({
  selector: 'universe-filter-content',
  templateUrl: './universe-filter-content.component.html',
  styleUrls: ['./universe-filter-content.component.scss'],
})
export class UniverseFilterContentComponent implements OnDestroy {
  onDestroy = new Subject();

  selectedPosition = '-1';
  selectedTeam = '-1';
  selectedCost = '' + COSTS[0];
  selectedMode = MODES[0];

  disableReset = true;

  constructor(private store: FilterStateFacadeService) {
    store.filterState$
      .pipe(takeUntil(this.onDestroy.asObservable()))
      .subscribe((filterstate) => {
        this.selectedPosition = '' + filterstate.position;
        this.selectedTeam = '' + filterstate.team;
        this.selectedCost = '' + filterstate.maxPrice;
        this.selectedMode = filterstate.mode;
        this.disableReset = equals(filterstate, initialState);
      });
  }

  getTeams = (): string[] => TEAMS;

  getPositions = (): string[] => POSITIONS;

  getCosts = (): number[] => COSTS;

  getModes = (): string[] => MODES;

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

  modeChanged(event: any) {
    const selectedMode = event.value;
    this.store.changeMode(selectedMode);
  }

  resetFilters() {
    this.store.resetFilters();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }
}
