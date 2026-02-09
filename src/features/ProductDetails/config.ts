export const queriesCachingKeys = {
    detail: (id: string) => ['products', 'detail', id] as const,
};
