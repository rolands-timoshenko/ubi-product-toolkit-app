import type { IUbiProductService } from '@/domain/interfaces';
import type {
    UbiProductDetails,
    UbiProductListItem,
    UbiProductFilter,
    UbiProductSearchItem,
} from '@/domain/types';
import axios, { type AxiosResponse } from 'axios';
import { ProductsSchema, type ProductsApiResponse } from '@/domain/schemas';
import { DataIntegrityError, HttpError, NotFoundError } from '@/domain/errors';
import type { ZodObject } from 'zod';

class UbiProductService implements IUbiProductService {
    private baseUrl: string;
    private imageProxyUrl: string;

    constructor(apiUrl: string, imageProxyUrl: string) {
        if (!apiUrl) {
            throw new Error('API URL is required');
        }

        if (!imageProxyUrl) {
            throw new Error('Image proxy URL is required');
        }

        this.baseUrl = apiUrl;
        this.imageProxyUrl = imageProxyUrl;
    }

    async getProducts(filter: UbiProductFilter): Promise<UbiProductListItem[]> {
        try {
            const response = await axios.get<ProductsApiResponse>(
                `${this.baseUrl}fingerprint/ui/public.json`,
            );

            UbiProductService.validateResponse(response, ProductsSchema);

            return response.data.devices
                .filter((device) => {
                    if (filter.lines && filter.lines.length > 0) {
                        return filter.lines.includes(device.line.name);
                    }
                    return true;
                })
                .slice(filter.offset, filter.offset! + filter.limit!)
                .map((device) => ({
                    id: device.id,
                    line: device.line.name,
                    name: device.product.name,
                    title: device.product.name,
                    iconUrl: this.getProductImageUrl(device.id, device.images.nopadding, 25),
                    thumbnailUrl: this.getProductImageUrl(device.id, device.images.nopadding, 100),
                }));
        } catch (error) {
            UbiProductService.processError(error);
        }
    }

    async getProductById(id: string): Promise<UbiProductDetails> {
        try {
            const response = await axios.get<ProductsApiResponse>(
                `${this.baseUrl}fingerprint/ui/public.json`,
            );

            UbiProductService.validateResponse(response, ProductsSchema);
            
            const deviceIndex = response.data.devices.findIndex((device) => device.id === id);

            if (deviceIndex === -1) {
                throw new NotFoundError(`Product with id ${id} not found`);
            }

            const device = response.data.devices[deviceIndex];

            return {
                id: device.id,
                line: device.line?.name,
                name: device.product.name,
                title: device.product.name,
                shortnames: device.shortnames,
                image: this.getProductImageUrl(device.id, device.images.nopadding, 300),
                json: JSON.stringify(device, null, 2),
                nextProductId: response.data.devices[(deviceIndex + 1) % response.data.devices.length].id,
                previousProductId:
                    response.data.devices[
                        (deviceIndex - 1 + response.data.devices.length) % response.data.devices.length
                    ].id,
            };
        } catch (error) {
            UbiProductService.processError(error);
        }
    }

    async getProductsBySearchTerm(searchTerm: string): Promise<UbiProductSearchItem[]> {
        try {
            const response = await axios.get<ProductsApiResponse>(
                `${this.baseUrl}fingerprint/ui/public.json`,
            );

            UbiProductService.validateResponse(response, ProductsSchema);

            // NOTE: Maybe make sense to use bloom filter or something else to optimize search?
            const normalizedSearchTerm = this.normalizeSearchTerm(searchTerm);
            if (!normalizedSearchTerm) {
                return [];
            }

            return response.data.devices
                .filter((device) => {
                    return this.matchesSearchTerm(device, normalizedSearchTerm);
                })
                .map((device) => ({
                    id: device.id,
                    name: device.product.name,
                    line: device.line.name,
                }));
        } catch (error) {
            UbiProductService.processError(error);
        }
    }

    private normalizeSearchTerm(term: string): string {
        return term
            .normalize('NFKD')
            .replace(/[\u0300-\u036f]/g, '')
            .trim()
            .toLowerCase();
    }

    private matchesSearchTerm(
        device: ProductsApiResponse['devices'][number],
        normalizedSearchTerm: string,
    ): boolean {
        const name = device.product?.name ?? '';
        const line = device.line?.name ?? '';
        const shortnames = device.shortnames ?? [];

        const haystacks = [name, line, device.id, ...shortnames]
            .filter((value): value is string => Boolean(value))
            .map((value) => this.normalizeSearchTerm(value));

        return haystacks.some((value) => value.includes(normalizedSearchTerm));
    }

    async getProductLines(): Promise<string[]> {
        try {
            const response = await axios.get<ProductsApiResponse>(
                `${this.baseUrl}fingerprint/ui/public.json`,
            );

            UbiProductService.validateResponse(response, ProductsSchema);

            const linesSet = new Set<string>();
            response.data.devices.forEach((device) => {
                if (device.line?.name) {
                    linesSet.add(device.line.name);
                }
            });
            return Array.from(linesSet);
        } catch (error) {
            UbiProductService.processError(error);
        }
    }

    private static validateResponse(response: AxiosResponse, schema: ZodObject): void {
        if (response.status !== 200) {
            throw new HttpError(
                response.status,
                'Api request failed with status ' + response.status,
            );
        }

        const parsed = schema.safeParse(response.data);
        if (!parsed.success) {
            throw new DataIntegrityError("Products data doesn't match expected format");
        }
    }

    private static processError(error: unknown): never {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status ?? 0;
            throw new HttpError(status, 'Api request failed with status ' + status);
        } else if (error instanceof DataIntegrityError || error instanceof NotFoundError) {
            throw error;
        } else {
            throw new Error(
                'An unexpected error occurred: ' +
                    (error instanceof Error ? error.message : String(error)),
            );
        }
    }

    private getProductImageUrl(productId: string, imageId: string, width: number): string {
        return `${this.imageProxyUrl}?u=${this.baseUrl}fingerprint/ui/images/${productId}/nopadding/${imageId}.png&w=${width}&q=70`;
    }
}

export default UbiProductService;
