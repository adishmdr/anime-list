import React from 'react';
import {
  Box,
  Image,
  Badge,
  Text
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { Anime } from '@/types/anime';


type AnimeCardProps = {
  anime: Anime;
  handleAnimeClick: (id: number) => void;
};

const AnimeCard: React.FC<AnimeCardProps> = ({ anime, handleAnimeClick }) => {
  return (
    <Box
      key={anime.id}
      borderRadius="lg"
      overflow="hidden"
      cursor="pointer"
      onClick={() => handleAnimeClick(anime.id)}
      _hover={{ transform: 'scale(1.02)', transition: 'transform 0.2s' }}
    >
      <Box position="relative" height="200px">
        <Image
          src={anime.coverImage.large}
          alt={anime.title.english || anime.title.romaji || 'Anime cover'}
          height="100%"
          width="100%"
          objectFit="cover"
        />

        {/* Bottom-left Badge */}
        <Badge
          colorScheme="blue"
          position="absolute"
          bottom="0"
          left="0"
          zIndex="1"
        >
          Ep {anime.episodes ?? 'N/A'}
        </Badge>

        {/* Bottom-right Badge */}
        {anime.averageScore && (
          <Badge
            colorScheme="green"
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bottom="0"
            right="0"
            zIndex="1"
            px={2}
            py={1}
          >
            <StarIcon boxSize={3} color="orange.500" mr={1} />
            {anime.averageScore / 10}
          </Badge>
        )}
      </Box>

      <Box p={4}>
        <Text fontSize="md" noOfLines={2}>
          {anime.title.english || anime.title.romaji || 'Untitled'}
        </Text>
      </Box>
    </Box>
  );
};

export default AnimeCard;