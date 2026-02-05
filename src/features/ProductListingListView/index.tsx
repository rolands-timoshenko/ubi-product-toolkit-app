import type { UbiProductListItem } from "@/domain/types";
import { getProductKey } from "@/utils";
import { useNavigate } from "react-router-dom";

type ProductListingListViewProps = { products: UbiProductListItem[] };

const ProductListingListView = ({ products }: ProductListingListViewProps) => {
    const navigate = useNavigate();
    return (
        <ul>
            {products.map((product) => (
                <li
                    key={getProductKey(product)}
                    className="border rounded p-4 cursor-pointer mb-2"
                    onClick={() => navigate(`/${product.id}`)}
                >
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.line}</p>
                </li>
            ))}
        </ul>
    );
};

export default ProductListingListView;