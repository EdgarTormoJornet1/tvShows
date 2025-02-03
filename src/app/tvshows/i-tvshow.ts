export interface ItvShow {
    id: number;
    name: string | null;
    number_of_seasons: number | null;
    number_of_episodes: number | null;
    original_language: string | null;
    vote_count: number;
    vote_average: number;
    overview: string | null;
    adult: boolean;
    backdrop_path: string | null;
    first_air_date: string | null;
    last_air_date: string | null;
    homepage: string | null;
    in_production: boolean | null;
    original_name: string | null;
    popularity: number;
    poster_path: string | null;
    type: string | null;
    status: string | null;
    tagline: string | null;
    genres: string[] | null;
    created_by: string[] | null;
    languages: string[] | null;
    networks: string[] | null;
    origin_country: string[] | null;
    spoken_languages: string[] | null;
    production_companies: string[] | null;
    production_countries: string[] | null;
    episode_run_time: number[] | null;
}

