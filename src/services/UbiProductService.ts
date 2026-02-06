import type { IUbiProductService } from '@/domain/interfaces';
import type {
    UbiProductDetails,
    UbiProductListItem,
    UbiProductFilter,
    UbiProductSearchItem,
} from '@/domain/types';
import axios from 'axios';
import type { UbiProductApiReponse } from '@/api-types';
import { ProductsSchema } from '@/domain/schemas';
import { DataIntegritiError, HttpError, NotFoundError } from '@/domain/errors';

class UbiProductService implements IUbiProductService {
    // FIXME: use env variable for base url
    private baseUrl = 'https://static.ui.com/';

    async getProducts(filter: UbiProductFilter): Promise<UbiProductListItem[]> {
        try {
            const response = await axios.get<UbiProductApiReponse>(
                `${this.baseUrl}fingerprint/ui/public.json`,
            );

            if (response.status !== 200) {
                throw new HttpError(
                    response.status,
                    'Api request failed with status ' + response.status,
                );
            }

            const parsed = ProductsSchema.safeParse(response.data.devices);
            if (!parsed.success) {
                throw new DataIntegritiError("Products data doesn't match expected format");
            }

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

    async getProductById(id: string): Promise<UbiProductDetails | null> {
        try {
            const response = await axios.get<UbiProductApiReponse>(
                `${this.baseUrl}fingerprint/ui/public.json`,
            );

            if (response.status !== 200) {
                throw new HttpError(
                    response.status,
                    'Api request failed with status ' + response.status,
                );
            }

            const parsed = ProductsSchema.safeParse(response.data.devices);
            if (!parsed.success) {
                throw new DataIntegritiError("Products data doesn't match expected format");
            }

            const device = response.data.devices.find((device) => device.id === id);

            if (!device) {
                throw new NotFoundError(`Product with id ${id} not found`);
            }

            return {
                id: device.id,
                line: device.line?.name,
                name: device.product.name,
                title: device.product.name,
                shortnames: device.shortnames,
                image: this.getProductImageUrl(device.id, device.images.nopadding, 300),
                json: JSON.stringify(device, null, 2),
            };
        } catch (error) {
            UbiProductService.processError(error);
        }
    }

    async getProductsBySearchTerm(searchTerm: string): Promise<UbiProductSearchItem[]> {
        try {
            const response = await axios.get<UbiProductApiReponse>(
                `${this.baseUrl}fingerprint/ui/public.json`,
            );

            if (response.status !== 200) {
                throw new HttpError(
                    response.status,
                    'Api request failed with status ' + response.status,
                );
            }

            const parsed = ProductsSchema.safeParse(response.data.devices);
            if (!parsed.success) {
                throw new DataIntegritiError("Products data doesn't match expected format");
            }

            // NOTE: Maybe make sense to use bloom filter or something else to optimize search?
            return response.data.devices
                .filter((device) => {
                    if (searchTerm) {
                        const searchTermLower = searchTerm.toLowerCase();
                        if (device.product.name.toLowerCase().includes(searchTermLower)) {
                            return true;
                        }
                    }
                    return false;
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

    async getProductLines(): Promise<string[]> {
        try {
            const response = await axios.get<UbiProductApiReponse>(
                `${this.baseUrl}fingerprint/ui/public.json`,
            );

            if (response.status !== 200) {
                throw new HttpError(
                    response.status,
                    'Api request failed with status ' + response.status,
                );
            }

            const parsed = ProductsSchema.safeParse(response.data.devices);
            if (!parsed.success) {
                throw new DataIntegritiError("Products data doesn't match expected format");
            }

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

    private static processError(error: unknown): never {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status ?? 0;
            throw new HttpError(status, 'Api request failed with status ' + status);
        } else if (error instanceof DataIntegritiError || error instanceof NotFoundError) {
            throw error;
        } else {
            throw new Error(
                'An unexpected error occurred: ' +
                    (error instanceof Error ? error.message : String(error)),
            );
        }
    }

    private getProductImageUrl(productId: string, imageId: string, width: number): string {
        return `https://images.svc.ui.com/?u=${this.baseUrl}fingerprint/ui/images/${productId}/nopadding/${imageId}.png&w=${width}&q=70`;
    }
}

export default UbiProductService;
