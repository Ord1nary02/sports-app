export interface ISeries {
    season : string,
    series_id : number,
    series_name : string,
    status : string,
    updated_at : string
}

export interface ISeriesType {
    series : ISeries[]
    type : "Test" | "T20I" | "ODI" 
}

export interface ISeriesResponse {
    results : ISeriesType[]
}

export interface IFixture {
    away : {
        name : string
    },
    date : string,
    home : {
        name : string
    },
    match_title : string,
    match_subtitle : string,
    result : string,
    venue : string
}

export interface IFixturesBySeriesResponse {
    results : IFixture[]
}