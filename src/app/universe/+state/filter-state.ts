import { initialState } from "./filter-state.reducer";

export const FILTER_STATE_STORE_TOKEN = "filterstate";

export interface FilterState {
  position: number;
  team: number;
  maxPrice: number;
}

export const equals = (a: FilterState, b: FilterState): boolean =>
  a.team === b.team && a.maxPrice === b.maxPrice && a.position === b.position;
