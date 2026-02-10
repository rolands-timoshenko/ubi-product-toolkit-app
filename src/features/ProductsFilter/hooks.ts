import UbiProductServiceContext from '@/providers/UbiProductServiceProvider/context';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { queriesCachingKeys } from './config';

export const useProductsBySearchTerm = (
    searchTerm: string,
    minSearchTermLength = 3,
    limitResultsCount = 100,
) => {
    const context = useContext(UbiProductServiceContext);
    if (!context) {
        throw new Error('useProductsBySearchTerm must be used within a UbiProductServiceProvider');
    }

    const trimmedSearchTerm = searchTerm.trim();
    const isEnabled = trimmedSearchTerm.length >= minSearchTermLength;

    return useQuery({
        queryKey: queriesCachingKeys.search(trimmedSearchTerm),
        queryFn: () =>
            context
                .getProductsBySearchTerm(trimmedSearchTerm)
                .then((results) => results.splice(0, limitResultsCount)),
        enabled: isEnabled,
    });
};

export const useProductLines = () => {
    const context = useContext(UbiProductServiceContext);
    if (!context) {
        throw new Error('useProductLines must be used within a UbiProductServiceProvider');
    }

    return useQuery({
        queryKey: [['products'], 'lines'] as const,
        queryFn: () => context.getProductLines(),
    });
};
