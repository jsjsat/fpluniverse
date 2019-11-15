// tslint:disable:triple-equals

export const FILTER_STATE_STORE_TOKEN = 'filterstate';

export interface FilterState {
  position: number;
  team: number;
  maxPrice: number;
  mode: string;
}

export const equals = (a: FilterState, b: FilterState): boolean =>
  a.team == b.team &&
  a.maxPrice == b.maxPrice &&
  a.position == b.position &&
  a.mode == b.mode;
