

export interface AnimeTitle {
    romaji: string;
    english: string;
    native: string;
}

export interface AnimeCoverImage {
    large: string;
}

export interface AnimeStudio {
    name: string;
}

export interface AnimeDate {
    year: number;
    month: number;
    day: number;
}

export interface Anime {
    id: number;
    title: AnimeTitle;
    coverImage: AnimeCoverImage;
    description: string;
    genres: string[];
    averageScore: number;
    episodes: number;
    status: string;
    studios: {
        nodes: AnimeStudio[];
    };
    startDate: AnimeDate;
    endDate: AnimeDate;
}

export interface AnimeCategoryRowProps {
    title: string;
    genre?: string;
    sort?: string[];
} 