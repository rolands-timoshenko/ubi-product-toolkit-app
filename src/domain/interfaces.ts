import type {
    UbiProductListItem,
    UbiProductDetails,
    UbiProductFilter,
    UbiProductSearchItem,
} from './types';

export interface IUbiProductService {
    getProducts(filter: UbiProductFilter): Promise<UbiProductListItem[]>;
    getProductById(id: string): Promise<UbiProductDetails | null>;
    getProductsBySearchTerm(searchTerm: string): Promise<UbiProductSearchItem[]>;
    getProductLines(): Promise<string[]>;
}
