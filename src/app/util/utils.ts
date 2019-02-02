export default class Utils {

    static getColor(team: number): string {
        switch(team) {
            case 1: // arsenal
                return "#DB0007";
            case 2: // bournemouth
                return "#050052";
            case 3: // brighton
                return "#0057B8";
            case 4: // burnley
                return "#6C1D45";
            case 5: // cardif
                return "#0070B5";
            case 6: // chelsea
                return "#034694";
            case 7: // Palace
                return "#1B458F";
            case 8: // Everton
                return "#003399";
            case 9: // Fullham
                return "#CC0000";
            case 10: // Huddersfield
                return "#0E63AD";
            case 11: // Leicester
                return "#003090";
            case 12: // Liverpool
                return "#C8102E";
            case 13: // City
                return "#6CABDD";
            case 14: // United
                return "#DA291C";
            case 15: // Newcastle
                return "#AAA";
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

}