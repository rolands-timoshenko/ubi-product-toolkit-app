import { create } from 'zustand';
import type { UbiProductFilter } from './domain/types';

type ProductListingState = {
    filter: UbiProductFilter;
    listType: 'grid' | 'list';
    setFilters: (filter: UbiProductFilter) => void;
    setListType: (listType: 'grid' | 'list') => void;
};

type AppState = {
    error: string | null;
    setError: (message: string | null) => void;
};

const useProductListingState = create<ProductListingState>((set) => ({
    filter: {},
    listType: 'list',
    setFilters: (filter) => set({ filter }),
    setListType: (listType) => set({ listType }),
}));

const useAppState = create<AppState>((set) => ({
    error: null,
    setError: (message) => set({ error: message }),
}));

export { useProductListingState, useAppState };
