import type { IUbiProductService } from '@/domain/interfaces';
import type {
    UbiProductDetails,
    UbiProductListItem,
    UbiProductFilter,
    UbiProductSearchItem,
} from '@/domain/types';
import axios from 'axios';
import type { UbiProductApiReponse } from '@/api-types';

class UbiProductService implements IUbiProductService {
    private baseUrl = 'https://static.ui.com/';

    async getProducts(filter: UbiProductFilter): Promise<UbiProductListItem[]> {
        try {
            const response = await axios.get<UbiProductApiReponse>(
                `${this.baseUrl}fingerprint/ui/public.json`,
            );

            if (response.status === 200) {
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
                        thumbnailUrl: this.getProductImageUrl(
                            device.id,
                            device.images.nopadding,
                            100,
                        ),
                    }));
            }

            throw new Error('Error');
        } catch (error) {
            throw error;
        }
    }

    async getProductById(id: string): Promise<UbiProductDetails | null> {
        try {
            const response = await axios.get<UbiProductApiReponse>(
                `${this.baseUrl}fingerprint/ui/public.json`,
            );

            if (response.status === 200) {
                const device = response.data.devices.find((device) => device.id === id);

                return device
                    ? {
                          id: device.id,
                          line: device.line?.name,
                          name: device.product.name,
                          title: device.product.name,
                          shortnames: device.shortnames,
                          image: this.getProductImageUrl(device.id, device.images.nopadding, 400),
                      }
                    : null;
            }

            throw new Error('Error');
        } catch (error) {
            throw error;
        }
    }

    async getProductsBySearchTerm(searchTerm: string): Promise<UbiProductSearchItem[]> {
        try {
            const response = await axios.get<UbiProductApiReponse>(
                `${this.baseUrl}fingerprint/ui/public.json`,
            );
            // Maybe make sense to use bloom filter or something else to optimize search?
            if (response.status === 200) {
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
            }

            throw new Error('Error');
        } catch (error) {
            throw error;
        }
    }

    async getProductLines(): Promise<string[]> {
        try {
            const response = await axios.get<UbiProductApiReponse>(
                `${this.baseUrl}fingerprint/ui/public.json`,
            );

            if (response.status === 200) {
                const linesSet = new Set<string>();
                response.data.devices.forEach((device) => {
                    if (device.line?.name) {
                        linesSet.add(device.line.name);
                    }
                });
                return Array.from(linesSet);
            }

            throw new Error('Error');
        } catch (error) {
            throw error;
        }
    }

    private getProductImageUrl(productId: string, imageId: string, width: number): string {
        return `https://images.svc.ui.com/?u=${this.baseUrl}fingerprint/ui/images/${productId}/nopadding/${imageId}.png&w=${width}&q=70`;
    }
}

export default UbiProductService;
