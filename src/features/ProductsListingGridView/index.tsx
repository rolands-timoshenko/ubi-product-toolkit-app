import type { UbiProductListItem } from "@/domain/types";
import { getProductKey } from "@/utils";
import { useNavigate } from "react-router-dom";

type ProductListingGridViewProps = { products: UbiProductListItem[] };

export default function ProductListingGridView({ products }: ProductListingGridViewProps) {
    const navigate = useNavigate();
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
                <div key={getProductKey(product)} className="border rounded p-4 cursor-pointer" onClick={() => navigate(`/${product.id}`)}>
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.line}</p>
                </div>
            ))}
        </div>
    );
}
