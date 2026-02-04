import type { IUbiProductService } from '@/domain/interfaces';
import type { UbiProductDetails, UbiProductListItem, UbiProductFilter } from '@/domain/types';
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
                        let matches = true;

                        if (filter.lines) {
                            matches = matches && device.uisp.line === filter.lines;
                        }

                        if (filter.searchTerm) {
                            const searchTermLower = filter.searchTerm.toLowerCase();
                            matches =
                                matches &&
                                (device.product.name.toLowerCase().includes(searchTermLower) ||
                                    device.uisp.nameLegacy.some((name) =>
                                        name.toLowerCase().includes(searchTermLower),
                                    ) ||
                                    device.shortnames.some((shortname) =>
                                        shortname.toLowerCase().includes(searchTermLower),
                                    ));
                        }

                        return matches;
                    })
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

    private getProductImageUrl(productId: string, imageId: string, width: number): string {
        return `https://images.svc.ui.com/?u=${this.baseUrl}fingerprint/ui/images/${productId}/nopadding/${imageId}.png&w=${width}&q=70`;
    }
}

export default UbiProductService;
