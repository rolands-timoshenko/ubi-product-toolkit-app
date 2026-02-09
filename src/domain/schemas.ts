import { z } from 'zod';

export const ProductListItemSchema = z.object({
    id: z.string(),
    line: z.object({
        name: z.string(),
    }),
    product: z.object({
        name: z.string(),
    }),
    images: z.object({
        nopadding: z.string(),
    }),
    shortnames: z.array(z.string()),
});

export const ProductsSchema = z.object({ devices: z.array(ProductListItemSchema) });
export type ProductsApiResponse = z.infer<typeof ProductsSchema>;
