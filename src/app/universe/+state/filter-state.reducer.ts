import { FilterState } from './filter-state';
import { Actions, CHANGE_POSITION, CHANGE_TEAM } from './filter-state.actions';

const initialState: FilterState = {};

export function reducer(state: FilterState = initialState, action: Actions) {
  switch (action.type) {
    case CHANGE_POSITION:
      return { ...state, position: action.position };
    case CHANGE_TEAM:
      return { ...state, team: action.team };
  }
}
