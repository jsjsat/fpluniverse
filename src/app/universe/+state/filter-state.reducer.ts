import { FilterState } from "./filter-state";
import {
  Actions,
  CHANGE_POSITION,
  CHANGE_TEAM,
  RESET,
  CHANGE_MAX_PRICE
} from "./filter-state.actions";
import { COSTS } from "src/app/shared/translate";

export const initialState: FilterState = {
  position: -1,
  team: -1,
  maxPrice: COSTS[0]
};

export function filterStateReducer(
  state: FilterState = initialState,
  action: Actions
) {
  switch (action.type) {
    case CHANGE_POSITION:
      return { ...state, position: action.position };
    case CHANGE_TEAM:
      return { ...state, team: action.team };
    case CHANGE_MAX_PRICE:
      return { ...state, maxPrice: action.max };
    case RESET:
      return initialState;
    default:
      return state;
  }
}
