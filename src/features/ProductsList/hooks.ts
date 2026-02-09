import type { UbiProductFilter } from '@/domain/types';
import UbiProductServiceContext from '@/providers/UbiProductServiceProvider/context';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useContext, useEffect, useRef } from 'react';
import { queriesCachingKeys } from './config';

export const useScrollPositonPreserve = (scrollKey: string | undefined) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!scrollKey || !containerRef.current) {
            return;
        }
        const stored = sessionStorage.getItem(scrollKey);
        if (stored) {
            const nextScrollTop = Number(stored);
            if (!Number.isNaN(nextScrollTop)) {
                requestAnimationFrame(() => {
                    if (containerRef.current) {
                        containerRef.current.scrollTop = nextScrollTop;
                    }
                });
            }
        }
    }, [scrollKey]);

    const handleScroll = () => {
        if (!scrollKey || !containerRef.current) {
            return;
        }
        sessionStorage.setItem(scrollKey, String(containerRef.current.scrollTop));
    };

    return { containerRef, handleScroll };
};

export const useInfiniteProducts = (filter?: UbiProductFilter) => {
    const context = useContext(UbiProductServiceContext);
    if (!context) {
        throw new Error('useInfiniteProducts must be used within a UbiProductServiceProvider');
    }

    return useSuspenseInfiniteQuery({
        queryKey: queriesCachingKeys.list(filter),
        queryFn: ({ pageParam = 0 }) =>
            context.getProducts({
                ...filter,
                offset: pageParam,
                limit: 20,
            }),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.length === 20) {
                return allPages.length * 20;
            }
            return undefined;
        },
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60_000,
        refetchOnWindowFocus: false,
    });
};
