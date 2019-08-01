import { PlayerServer } from "../model/player-server";

export default class Utils {
  static getColor(team: number): string {
    switch (team) {
      case 1: // arsenal
        return "#DB0007";
      case 2: // astonvilla
        return "#7A003C";
      case 3: // bournemouth
        return "#050052";
      case 4: // brighton
        return "#0057B8";
      case 5: // burnley
        return "#6C1D45";
      case 6: // chelsea
        return "#034694";
      case 7: // Palace
        return "#1B458F";
      case 8: // Everton
        return "#003399";
      case 9: // Leicester
        return "#003090";
      case 10: // Liverpool
        return "#C8102E";
      case 11: // City
        return "#6CABDD";
      case 12: // United
        return "#DA291C";
      case 13: // Newcastle
        return "#AAA";
      case 14: // Norwich
        return "#00a650";
      case 15: // Sheffield
        return "#ec2227";
      case 16: // Southhampton
        return "#ed1a3b";
      case 17: // Spurs
        return "#132257";
      case 18: // Watford
        return "#eb0";
      case 19: // West Ham
        return "#7F0000";
      case 20: // Wolves
        return "#fdbc02";
      default:
        return "gray";
    }
  }
  static getStats(p: PlayerServer): string {
    let statsArray: string[] = [];

    // gk / def
    if (p.element_type <= 2) {
      statsArray.push(p.clean_sheets + " CS");

      if (p.penalties_saved > 0) {
        statsArray.push(p.penalties_saved + " PS");
      }

      if (p.assists > 0) {
        statsArray.push(p.assists + " A");
      }

      if (p.goals_scored > 0) {
        statsArray.push(p.goals_scored + " GS");
      }
    }

    // mid / atk

    if (p.element_type > 2) {
      statsArray.push(p.goals_scored + " GS");
      statsArray.push(p.assists + " A");
    }

    if (p.bonus > 0) {
      statsArray.push(p.bonus + " Bonus");
    }

    let statsStr = statsArray[0];
    statsArray.slice(1).forEach(stat => (statsStr += ", " + stat));

    return statsStr;
  }
}
