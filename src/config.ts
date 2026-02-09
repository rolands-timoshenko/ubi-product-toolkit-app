export default {
    productApiUrl: import.meta.env.VITE_PRODUCT_API_URL,
    imageProxyUrl: import.meta.env.VITE_IMAGE_PROXY_URL,
} as const satisfies {
    productApiUrl: string;
    imageProxyUrl: string;
};
