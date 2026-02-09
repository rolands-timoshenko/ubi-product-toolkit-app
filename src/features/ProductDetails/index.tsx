import type { UbiProductDetails } from '@/domain/types';
import { useProductById } from './hooks';
import { useCallback, useState } from 'react';
import ProductDetailsAsJsonDialog from './components/ProductDetailsAsJsonDialog';
import ProductDetailsTable from './components/ProductDetailsTable';
import ProductImage from './components/ProductImage';

type ProductDetailsProps = {
    productId: string;
};

const ProductDetails = ({ productId }: ProductDetailsProps) => {
    const { data: product } = useProductById(productId) as { data: UbiProductDetails };
    const [isJsonOpen, setJsonOpen] = useState(false);

    const handleDialogClose = useCallback(() => {
        setJsonOpen(false);
    }, []);

    return (
        <div className="flex flex-col gap-4 w-[800px] xs:w-full min-h-[300px] sm:flex-row sm:items-start sm:gap-10 mx-auto relative">
            <div className="shrink-0">
                <ProductImage src={product.image} alt={product.name} />
            </div>
            <div className="flex-1">
                <div className="pb-5">
                    <h2 className="font-bold text-lg">{product.name}</h2>
                    <p className="text-gray-400 text-sm">{product.line}</p>
                </div>
                <ProductDetailsTable product={product} />
                <div className="mt-6">
                    <button
                        type="button"
                        className="text-sm text-sky-500 hover:text-sky-600 cursor-pointer"
                        onClick={() => setJsonOpen(true)}
                    >
                        See all details as JSON
                    </button>
                </div>
            </div>
            <ProductDetailsAsJsonDialog
                isOpen={isJsonOpen}
                json={product.json}
                onClose={handleDialogClose}
            />
        </div>
    );
};

export default ProductDetails;
