export const queriesCachingKeys = {
    search: (searchTerm: string) => [['products'], 'search', searchTerm] as const,
};
