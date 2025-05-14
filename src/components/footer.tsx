import { Box, Text } from '@chakra-ui/react';

export function Footer() {
    return (
        <Box
            as="footer"
            bottom={0}
            width="100%"
            py={4}
            bg="gray.800"
            borderTop="1px"
            borderColor="gray.700"
            textAlign="center"
        >
            <Text color="gray.400">Challenge Version: 3.5.0</Text>
        </Box>
    );
} 