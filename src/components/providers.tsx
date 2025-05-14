'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { ReactNode } from 'react';

const theme = extendTheme({
    config: {
        initialColorMode: 'dark',
        useSystemColorMode: false,
    },
    styles: {
        global: {
            body: {
                bg: 'gray.950',
                color: 'gray.100',
            },
        },
    },
    components: {
        Button: {
            defaultProps: {
                colorScheme: 'blue',
            },
            variants: {
                outline: {
                    borderColor: 'blue.400',
                    color: 'blue.400',
                    _hover: {
                        bg: 'blue.900',
                        borderColor: 'blue.300',
                        color: 'blue.300',
                    },
                },
            },
        },
        Input: {
            defaultProps: {
                focusBorderColor: 'blue.400',
            },
        },
    },
    colors: {
        gray: {
            950: '#0A0A0F',
            900: '#111827',
            800: '#1F2937',
            700: '#374151',
            600: '#4B5563',
            500: '#6B7280',
            400: '#9CA3AF',
            300: '#D1D5DB',
            200: '#E5E7EB',
            100: '#F3F4F6',
        },
    },
});

export function Providers({ children }: { children: ReactNode }) {
    return (
        <CacheProvider>
            <ChakraProvider theme={theme}>
                {children}
            </ChakraProvider>
        </CacheProvider>
    );
} 