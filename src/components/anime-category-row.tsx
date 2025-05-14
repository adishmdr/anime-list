'use client';

import {
    Box,
    Heading,
    Spinner,
    Flex,
    IconButton,
    Circle,
    useDisclosure,
} from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { GET_CATEGORY_ANIME, GET_ANIME_DETAILS } from '@/lib/queries';

import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Anime } from '@/types/anime';
import AnimeCard from './ui/anime-card';
import { useScroll } from '@/hooks/useScroll';
import { AnimeDetailsModal } from './ui/anime-details-modal';

interface AnimeCategoryRowProps {
    title: string;
    genre?: string;
    sort?: string[];
}


export function AnimeCategoryRow({ title, genre, sort = ['POPULARITY_DESC'] }: AnimeCategoryRowProps) {
    const { data, loading } = useQuery(GET_CATEGORY_ANIME, {
        variables: {
            genre: genre ? [genre] : undefined,
            sort,
        },
    });

    const animeList = data?.Page?.media || [];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [selectedAnimeId, setSelectedAnimeId] = useState<number | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { handleScroll } = useScroll({
        containerId: `scroll-container-${title}`,
        scrollAmount: 0.8
    });

    const { data: detailData, loading: detailLoading } = useQuery(GET_ANIME_DETAILS, {
        variables: {
            id: selectedAnimeId,
        },
        skip: !selectedAnimeId,
    });

    // Auto-scroll for Popular category
    useEffect(() => {
        if (title === 'Popular' && animeList.length > 0 && !isPaused) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) =>
                    prevIndex === animeList.length - 1 ? 0 : prevIndex + 1
                );
            }, 8000);

            return () => clearInterval(interval);
        }
    }, [title, animeList.length, isPaused]);

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? animeList.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === animeList.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handleDotClick = (index: number) => {
        setCurrentIndex(index);
    };

    const handleAnimeClick = (id: number) => {
        setSelectedAnimeId(id);
        onOpen();
    };


    return (
        <Box mb={8}>
            {title !== 'Popular' && (
                <Heading size="lg" mb={4} px={2} color="white">
                    {title}
                </Heading>
            )}
            {loading ? (
                <Flex justify="center" align="center" minH="400px">
                    <Spinner color="blue.400" />
                </Flex>
            ) : (
                <Box
                    overflowX={title === 'Popular' ? "hidden" : "auto"}
                    className="hide-scrollbar"
                    position="relative"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {title === 'Popular' ? (
                        <>
                            <Box
                                display="flex"
                                transition="transform 0.5s ease-in-out"
                                style={{
                                    transform: `translateX(-${currentIndex * 100}%)`,
                                }}
                            >
                                {animeList.map((anime: Anime) => (
                                    <Box
                                        key={anime.id}
                                        flex="0 0 100%"
                                        width="100%"
                                        display="flex"
                                        justifyContent="center"
                                        px={4}
                                    >
                                        <Box width="100%" maxW="1200px">
                                            <AnimeCard key={anime.id} anime={anime} handleAnimeClick={handleAnimeClick} />
                                        </Box>
                                    </Box>
                                ))}
                            </Box>

                            {/* Navigation Buttons */}
                            <IconButton
                                aria-label="Previous slide"
                                icon={<ChevronLeftIcon />}
                                position="absolute"
                                left="10px"
                                top="50%"
                                transform="translateY(-50%)"
                                onClick={handlePrevious}
                                bg="gray.800"
                                color="white"
                                _hover={{ bg: 'gray.700' }}
                                boxShadow="md"
                                zIndex={2}
                            />
                            <IconButton
                                aria-label="Next slide"
                                icon={<ChevronRightIcon />}
                                position="absolute"
                                right="10px"
                                top="50%"
                                transform="translateY(-50%)"
                                onClick={handleNext}
                                bg="gray.800"
                                color="white"
                                _hover={{ bg: 'gray.700' }}
                                boxShadow="md"
                                zIndex={2}
                            />

                            {/* Navigation Dots */}
                            <Flex
                                position="absolute"
                                top="10px"
                                right="2px"
                                transform="translateX(-10%)"
                                gap={2}
                                zIndex={2}
                            >
                                {animeList.map((_anime: Anime, index: number) => (
                                    <Circle
                                        key={index}
                                        size="8px"
                                        bg={currentIndex === index ? "white" : "gray.600"}
                                        cursor="pointer"
                                        onClick={() => handleDotClick(index)}
                                        _hover={{ bg: currentIndex === index ? "white" : "gray.500" }}
                                        transition="all 0.2s"
                                    />
                                ))}
                            </Flex>
                        </>
                    ) : (
                        <>
                            <Box
                                id={`scroll-container-${title}`}
                                display="flex"
                                gap={4}
                                px={2}
                                pb={2}
                                overflowX="auto"
                                className="hide-scrollbar"
                                position="relative"
                            >
                                {animeList.map((anime: Anime) => (
                                    <Box key={anime.id} flex="0 0 auto">
                                        <AnimeCard key={anime.id} anime={anime} handleAnimeClick={handleAnimeClick} />
                                    </Box>
                                ))}
                            </Box>

                            {/* Navigation Buttons for non-Popular categories */}
                            <IconButton
                                aria-label="Scroll left"
                                icon={<ChevronLeftIcon />}
                                position="absolute"
                                left="10px"
                                top="50%"
                                transform="translateY(-50%)"
                                onClick={() => handleScroll('left')}
                                bg="gray.800"
                                color="white"
                                _hover={{ bg: 'gray.700' }}
                                boxShadow="md"
                                zIndex={2}
                                display={{ base: 'none', md: 'flex' }}
                            />
                            <IconButton
                                aria-label="Scroll right"
                                icon={<ChevronRightIcon />}
                                position="absolute"
                                right="10px"
                                top="50%"
                                transform="translateY(-50%)"
                                onClick={() => handleScroll('right')}
                                bg="gray.800"
                                color="white"
                                _hover={{ bg: 'gray.700' }}
                                boxShadow="md"
                                zIndex={2}
                                display={{ base: 'none', md: 'flex' }}
                            />
                        </>
                    )}
                </Box>
            )}

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