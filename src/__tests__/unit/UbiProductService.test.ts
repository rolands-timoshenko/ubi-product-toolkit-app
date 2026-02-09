import { describe, it, expect, beforeEach, vi } from 'vitest';
import axios from 'axios';
import type { MockedObject } from 'vitest';
import UbiProductService from '@/services/UbiProductService';
import { HttpError, DataIntegrityError, NotFoundError } from '@/domain/errors';

vi.mock('axios');

const mockAxios = axios as unknown as MockedObject<typeof axios>;

const mockProductResponse = {
    devices: [
        {
            id: 'product-1',
            line: { name: 'UniFi' },
            product: { name: 'UniFi 6 Pro' },
            images: { nopadding: 'image-1' },
            shortnames: ['U6P'],
        },
        {
            id: 'product-2',
            line: { name: 'UniFi Switch' },
            product: { name: 'UniFi Switch 48 PoE' },
            images: { nopadding: 'image-2' },
            shortnames: ['US48'],
        },
        {
            id: 'product-3',
            line: { name: 'UniFi' },
            product: { name: 'UniFi 7 Pro' },
            images: { nopadding: 'image-3' },
            shortnames: ['U7P'],
        },
    ],
};

describe('UbiProductService', () => {
    let service: UbiProductService;

    beforeEach(() => {
        vi.clearAllMocks();
        mockAxios.isAxiosError.mockReturnValue(false);
        service = new UbiProductService('https://api.example.com/', 'https://image.example.com/');
    });

    describe('constructor', () => {
        it('should throw error when API URL is missing', () => {
            expect(() => new UbiProductService('', 'https://image.example.com/')).toThrow(
                'API URL is required',
            );
        });

        it('should throw error when image proxy URL is missing', () => {
            expect(() => new UbiProductService('https://api.example.com/', '')).toThrow(
                'Image proxy URL is required',
            );
        });

        it('should initialize service with valid URLs', () => {
            expect(
                () =>
                    new UbiProductService('https://api.example.com/', 'https://image.example.com/'),
            ).not.toThrow();
        });
    });

    describe('getProducts', () => {
        it('should fetch and return products with limit and offset', async () => {
            mockAxios.get.mockResolvedValue({ status: 200, data: mockProductResponse });

            const products = await service.getProducts({ offset: 0, limit: 2 });

            expect(mockAxios.get).toHaveBeenCalledWith(
                'https://api.example.com/fingerprint/ui/public.json',
            );
            expect(products).toHaveLength(2);
            expect(products[0]).toEqual({
                id: 'product-1',
                line: 'UniFi',
                name: 'UniFi 6 Pro',
                title: 'UniFi 6 Pro',
                iconUrl: expect.stringContaining('w=25'),
                thumbnailUrl: expect.stringContaining('w=100'),
            });
        });

        it('should filter products by line', async () => {
            mockAxios.get.mockResolvedValue({ status: 200, data: mockProductResponse });

            const products = await service.getProducts({ offset: 0, limit: 10, lines: ['UniFi'] });

            expect(products).toHaveLength(2);
            expect(products.every((p) => p.line === 'UniFi')).toBe(true);
        });

        it('should return all products when no filter lines specified', async () => {
            mockAxios.get.mockResolvedValue({ status: 200, data: mockProductResponse });

            const products = await service.getProducts({ offset: 0, limit: 10 });

            expect(products).toHaveLength(3);
        });

        it('should throw HttpError on failed API response', async () => {
            const axiosError = {
                isAxiosError: true,
                response: { status: 500 },
            };
            mockAxios.get.mockRejectedValue(axiosError);
            mockAxios.isAxiosError.mockReturnValue(true);

            await expect(service.getProducts({ offset: 0, limit: 10 })).rejects.toThrow(HttpError);
        });

        it('should throw DataIntegrityError on invalid data format', async () => {
            mockAxios.get.mockResolvedValue({ status: 200, data: { devices: null } });

            await expect(service.getProducts({ offset: 0, limit: 10 })).rejects.toThrow(
                DataIntegrityError,
            );
        });

        it('should handle axios network errors', async () => {
            mockAxios.get.mockRejectedValue({
                isAxiosError: true,
                response: { status: 404 },
            });
            mockAxios.isAxiosError.mockReturnValue(true);

            await expect(service.getProducts({ offset: 0, limit: 10 })).rejects.toThrow(HttpError);
        });
    });

    describe('getProductById', () => {
        it('should fetch and return a single product by ID', async () => {
            mockAxios.get.mockResolvedValue({ status: 200, data: mockProductResponse });

            const product = await service.getProductById('product-1');

            expect(product).toEqual({
                id: 'product-1',
                line: 'UniFi',
                name: 'UniFi 6 Pro',
                title: 'UniFi 6 Pro',
                shortnames: ['U6P'],
                image: expect.stringContaining('w=300'),
                json: expect.stringContaining('"id": "product-1"'),
            });
        });

        it('should throw NotFoundError when product does not exist', async () => {
            mockAxios.get.mockResolvedValue({ status: 200, data: mockProductResponse });

            await expect(service.getProductById('non-existent')).rejects.toThrow(NotFoundError);
        });

        it('should throw HttpError on failed API response', async () => {
            const axiosError = {
                isAxiosError: true,
                response: { status: 500 },
            };
            mockAxios.get.mockRejectedValue(axiosError);
            mockAxios.isAxiosError.mockReturnValue(true);

            await expect(service.getProductById('product-1')).rejects.toThrow(HttpError);
        });

        it('should throw DataIntegrityError on invalid data format', async () => {
            mockAxios.get.mockResolvedValue({ status: 200, data: { devices: null } });

            await expect(service.getProductById('product-1')).rejects.toThrow(DataIntegrityError);
        });
    });

    describe('getProductsBySearchTerm', () => {
        it('should search products by name', async () => {
            mockAxios.get.mockResolvedValue({ status: 200, data: mockProductResponse });

            const results = await service.getProductsBySearchTerm('UniFi 6');

            expect(results).toHaveLength(1);
            expect(results[0].name).toBe('UniFi 6 Pro');
        });

        it('should perform case-insensitive search', async () => {
            mockAxios.get.mockResolvedValue({ status: 200, data: mockProductResponse });

            const results = await service.getProductsBySearchTerm('unifi 6');

            expect(results).toHaveLength(1);
            expect(results[0].name).toBe('UniFi 6 Pro');
        });

        it('should return empty array when no products match', async () => {
            mockAxios.get.mockResolvedValue({ status: 200, data: mockProductResponse });

            const results = await service.getProductsBySearchTerm('NonExistent');

            expect(results).toHaveLength(0);
        });

        it('should return empty array when search term is empty', async () => {
            mockAxios.get.mockResolvedValue({ status: 200, data: mockProductResponse });

            const results = await service.getProductsBySearchTerm('');

            expect(results).toHaveLength(0);
        });

        it('should throw HttpError on failed API response', async () => {
            const axiosError = {
                isAxiosError: true,
                response: { status: 500 },
            };
            mockAxios.get.mockRejectedValue(axiosError);
            mockAxios.isAxiosError.mockReturnValue(true);

            await expect(service.getProductsBySearchTerm('test')).rejects.toThrow(HttpError);
        });
    });

    describe('getProductLines', () => {
        it('should fetch and return all unique product lines', async () => {
            mockAxios.get.mockResolvedValue({ status: 200, data: mockProductResponse });

            const lines = await service.getProductLines();

            expect(lines).toHaveLength(2);
            expect(lines).toContain('UniFi');
            expect(lines).toContain('UniFi Switch');
        });

        it('should return unique lines (no duplicates)', async () => {
            const response = {
                devices: [
                    {
                        id: '1',
                        line: { name: 'UniFi' },
                        product: { name: 'P1' },
                        images: { nopadding: 'i1' },
                        shortnames: [],
                    },
                    {
                        id: '2',
                        line: { name: 'UniFi' },
                        product: { name: 'P2' },
                        images: { nopadding: 'i2' },
                        shortnames: [],
                    },
                    {
                        id: '3',
                        line: { name: 'UniFi' },
                        product: { name: 'P3' },
                        images: { nopadding: 'i3' },
                        shortnames: [],
                    },
                ],
            };
            mockAxios.get.mockResolvedValue({ status: 200, data: response });

            const lines = await service.getProductLines();

            expect(lines).toHaveLength(1);
            expect(lines[0]).toBe('UniFi');
        });

        it('should throw HttpError on failed API response', async () => {
            const axiosError = {
                isAxiosError: true,
                response: { status: 500 },
            };
            mockAxios.get.mockRejectedValue(axiosError);
            mockAxios.isAxiosError.mockReturnValue(true);

            await expect(service.getProductLines()).rejects.toThrow(HttpError);
        });

        it('should throw DataIntegrityError on invalid data format', async () => {
            mockAxios.get.mockResolvedValue({ status: 200, data: { devices: null } });

            await expect(service.getProductLines()).rejects.toThrow(DataIntegrityError);
        });
    });

    describe('error handling', () => {
        it('should handle unexpected errors gracefully', async () => {
            mockAxios.get.mockRejectedValue(new Error('Network timeout'));
            mockAxios.isAxiosError.mockReturnValue(false);

            await expect(service.getProducts({ offset: 0, limit: 10 })).rejects.toThrow(
                'Network timeout',
            );
        });

        it('should preserve axios errors', async () => {
            const axiosError = {
                isAxiosError: true,
                response: { status: 503 },
                message: 'Service Unavailable',
            };
            mockAxios.get.mockRejectedValue(axiosError);
            mockAxios.isAxiosError.mockReturnValue(true);

            await expect(service.getProducts({ offset: 0, limit: 10 })).rejects.toThrow(HttpError);
        });
    });
});
