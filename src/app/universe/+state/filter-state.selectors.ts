import { FILTER_STATE_STORE_TOKEN, FilterState } from './filter-state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const getUniverseStore = createFeatureSelector(FILTER_STATE_STORE_TOKEN);

export const getFilterState = createSelector(getUniverseStore,
    (state: FilterState) => state);
