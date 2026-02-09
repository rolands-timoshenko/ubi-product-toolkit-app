import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { UbiProductFilter } from './domain/types';
import { ProductListingType } from './types';

type ProductListingState = {
    filter: UbiProductFilter;
    listType: ProductListingType;
    setFilters: (filter: UbiProductFilter) => void;
    setListType: (listType: ProductListingType) => void;
};

type AppState = {
    error: string | null;
    setError: (message: string | null) => void;
};

const useProductListingState = create<ProductListingState>()(
    persist(
        (set) => ({
            filter: {},
            listType: ProductListingType.LIST,
            setFilters: (filter) => set({ filter }),
            setListType: (listType) => set({ listType }),
        }),
        {
            name: 'product-storage',
            storage: createJSONStorage(() => localStorage),
        },
    ),
);

const useAppState = create<AppState>((set) => ({
    error: null,
    setError: (message) => set({ error: message }),
}));

export { useProductListingState, useAppState };
