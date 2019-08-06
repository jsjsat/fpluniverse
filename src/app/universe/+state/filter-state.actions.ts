import { Action } from "@ngrx/store";

export const CHANGE_TEAM = "[UNIVERSE] CHANGE TEAM";
export const CHANGE_POSITION = "[UNIVERSE] CHANGE POSITION";

export class ChangePosition implements Action {
  readonly type = CHANGE_POSITION;

  constructor(public position: number) {}
}

export class ChangeTeam implements Action {
  readonly type = CHANGE_TEAM;

  constructor(public team: number) {}
}

export type Actions = ChangePosition | ChangeTeam;

//https://coursetro.com/posts/code/151/Angular-Ngrx-Store-Tutorial---Learn-Angular-State-Management
