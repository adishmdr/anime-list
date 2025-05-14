import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    VStack,
    HStack,
    Image,
    Text,
    Badge,
    Flex,
    Spinner,
    useBreakpointValue,
    Box,
    Button,
} from '@chakra-ui/react';
import { AnimeStudio } from '@/types/anime';
import { useState } from 'react';

interface AnimeDetailsData {
    Media?: {
        title: {
            english?: string;
            romaji: string;
        };
        coverImage: {
            large: string;
        };
        description: string;
        genres: string[];
        episodes: number;
        status: string;
        studios: {
            nodes: AnimeStudio[];
        };
    };
}

interface AnimeDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: AnimeDetailsData | undefined;
    loading: boolean;
    bgColor?: string;
}

const cleanDescription = (description: string | undefined): string => {
    if (!description) return '';
    return description
        .replace(/<br\s*\/?>/gi, '\n') // Replace <br> tags with newlines
        .replace(/<[^>]*>/g, '') // Remove any other HTML tags
        .trim(); // Remove extra whitespace
};

export function AnimeDetailsModal({ isOpen, onClose, data, loading, bgColor = 'gray.800' }: AnimeDetailsModalProps) {
    const isMobile = useBreakpointValue({ base: true, md: false }) ?? false;
    const [isExpanded, setIsExpanded] = useState(false);

    const renderAnimeDetails = () => {
        if (loading) {
            return (
                <Flex justify="center" p={4}>
                    <Spinner />
                </Flex>
            );
        }

        const cleanedDescription = cleanDescription(data?.Media?.description);

        return (
            <VStack align="stretch" spacing={4}>
                <Box position="relative" borderRadius="md" overflow="hidden">
                    {/* Genres overlayed on top */}
                    <HStack
                        position="absolute"
                        bottom={2}
                        left={2}
                        spacing={2}
                        zIndex={2}
                        flexWrap="wrap"
                    >
                        {data?.Media?.genres.map((genre: string) => (
                            <Badge key={genre} colorScheme="white" bg="blue.500">
                                {genre}
                            </Badge>
                        ))}
                    </HStack>

                    {/* Background Image */}
                    <Image
                        src={data?.Media?.coverImage.large}
                        alt={data?.Media?.title.english}
                        borderRadius="md"
                        objectFit="contain"
                        height="30vh"
                        width="100%"
                    />
                </Box>
                <Box>
                    <Text
                        color="gray.300"
                        noOfLines={isExpanded ? undefined : 3}
                        transition="all 0.3s ease"
                        fontSize="sm"
                        lineHeight="1.6"
                        whiteSpace="pre-line"
                    >
                        {cleanedDescription}
                    </Text>

                    <Button
                        onClick={() => setIsExpanded(!isExpanded)}
                        variant="ghost"
                        size="sm"
                        colorScheme="blue"
                        mt={1}
                        px={0}
                        _hover={{ textDecoration: 'underline' }}
                    >
                        {isExpanded ? 'Show Less' : 'Show More'}
                    </Button>
                </Box>

                <Text color="gray.300">
                    <strong>Episodes:</strong> {data?.Media?.episodes}
                </Text>
                <Text color="gray.300">
                    <strong>Status:</strong> {data?.Media?.status}
                </Text>
                {data?.Media?.studios?.nodes && data.Media.studios.nodes.length > 0 && (
                    <Text color="gray.300">
                        <strong>Studios:</strong>{' '}
                        {data.Media.studios.nodes
                            .map((studio: AnimeStudio) => studio.name)
                            .join(', ')}
                    </Text>
                )}
            </VStack>
        );
    };

    return (
        <>
            {/* Modal for desktop */}
            <Modal isOpen={isOpen && !isMobile} onClose={onClose} size="xl" isCentered>
                <ModalOverlay bg="blackAlpha.700" />
                <ModalContent bg={bgColor} color="white">
                    <ModalHeader borderBottom="1px" borderColor="gray.700">
                        {data?.Media?.title.english || data?.Media?.title.romaji}
                    </ModalHeader>
                    <ModalCloseButton color="white" />
                    <ModalBody>
                        {renderAnimeDetails()}
                    </ModalBody>
                </ModalContent>
            </Modal>

            {/* Drawer for mobile */}
            <Drawer
                isOpen={isOpen && isMobile}
                placement="bottom"
                onClose={onClose}
                size="full"
            >
                <DrawerOverlay />
                <DrawerContent bg={bgColor} color="white">
                    <DrawerHeader borderBottom="1px" borderColor="gray.700">
                        {data?.Media?.title.english || data?.Media?.title.romaji}
                    </DrawerHeader>
                    <DrawerCloseButton color="white" />
                    <DrawerBody>
                        {renderAnimeDetails()}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
} 
