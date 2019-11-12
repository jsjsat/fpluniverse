import { Action } from "@ngrx/store";
import { FilterState } from "./filter-state";

export const INIT_FILTERS = "[UNIVERSE] INIT FILTERS";
export const CHANGE_TEAM = "[UNIVERSE] CHANGE TEAM";
export const CHANGE_POSITION = "[UNIVERSE] CHANGE POSITION";
export const CHANGE_MAX_PRICE = "[UNIVERSE] CHANGE MAX PRICE";
export const CHANGE_MODE = "[UNIVERSE] CHANGE MODE";
export const RESET = "[UNIVERSE] RESET";

export class ChangePositionAction implements Action {
  readonly type = CHANGE_POSITION;

  constructor(public position: number) {}
}

export class ChangeTeamAction implements Action {
  readonly type = CHANGE_TEAM;

  constructor(public team: number) {}
}

export class ChangeMaxPriceAction implements Action {
  readonly type = CHANGE_MAX_PRICE;

  constructor(public max: number) {}
}

export class ChangeModeAction implements Action {
  readonly type = CHANGE_MODE;

  constructor(public mode: string) {}
}

export class ResetAction implements Action {
  readonly type = RESET;
}

export class InitAction implements Action {
  readonly type = INIT_FILTERS;

  constructor(public filter: FilterState) {}
}

export type Actions =
  | InitAction
  | ChangePositionAction
  | ChangeTeamAction
  | ResetAction
  | ChangeModeAction
  | ChangeMaxPriceAction;
