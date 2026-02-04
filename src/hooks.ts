import type { UbiProductFilter } from '@/domain/types';
import UbiProductServiceContext from '@/providers/UbiProductServiceProvider/context';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';

export const productKeys = {
    all: ['products'] as const,
    list: (filter?: UbiProductFilter) => [...productKeys.all, 'list', filter ?? {}] as const,
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
