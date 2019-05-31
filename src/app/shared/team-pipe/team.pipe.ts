import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "formatTeam"
})
export class TeamPipe implements PipeTransform {
  private readonly teams = [
    "Arsenal",
    "Bournemouth",
    "Brighton",
    "Burnley",
    "Cardiff",
    "Chelsea",
    "Crystal Palace",
    "Everton",
    "Fulham",
    "Huddersfield",
    "Leicester",
    "Liverpool",
    "Man City",
    "Man Utd",
    "Newcastle",
    "Southampton",
    "Spurs",
    "Watford",
    "West Ham",
    "Wolves"
  ];

  transform(val: number): string {
    return this.teams[val - 1];
  }
}
