import type { UbiProductSearchItem } from "@/domain/types";

export const getProductKey = (product: UbiProductSearchItem) => {
    return `${product.id}-${product.name}-${product.line}`;
}