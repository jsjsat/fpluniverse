import { PlayerServer } from '../model/player-server';

export default class Utils {
  static getColor(team: number): string {
    switch (team) {
      case 0: // arsenal
        return '#DB0007';
      case 1: // astonvilla
        return '#7A003C';
      case 2: // bournemouth
        return '#050052';
      case 3: // brighton
        return '#0057B8';
      case 4: // burnley
        return '#6C1D45';
      case 5: // chelsea
        return '#034694';
      case 6: // Palace
        return '#1B458F';
      case 7: // Everton
        return '#003399';
      case 8: // Leicester
        return '#003090';
      case 9: // Liverpool
        return '#C8102E';
      case 10: // City
        return '#6CABDD';
      case 11: // United
        return '#DA291C';
      case 12: // Newcastle
        return '#AAA';
      case 13: // Norwich
        return '#00a650';
      case 14: // Sheffield
        return '#ec2227';
      case 15: // Southhampton
        return '#ed1a3b';
      case 16: // Spurs
        return '#132257';
      case 17: // Watford
        return '#eb0';
      case 18: // West Ham
        return '#7F0000';
      case 19: // Wolves
        return '#fdbc02';
      default:
        return 'gray';
    }
  }
  static getStats(p: PlayerServer): string {
    const statsArray: string[] = [];

    // gk / def / mid
    if (p.element_type <= 3) {
      statsArray.push(p.clean_sheets + ' CS');

      if (p.penalties_saved > 0) {
        statsArray.push(p.penalties_saved + ' PS');
      }

      if (p.assists > 0) {
        statsArray.push(p.assists + ' A');
      }

      if (p.goals_scored > 0) {
        statsArray.push(p.goals_scored + ' GS');
      }
    }

    // mid / atk

    if (p.element_type > 3) {
      statsArray.push(p.goals_scored + ' GS');
      statsArray.push(p.assists + ' A');
    }

    if (p.bonus > 0) {
      statsArray.push(p.bonus + ' Bonus');
    }

    let statsStr = statsArray[0];
    statsArray.slice(1).forEach(stat => (statsStr += ', ' + stat));

    return statsStr;
  }
}
