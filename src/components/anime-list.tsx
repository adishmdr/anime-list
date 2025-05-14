'use client';

import {
    Box,
    SimpleGrid,
    Text,
    useDisclosure,
    Flex,
    Input,
    useColorModeValue,
    Skeleton,
    IconButton,
} from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { GET_ANIME_LIST, GET_ANIME_DETAILS } from '@/lib/queries';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useMemo } from 'react';
import { Anime } from '@/types/anime';
import { useDebounce } from '@/hooks/useDebounce';
import { AnimeDetailsModal } from './ui/anime-details-modal';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import AnimeCard from './ui/anime-card';
import { Navbar } from './ui/navbar';

const ITEMS_PER_PAGE = 16;

const AnimeCardSkeleton = () => {
    return (
        <Box
            borderRadius="lg"
            overflow="hidden"
            bg="gray.800"
        >
            <Skeleton height="200px" />
            <Box p={4}>
                <Skeleton height="20px" mb={2} />
                <Skeleton height="16px" width="80%" />
            </Box>
        </Box>
    );
};

export function AnimeList() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedAnimeId, setSelectedAnimeId] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearchQuery = useDebounce(searchQuery, 300);

    const inputBgColor = useColorModeValue('white', 'gray.800');
    const placeholderColor = useColorModeValue('gray.500', 'gray.400');

    const { data: listData, loading: listLoading } = useQuery(GET_ANIME_LIST, {
        variables: {
            page: currentPage,
            perPage: ITEMS_PER_PAGE,
        },
    });

    const { data: detailData, loading: detailLoading } = useQuery(GET_ANIME_DETAILS, {
        variables: {
            id: selectedAnimeId,
        },
        skip: !selectedAnimeId,
    });

    const handlePageChange = (newPage: number) => {
        router.push(`/?page=${newPage}`, { scroll: false });
    };

    const handleAnimeClick = (id: number) => {
        setSelectedAnimeId(id);
        onOpen();
    };

    const filteredAnime = useMemo(() => {
        if (!listData?.Page?.media) return [];
        if (!debouncedSearchQuery) return listData.Page.media;

        return listData.Page.media.filter((anime: Anime) =>
            anime.title.english?.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
            anime.title.romaji.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
        );
    }, [listData?.Page?.media, debouncedSearchQuery]);

    const handleLogout = () => {
        // Implement logout logic here
        console.log('Logout clicked');
    };

    if (listLoading) {
        return (
            <Box>

                <Box p={4}>
                    <SimpleGrid columns={{ base: 2, md: 4, lg: 6, xl: 8 }} spacing={6}>
                        {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                            <AnimeCardSkeleton key={index} />
                        ))}
                    </SimpleGrid>
                </Box>
            </Box>
        );
    }

    return (
        <Box>

            <Box p={4}>
                <Flex justify="space-between" mb={6}>
                    <Text fontSize="2xl" fontWeight="bold">Anime List</Text>
                    <Input
                        placeholder="Search anime..."
                        color="black"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        width="30%"
                        bg={inputBgColor}
                        _placeholder={{ color: placeholderColor }}
                    />
                </Flex>

                <SimpleGrid columns={{ base: 2, md: 4, lg: 6, xl: 8 }} spacing={6}>
                    {listLoading ? (
                        Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                            <AnimeCardSkeleton key={index} />
                        ))
                    ) : (
                        filteredAnime.map((anime: Anime) => (
                            <Box key={anime.id} flex="0 0 auto">
                                <AnimeCard key={anime.id} anime={anime} handleAnimeClick={handleAnimeClick} />
                            </Box>
                        ))
                    )}
                </SimpleGrid>

                {!debouncedSearchQuery && (
                    <Flex justify="center" mt={8} gap={2}>
                        <IconButton
                            aria-label="Previous page"
                            icon={<ChevronLeftIcon />}
                            onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(currentPage - 1);
                            }}
                            isDisabled={currentPage === 1 || listLoading}
                        />
                        <Text alignSelf="center">Page {currentPage}</Text>
                        <IconButton
                            aria-label="Next page"
                            icon={<ChevronRightIcon />}
                            onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(currentPage + 1);
                            }}
                            isDisabled={!listData?.Page?.pageInfo?.hasNextPage || listLoading}
                        />
                    </Flex>
                )}
            </Box>

            <AnimeDetailsModal
                isOpen={isOpen}
                onClose={onClose}
                data={detailData}
                loading={detailLoading}
                bgColor="gray.800"
            />
        </Box>
    );
} 