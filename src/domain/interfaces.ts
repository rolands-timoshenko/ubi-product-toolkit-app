import type {
    UbiProductListItem,
    UbiProductDetails,
    UbiProductFilter,
    UbiProductSearchItem,
} from './types';

export interface IUbiProductService {
    getProducts(filter: UbiProductFilter): Promise<UbiProductListItem[]>;
    getProductById(id: string): Promise<UbiProductDetails>;
    getProductsBySearchTerm(searchTerm: string): Promise<UbiProductSearchItem[]>;
    getProductLines(): Promise<string[]>;
    getNextProductId(currentProductId: string): Promise<string>;
    getPreviousProductId(currentProductId: string): Promise<string>;
}
