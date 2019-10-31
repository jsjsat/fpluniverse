import { Player } from "../model/player";
import { FilterState } from "../universe/+state/filter-state";

export const applyFilters = (
  player: Player,
  filterState: FilterState
): boolean => {
  if (player.points <= 0) {
    return false;
  }

  if (filterState.position != -1) {
    if (player.position != filterState.position) {
      return false;
    }
  }

  if (filterState.team != -1) {
    if (player.team != filterState.team) {
      return false;
    }
  }

  if (player.cost > filterState.maxPrice) {
    return false;
  }

  return true;
};
