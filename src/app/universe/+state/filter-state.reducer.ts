import { FilterState } from "./filter-state";
import {
  Actions,
  CHANGE_POSITION,
  CHANGE_TEAM,
  RESET,
  CHANGE_MAX_PRICE,
  CHANGE_MODE,
  INIT_FILTERS
} from "./filter-state.actions";
import { COSTS, MODES } from "src/app/shared/translate";
import { INIT_ACTION } from "@ngrx/store-devtools/src/reducer";
import { filter } from "minimatch";

export const initialState: FilterState = {
  position: -1,
  team: -1,
  maxPrice: COSTS[0],
  mode: MODES[0]
};

export function filterStateReducer(
  state: FilterState = initialState,
  action: Actions
) {
  switch (action.type) {
    case INIT_FILTERS:
      return { ...state, ...action.filter };
    case CHANGE_POSITION:
      return { ...state, position: action.position };
    case CHANGE_TEAM:
      return { ...state, team: action.team };
    case CHANGE_MAX_PRICE:
      return { ...state, maxPrice: action.max };
    case CHANGE_MODE:
      return { ...state, mode: action.mode };
    case RESET:
      return initialState;
    default:
      return state;
  }
}
