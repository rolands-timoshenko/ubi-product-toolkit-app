export type UbiProductListItem = {
    id: string;
    line: string;
    name: string;
    title: string;
    iconUrl?: string;
    thumbnailUrl?: string;
};

export type UbiProductSearchItem = {
    id: string;
    name: string;
    line: string;
};

export type UbiProductDetails = {
    id: string;
    line: string;
    name: string;
    title: string;
    shortnames: string[];
    image: string;
    json: string;
};

export type UbiProductFilter = {
    lines?: string[];
    offset?: number;
    limit?: number;
};
