const all: string = "ALL";

export interface FilterState {
    team: string;
    position: string;
}

export const initState = () => {
    return {
        team: all,
        position: all,
    }
}