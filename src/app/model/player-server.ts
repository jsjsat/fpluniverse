export interface PlayerServer {
  first_name: string;
  second_name: string;
  total_points: number;
  team: number;
  element_type: number;
  now_cost: number;
  clean_sheets: number;
  assists: number;
  goals_scored: number;
  penalties_saved: number;
  bonus: number;
}

export interface PlayersServer {
  elements: PlayerServer[];
}
