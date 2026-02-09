export const ProductListingType = {
    GRID: 'grid',
    LIST: 'list',
} as const;

export type ProductListingType = (typeof ProductListingType)[keyof typeof ProductListingType];
