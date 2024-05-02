export interface ILeague {
    id : number,
    name : string,
    logo : string,
}

export interface ISeason {
    year : number,
    start : string,
    end : string,
}



export interface ILeaguesBySeason {
    league : ILeague,
    seasons : ISeason[],
}

export interface ILeaguesBySeasonResponse {
    response : ILeaguesBySeason[]
}

export interface IFixture {
    fixture : {
        date : string
        venue : {
            name : string,
            city : string
        },
        status : {
            short : string
        }
    },
    teams : {
        home : {
            name : string,
            logo : string
        },
        away : {
            name : string,
            logo : string
        }
    },
    goals : {
        home : number,
        away : number
    }
}

export interface IFixturesByLeague {
    response : IFixture[]
}