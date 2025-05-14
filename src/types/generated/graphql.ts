export enum MediaSort {
    POPULARITY_DESC = 'POPULARITY_DESC',
    POPULARITY = 'POPULARITY',
    TRENDING_DESC = 'TRENDING_DESC',
    TRENDING = 'TRENDING',
    UPDATED_AT_DESC = 'UPDATED_AT_DESC',
    UPDATED_AT = 'UPDATED_AT',
    START_DATE_DESC = 'START_DATE_DESC',
    START_DATE = 'START_DATE',
    END_DATE_DESC = 'END_DATE_DESC',
    END_DATE = 'END_DATE',
    FAVOURITES_DESC = 'FAVOURITES_DESC',
    FAVOURITES = 'FAVOURITES',
    SCORE_DESC = 'SCORE_DESC',
    SCORE = 'SCORE',
    TITLE_ROMAJI_DESC = 'TITLE_ROMAJI_DESC',
    TITLE_ROMAJI = 'TITLE_ROMAJI',
    TITLE_ENGLISH_DESC = 'TITLE_ENGLISH_DESC',
    TITLE_ENGLISH = 'TITLE_ENGLISH',
    TITLE_NATIVE_DESC = 'TITLE_NATIVE_DESC',
    TITLE_NATIVE = 'TITLE_NATIVE',
    TYPE_DESC = 'TYPE_DESC',
    TYPE = 'TYPE',
    FORMAT_DESC = 'FORMAT_DESC',
    FORMAT = 'FORMAT',
    ID_DESC = 'ID_DESC',
    ID = 'ID'
}

export interface GetCategoryAnimeQueryVariables {
    genre?: string[];
    sort?: MediaSort[];
}

export interface GetCategoryAnimeQueryResponse {
    Page?: {
        media?: Array<{
            id: number;
            title: {
                romaji: string;
                english?: string;
                native: string;
            };
            coverImage: {
                large: string;
            };
            description: string;
            genres: string[];
            averageScore: number;
            episodes: number;
            status: string;
            studios: {
                nodes: Array<{
                    name: string;
                }>;
            };
            startDate: {
                year: number;
                month: number;
                day: number;
            };
            endDate: {
                year: number;
                month: number;
                day: number;
            };
        }>;
    };
} 