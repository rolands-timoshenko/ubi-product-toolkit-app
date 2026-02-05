import type { UbiProductFilter } from '@/domain/types';
import UbiProductServiceContext from '@/providers/UbiProductServiceProvider/context';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { useContext } from 'react';

export const productKeys = {
    all: ['products'] as const,
    list: (filter?: UbiProductFilter) => [...productKeys.all, 'list', filter ?? {}] as const,
    search: (searchTerm: string) => [...productKeys.all, 'search', searchTerm] as const,
    detail: (id: string) => [...productKeys.all, 'detail', id] as const,
};

export const useProducts = (filter?: UbiProductFilter) => {
    const context = useContext(UbiProductServiceContext);
    if (!context) {
        throw new Error('useProducts must be used within a UbiProductServiceProvider');
    }

    return useQuery({
        queryKey: productKeys.list(filter),
        queryFn: () => context.getProducts(filter || {}),
    });
};

export const useInfiniteProducts = (filter?: UbiProductFilter) => {
    const context = useContext(UbiProductServiceContext);
    if (!context) {
        throw new Error('useInfiniteProducts must be used within a UbiProductServiceProvider');
    }

    return useInfiniteQuery({
        queryKey: productKeys.list(filter),
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
    });
};

export const useProductById = (id: string) => {
    const context = useContext(UbiProductServiceContext);
    if (!context) {
        throw new Error('useProductById must be used within a UbiProductServiceProvider');
    }

    return useQuery({
        queryKey: id ? productKeys.detail(id) : productKeys.detail(''),
        enabled: !!id,
        queryFn: () => context.getProductById(id!),
    });
};

export const useProductsBySearchTerm = (searchTerm: string, minSearchTermLength = 3) => {
    const context = useContext(UbiProductServiceContext);
    if (!context) {
        throw new Error('useProductsBySearchTerm must be used within a UbiProductServiceProvider');
    }

    const trimmedSearchTerm = searchTerm.trim();
    const isEnabled = trimmedSearchTerm.length >= minSearchTermLength;

    return useQuery({
        queryKey: productKeys.search(trimmedSearchTerm),
        queryFn: () => context.getProductsBySearchTerm(trimmedSearchTerm),
        enabled: isEnabled,
    });
};

export const useProductLines = () => {
    const context = useContext(UbiProductServiceContext);
    if (!context) {
        throw new Error('useProductLines must be used within a UbiProductServiceProvider');
    }

    return useQuery({
        queryKey: [...productKeys.all, 'lines'] as const,
        queryFn: () => context.getProductLines(),
    });
};
