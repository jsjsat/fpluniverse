// tslint:disable:triple-equals
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FilterState } from '../+state/filter-state';
import { FilterStateFacadeService } from '../+state/filter-state-facade.service';
import { TEAMS, MODES, POSITIONS, COSTS } from 'src/app/shared/translate';

@Component({
  selector: 'app-universe',
  templateUrl: './universe.component.html',
  styleUrls: ['./universe.component.css'],
})
export class UniverseComponent implements OnInit, OnDestroy {
  onDestroy = new Subject();

  public constructor(
    private activatedRoute: ActivatedRoute,
    private store: FilterStateFacadeService,
    private location: Location,
  ) {
    this.putInitialStateIntoStore();
    this.putStateIntoUrlWhenStoreChanges();
  }

  ngOnInit(): void {}
  putInitialStateIntoStore() {
    const queryParams = this.activatedRoute.snapshot.queryParamMap;
    console.log(queryParams);
    const team = queryParams.get('team');
    const position = queryParams.get('position');
    const maxprice = queryParams.get('maxprice');
    const mode = queryParams.get('mode');

    let teamIdx = -1;
    let posIdx = -1;
    let priceX = COSTS[0];
    let modeX = MODES[0];

    if (COSTS.includes(+maxprice)) {
      priceX = +maxprice;
    }

    if (team) {
      teamIdx = TEAMS.indexOf(team);
    }

    if (position) {
      posIdx = POSITIONS.indexOf(position);
    }

    if (MODES.includes(mode)) {
      modeX = mode;
    }

    this.store.init({
      maxPrice: priceX,
      team: teamIdx,
      position: posIdx,
      mode: modeX,
    });
  }

  putStateIntoUrlWhenStoreChanges() {
    this.store.filterState$
      .pipe(takeUntil(this.onDestroy))
      .subscribe((filterState) => {
        this.addToUrl(filterState);
      });
  }
  addToUrl(filterState: FilterState) {
    const params: Map<string, string> = new Map<string, string>();

    const mode = filterState.mode;
    if (mode != MODES[0]) {
      params.set('mode', mode);
    }

    const teamId = filterState.team;
    if (teamId != -1) {
      const team = TEAMS[teamId];
      params.set('team', team);
    }

    const posId = filterState.position;
    if (posId != -1) {
      const position = POSITIONS[posId];
      params.set('position', position);
    }

    const maxPrice = filterState.maxPrice;
    if (maxPrice != COSTS[0]) {
      params.set('maxprice', '' + maxPrice);
    }

    let paramStr = '';

    params.forEach((value, key) => {
      if (paramStr == '') {
        paramStr += '?';
      } else {
        paramStr += '&';
      }
      paramStr += key + '=' + value;
    });

    this.location.replaceState('/universe' + paramStr);
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
