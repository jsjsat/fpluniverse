// tslint:disable:triple-equals
import { Player } from '../model/player';
import { FilterState } from '../universe/+state/filter-state';
import { MODES } from '../shared/translate';

export const applyMode = (player: Player, mode: string): Player => {
  if (mode == MODES[0]) {
    player.selectedMetric = player.points;
  }

  if (mode == MODES[1]) {
    player.selectedMetric = player.pointsPerMillion;
  }

  if (mode == MODES[2]) {
    player.selectedMetric = player.goals;
  }

  if (mode == MODES[3]) {
    player.selectedMetric = player.assists;
  }

  if (mode == MODES[4]) {
    player.selectedMetric = player.cleanSheets;
  }

  if (mode == MODES[5]) {
    player.selectedMetric = player.bonusPoints;
  }

  return player;
};

export const applyFilters = (
  player: Player,
  filterState: FilterState,
): boolean => {
  if (player.selectedMetric <= 0) {
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

  if (player.position == 3) {
    // if forward and clean sheets dont show
    if (filterState.mode == MODES[4]) {
      return false;
    }
  }

  return true;
};
