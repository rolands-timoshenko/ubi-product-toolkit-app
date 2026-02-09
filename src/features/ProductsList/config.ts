import type { UbiProductFilter } from '@/domain/types';

export const queriesCachingKeys = {
    list: (filter?: UbiProductFilter) => ['products', 'list', filter ?? {}] as const,
};

export const scrollPositionKeys = {
    table: 'product-list-table',
    grid: 'product-list-grid',
};
