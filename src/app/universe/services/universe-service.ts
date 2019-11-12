import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Player } from "src/app/model/player";
import { PlayersServer } from "src/app/model/player-server";
import Utils from "src/app/util/utils";
import * as _ from "lodash";

const playerUrl =
  "https://cors-anywhere.herokuapp.com/https://fantasy.premierleague.com/api/bootstrap-static/";

@Injectable({
  providedIn: "root"
})
export class UniverseService {
  constructor(private http: HttpClient) {}

  getPlayers(): Observable<Player[]> {
    return this.convert(this.http.get<PlayersServer>(playerUrl));
  }

  convert(data: Observable<PlayersServer>): Observable<Player[]> {
    return data.pipe<Player[]>(
      map(ps => {
        return ps.elements.map(p => {
          return {
            firstName: p.first_name,
            lastName: p.second_name,
            points: p.total_points,
            team: p.team - 1,
            position: p.element_type - 1,
            cost: p.now_cost / 10,
            stats: Utils.getStats(p),
            goals: p.goals_scored,
            assists: p.assists,
            cleanSheets: p.clean_sheets,
            pointsPerMillion: _.round((p.total_points / p.now_cost) * 10, 1),
            bonusPoints: p.bonus,
            selectedMetric: p.total_points
          };
        });
      })
    );
  }
}
