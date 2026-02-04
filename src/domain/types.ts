export type UbiProductListItem = {
    id: string;
    line: string;
    name: string;
    title: string;
    iconUrl?: string;
    thumbnailUrl?: string;
};

export type UbiProductDetails = {
    id: string;
    line: string;
    name: string;
    title: string;
    shortnames: string[];
    image: string;
};

export type UbiProductFilter = {
    lines?: string;
    searchTerm?: string;
};
