import type { UbiProductListItem, UbiProductDetails, UbiProductFilter } from './types';

export interface IUbiProductService {
    getProducts(filter: UbiProductFilter): Promise<UbiProductListItem[]>;
    getProductById(id: string): Promise<UbiProductDetails | null>;
}
