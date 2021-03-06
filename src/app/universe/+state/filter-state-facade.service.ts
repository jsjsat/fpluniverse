import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FilterState } from './filter-state';
import { getFilterState } from './filter-state.selectors';
import {
  ChangeTeamAction,
  ChangePositionAction,
  ResetAction,
  ChangeMaxPriceAction,
  ChangeModeAction,
  InitAction
} from './filter-state.actions';

@Injectable({ providedIn: 'root' })
export class FilterStateFacadeService {
  filterState$: Observable<FilterState>;

  constructor(private readonly store: Store<FilterState>) {
    this.filterState$ = store.select(getFilterState);
  }

  onFilterChanged(): Observable<FilterState> {
    return this.filterState$;
  }

  init(filter: FilterState): void {
    this.store.dispatch(new InitAction(filter));
  }

  changeTeam(team?: number): void {
    this.store.dispatch(new ChangeTeamAction(team));
  }

  changePosition(pos?: number): void {
    this.store.dispatch(new ChangePositionAction(pos));
  }

  changeMaxPrice(max?: number): void {
    this.store.dispatch(new ChangeMaxPriceAction(max));
  }

  changeMode(mode?: string): void {
    this.store.dispatch(new ChangeModeAction(mode));
  }

  resetFilters(): void {
    this.store.dispatch(new ResetAction());
  }
}
