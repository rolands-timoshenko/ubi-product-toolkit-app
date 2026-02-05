import { create } from 'zustand';
import type { UbiProductFilter } from './domain/types';

type ProductListingState = {
    filter: UbiProductFilter;
    listType: 'grid' | 'list';
    setFilters: (filter: UbiProductFilter) => void;
    setListType: (listType: 'grid' | 'list') => void;
};

export const useProductListingState = create<ProductListingState>((set) => ({
    filter: {},
    listType: 'list',
    setFilters: (filter) => set({ filter }),
    setListType: (listType) => set({ listType }),
}));