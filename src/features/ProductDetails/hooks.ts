import UbiProductServiceContext from '@/providers/UbiProductServiceProvider/context';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { queriesCachingKeys } from './config';

export const useProductById = (id: string) => {
    const context = useContext(UbiProductServiceContext);
    if (!context) {
        throw new Error('useProductById must be used within a UbiProductServiceProvider');
    }

    return useSuspenseQuery({
        queryKey: id ? queriesCachingKeys.detail(id) : queriesCachingKeys.detail(''),
        queryFn: () => context.getProductById(id!),
    });
};
