import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FilterState } from './filter-state';
import { getFilterState } from './filter-state.selectors';
import { ChangeTeam, ChangePosition } from './filter-state.actions';

@Injectable({providedIn: 'root'})
export class FilterStateFacadeService {
    filterState$: Observable<FilterState>;

    constructor(private readonly store: Store<FilterState>) {
        this.filterState$ = store.select(getFilterState);
    }

    onFilterChanged(): Observable<FilterState> {
        return this.filterState$;
    }

    changeTeam(team?: number): void {
        this.store.dispatch(new ChangeTeam(team));
    }

    changePosition(pos?: number): void {
        this.store.dispatch(new ChangePosition(pos));
    }
}
