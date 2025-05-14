import { useCallback } from 'react';

interface UseScrollOptions {
    containerId: string;
    scrollAmount?: number;
}

export const useScroll = ({ containerId, scrollAmount = 0.8 }: UseScrollOptions) => {
    const handleScroll = useCallback((direction: 'left' | 'right') => {
        const container = document.getElementById(containerId);
        if (container) {
            const scrollWidth = container.clientWidth * scrollAmount;
            container.scrollBy({
                left: direction === 'left' ? -scrollWidth : scrollWidth,
                behavior: 'smooth'
            });
        }
    }, [containerId, scrollAmount]);

    return {
        handleScroll
    };
}; 