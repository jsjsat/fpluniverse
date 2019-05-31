import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Player } from "src/app/model/player";
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PlayerServer } from "src/app/model/player-server";

const playerUrl: string = 'https://cors-anywhere.herokuapp.com/https://fantasy.premierleague.com/drf/bootstrap-static';

@Injectable({
    providedIn: 'root'
})
export class UniverseService {

    constructor(private http: HttpClient) { }

    getPlayers(): Observable<Player[]> {
        return this.convert(this.http.get<PlayerServer>(playerUrl));
    }

    convert(data: Observable<PlayerServer>) : Observable<Player[]> {
        return data.pipe<Player[]>(map(ps => {
                return ps.elements.map(p => {return {
                    firstName: p.first_name,
                    lastName: p.second_name,
                    points: p.total_points,
                    team: p.team,
        }})}));
    }

}