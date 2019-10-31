import { Action } from "@ngrx/store";

export const CHANGE_TEAM = "[UNIVERSE] CHANGE TEAM";
export const CHANGE_POSITION = "[UNIVERSE] CHANGE POSITION";
export const CHANGE_MAX_PRICE = "[UNIVERSE] CHANGE MAX PRICE";
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

export class ResetAction implements Action {
  readonly type = RESET;
}

export type Actions =
  | ChangePositionAction
  | ChangeTeamAction
  | ResetAction
  | ChangeMaxPriceAction;
