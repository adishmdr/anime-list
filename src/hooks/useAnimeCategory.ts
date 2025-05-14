import { useState, useEffect, useCallback, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CATEGORY_ANIME } from '@/graphql/queries';
import { GetCategoryAnimeQueryVariables, GetCategoryAnimeQueryResponse, MediaSort } from '@/graphql/types';
import { Anime } from '@/types/anime';

export const useAnimeCategory = (genre?: string, sort: MediaSort[] = [MediaSort.POPULARITY_DESC]) => {
    const { data, loading } = useQuery<GetCategoryAnimeQueryResponse, GetCategoryAnimeQueryVariables>(
        GET_CATEGORY_ANIME,
        {
            variables: {
                genre: genre ? [genre] : undefined,
                sort,
            },
        }
    );

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const animeList = useMemo(() => {
        const list = data?.Page?.media || [];
        if (!searchQuery) return list;

        return list.filter(anime => 
            anime.title.english?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            anime.title.romaji.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [data, searchQuery]);

    const handlePrevious = useCallback(() => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? animeList.length - 1 : prevIndex - 1
        );
    }, [animeList.length]);

    const handleNext = useCallback(() => {
        setCurrentIndex((prevIndex) =>
            prevIndex === animeList.length - 1 ? 0 : prevIndex + 1
        );
    }, [animeList.length]);

    const handleDotClick = useCallback((index: number) => {
        setCurrentIndex(index);
    }, []);

    const handleSearch = useCallback((query: string) => {
        setSearchQuery(query);
        setCurrentIndex(0); // Reset to first item when searching
    }, []);

    const handleAnimeClick = useCallback((anime: Anime) => {
        setSelectedAnime(anime);
    }, []);

    useEffect(() => {
        if (animeList.length > 0 && !isPaused) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) =>
                    prevIndex === animeList.length - 1 ? 0 : prevIndex + 1
                );
            }, 5000);

            return () => clearInterval(interval);
        }
    }, [animeList.length, isPaused]);

    return {
        animeList,
        loading,
        currentIndex,
        isPaused,
        selectedAnime,
        setSelectedAnime,
        setIsPaused,
        handlePrevious,
        handleNext,
        handleDotClick,
        handleSearch,
        handleAnimeClick,
    };
}; 